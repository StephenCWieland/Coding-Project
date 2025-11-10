// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form submission handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });

        // Here you would typically send the data to a server
        console.log('Form submitted:', formObject);
        
        // Show success message using toast notification
        showToast('Thank you for your message! We will get back to you soon.', 'success');
        this.reset();
    });
}

// Add animation to CTA button
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', function() {
        document.querySelector('#about').scrollIntoView({
            behavior: 'smooth'
        });
    });
}

// Add scroll-based animations
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.75) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
});

// Dark mode toggle functionality
const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    darkModeToggle.textContent = '☀️';
}

darkModeToggle.addEventListener('click', function() {
    body.classList.toggle('dark-mode');
    const isDarkMode = body.classList.contains('dark-mode');
    
    // Save theme preference
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    
    // Update button icon
    darkModeToggle.textContent = isDarkMode ? '☀️' : '🌙';
});

// Interactive counter functionality
const counterValue = document.getElementById('counter-value');
const incrementBtn = document.getElementById('increment-btn');
const decrementBtn = document.getElementById('decrement-btn');
const resetBtn = document.getElementById('reset-btn');

// Load counter value from localStorage or default to 0
let count = parseInt(localStorage.getItem('counter') || '0');
counterValue.textContent = count;

// Update counter display
function updateCounter() {
    counterValue.textContent = count;
    localStorage.setItem('counter', count.toString());
    
    // Add animation effect
    counterValue.style.transform = 'scale(1.2)';
    setTimeout(() => {
        counterValue.style.transform = 'scale(1)';
    }, 200);
}

// Increment button
if (incrementBtn) {
    incrementBtn.addEventListener('click', function() {
        count++;
        updateCounter();
        showToast(`Counter increased to ${count}`, 'success');
    });
}

// Decrement button
if (decrementBtn) {
    decrementBtn.addEventListener('click', function() {
        count--;
        updateCounter();
        showToast(`Counter decreased to ${count}`, 'info');
    });
}

// Reset button
if (resetBtn) {
    resetBtn.addEventListener('click', function() {
        count = 0;
        updateCounter();
        showToast('Counter reset to 0', 'info');
    });
}

// Toast notification system
function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    // Add icon based on type
    let icon = 'ℹ️';
    if (type === 'success') icon = '✅';
    if (type === 'error') icon = '❌';
    if (type === 'warning') icon = '⚠️';
    
    toast.innerHTML = `
        <span class="toast-icon">${icon}</span>
        <span class="toast-message">${message}</span>
        <button class="toast-close" aria-label="Close">×</button>
    `;
    
    toastContainer.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // Auto remove after 5 seconds
    const autoRemove = setTimeout(() => {
        removeToast(toast);
    }, 5000);
    
    // Close button functionality
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
        clearTimeout(autoRemove);
        removeToast(toast);
    });
    
    // Click to dismiss
    toast.addEventListener('click', () => {
        clearTimeout(autoRemove);
        removeToast(toast);
    });
}

function removeToast(toast) {
    toast.classList.remove('show');
    toast.classList.add('hide');
    setTimeout(() => {
        if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    }, 300);
}

// Scroll to top button functionality
const scrollToTopBtn = document.getElementById('scroll-to-top');

// Show/hide button based on scroll position
window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});

// Scroll to top when button is clicked
if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Animated stats counter
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateStat = () => {
            current += increment;
            if (current < target) {
                stat.textContent = Math.floor(current);
                requestAnimationFrame(updateStat);
            } else {
                stat.textContent = target;
            }
        };
        
        // Start animation when element is visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateStat();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(stat);
    });
}

// Initialize stats animation when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', animateStats);
} else {
    animateStats();
}

// Dashboard functionality
class Dashboard {
    constructor() {
        this.metrics = {
            totalViews: parseInt(localStorage.getItem('dashboard-views') || '0'),
            activeUsers: parseInt(localStorage.getItem('dashboard-users') || '0'),
            sessions: parseInt(localStorage.getItem('dashboard-sessions') || '0')
        };
        this.activities = JSON.parse(localStorage.getItem('dashboard-activities') || '[]');
        this.init();
    }

    init() {
        this.updateMetrics();
        this.setupEventListeners();
        this.renderActivityList();
        this.initChart();
        this.trackPageView();
    }

    trackPageView() {
        this.metrics.totalViews++;
        this.metrics.sessions++;
        this.saveMetrics();
        this.updateMetrics();
        this.addActivity('Page viewed', 'info');
    }

    updateMetrics() {
        const totalViewsEl = document.getElementById('total-views');
        const activeUsersEl = document.getElementById('active-users');
        const sessionsEl = document.getElementById('sessions');

        if (totalViewsEl) {
            this.animateValue(totalViewsEl, parseInt(totalViewsEl.textContent) || 0, this.metrics.totalViews, 1000);
        }
        if (activeUsersEl) {
            this.animateValue(activeUsersEl, parseInt(activeUsersEl.textContent) || 0, this.metrics.activeUsers, 1000);
        }
        if (sessionsEl) {
            this.animateValue(sessionsEl, parseInt(sessionsEl.textContent) || 0, this.metrics.sessions, 1000);
        }
    }

    animateValue(element, start, end, duration) {
        const range = end - start;
        const increment = range / (duration / 16);
        let current = start;

        const update = () => {
            current += increment;
            if ((increment > 0 && current < end) || (increment < 0 && current > end)) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(update);
            } else {
                element.textContent = end;
            }
        };

        update();
    }

    setupEventListeners() {
        const refreshBtn = document.getElementById('refresh-data');
        const exportBtn = document.getElementById('export-data');
        const resetBtn = document.getElementById('reset-dashboard');

        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => this.refreshData());
        }

        if (exportBtn) {
            exportBtn.addEventListener('click', () => this.exportData());
        }

        if (resetBtn) {
            resetBtn.addEventListener('click', () => this.resetDashboard());
        }
    }

    refreshData() {
        this.metrics.activeUsers = Math.floor(Math.random() * 100) + 50;
        this.saveMetrics();
        this.updateMetrics();
        this.addActivity('Data refreshed', 'success');
        showToast('Dashboard data refreshed successfully', 'success');
    }

    exportData() {
        const data = {
            metrics: this.metrics,
            activities: this.activities,
            exportDate: new Date().toISOString()
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `dashboard-export-${Date.now()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.addActivity('Data exported', 'success');
        showToast('Dashboard data exported successfully', 'success');
    }

    resetDashboard() {
        if (confirm('Are you sure you want to reset all dashboard data?')) {
            this.metrics = { totalViews: 0, activeUsers: 0, sessions: 0 };
            this.activities = [];
            this.saveMetrics();
            localStorage.removeItem('dashboard-activities');
            this.updateMetrics();
            this.renderActivityList();
            this.initChart();
            this.addActivity('Dashboard reset', 'warning');
            showToast('Dashboard has been reset', 'info');
        }
    }

    addActivity(message, type = 'info') {
        const activity = {
            message,
            type,
            timestamp: new Date().toLocaleTimeString()
        };
        this.activities.unshift(activity);
        if (this.activities.length > 10) {
            this.activities = this.activities.slice(0, 10);
        }
        localStorage.setItem('dashboard-activities', JSON.stringify(this.activities));
        this.renderActivityList();
    }

    renderActivityList() {
        const activityList = document.getElementById('activity-list');
        if (!activityList) return;

        if (this.activities.length === 0) {
            activityList.innerHTML = '<li>No recent activity</li>';
            return;
        }

        activityList.innerHTML = this.activities.map(activity => {
            const icon = activity.type === 'success' ? '✅' : activity.type === 'warning' ? '⚠️' : 'ℹ️';
            return `<li><span class="activity-icon">${icon}</span> <span class="activity-message">${activity.message}</span> <span class="activity-time">${activity.timestamp}</span></li>`;
        }).join('');
    }

    initChart() {
        const canvas = document.getElementById('performance-chart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        canvas.width = canvas.offsetWidth;
        canvas.height = 200;

        // Generate sample data
        const data = Array.from({ length: 7 }, () => Math.floor(Math.random() * 100) + 20);
        const maxValue = Math.max(...data);
        const barWidth = canvas.width / data.length;
        const barSpacing = 10;

        // Draw chart
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        data.forEach((value, index) => {
            const barHeight = (value / maxValue) * (canvas.height - 40);
            const x = index * barWidth + barSpacing;
            const y = canvas.height - barHeight - 20;

            // Draw bar
            ctx.fillStyle = '#3498db';
            ctx.fillRect(x, y, barWidth - barSpacing * 2, barHeight);

            // Draw value label
            ctx.fillStyle = '#2c3e50';
            ctx.font = '10px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(value, x + (barWidth - barSpacing * 2) / 2, y - 5);
        });
    }

    saveMetrics() {
        localStorage.setItem('dashboard-views', this.metrics.totalViews.toString());
        localStorage.setItem('dashboard-users', this.metrics.activeUsers.toString());
        localStorage.setItem('dashboard-sessions', this.metrics.sessions.toString());
    }
}

// Initialize dashboard when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new Dashboard();
    });
} else {
    new Dashboard();
} 