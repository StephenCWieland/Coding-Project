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

// Search functionality
class SearchFeature {
    constructor() {
        this.searchInput = document.getElementById('search-input');
        this.searchBtn = document.getElementById('search-btn');
        this.searchResults = document.getElementById('search-results');
        this.searchableContent = this.getSearchableContent();
        this.init();
    }

    init() {
        if (this.searchInput && this.searchBtn) {
            this.searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
            this.searchBtn.addEventListener('click', () => this.handleSearch(this.searchInput.value));
            this.searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.handleSearch(this.searchInput.value);
                }
            });

            // Close results when clicking outside
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.search-container')) {
                    this.hideResults();
                }
            });
        }
    }

    getSearchableContent() {
        const sections = document.querySelectorAll('section');
        const content = [];

        sections.forEach(section => {
            const id = section.id;
            const heading = section.querySelector('h1, h2, h3');
            const text = section.textContent.trim();
            const headingText = heading ? heading.textContent : '';

            content.push({
                id,
                heading: headingText,
                text: text.substring(0, 200), // Limit text length
                element: section
            });
        });

        return content;
    }

    handleSearch(query) {
        if (!query || query.trim().length < 2) {
            this.hideResults();
            return;
        }

        const results = this.searchContent(query.toLowerCase());
        this.displayResults(results, query);
    }

    searchContent(query) {
        return this.searchableContent
            .filter(item => {
                return item.heading.toLowerCase().includes(query) ||
                       item.text.toLowerCase().includes(query);
            })
            .slice(0, 5); // Limit to 5 results
    }

    displayResults(results, query) {
        if (!this.searchResults) return;

        if (results.length === 0) {
            this.searchResults.innerHTML = '<div class="search-result-item no-results">No results found</div>';
            this.searchResults.classList.add('show');
            return;
        }

        this.searchResults.innerHTML = results.map(result => {
            const highlightedHeading = this.highlightText(result.heading, query);
            return `
                <div class="search-result-item" data-section="${result.id}">
                    <div class="result-heading">${highlightedHeading}</div>
                    <div class="result-preview">${this.getPreview(result.text, query)}</div>
                </div>
            `;
        }).join('');

        // Add click handlers
        this.searchResults.querySelectorAll('.search-result-item').forEach(item => {
            item.addEventListener('click', () => {
                const sectionId = item.getAttribute('data-section');
                if (sectionId) {
                    this.navigateToSection(sectionId);
                }
            });
        });

        this.searchResults.classList.add('show');
    }

    highlightText(text, query) {
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }

    getPreview(text, query) {
        const index = text.toLowerCase().indexOf(query);
        if (index === -1) return text.substring(0, 60) + '...';
        
        const start = Math.max(0, index - 20);
        const end = Math.min(text.length, index + query.length + 40);
        let preview = text.substring(start, end);
        
        if (start > 0) preview = '...' + preview;
        if (end < text.length) preview = preview + '...';
        
        return this.highlightText(preview, query);
    }

    navigateToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
            this.hideResults();
            this.searchInput.value = '';
            showToast(`Navigated to ${sectionId} section`, 'success');
        }
    }

    hideResults() {
        if (this.searchResults) {
            this.searchResults.classList.remove('show');
        }
    }
}

// Initialize search feature
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new SearchFeature();
    });
} else {
    new SearchFeature();
}

// Notifications Center functionality
class NotificationsCenter {
    constructor() {
        this.notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
        this.notificationsBtn = document.getElementById('notifications-btn');
        this.notificationsDropdown = document.getElementById('notifications-dropdown');
        this.notificationsList = document.getElementById('notifications-list');
        this.notificationBadge = document.getElementById('notification-badge');
        this.markAllReadBtn = document.getElementById('mark-all-read');
        this.init();
    }

    init() {
        this.updateBadge();
        this.renderNotifications();
        this.setupEventListeners();
        this.generateSampleNotifications();
    }

    setupEventListeners() {
        if (this.notificationsBtn) {
            this.notificationsBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleDropdown();
            });
        }

        if (this.markAllReadBtn) {
            this.markAllReadBtn.addEventListener('click', () => {
                this.markAllAsRead();
            });
        }

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.notifications-container')) {
                this.closeDropdown();
            }
        });
    }

    toggleDropdown() {
        if (this.notificationsDropdown) {
            this.notificationsDropdown.classList.toggle('show');
        }
    }

    closeDropdown() {
        if (this.notificationsDropdown) {
            this.notificationsDropdown.classList.remove('show');
        }
    }

    generateSampleNotifications() {
        // Generate some sample notifications if none exist
        if (this.notifications.length === 0) {
            const samples = [
                { id: 1, type: 'info', message: 'Welcome to the website!', timestamp: new Date().toISOString(), read: false },
                { id: 2, type: 'success', message: 'Your profile has been updated', timestamp: new Date(Date.now() - 3600000).toISOString(), read: false },
                { id: 3, type: 'warning', message: 'Please complete your profile setup', timestamp: new Date(Date.now() - 7200000).toISOString(), read: false }
            ];
            this.notifications = samples;
            this.saveNotifications();
            this.updateBadge();
            this.renderNotifications();
        }
    }

    addNotification(type, message) {
        const notification = {
            id: Date.now(),
            type,
            message,
            timestamp: new Date().toISOString(),
            read: false
        };
        this.notifications.unshift(notification);
        if (this.notifications.length > 20) {
            this.notifications = this.notifications.slice(0, 20);
        }
        this.saveNotifications();
        this.updateBadge();
        this.renderNotifications();
        this.showNotificationToast(notification);
    }

    markAsRead(id) {
        const notification = this.notifications.find(n => n.id === id);
        if (notification && !notification.read) {
            notification.read = true;
            this.saveNotifications();
            this.updateBadge();
            this.renderNotifications();
        }
    }

    markAllAsRead() {
        this.notifications.forEach(n => n.read = true);
        this.saveNotifications();
        this.updateBadge();
        this.renderNotifications();
        showToast('All notifications marked as read', 'success');
    }

    deleteNotification(id) {
        this.notifications = this.notifications.filter(n => n.id !== id);
        this.saveNotifications();
        this.updateBadge();
        this.renderNotifications();
    }

    updateBadge() {
        const unreadCount = this.notifications.filter(n => !n.read).length;
        if (this.notificationBadge) {
            this.notificationBadge.textContent = unreadCount;
            this.notificationBadge.style.display = unreadCount > 0 ? 'block' : 'none';
        }
    }

    renderNotifications() {
        if (!this.notificationsList) return;

        if (this.notifications.length === 0) {
            this.notificationsList.innerHTML = '<div class="no-notifications">No notifications</div>';
            return;
        }

        this.notificationsList.innerHTML = this.notifications.map(notification => {
            const timeAgo = this.getTimeAgo(new Date(notification.timestamp));
            const icon = notification.type === 'success' ? '✅' : 
                        notification.type === 'warning' ? '⚠️' : 
                        notification.type === 'error' ? '❌' : 'ℹ️';
            const readClass = notification.read ? 'read' : '';
            
            return `
                <div class="notification-item ${readClass}" data-id="${notification.id}">
                    <div class="notification-icon">${icon}</div>
                    <div class="notification-content">
                        <div class="notification-message">${notification.message}</div>
                        <div class="notification-time">${timeAgo}</div>
                    </div>
                    <button class="notification-delete" data-id="${notification.id}" aria-label="Delete notification">×</button>
                </div>
            `;
        }).join('');

        // Add event listeners
        this.notificationsList.querySelectorAll('.notification-item').forEach(item => {
            item.addEventListener('click', (e) => {
                if (!e.target.classList.contains('notification-delete')) {
                    const id = parseInt(item.getAttribute('data-id'));
                    this.markAsRead(id);
                }
            });
        });

        this.notificationsList.querySelectorAll('.notification-delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = parseInt(btn.getAttribute('data-id'));
                this.deleteNotification(id);
            });
        });
    }

    getTimeAgo(date) {
        const now = new Date();
        const diff = now - date;
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (minutes < 1) return 'Just now';
        if (minutes < 60) return `${minutes}m ago`;
        if (hours < 24) return `${hours}h ago`;
        return `${days}d ago`;
    }

    showNotificationToast(notification) {
        showToast(notification.message, notification.type);
    }

    saveNotifications() {
        localStorage.setItem('notifications', JSON.stringify(this.notifications));
    }
}

// Initialize notifications center
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new NotificationsCenter();
    });
} else {
    new NotificationsCenter();
} 