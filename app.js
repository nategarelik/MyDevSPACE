// Application Data
const appData = {
  projects: [
    {
      id: "proj-001",
      name: "AI Lighter Project",
      type: "IoT/Embedded",
      status: "Active",
      progress: 75,
      lastModified: "2 hours ago",
      description: "Raspberry Pi 5 AI-integrated lighter with servo control"
    },
    {
      id: "proj-002",
      name: "Web Dashboard",
      type: "Web Application",
      status: "In Development",
      progress: 45,
      lastModified: "5 hours ago",
      description: "React-based analytics dashboard"
    },
    {
      id: "proj-003",
      name: "Mobile CRM",
      type: "Mobile App",
      status: "Planning",
      progress: 15,
      lastModified: "1 day ago",
      description: "AI-powered customer relationship management app"
    }
  ],
  agents: [
    {
      id: "agent-001",
      name: "Code Reviewer",
      status: "Active",
      tasks: 3,
      efficiency: 92
    },
    {
      id: "agent-002",
      name: "File Organizer",
      status: "Active",
      tasks: 1,
      efficiency: 88
    },
    {
      id: "agent-003",
      name: "Backup Manager",
      status: "Idle",
      tasks: 0,
      efficiency: 95
    }
  ],
  storage: [
    {
      name: "Notion Database",
      status: "Connected",
      usage: 65,
      lastSync: "5 minutes ago"
    },
    {
      name: "GitHub Repos",
      status: "Connected",
      usage: 82,
      lastSync: "10 minutes ago"
    },
    {
      name: "Cloud Storage",
      status: "Connected",
      usage: 43,
      lastSync: "15 minutes ago"
    }
  ],
  systemMetrics: {
    cpu: 45,
    memory: 62,
    storage: 78,
    networkActivity: 23
  }
};

// Global variables
let sidebarNavItems, contentSections, projectModal, modalClose, modalOverlay, projectCards, quickActionBtns;
let resourceChart;
let currentSection = 'dashboard';

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
  console.log('Initializing Ultimate AI IDE Dashboard...');
  
  // Get DOM elements
  sidebarNavItems = document.querySelectorAll('.sidebar-nav-item');
  contentSections = document.querySelectorAll('.content-section');
  projectModal = document.getElementById('project-modal');
  modalClose = document.querySelector('.modal-close');
  modalOverlay = document.querySelector('.modal-overlay');
  projectCards = document.querySelectorAll('.project-card');
  quickActionBtns = document.querySelectorAll('.quick-action-btn');

  console.log('Found elements:', {
    navItems: sidebarNavItems.length,
    sections: contentSections.length,
    projectCards: projectCards.length,
    quickActionBtns: quickActionBtns.length,
    modal: !!projectModal
  });

  // Initialize all components
  initNavigation();
  initChart();
  initModal();
  initQuickActions();
  initProjectCards();
  initSearch();
  initFilters();
  updateSystemStats();
  initTooltips();
  
  // Set initial view
  switchSection('dashboard');
  
  console.log('Ultimate AI IDE Dashboard initialized successfully');
});

// Navigation System
function initNavigation() {
  console.log('Initializing navigation...');
  
  if (!sidebarNavItems || sidebarNavItems.length === 0) {
    console.error('No navigation items found');
    return;
  }
  
  sidebarNavItems.forEach((item, index) => {
    const sectionName = item.getAttribute('data-section');
    console.log(`Setting up nav item ${index}: ${sectionName}`);
    
    // Remove any existing event listeners
    item.replaceWith(item.cloneNode(true));
    
    // Get the fresh element
    const freshItem = document.querySelectorAll('.sidebar-nav-item')[index];
    
    freshItem.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      const targetSection = this.getAttribute('data-section');
      console.log('Navigation clicked:', targetSection);
      
      if (targetSection && targetSection !== currentSection) {
        switchSection(targetSection);
      }
    });
  });
  
  // Update references after replacing elements
  sidebarNavItems = document.querySelectorAll('.sidebar-nav-item');
  console.log('Navigation initialized with', sidebarNavItems.length, 'items');
}

function switchSection(sectionName) {
  console.log(`Switching from ${currentSection} to ${sectionName}`);
  
  if (!sectionName) {
    console.error('No section name provided');
    return;
  }
  
  // Update current section
  currentSection = sectionName;
  
  // Update active nav item
  sidebarNavItems.forEach(item => {
    item.classList.remove('sidebar-nav-item--active');
    const itemSection = item.getAttribute('data-section');
    if (itemSection === sectionName) {
      item.classList.add('sidebar-nav-item--active');
      console.log('Active nav item set for:', sectionName);
    }
  });
  
  // Update active content section
  contentSections.forEach(section => {
    section.classList.remove('content-section--active');
    section.style.display = 'none';
  });
  
  const targetSection = document.getElementById(`${sectionName}-section`);
  if (targetSection) {
    targetSection.classList.add('content-section--active');
    targetSection.style.display = 'block';
    console.log('Section displayed:', sectionName);
    
    // Reinitialize chart if switching to dashboard
    if (sectionName === 'dashboard' && resourceChart) {
      setTimeout(() => {
        resourceChart.resize();
        resourceChart.update();
      }, 100);
    }
  } else {
    console.error('Target section not found:', `${sectionName}-section`);
  }
}

// Chart Initialization
function initChart() {
  console.log('Initializing chart...');
  
  const ctx = document.getElementById('resourceChart');
  if (!ctx) {
    console.error('Chart canvas not found');
    return;
  }
  
  const chartData = {
    labels: ['CPU', 'Memory', 'Storage', 'Network'],
    datasets: [{
      label: 'Usage %',
      data: [
        appData.systemMetrics.cpu,
        appData.systemMetrics.memory,
        appData.systemMetrics.storage,
        appData.systemMetrics.networkActivity
      ],
      backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5'],
      borderColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5'],
      borderWidth: 2,
      tension: 0.4,
      fill: true,
      fillColor: 'rgba(31, 184, 205, 0.1)'
    }]
  };
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
          callback: function(value) {
            return value + '%';
          }
        }
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)'
        }
      }
    }
  };
  
  try {
    resourceChart = new Chart(ctx, {
      type: 'line',
      data: chartData,
      options: chartOptions
    });
    
    console.log('Resource chart initialized successfully');
    
    // Update chart periodically
    setInterval(updateChart, 5000);
  } catch (error) {
    console.error('Error initializing chart:', error);
  }
}

function updateChart() {
  if (!resourceChart) return;
  
  try {
    // Simulate data changes
    const newData = [
      Math.max(0, Math.min(100, appData.systemMetrics.cpu + (Math.random() - 0.5) * 10)),
      Math.max(0, Math.min(100, appData.systemMetrics.memory + (Math.random() - 0.5) * 8)),
      Math.max(0, Math.min(100, appData.systemMetrics.storage + (Math.random() - 0.5) * 5)),
      Math.max(0, Math.min(100, appData.systemMetrics.networkActivity + (Math.random() - 0.5) * 15))
    ];
    
    resourceChart.data.datasets[0].data = newData;
    resourceChart.update('none');
    
    // Update header stats
    updateHeaderStats(newData);
  } catch (error) {
    console.error('Error updating chart:', error);
  }
}

function updateHeaderStats(data) {
  const headerStats = document.querySelectorAll('.header-stat-value');
  if (headerStats.length >= 2) {
    headerStats[0].textContent = Math.round(data[0]) + '%';
    headerStats[1].textContent = Math.round(data[1]) + '%';
  }
}

// Modal Functionality
function initModal() {
  console.log('Initializing modal...');
  
  if (!projectModal) {
    console.error('Project modal not found');
    return;
  }
  
  // Remove existing event listeners and add fresh ones
  if (modalClose) {
    modalClose.replaceWith(modalClose.cloneNode(true));
    document.querySelector('.modal-close').addEventListener('click', closeModal);
  }
  
  if (modalOverlay) {
    modalOverlay.replaceWith(modalOverlay.cloneNode(true));
    document.querySelector('.modal-overlay').addEventListener('click', closeModal);
  }
  
  // Handle modal footer buttons with event delegation
  projectModal.addEventListener('click', function(e) {
    if (e.target.matches('.modal-footer .btn--outline') || 
        e.target.closest('.modal-footer .btn--outline')) {
      console.log('Modal footer close button clicked');
      closeModal();
    }
    
    if (e.target.matches('.modal-footer .btn--primary') || 
        e.target.closest('.modal-footer .btn--primary')) {
      console.log('Modal IDE button clicked');
      const projectTitle = document.getElementById('modal-project-title').textContent;
      showNotification(`🚀 Opening ${projectTitle} in Ultimate AI IDE...`, 'info');
      setTimeout(() => {
        showNotification(`💻 ${projectTitle} workspace is ready!`, 'success');
        closeModal();
      }, 2000);
    }
  });
  
  // Close modal on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && projectModal && !projectModal.classList.contains('hidden')) {
      closeModal();
    }
  });
  
  console.log('Modal initialized successfully');
}

function openModal(projectId) {
  console.log('Opening modal for project:', projectId);
  
  const project = appData.projects.find(p => p.id === projectId);
  if (!project) {
    console.error('Project not found:', projectId);
    showNotification('❌ Project not found', 'error');
    return;
  }
  
  const modalTitle = document.getElementById('modal-project-title');
  const modalContent = document.getElementById('modal-project-content');
  
  if (!modalTitle || !modalContent) {
    console.error('Modal content elements not found');
    return;
  }
  
  modalTitle.textContent = project.name;
  modalContent.innerHTML = `
    <div class="project-detail">
      <div class="project-detail-section">
        <h4>Project Information</h4>
        <div class="project-detail-grid">
          <div class="project-detail-item">
            <span class="project-detail-label">Type:</span>
            <span class="project-detail-value">${project.type}</span>
          </div>
          <div class="project-detail-item">
            <span class="project-detail-label">Status:</span>
            <span class="project-detail-value status status--${getStatusClass(project.status)}">${project.status}</span>
          </div>
          <div class="project-detail-item">
            <span class="project-detail-label">Progress:</span>
            <span class="project-detail-value">${project.progress}%</span>
          </div>
          <div class="project-detail-item">
            <span class="project-detail-label">Last Modified:</span>
            <span class="project-detail-value">${project.lastModified}</span>
          </div>
        </div>
      </div>
      <div class="project-detail-section">
        <h4>Description</h4>
        <p>${project.description}</p>
      </div>
      <div class="project-detail-section">
        <h4>Recent Activity</h4>
        <div class="activity-list">
          <div class="activity-item">
            <span class="activity-text">🔍 Code analysis completed</span>
            <span class="activity-time">2 minutes ago</span>
          </div>
          <div class="activity-item">
            <span class="activity-text">☁️ Files synchronized to cloud</span>
            <span class="activity-time">1 hour ago</span>
          </div>
          <div class="activity-item">
            <span class="activity-text">✅ Build completed successfully</span>
            <span class="activity-time">3 hours ago</span>
          </div>
          <div class="activity-item">
            <span class="activity-text">🤖 AI agent review completed</span>
            <span class="activity-time">5 hours ago</span>
          </div>
        </div>
      </div>
    </div>
  `;
  
  projectModal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  console.log('Modal opened for:', project.name);
}

function closeModal() {
  if (projectModal) {
    projectModal.classList.add('hidden');
    document.body.style.overflow = '';
    console.log('Modal closed');
  }
}

function getStatusClass(status) {
  switch (status.toLowerCase()) {
    case 'active': return 'success';
    case 'in development': return 'warning';
    case 'planning': return 'info';
    default: return 'info';
  }
}

// Project Cards
function initProjectCards() {
  console.log('Initializing project cards...');
  
  if (!projectCards || projectCards.length === 0) {
    console.error('No project cards found');
    return;
  }
  
  projectCards.forEach((card, index) => {
    const projectId = card.getAttribute('data-project');
    console.log(`Setting up project card ${index}: ${projectId}`);
    
    // Remove existing event listeners by replacing the element
    card.replaceWith(card.cloneNode(true));
  });
  
  // Get fresh references and set up event listeners
  projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach((card) => {
    const projectId = card.getAttribute('data-project');
    
    // Main card click handler
    card.addEventListener('click', function(e) {
      // Don't open modal if clicking on action buttons
      if (e.target.closest('.btn-icon')) {
        return;
      }
      
      console.log('Project card clicked:', projectId);
      if (projectId) {
        openModal(projectId);
      }
    });
    
    // Action button handlers
    const actionBtns = card.querySelectorAll('.btn-icon');
    actionBtns.forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        const project = appData.projects.find(p => p.id === projectId);
        const projectName = project ? project.name : 'project';
        console.log('IDE button clicked for:', projectName);
        showNotification(`🔧 Opening ${projectName} in Ultimate AI IDE...`, 'info');
        setTimeout(() => {
          showNotification(`💻 ${projectName} IDE workspace loaded successfully!`, 'success');
        }, 1500);
      });
    });
  });
  
  console.log('Project cards initialized:', projectCards.length);
}

// Quick Actions
function initQuickActions() {
  console.log('Initializing quick actions...');
  
  if (!quickActionBtns || quickActionBtns.length === 0) {
    console.error('No quick action buttons found');
    return;
  }
  
  quickActionBtns.forEach((btn, index) => {
    const action = btn.getAttribute('data-action');
    console.log(`Setting up quick action ${index}: ${action}`);
    
    // Remove existing listeners
    btn.replaceWith(btn.cloneNode(true));
  });
  
  // Get fresh references
  quickActionBtns = document.querySelectorAll('.quick-action-btn');
  
  quickActionBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      const action = this.getAttribute('data-action');
      console.log('Quick action triggered:', action);
      handleQuickAction(action);
    });
  });
  
  // Other action buttons
  document.addEventListener('click', function(e) {
    const btn = e.target.closest('.btn--primary, .btn--secondary, .btn--outline');
    if (btn && !btn.closest('.modal-footer') && !btn.classList.contains('quick-action-btn')) {
      const text = btn.textContent.trim();
      console.log('Action button clicked:', text);
      handleButtonAction(text);
    }
  });
  
  console.log('Quick actions initialized:', quickActionBtns.length);
}

function handleQuickAction(action) {
  switch (action) {
    case 'new-project':
      showNotification('🚀 Initializing new project workspace...', 'info');
      setTimeout(() => {
        showNotification('✅ Project template created! Select your stack and start coding.', 'success');
      }, 2000);
      break;
    case 'run-agent':
      showNotification('🤖 Deploying AI agent to your development environment...', 'info');
      setTimeout(() => {
        showNotification('⚡ AI agent is now active and ready to assist with your code!', 'success');
      }, 1500);
      break;
    case 'sync-storage':
      showNotification('☁️ Syncing all connected storage locations...', 'info');
      setTimeout(() => {
        showNotification('✅ All files synchronized across Notion, GitHub, and Cloud Storage!', 'success');
      }, 3000);
      break;
  }
}

function handleButtonAction(buttonText) {
  const actions = {
    'New Project': () => {
      showNotification('🚀 Opening project creation wizard...', 'info');
      setTimeout(() => showNotification('📝 Choose from React, Vue, Python, or custom templates!', 'info'), 1000);
    },
    'Run Agent': () => {
      showNotification('🤖 Initializing AI agent deployment sequence...', 'info');
      setTimeout(() => showNotification('⚡ Agent ready! Type commands to get started.', 'success'), 1500);
    },
    'Sync Storage': () => {
      showNotification('☁️ Starting comprehensive storage synchronization...', 'info');
      setTimeout(() => showNotification('✅ All storage locations updated and backed up!', 'success'), 2500);
    },
    'Deploy Agent': () => {
      showNotification('🚀 Agent deployment pipeline initiated...', 'info');
      setTimeout(() => showNotification('✅ Agent deployed successfully and monitoring your workspace!', 'success'), 2000);
    },
    'Marketplace': () => {
      showNotification('🛒 Loading AI agent marketplace...', 'info');
      setTimeout(() => showNotification('🤖 Browse 200+ specialized AI agents for development!', 'info'), 1000);
    },
    'Add Storage': () => {
      showNotification('➕ Opening storage configuration wizard...', 'info');
      setTimeout(() => showNotification('🔗 Connect Dropbox, Google Drive, AWS S3, and more!', 'info'), 1000);
    },
    'Sync All': () => {
      showNotification('🔄 Initiating full sync across all storage providers...', 'info');
      setTimeout(() => showNotification('✅ Complete synchronization finished! All files are up to date.', 'success'), 3000);
    },
    'Browse Marketplace': () => {
      showNotification('🛒 Opening Ultimate AI IDE extension marketplace...', 'info');
      setTimeout(() => showNotification('🧩 Discover themes, plugins, and productivity tools!', 'info'), 1000);
    },
    'Browse Extensions': () => {
      showNotification('🔍 Loading available extensions and plugins...', 'info');
      setTimeout(() => showNotification('⚡ Enhance your IDE with powerful extensions!', 'info'), 1000);
    },
    'Open Settings': () => {
      showNotification('⚙️ Loading system configuration panel...', 'info');
      setTimeout(() => showNotification('🎛️ Customize your AI IDE experience and preferences!', 'info'), 1000);
    },
    'Sync Now': () => {
      showNotification('🔄 Initiating immediate synchronization...', 'info');
      setTimeout(() => showNotification('✅ Sync completed! All changes saved to cloud.', 'success'), 1500);
    },
    'Configure': () => {
      showNotification('🔧 Opening advanced configuration panel...', 'info');
      setTimeout(() => showNotification('⚙️ Customize settings for optimal performance!', 'info'), 1000);
    },
    'Pause': () => {
      showNotification('⏸️ Agent paused successfully - click Activate to resume', 'warning');
    },
    'Activate': () => {
      showNotification('▶️ Agent activated and ready for work!', 'success');
    }
  };
  
  const action = actions[buttonText];
  if (action) {
    action();
  } else if (buttonText !== 'Close') {
    showNotification(`🔧 ${buttonText} feature launching soon!`, 'info');
  }
}

// Enhanced Notification System
function showNotification(message, type = 'info', duration = 4000) {
  console.log('Showing notification:', message, type);
  
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll('.notification');
  existingNotifications.forEach(notif => notif.remove());
  
  const notification = document.createElement('div');
  notification.className = `notification notification--${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <span class="notification-message">${message}</span>
      <button class="notification-close" type="button">&times;</button>
    </div>
  `;
  
  // Add notification styles
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1100;
    background-color: var(--color-surface);
    border: 1px solid var(--color-border);
    border-left: 4px solid ${getNotificationColor(type)};
    border-radius: var(--radius-base);
    box-shadow: var(--shadow-lg);
    padding: var(--space-16);
    min-width: 320px;
    max-width: 450px;
    animation: slideInRight 0.3s ease-out;
  `;
  
  const closeBtn = notification.querySelector('.notification-close');
  closeBtn.addEventListener('click', () => {
    notification.style.animation = 'slideOutRight 0.3s ease-in forwards';
    setTimeout(() => notification.remove(), 300);
  });
  
  document.body.appendChild(notification);
  
  // Auto-remove notification
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.animation = 'slideOutRight 0.3s ease-in forwards';
      setTimeout(() => notification.remove(), 300);
    }
  }, duration);
}

function getNotificationColor(type) {
  switch (type) {
    case 'success': return 'var(--color-success)';
    case 'warning': return 'var(--color-warning)';
    case 'error': return 'var(--color-error)';
    default: return 'var(--color-primary)';
  }
}

// Search and Filter functionality
function initSearch() {
  const searchInputs = document.querySelectorAll('input[placeholder*="Search"]');
  searchInputs.forEach(input => {
    input.addEventListener('input', function() {
      const searchTerm = this.value.toLowerCase();
      const cards = document.querySelectorAll('.project-card');
      
      cards.forEach(card => {
        const title = card.querySelector('.project-title')?.textContent.toLowerCase() || '';
        const description = card.querySelector('.project-description')?.textContent.toLowerCase() || '';
        const type = card.querySelector('.project-type')?.textContent.toLowerCase() || '';
        
        const isMatch = title.includes(searchTerm) || 
                       description.includes(searchTerm) || 
                       type.includes(searchTerm);
        
        card.style.display = isMatch ? 'block' : 'none';
      });
    });
  });
}

function initFilters() {
  const filterSelects = document.querySelectorAll('select');
  filterSelects.forEach(select => {
    select.addEventListener('change', function() {
      const filterValue = this.value;
      const cards = document.querySelectorAll('.project-card');
      
      cards.forEach(card => {
        if (filterValue === 'All Types') {
          card.style.display = 'block';
        } else {
          const cardType = card.querySelector('.project-type')?.textContent;
          card.style.display = cardType === filterValue ? 'block' : 'none';
        }
      });
    });
  });
}

// System Stats Update
function updateSystemStats() {
  setInterval(() => {
    // Update activity feed timestamps
    const activityTimes = document.querySelectorAll('.activity-time');
    activityTimes.forEach(time => {
      const currentText = time.textContent;
      if (currentText.includes('minutes ago')) {
        const minutes = parseInt(currentText);
        if (!isNaN(minutes) && minutes < 59) {
          time.textContent = `${minutes + 1} minutes ago`;
        }
      }
    });
    
    // Update storage sync times
    const storageSyncs = document.querySelectorAll('.storage-sync');
    storageSyncs.forEach(sync => {
      const currentText = sync.textContent;
      if (currentText.includes('minutes ago')) {
        const minutes = parseInt(currentText.match(/\d+/)[0]);
        if (!isNaN(minutes) && minutes < 59) {
          sync.textContent = `Last sync: ${minutes + 1} minutes ago`;
        }
      }
    });
  }, 60000);
}

// Initialize tooltips
function initTooltips() {
  const tooltipElements = document.querySelectorAll('[title]');
  tooltipElements.forEach(element => {
    element.addEventListener('mouseenter', showTooltip);
    element.addEventListener('mouseleave', hideTooltip);
  });
}

function showTooltip(e) {
  const text = e.target.getAttribute('title');
  if (!text) return;
  
  e.target.setAttribute('data-tooltip', text);
  e.target.removeAttribute('title');
  
  const tooltip = document.createElement('div');
  tooltip.className = 'custom-tooltip';
  tooltip.textContent = text;
  tooltip.style.cssText = `
    position: absolute;
    background: var(--color-charcoal-800);
    color: var(--color-gray-200);
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 12px;
    white-space: nowrap;
    z-index: 1000;
    pointer-events: none;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  `;
  
  document.body.appendChild(tooltip);
  
  const rect = e.target.getBoundingClientRect();
  const tooltipRect = tooltip.getBoundingClientRect();
  
  tooltip.style.left = rect.left + (rect.width - tooltipRect.width) / 2 + 'px';
  tooltip.style.top = rect.top - tooltipRect.height - 8 + 'px';
  
  e.target._tooltip = tooltip;
}

function hideTooltip(e) {
  if (e.target._tooltip) {
    e.target._tooltip.remove();
    delete e.target._tooltip;
  }
  
  const tooltipText = e.target.getAttribute('data-tooltip');
  if (tooltipText) {
    e.target.setAttribute('title', tooltipText);
    e.target.removeAttribute('data-tooltip');
  }
}

// Error Handling
window.addEventListener('error', function(e) {
  console.error('Application error:', e.error);
  showNotification('⚠️ An error occurred. Please refresh the page if issues persist.', 'error');
});

// Add required CSS for notifications and animations
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
  
  .notification-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-12);
  }
  
  .notification-message {
    flex: 1;
    color: var(--color-text);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    line-height: 1.4;
  }
  
  .notification-close {
    background: none;
    border: none;
    color: var(--color-text-secondary);
    font-size: var(--font-size-lg);
    cursor: pointer;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-base);
    transition: all var(--duration-fast) var(--ease-standard);
    flex-shrink: 0;
  }
  
  .notification-close:hover {
    background-color: var(--color-secondary);
    color: var(--color-text);
  }
  
  .project-detail-section {
    margin-bottom: var(--space-24);
  }
  
  .project-detail-section h4 {
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text);
    margin: 0 0 var(--space-12) 0;
  }
  
  .project-detail-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-12);
  }
  
  .project-detail-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--space-8) 0;
  }
  
  .project-detail-label {
    font-weight: var(--font-weight-medium);
    color: var(--color-text-secondary);
  }
  
  .project-detail-value {
    color: var(--color-text);
  }
  
  .activity-list {
    display: flex;
    flex-direction: column;
    gap: var(--space-8);
  }
  
  .activity-list .activity-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--space-8) 0;
    border-bottom: 1px solid var(--color-border);
  }
  
  .activity-list .activity-item:last-child {
    border-bottom: none;
  }
`;
document.head.appendChild(additionalStyles);