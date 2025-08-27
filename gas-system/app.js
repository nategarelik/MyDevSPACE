// GAS Dashboard JavaScript - Fixed Version
class GASDashboard {
    constructor() {
        this.currentTab = 'dashboard';
        this.performanceChart = null;
        this.simulationRunning = true;
        this.updateInterval = null;
        this.init();
    }

    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeDashboard());
        } else {
            this.initializeDashboard();
        }
    }

    initializeDashboard() {
        this.setupTabNavigation();
        this.setupInteractiveElements();
        this.initializeCharts();
        this.startSimulation();
        this.setupCircularProgress();
        this.addLoadingAnimations();
    }

    setupTabNavigation() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');

        console.log('Setting up tab navigation:', tabButtons.length, 'buttons,', tabContents.length, 'contents');

        tabButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const targetTab = button.dataset.tab;
                console.log('Tab clicked:', targetTab);
                
                // Remove active class from all buttons and contents
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked button and corresponding content
                button.classList.add('active');
                const targetContent = document.getElementById(targetTab);
                if (targetContent) {
                    targetContent.classList.add('active');
                    console.log('Activated tab content:', targetTab);
                } else {
                    console.error('Tab content not found:', targetTab);
                }
                
                this.currentTab = targetTab;
                
                // Trigger specific initialization for tabs
                if (targetTab === 'analytics') {
                    setTimeout(() => this.initializeCharts(), 100);
                }
            });
        });
    }

    setupInteractiveElements() {
        // Component card click handlers with improved feedback
        const componentCards = document.querySelectorAll('.component-card');
        componentCards.forEach(card => {
            card.addEventListener('click', () => {
                const component = card.dataset.component;
                this.showComponentDetails(component, card);
            });

            // Add hover effects
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-4px) scale(1.02)';
                card.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
                card.style.boxShadow = '';
            });
        });

        // AI Reasoning controls
        const traceButton = document.getElementById('traceRequest');
        const pauseButton = document.getElementById('pauseTrace');
        
        if (traceButton) {
            traceButton.addEventListener('click', () => {
                this.startNewTrace();
            });
        }
        
        if (pauseButton) {
            pauseButton.addEventListener('click', () => {
                this.toggleSimulation();
                pauseButton.textContent = this.simulationRunning ? 'Pause Trace' : 'Resume Trace';
                pauseButton.classList.toggle('btn--secondary');
                pauseButton.classList.toggle('btn--primary');
            });
        }

        // Add hover effects to other interactive elements
        this.addHoverEffects();
    }

    addHoverEffects() {
        // Enhanced tooltips for load bars
        const loadBars = document.querySelectorAll('.load-bar');
        loadBars.forEach(bar => {
            const card = bar.closest('.component-card');
            const componentName = card.querySelector('h3').textContent;
            const loadText = bar.querySelector('.load-text').textContent;
            
            bar.title = `${componentName}: ${loadText}`;
            
            bar.addEventListener('mouseenter', () => {
                bar.style.transform = 'scaleY(1.5)';
                bar.style.transition = 'transform 0.2s ease';
            });
            
            bar.addEventListener('mouseleave', () => {
                bar.style.transform = 'scaleY(1)';
            });
        });

        // Enhanced agent cards
        const agentCards = document.querySelectorAll('.agent-card');
        agentCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-3px)';
                card.style.boxShadow = '0 8px 20px rgba(0,0,0,0.12)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = '';
            });
        });
    }

    showComponentDetails(component, cardElement) {
        const details = {
            orchestration: {
                title: 'Hybrid Orchestration Engine',
                details: 'Managing 12 active agents with AutoGen Enterprise and OpenAI Swarm coordination. Current load: 67%',
                metrics: ['Active Agents: 12/20', 'Success Rate: 94.2%', 'Avg Response: 1.2s']
            },
            memory: {
                title: 'AI-Native Memory System',
                details: 'Processing 145 queries/sec across 2.3M knowledge graph nodes with 78% storage utilization.',
                metrics: ['Vector Queries: 145/sec', 'Graph Nodes: 2.3M', 'Storage: 78% used']
            },
            security: {
                title: 'Zero-Trust Security Framework',
                details: 'Actively monitoring with MAESTRO framework. 3 threats blocked today, compliance at 98%.',
                metrics: ['Threats Blocked: 3', 'Auth Events: 1,247', 'Compliance: 98%']
            },
            nlp: {
                title: 'Natural Language Center',
                details: 'Operating at 85% capacity with multimodal processing. Optimization recommended for peak hours.',
                metrics: ['Capacity: 85%', 'Intent Accuracy: 96%', 'Processing Speed: 2.1s']
            },
            resources: {
                title: 'Autonomous Resource Management',
                details: 'Maintaining optimal performance with auto-scaling enabled. Self-healing protocols active.',
                metrics: ['Auto-scaling: Active', 'Cost Optimization: 87%', 'Uptime: 99.9%']
            },
            learning: {
                title: 'Continuous Learning Pipeline',
                details: 'Continuously improving with 96.8% model accuracy. 156 training sessions completed today.',
                metrics: ['Model Accuracy: 96.8%', 'Training Sessions: 156', 'Improvement Rate: 23/day']
            }
        };
        
        if (details[component]) {
            // Create enhanced notification with component details
            this.showEnhancedNotification(details[component], cardElement);
        }
    }

    showEnhancedNotification(componentData, sourceElement) {
        // Remove existing notifications
        document.querySelectorAll('.enhanced-notification').forEach(n => n.remove());

        const notification = document.createElement('div');
        notification.className = 'enhanced-notification';
        
        notification.innerHTML = `
            <div class="notification-header">
                <h4>${componentData.title}</h4>
                <button class="close-btn">&times;</button>
            </div>
            <div class="notification-body">
                <p>${componentData.details}</p>
                <div class="notification-metrics">
                    ${componentData.metrics.map(metric => `<div class="metric-item">${metric}</div>`).join('')}
                </div>
            </div>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--color-surface);
            border: 1px solid var(--color-primary);
            border-radius: var(--radius-lg);
            padding: 0;
            max-width: 500px;
            width: 90%;
            z-index: 1000;
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
            animation: modalSlideIn 0.3s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        // Close button functionality
        const closeBtn = notification.querySelector('.close-btn');
        closeBtn.addEventListener('click', () => {
            notification.style.animation = 'modalSlideOut 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        });
        
        // Click outside to close
        setTimeout(() => {
            const clickHandler = (e) => {
                if (!notification.contains(e.target)) {
                    notification.style.animation = 'modalSlideOut 0.3s ease-in';
                    setTimeout(() => notification.remove(), 300);
                    document.removeEventListener('click', clickHandler);
                }
            };
            document.addEventListener('click', clickHandler);
        }, 100);
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--color-surface);
            border: 1px solid var(--color-border);
            border-radius: var(--radius-base);
            padding: var(--space-16);
            max-width: 400px;
            z-index: 1000;
            box-shadow: var(--shadow-lg);
            animation: slideIn 0.3s ease-out;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }

    initializeCharts() {
        const ctx = document.getElementById('performanceChart');
        if (ctx && !this.performanceChart) {
            this.createPerformanceChart(ctx);
        }
    }

    createPerformanceChart(ctx) {
        // Destroy existing chart if it exists
        if (this.performanceChart) {
            this.performanceChart.destroy();
        }

        const data = {
            labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
            datasets: [
                {
                    label: 'Response Time (ms)',
                    data: [1.8, 1.6, 1.4, 1.2, 1.1, 1.0],
                    borderColor: '#1FB8CD',
                    backgroundColor: 'rgba(31, 184, 205, 0.1)',
                    tension: 0.4,
                    yAxisID: 'y',
                    fill: true
                },
                {
                    label: 'Throughput (%)',
                    data: [75, 82, 85, 89, 91, 93],
                    borderColor: '#FFC185',
                    backgroundColor: 'rgba(255, 193, 133, 0.1)',
                    tension: 0.4,
                    yAxisID: 'y1',
                    fill: true
                },
                {
                    label: 'CPU Usage (%)',
                    data: [85, 78, 72, 67, 63, 61],
                    borderColor: '#B4413C',
                    backgroundColor: 'rgba(180, 65, 60, 0.1)',
                    tension: 0.4,
                    yAxisID: 'y1',
                    fill: true
                }
            ]
        };

        const config = {
            type: 'line',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            usePointStyle: true,
                            color: getComputedStyle(document.documentElement).getPropertyValue('--color-text') || '#333'
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            color: 'rgba(0,0,0,0.1)'
                        },
                        ticks: {
                            color: getComputedStyle(document.documentElement).getPropertyValue('--color-text-secondary') || '#666'
                        }
                    },
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        title: {
                            display: true,
                            text: 'Response Time (ms)',
                            color: getComputedStyle(document.documentElement).getPropertyValue('--color-text-secondary') || '#666'
                        },
                        grid: {
                            color: 'rgba(0,0,0,0.1)'
                        },
                        ticks: {
                            color: getComputedStyle(document.documentElement).getPropertyValue('--color-text-secondary') || '#666'
                        }
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        title: {
                            display: true,
                            text: 'Percentage (%)',
                            color: getComputedStyle(document.documentElement).getPropertyValue('--color-text-secondary') || '#666'
                        },
                        grid: {
                            drawOnChartArea: false,
                        },
                        ticks: {
                            color: getComputedStyle(document.documentElement).getPropertyValue('--color-text-secondary') || '#666'
                        }
                    }
                }
            }
        };

        this.performanceChart = new Chart(ctx, config);
        console.log('Performance chart created successfully');
    }

    updatePerformanceChart() {
        if (this.performanceChart) {
            // Simulate new data points
            this.performanceChart.data.datasets.forEach(dataset => {
                dataset.data = dataset.data.map(value => {
                    const variation = (Math.random() - 0.5) * 0.1;
                    return Math.max(0, value + variation * value);
                });
            });
            
            this.performanceChart.update('none');
        }
    }

    setupCircularProgress() {
        const circles = document.querySelectorAll('.circle-progress');
        circles.forEach(circle => {
            const progress = parseFloat(circle.dataset.progress) || 96.8;
            const degrees = (progress / 100) * 360;
            
            setTimeout(() => {
                circle.style.background = `conic-gradient(var(--color-primary) ${degrees}deg, var(--color-secondary) ${degrees}deg)`;
            }, 500);
        });
    }

    startSimulation() {
        // Clear existing interval
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }
        
        this.simulateRealTimeUpdates();
        this.updateInterval = setInterval(() => {
            if (this.simulationRunning) {
                this.simulateRealTimeUpdates();
            }
        }, 3000); // Update every 3 seconds for better visibility
    }

    simulateRealTimeUpdates() {
        // Update load bars with animations
        this.updateLoadBars();
        
        // Update progress bars for active requests
        this.updateActiveRequests();
        
        // Update metrics
        this.updateMetrics();
        
        // Update trace steps if on AI reasoning tab
        if (this.currentTab === 'ai-reasoning') {
            this.updateTraceSteps();
        }
        
        // Update performance chart if on analytics tab
        if (this.currentTab === 'analytics' && this.performanceChart) {
            this.updatePerformanceChart();
        }
    }

    updateLoadBars() {
        const loadFills = document.querySelectorAll('.load-fill');
        loadFills.forEach(fill => {
            const currentWidth = parseFloat(fill.style.width) || Math.random() * 80 + 10;
            const variation = (Math.random() - 0.5) * 8; // ±4% variation
            let newWidth = currentWidth + variation;
            
            // Keep within reasonable bounds
            newWidth = Math.max(15, Math.min(95, newWidth));
            
            fill.style.width = `${newWidth}%`;
            
            const loadText = fill.parentElement.querySelector('.load-text');
            if (loadText) {
                loadText.textContent = `${Math.round(newWidth)}% Load`;
            }
        });
    }

    updateActiveRequests() {
        const progressFills = document.querySelectorAll('.progress-fill');
        progressFills.forEach(fill => {
            let currentWidth = parseFloat(fill.style.width);
            if (isNaN(currentWidth)) {
                currentWidth = Math.random() * 30; // Start with random progress
            }
            
            let newWidth = currentWidth + Math.random() * 15; // Gradual progress
            
            if (newWidth >= 100) {
                newWidth = Math.random() * 25; // Reset to simulate new request
                // Flash effect when completing
                fill.style.background = 'var(--color-success)';
                setTimeout(() => {
                    fill.style.background = 'var(--color-primary)';
                }, 500);
            }
            
            fill.style.width = `${newWidth}%`;
            
            const progressText = fill.parentElement.querySelector('.progress-text');
            if (progressText) {
                progressText.textContent = `${Math.round(newWidth)}%`;
            }
        });
    }

    updateMetrics() {
        // Update various numerical metrics with simulated variations
        const statValues = document.querySelectorAll('.stat-value');
        statValues.forEach(element => {
            const text = element.textContent;
            if (text.includes('145')) {
                const newValue = 145 + Math.floor(Math.random() * 20 - 10);
                element.textContent = newValue.toString();
            }
            if (text.includes('12')) {
                const newValue = 12 + Math.floor(Math.random() * 3 - 1);
                element.textContent = Math.max(10, newValue).toString();
            }
        });
    }

    updateTraceSteps() {
        const steps = document.querySelectorAll('.trace-step');
        const currentStep = document.querySelector('.trace-step.current');
        
        if (currentStep && Math.random() > 0.6) { // 40% chance to progress
            const nextStep = currentStep.nextElementSibling;
            if (nextStep && nextStep.classList.contains('trace-step')) {
                currentStep.classList.remove('current');
                currentStep.classList.add('active');
                nextStep.classList.remove('pending');
                nextStep.classList.add('current');
            } else {
                // Reset to first step with new content
                this.resetTraceSteps();
            }
        }
    }

    resetTraceSteps() {
        const steps = document.querySelectorAll('.trace-step');
        const requests = [
            'Explain machine learning concepts',
            'Analyze system performance data',
            'Generate technical documentation',
            'Process natural language query'
        ];
        
        const randomRequest = requests[Math.floor(Math.random() * requests.length)];
        
        steps.forEach((step, index) => {
            step.classList.remove('current', 'active', 'pending');
            if (index === 0) {
                step.classList.add('current');
                step.querySelector('.step-description').textContent = `Analyzing user request: "${randomRequest}"`;
            } else {
                step.classList.add('pending');
            }
        });
    }

    startNewTrace() {
        this.resetTraceSteps();
        this.showNotification('New request trace started', 'success');
    }

    toggleSimulation() {
        this.simulationRunning = !this.simulationRunning;
        
        if (this.simulationRunning) {
            this.showNotification('Real-time simulation resumed', 'success');
        } else {
            this.showNotification('Real-time simulation paused', 'warning');
        }
    }

    addLoadingAnimations() {
        // Add staggered loading animations
        const animatedElements = document.querySelectorAll('.component-card, .agent-card, .stat-card, .request-item');
        animatedElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 80);
        });
        
        // Animate progress bars on load
        setTimeout(() => {
            const progressElements = document.querySelectorAll('.load-fill, .progress-fill, .usage-fill');
            progressElements.forEach((bar, index) => {
                const finalWidth = bar.style.width || '50%';
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.transition = 'width 1.5s ease-out';
                    bar.style.width = finalWidth;
                }, index * 200);
            });
        }, 1500);
    }
}

// Enhanced CSS animations and styles
const enhancedStyles = document.createElement('style');
enhancedStyles.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    @keyframes modalSlideIn {
        from { transform: translate(-50%, -60%) scale(0.8); opacity: 0; }
        to { transform: translate(-50%, -50%) scale(1); opacity: 1; }
    }
    
    @keyframes modalSlideOut {
        from { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        to { transform: translate(-50%, -60%) scale(0.8); opacity: 0; }
    }
    
    .enhanced-notification {
        backdrop-filter: blur(10px);
    }
    
    .notification-header {
        background: var(--color-primary);
        color: var(--color-btn-primary-text);
        padding: var(--space-16);
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: var(--radius-lg) var(--radius-lg) 0 0;
    }
    
    .notification-header h4 {
        margin: 0;
        font-size: var(--font-size-lg);
    }
    
    .close-btn {
        background: none;
        border: none;
        color: var(--color-btn-primary-text);
        font-size: 24px;
        cursor: pointer;
        padding: 0;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: background 0.2s ease;
    }
    
    .close-btn:hover {
        background: rgba(255, 255, 255, 0.2);
    }
    
    .notification-body {
        padding: var(--space-20);
    }
    
    .notification-metrics {
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--space-8);
        margin-top: var(--space-16);
    }
    
    .metric-item {
        padding: var(--space-8);
        background: var(--color-bg-1);
        border-radius: var(--radius-sm);
        font-size: var(--font-size-sm);
        font-family: var(--font-family-mono);
    }
    
    .notification.success {
        border-left: 4px solid var(--color-success);
        background: var(--color-bg-3);
    }
    
    .notification.warning {
        border-left: 4px solid var(--color-warning);
        background: var(--color-bg-6);
    }
    
    .notification.info {
        border-left: 4px solid var(--color-primary);
        background: var(--color-bg-1);
    }
    
    .component-card {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        cursor: pointer;
    }
    
    .component-card:hover .load-fill::after {
        animation-duration: 1s;
    }
    
    .agent-card {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .trace-step {
        transition: all 0.3s ease;
    }
    
    .trace-step:hover {
        background: var(--color-bg-2);
        transform: translateX(4px);
    }
`;

document.head.appendChild(enhancedStyles);

// Initialize dashboard
document.addEventListener('DOMContentLoaded', () => {
    window.gasDashboard = new GASDashboard();
});

// Handle window resize for charts
window.addEventListener('resize', () => {
    if (window.gasDashboard && window.gasDashboard.performanceChart) {
        window.gasDashboard.performanceChart.resize();
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.altKey && e.key >= '1' && e.key <= '6') {
        const tabIndex = parseInt(e.key) - 1;
        const tabs = ['dashboard', 'ai-reasoning', 'memory', 'agents', 'security', 'analytics'];
        const tabButton = document.querySelector(`[data-tab="${tabs[tabIndex]}"]`);
        if (tabButton) {
            tabButton.click();
        }
        e.preventDefault();
    }
});