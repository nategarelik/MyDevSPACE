#!/usr/bin/env node

/**
 * GAS Dashboard Server - Web interface for your personal AI system
 * Serves the visual dashboard and provides WebSocket connection to GAS
 */

import express from 'express';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import gas from './core/gas-orchestrator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class GASDashboardServer {
  constructor() {
    this.app = express();
    this.server = createServer(this.app);
    this.wss = new WebSocketServer({ server: this.server });
    this.port = process.env.PORT || 3000;
    this.clients = new Set();
    
    this.setupExpress();
    this.setupWebSocket();
    this.setupRoutes();
  }

  setupExpress() {
    // Enable CORS
    this.app.use(cors());
    
    // Parse JSON
    this.app.use(express.json());
    
    // Serve static files (dashboard)
    this.app.use(express.static(__dirname));
    
    // Logging middleware
    this.app.use((req, res, next) => {
      console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
      next();
    });
  }

  setupWebSocket() {
    this.wss.on('connection', (ws) => {
      console.log('🔗 Dashboard client connected');
      this.clients.add(ws);
      
      // Send initial system status
      this.sendToClient(ws, {
        type: 'status',
        data: gas.getSystemStatus()
      });

      ws.on('message', async (message) => {
        try {
          const data = JSON.parse(message.toString());
          await this.handleWebSocketMessage(ws, data);
        } catch (error) {
          console.error('WebSocket message error:', error);
          this.sendToClient(ws, {
            type: 'error',
            error: 'Invalid message format'
          });
        }
      });

      ws.on('close', () => {
        console.log('📱 Dashboard client disconnected');
        this.clients.delete(ws);
      });
    });
  }

  setupRoutes() {
    // API Routes
    this.app.get('/api/status', (req, res) => {
      res.json(gas.getSystemStatus());
    });

    this.app.get('/api/capabilities', (req, res) => {
      res.json(gas.getCapabilities());
    });

    this.app.post('/api/request', async (req, res) => {
      try {
        const { input, context } = req.body;
        const response = await gas.handleRequest(input, context);
        res.json(response);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    this.app.get('/api/history', (req, res) => {
      const count = parseInt(req.query.count) || 10;
      res.json(gas.getRecentHistory(count));
    });

    // Health check
    this.app.get('/health', (req, res) => {
      res.json({ 
        status: 'healthy',
        timestamp: new Date().toISOString(),
        gas: gas.getSystemStatus()
      });
    });

    // Default route - serve dashboard
    this.app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname, 'index.html'));
    });
  }

  async handleWebSocketMessage(ws, data) {
    switch (data.type) {
      case 'request':
        await this.handleUserRequest(ws, data);
        break;
      case 'status':
        this.sendSystemStatus(ws);
        break;
      case 'ping':
        this.sendToClient(ws, { type: 'pong' });
        break;
      default:
        this.sendToClient(ws, {
          type: 'error',
          error: `Unknown message type: ${data.type}`
        });
    }
  }

  async handleUserRequest(ws, data) {
    try {
      const { input, context } = data;
      
      // Notify all clients that a request is being processed
      this.broadcast({
        type: 'request_started',
        input: input
      });

      const response = await gas.handleRequest(input, context);
      
      // Send response to requesting client
      this.sendToClient(ws, {
        type: 'response',
        requestId: data.requestId,
        data: response
      });

      // Broadcast system status update to all clients
      this.broadcast({
        type: 'status_update',
        data: gas.getSystemStatus()
      });
      
    } catch (error) {
      this.sendToClient(ws, {
        type: 'error',
        requestId: data.requestId,
        error: error.message
      });
    }
  }

  sendSystemStatus(ws) {
    this.sendToClient(ws, {
      type: 'status',
      data: gas.getSystemStatus()
    });
  }

  sendToClient(ws, data) {
    if (ws.readyState === ws.OPEN) {
      ws.send(JSON.stringify(data));
    }
  }

  broadcast(data) {
    this.clients.forEach(client => {
      this.sendToClient(client, data);
    });
  }

  async start() {
    console.log('🌐 Starting GAS Dashboard Server...');
    
    try {
      // Initialize GAS system
      console.log('🧠 Initializing GAS system...');
      await gas.initialize();
      
      // Start server
      this.server.listen(this.port, () => {
        console.log(`✅ GAS Dashboard Server running on port ${this.port}`);
        console.log(`🔗 Dashboard: http://localhost:${this.port}`);
        console.log(`📊 API: http://localhost:${this.port}/api`);
        console.log(`🔌 WebSocket: ws://localhost:${this.port}`);
        console.log('\n🎯 Your personal AI system is ready!');
        console.log(`💬 Open the dashboard to interact with your AI`);
      });

      // Listen for GAS events
      gas.on('initialized', () => {
        this.broadcast({
          type: 'gas_initialized',
          data: gas.getSystemStatus()
        });
      });

      // Update clients every 10 seconds with latest status
      setInterval(() => {
        this.broadcast({
          type: 'status_update',
          data: gas.getSystemStatus()
        });
      }, 10000);
      
    } catch (error) {
      console.error('❌ Failed to start dashboard server:', error);
      process.exit(1);
    }
  }

  stop() {
    console.log('🛑 Stopping GAS Dashboard Server...');
    this.server.close(() => {
      console.log('✅ Server stopped');
    });
  }
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Received SIGINT, shutting down gracefully...');
  server.stop();
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Received SIGTERM, shutting down gracefully...');
  server.stop();
  process.exit(0);
});

// Start server if run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const server = new GASDashboardServer();
  server.start().catch(error => {
    console.error('Failed to start dashboard server:', error);
    process.exit(1);
  });
}

export default GASDashboardServer;