// HostUp Website JavaScript - Enhanced for Mobile and Desktop

document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeFAQToggles();
    initializeAnimations();
    initializeFormEnhancements();
    initializeSmoothScrolling();
    initializeFlashMessages();
    initializeTouchOptimizations();
    initializeChatWidget();
    initializeCalendarModal();
});

// Navigation functionality
function initializeNavigation() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuIcon = mobileMenuBtn?.querySelector('i');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            const isOpen = mobileMenu.classList.contains('show');
            
            if (isOpen) {
                mobileMenu.classList.remove('show');
                mobileMenuIcon.classList.remove('fa-times');
                mobileMenuIcon.classList.add('fa-bars');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            } else {
                mobileMenu.classList.add('show');
                mobileMenuIcon.classList.remove('fa-bars');
                mobileMenuIcon.classList.add('fa-times');
                mobileMenuBtn.setAttribute('aria-expanded', 'true');
            }
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                mobileMenu.classList.remove('show');
                mobileMenuIcon.classList.remove('fa-times');
                mobileMenuIcon.classList.add('fa-bars');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Close mobile menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileMenu.classList.contains('show')) {
                mobileMenu.classList.remove('show');
                mobileMenuIcon.classList.remove('fa-times');
                mobileMenuIcon.classList.add('fa-bars');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Close mobile menu when navigating to a new page
        const mobileNavLinks = mobileMenu.querySelectorAll('a');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('show');
                mobileMenuIcon.classList.remove('fa-times');
                mobileMenuIcon.classList.add('fa-bars');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }
}

// FAQ Toggle functionality with enhanced mobile support
function initializeFAQToggles() {
    const faqToggles = document.querySelectorAll('.faq-toggle');
    
    faqToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const content = document.getElementById(targetId);
            const icon = this.querySelector('.fas');
            
            if (content && icon) {
                const isOpen = content.classList.contains('show');
                
                // Close all other FAQs (accordion behavior)
                faqToggles.forEach(otherToggle => {
                    if (otherToggle !== toggle) {
                        const otherId = otherToggle.getAttribute('data-target');
                        const otherContent = document.getElementById(otherId);
                        const otherIcon = otherToggle.querySelector('.fas');
                        
                        if (otherContent && otherIcon) {
                            otherContent.classList.remove('show');
                            otherIcon.classList.remove('fa-minus');
                            otherIcon.classList.add('fa-plus');
                            otherToggle.setAttribute('aria-expanded', 'false');
                        }
                    }
                });
                
                // Toggle current FAQ
                if (isOpen) {
                    content.classList.remove('show');
                    icon.classList.remove('fa-minus');
                    icon.classList.add('fa-plus');
                    this.setAttribute('aria-expanded', 'false');
                } else {
                    content.classList.add('show');
                    icon.classList.remove('fa-plus');
                    icon.classList.add('fa-minus');
                    this.setAttribute('aria-expanded', 'true');
                    
                    // Smooth scroll to FAQ on mobile for better UX
                    if (window.innerWidth <= 768) {
                        setTimeout(() => {
                            this.scrollIntoView({ 
                                behavior: 'smooth', 
                                block: 'start',
                                inline: 'nearest'
                            });
                        }, 300);
                    }
                }
            }
        });
        
        // Keyboard support
        toggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

// Enhanced animations with intersection observer
function initializeAnimations() {
    // Intersection Observer for scroll-triggered animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add staggered delay for multiple elements
                const delay = entry.target.dataset.delay || 0;
                entry.target.style.transitionDelay = delay + 'ms';
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements with animation classes
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach((el, index) => {
        // Add staggered delay
        el.dataset.delay = index * 100;
        observer.observe(el);
    });
    
    // Counter animations for stats
    const counterElements = document.querySelectorAll('[data-count]');
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counterElements.forEach(el => counterObserver.observe(el));
}

// Counter animation function
function animateCounter(element) {
    const target = parseInt(element.dataset.count);
    const suffix = element.dataset.suffix || '';
    let current = 0;
    const increment = target / 100;
    const duration = 2000;
    const stepTime = duration / 100;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + suffix;
    }, stepTime);
}

// Form enhancements
function initializeFormEnhancements() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        // Add loading state on form submission
        form.addEventListener('submit', function() {
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.classList.add('loading');
                submitBtn.disabled = true;
            }
        });
        
        // Real-time validation
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearErrors);
            
            // Enhanced mobile input handling
            if (input.type === 'tel') {
                input.addEventListener('input', formatPhoneNumber);
            }
        });
    });
}

// Field validation
function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    // Remove existing error states
    field.classList.remove('border-red-500', 'ring-red-500');
    
    // Basic validation rules
    if (field.required && !value) {
        showFieldError(field, 'This field is required');
        return false;
    }
    
    if (field.type === 'email' && value && !isValidEmail(value)) {
        showFieldError(field, 'Please enter a valid email address');
        return false;
    }
    
    if (field.type === 'tel' && value && !isValidPhone(value)) {
        showFieldError(field, 'Please enter a valid phone number');
        return false;
    }
    
    return true;
}

// Clear field errors
function clearErrors(e) {
    const field = e.target;
    field.classList.remove('border-red-500', 'ring-red-500');
    const errorMsg = field.parentNode.querySelector('.error-message');
    if (errorMsg) {
        errorMsg.remove();
    }
}

// Show field error
function showFieldError(field, message) {
    field.classList.add('border-red-500');
    
    // Remove existing error message
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add new error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message text-red-600 text-sm mt-1';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
}

// Phone number formatting
function formatPhoneNumber(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    // Indian phone number formatting
    if (value.length >= 10) {
        if (value.startsWith('91')) {
            value = '+91 ' + value.substring(2, 7) + ' ' + value.substring(7, 12);
        } else {
            value = '+91 ' + value.substring(0, 5) + ' ' + value.substring(5, 10);
        }
    }
    
    e.target.value = value;
}

// Validation helpers
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function isValidPhone(phone) {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length >= 10 && cleaned.length <= 13;
}

// Smooth scrolling functionality
function initializeSmoothScrolling() {
    // Smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                
                const offset = window.innerWidth <= 768 ? 80 : 100; // Account for mobile header
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Scroll-to-top functionality
    const scrollTopBtn = createScrollTopButton();
    
    window.addEventListener('scroll', throttle(() => {
        if (window.pageYOffset > 500) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    }, 100));
}

// Create scroll-to-top button
function createScrollTopButton() {
    const btn = document.createElement('button');
    btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    btn.className = 'fixed bottom-6 left-6 w-12 h-12 bg-gold text-forest-green rounded-full shadow-lg z-40 transition-all duration-300 hover:scale-110 opacity-0 pointer-events-none';
    btn.id = 'scrollTopBtn';
    
    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // Show/hide class
    const style = document.createElement('style');
    style.textContent = `
        #scrollTopBtn.show {
            opacity: 1;
            pointer-events: auto;
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(btn);
    return btn;
}

// Flash message handling
function initializeFlashMessages() {
    const flashMessages = document.querySelectorAll('.flash-message');
    
    flashMessages.forEach(message => {
        // Auto-hide after 5 seconds
        setTimeout(() => {
            if (message.parentElement) {
                message.style.opacity = '0';
                message.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    message.remove();
                }, 300);
            }
        }, 5000);
        
        // Close button functionality
        const closeBtn = message.querySelector('button');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                message.style.opacity = '0';
                message.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    message.remove();
                }, 300);
            });
        }
    });
}

// Touch and mobile optimizations
function initializeTouchOptimizations() {
    // Add touch feedback for buttons
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    
    buttons.forEach(btn => {
        btn.addEventListener('touchstart', function() {
            this.classList.add('active-touch');
        });
        
        btn.addEventListener('touchend', function() {
            this.classList.remove('active-touch');
        });
    });
    
    // Add active touch styles
    const style = document.createElement('style');
    style.textContent = `
        .active-touch {
            transform: scale(0.98) !important;
            opacity: 0.8 !important;
        }
    `;
    document.head.appendChild(style);
    
    // Prevent zoom on double tap for iOS
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
    
    // Handle orientation change
    window.addEventListener('orientationchange', function() {
        // Reload certain elements or recalculate sizes if needed
        setTimeout(() => {
            window.scrollTo(window.scrollX, window.scrollY);
        }, 100);
    });
}

// Utility functions
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance monitoring
function initializePerformanceMonitoring() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
            }, 0);
        });
    }
}

// Initialize performance monitoring
initializePerformanceMonitoring();

// Service Worker registration for future PWA capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Service worker registration would go here
        // navigator.serviceWorker.register('/sw.js');
    });
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // Could send error reports to analytics service
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
    e.preventDefault();
});

// Accessibility enhancements
document.addEventListener('keydown', function(e) {
    // Skip to main content with keyboard
    if (e.altKey && e.key === 'm') {
        const main = document.querySelector('main');
        if (main) {
            main.focus();
            main.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// Focus management for modals and overlays
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    element.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

// Analytics tracking (placeholder for future integration)
function trackEvent(eventName, properties = {}) {
    // Google Analytics or other analytics service integration
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, properties);
    }
    
    console.log('Event tracked:', eventName, properties);
}

// Chat Widget functionality
function initializeChatWidget() {
    const chatToggle = document.getElementById('chat-toggle');
    const chatWindow = document.getElementById('chat-window');
    const chatClose = document.getElementById('chat-close');
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send');
    const chatMessages = document.getElementById('chat-messages');
    const quickOptions = document.querySelectorAll('.quick-option');
    
    let isOpen = false;
    
    // Toggle chat window
    function toggleChat() {
        isOpen = !isOpen;
        if (isOpen) {
            chatWindow.classList.remove('scale-0', 'opacity-0');
            chatWindow.classList.add('scale-100', 'opacity-100');
            chatToggle.classList.remove('animate-bounce');
            chatToggle.innerHTML = '<i class="fas fa-times text-xl"></i>';
        } else {
            chatWindow.classList.add('scale-0', 'opacity-0');
            chatWindow.classList.remove('scale-100', 'opacity-100');
            chatToggle.classList.add('animate-bounce');
            chatToggle.innerHTML = '<i class="fas fa-comments text-xl"></i>';
        }
    }
    
    // Add message to chat
    function addMessage(message, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `mb-3 ${isUser ? 'text-right' : 'text-left'}`;
        messageDiv.innerHTML = `
            <div class="${isUser ? 'bg-gold text-forest-green ml-8' : 'bg-gray-100 text-forest-green mr-8'} rounded-lg p-3 text-sm">
                ${message}
            </div>
        `;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Website-based responses using actual HostUp information
    const responses = {
        '📅 Schedule Free Consultation': 'Perfect! Our free consultation includes:<br>• <strong>Property assessment</strong> & market analysis<br>• <strong>Revenue potential</strong> estimation<br>• <strong>Customized management</strong> plan<br>• <strong>No obligations</strong> - completely free!<br><br><a href="mailto:hostup.co.in@gmail.com?subject=Free%20Consultation%20Request" class="text-gold hover:underline font-semibold">📧 Email us</a> or <a href="https://wa.me/919819726493?text=Hi%20HostUp!%20I\'d%20like%20to%20schedule%20a%20free%20consultation%20for%20my%20property." class="text-gold hover:underline font-semibold">💬 WhatsApp directly</a>',
        '💰 Learn About Pricing': 'Our transparent pricing structure:<br>• <strong>15-25% commission</strong> on confirmed bookings (negotiable based on property)<br>• <strong>No upfront fees</strong> or hidden charges<br>• <strong>All services included:</strong> listing setup, guest management, pricing optimization, cleaning coordination<br>• <strong>We only earn when you earn</strong><br><br><a href="https://wa.me/919819726493?text=Hi!%20I\'d%20like%20to%20know%20more%20about%20your%20pricing%20for%20my%20property." class="text-gold hover:underline font-semibold">Get personalized quote</a>',
        '🏠 Property Requirements': 'We work with properties in <strong>Jaipur, Delhi, and Mumbai</strong> that meet these criteria:<br>• <strong>Size:</strong> 1-4 bedrooms (studios to villas)<br>• <strong>Condition:</strong> Fully furnished & guest-ready<br>• <strong>Legal:</strong> Proper documentation & permissions<br>• <strong>Access:</strong> Easy check-in/check-out<br><br>What type of property do you have?',
        '🚀 How to Get Started': 'Getting started is simple! Here\'s our process:<br>1. <strong>Free consultation</strong> & property assessment<br>2. <strong>Customized strategy</strong> development<br>3. <strong>Listing setup</strong> & optimization<br>4. <strong>Go live</strong> and start earning!<br><br><a href="https://wa.me/919819726493?text=Hi%20HostUp!%20I\'d%20like%20to%20get%20started%20with%20your%20services." class="text-gold hover:underline font-semibold">Start your journey</a>',
        '💵 Revenue Potential': 'Our clients typically see:<br>• <strong>35% average revenue increase</strong><br>• <strong>75% occupancy rate</strong><br>• <strong>4.7+ star ratings</strong><br>• <strong>Consistent monthly income</strong><br><br>Results vary by property type and location. <a href="https://wa.me/919819726493?text=Hi!%20I\'d%20like%20to%20know%20the%20revenue%20potential%20for%20my%20property." class="text-gold hover:underline font-semibold">Get your property\'s potential</a>',
        '📱 WhatsApp Support': 'Get instant expert help! Our team responds within minutes:<br>• <strong>Property assessment</strong><br>• <strong>Pricing questions</strong><br>• <strong>Technical support</strong><br>• <strong>Booking issues</strong><br><br><a href="https://wa.me/919819726493" class="text-gold hover:underline font-semibold">💬 +91 98197 26493</a> or <a href="https://wa.me/919317210055" class="text-gold hover:underline font-semibold">💬 +91 93172 10055</a>'
    };
    
    // Event listeners
    if (chatToggle) {
        chatToggle.addEventListener('click', toggleChat);
    }
    
    if (chatClose) {
        chatClose.addEventListener('click', toggleChat);
    }
    
    quickOptions.forEach(option => {
        option.addEventListener('click', function() {
            const question = this.textContent.trim();
            addMessage(question, true);
            
            setTimeout(() => {
                const response = responses[question] || "I'll connect you with our team for personalized assistance. Please use the WhatsApp link below!";
                addMessage(response);
            }, 500);
        });
    });
    
    // Send message functionality
    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            addMessage(message, true);
            chatInput.value = '';
            
            setTimeout(() => {
                const autoResponse = getAutoResponse(message);
                addMessage(autoResponse);
            }, 500);
        }
    }
    
    // Website-based auto-response logic using actual HostUp information
    function getAutoResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        // Pricing and cost related queries
        if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('fee') || lowerMessage.includes('commission') || lowerMessage.includes('charge')) {
            return 'Our pricing is transparent and flexible:<br>• <strong>15-25% commission</strong> on confirmed bookings (negotiable based on property)<br>• <strong>No upfront fees</strong> or hidden charges<br>• <strong>All services included:</strong> listing setup, guest management, pricing optimization, cleaning coordination<br>• <strong>We only earn when you earn</strong><br><br><a href="https://wa.me/919819726493?text=Hi!%20I\'d%20like%20to%20know%20more%20about%20your%20pricing%20for%20my%20property." class="text-gold hover:underline font-semibold">Get your personalized quote</a>';
        }
        
        // Consultation and meeting requests
        else if (lowerMessage.includes('consultation') || lowerMessage.includes('meeting') || lowerMessage.includes('discuss') || lowerMessage.includes('talk')) {
            return 'Great choice! Our free consultation includes:<br>• <strong>Property assessment</strong> & market analysis<br>• <strong>Revenue potential</strong> estimation<br>• <strong>Customized strategy</strong> for your property<br>• <strong>No obligations</strong> - completely free!<br><br><a href="mailto:hostup.co.in@gmail.com?subject=Free%20Consultation%20Request" class="text-gold hover:underline font-semibold">📧 Email us</a> or <a href="https://wa.me/919819726493?text=Hi%20HostUp!%20I\'d%20like%20to%20schedule%20a%20free%20consultation." class="text-gold hover:underline font-semibold">💬 WhatsApp directly</a>';
        }
        
        // Property requirements and eligibility
        else if (lowerMessage.includes('property') || lowerMessage.includes('requirement') || lowerMessage.includes('eligible') || lowerMessage.includes('qualify') || lowerMessage.includes('apartment') || lowerMessage.includes('villa') || lowerMessage.includes('house')) {
            return 'We work with properties in <strong>Jaipur, Delhi, and Mumbai</strong> that meet these criteria:<br>• <strong>Size:</strong> 1-4 bedrooms (studios to villas)<br>• <strong>Condition:</strong> Fully furnished & guest-ready<br>• <strong>Legal:</strong> Proper documentation & permissions<br>• <strong>Access:</strong> Easy check-in/check-out<br><br>What type of property do you have? <a href="https://wa.me/919819726493?text=Hi!%20I\'d%20like%20to%20know%20if%20my%20property%20qualifies%20for%20your%20services." class="text-gold hover:underline font-semibold">Share details</a>';
        }
        
        // Getting started and onboarding
        else if (lowerMessage.includes('start') || lowerMessage.includes('begin') || lowerMessage.includes('onboard') || lowerMessage.includes('join') || lowerMessage.includes('signup')) {
            return 'Getting started is simple! Here\'s our process:<br>1. <strong>Free consultation</strong> & property assessment<br>2. <strong>Customized strategy</strong> development<br>3. <strong>Listing setup</strong> & optimization<br>4. <strong>Go live</strong> and start earning!<br><br><a href="https://wa.me/919819726493?text=Hi%20HostUp!%20I\'d%20like%20to%20get%20started%20with%20your%20services." class="text-gold hover:underline font-semibold">Start your journey</a>';
        }
        
        // Services and what we do
        else if (lowerMessage.includes('service') || lowerMessage.includes('what do you do') || lowerMessage.includes('help') || lowerMessage.includes('manage')) {
            return 'We provide complete Airbnb management:<br>• <strong>Airbnb Listing Setup & Optimization</strong> - Professional listings with SEO optimization<br>• <strong>24/7 Guest Communication</strong> - Round-the-clock support in English and Hindi<br>• <strong>Smart Pricing & Revenue Management</strong> - Daily price optimization using market data<br>• <strong>Calendar & Booking Management</strong> - Multi-platform synchronization<br>• <strong>Vendor Coordination</strong> - Cleaning, maintenance, and laundry services<br>• <strong>Review & Superhost Strategy</strong> - Guest experience optimization<br>• <strong>Monthly Earnings Reports</strong> - Detailed performance analytics<br><br><a href="/services" class="text-gold hover:underline font-semibold">Learn more about our services</a>';
        }
        
        // Revenue and earnings
        else if (lowerMessage.includes('revenue') || lowerMessage.includes('earn') || lowerMessage.includes('income') || lowerMessage.includes('profit') || lowerMessage.includes('money')) {
            return 'Our clients typically see:<br>• <strong>35% average revenue increase</strong><br>• <strong>75% occupancy rate</strong><br>• <strong>4.7+ star ratings</strong><br>• <strong>Consistent monthly income</strong><br><br>Results vary by property type and location. <a href="https://wa.me/919819726493?text=Hi!%20I\'d%20like%20to%20know%20the%20revenue%20potential%20for%20my%20property." class="text-gold hover:underline font-semibold">Get your property\'s potential</a>';
        }
        
        // Contact and support
        else if (lowerMessage.includes('contact') || lowerMessage.includes('support') || lowerMessage.includes('help') || lowerMessage.includes('phone') || lowerMessage.includes('call')) {
            return 'We\'re here to help! Contact us via:<br>• <strong>WhatsApp:</strong> <a href="https://wa.me/919819726493" class="text-gold hover:underline font-semibold">+91 98197 26493</a> or <a href="https://wa.me/919317210055" class="text-gold hover:underline font-semibold">+91 93172 10055</a><br>• <strong>Email:</strong> <a href="mailto:hostup.co.in@gmail.com" class="text-gold hover:underline font-semibold">hostup.co.in@gmail.com</a><br>• <strong>Response time:</strong> Within minutes on WhatsApp<br><br>Choose your preferred method!';
        }
        
        // Cities and locations
        else if (lowerMessage.includes('city') || lowerMessage.includes('location') || lowerMessage.includes('jaipur') || lowerMessage.includes('delhi') || lowerMessage.includes('mumbai') || lowerMessage.includes('where')) {
            return 'We currently serve three major Indian cities:<br>• <strong>Jaipur</strong> - The Pink City\'s rich heritage and royal palaces<br>• <strong>Delhi</strong> - The capital\'s blend of business travelers and cultural tourists<br>• <strong>Mumbai</strong> - India\'s financial capital with year-round demand<br><br>We\'re planning to expand to Bangalore, Goa, and Udaipur by 2024. <a href="https://wa.me/919819726493?text=Hi!%20I\'d%20like%20to%20know%20more%20about%20your%20services%20in%20my%20city." class="text-gold hover:underline font-semibold">Check if we serve your city</a>';
        }
        
        // Default response with helpful options
        else {
            return 'Thanks for your message! I\'m here to help with:<br>• <strong>Pricing & commission</strong> details<br>• <strong>Property requirements</strong> & eligibility<br>• <strong>Free consultation</strong> scheduling<br>• <strong>Getting started</strong> process<br>• <strong>Services</strong> we offer<br>• <strong>Cities</strong> we serve<br><br>For immediate assistance, <a href="https://wa.me/919819726493" class="text-gold hover:underline font-semibold">WhatsApp our team</a> or ask me a specific question!';
        }
    }
    
    if (chatSend) {
        chatSend.addEventListener('click', sendMessage);
    }
    
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    // Close chat when clicking outside
    document.addEventListener('click', function(e) {
        if (isOpen && !chatToggle.contains(e.target) && !chatWindow.contains(e.target)) {
            toggleChat();
        }
    });
}

// Calendar Modal functionality
let currentCalendarDate = new Date();
let selectedDate = null;
let selectedTime = null;
let currentStep = 1;

function initializeCalendarModal() {
    // Make calendar functions globally available
    window.openCalendarModal = openCalendarModal;
    window.closeCalendarModal = closeCalendarModal;
    window.previousMonth = previousMonth;
    window.nextMonth = nextMonth;
    window.nextStep = nextStep;
    window.previousStep = previousStep;
    window.scheduleConsultation = scheduleConsultation;
    
    // Initialize time slot selection
    const timeSlots = document.querySelectorAll('.time-slot');
    timeSlots.forEach(slot => {
        slot.addEventListener('click', function() {
            timeSlots.forEach(s => s.classList.remove('selected'));
            this.classList.add('selected');
            selectedTime = this.dataset.time;
            updateStepButtons();
        });
    });
}

function openCalendarModal() {
    document.getElementById('calendar-modal').classList.remove('hidden');
    currentStep = 1;
    selectedDate = null;
    selectedTime = null;
    renderCalendar();
    updateStepDisplay();
}

function closeCalendarModal() {
    document.getElementById('calendar-modal').classList.add('hidden');
    resetModal();
}

function resetModal() {
    currentStep = 1;
    selectedDate = null;
    selectedTime = null;
    document.querySelectorAll('.time-slot').forEach(slot => {
        slot.classList.remove('selected');
    });
    document.getElementById('client-name').value = '';
    document.getElementById('client-email').value = '';
    document.getElementById('client-phone').value = '';
    document.getElementById('property-location').value = '';
    document.getElementById('additional-notes').value = '';
}

function renderCalendar() {
    const year = currentCalendarDate.getFullYear();
    const month = currentCalendarDate.getMonth();
    
    // Update month/year display
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    document.getElementById('current-month-year').textContent = `${monthNames[month]} ${year}`;
    
    // Get first day of month and number of days
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    
    const calendarDays = document.getElementById('calendar-days');
    calendarDays.innerHTML = '';
    
    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day disabled';
        calendarDays.appendChild(emptyDay);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        const dayDate = new Date(year, month, day);
        
        dayElement.className = 'calendar-day';
        dayElement.textContent = day;
        
        // Disable past dates
        if (dayDate < today.setHours(0,0,0,0)) {
            dayElement.classList.add('disabled');
        } else {
            // Add today class if it's today
            if (dayDate.toDateString() === new Date().toDateString()) {
                dayElement.classList.add('today');
            }
            
            dayElement.addEventListener('click', function() {
                if (!this.classList.contains('disabled')) {
                    document.querySelectorAll('.calendar-day').forEach(d => {
                        d.classList.remove('selected');
                    });
                    this.classList.add('selected');
                    selectedDate = new Date(year, month, day);
                    updateStepButtons();
                }
            });
        }
        
        calendarDays.appendChild(dayElement);
    }
}

function previousMonth() {
    currentCalendarDate.setMonth(currentCalendarDate.getMonth() - 1);
    renderCalendar();
}

function nextMonth() {
    currentCalendarDate.setMonth(currentCalendarDate.getMonth() + 1);
    renderCalendar();
}

function nextStep() {
    if (currentStep < 3) {
        currentStep++;
        updateStepDisplay();
    }
}

function previousStep() {
    if (currentStep > 1) {
        currentStep--;
        updateStepDisplay();
    }
}

function updateStepDisplay() {
    document.querySelectorAll('.calendar-step').forEach(step => {
        step.classList.add('hidden');
    });
    
    document.getElementById(`${getStepId(currentStep)}`).classList.remove('hidden');
    
    // Update buttons
    const backBtn = document.getElementById('back-btn');
    const nextBtn = document.getElementById('next-btn');
    const scheduleBtn = document.getElementById('schedule-btn');
    
    backBtn.classList.toggle('hidden', currentStep === 1);
    nextBtn.classList.toggle('hidden', currentStep === 3);
    scheduleBtn.classList.toggle('hidden', currentStep !== 3);
    
    updateStepButtons();
}

function getStepId(step) {
    const stepIds = ['', 'date-selection', 'time-selection', 'contact-details'];
    return stepIds[step];
}

function updateStepButtons() {
    const nextBtn = document.getElementById('next-btn');
    
    if (currentStep === 1) {
        nextBtn.classList.toggle('hidden', !selectedDate);
    } else if (currentStep === 2) {
        nextBtn.classList.toggle('hidden', !selectedTime);
    }
}

function scheduleConsultation() {
    const name = document.getElementById('client-name').value.trim();
    const email = document.getElementById('client-email').value.trim();
    const phone = document.getElementById('client-phone').value.trim();
    const location = document.getElementById('property-location').value;
    const notes = document.getElementById('additional-notes').value.trim();
    
    if (!name || !email || !phone || !location) {
        alert('Please fill in all required fields.');
        return;
    }
    
    if (!isValidEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    if (!isValidPhone(phone)) {
        alert('Please enter a valid phone number.');
        return;
    }
    
    // Format the date and time
    const dateStr = selectedDate.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    // Send WhatsApp message
    const whatsappMessage = `Hi HostUp Team!

I'd like to schedule a free consultation:

📅 Preferred Date & Time: ${dateStr} at ${selectedTime}

👤 Contact Details:
Name: ${name}
Email: ${email}
Phone: ${phone}

🏠 Property Location: ${location}

${notes ? `📝 Notes: ${notes}` : ''}

Please confirm this slot or suggest alternative times. Looking forward to discussing my property's potential!`;
    
    const whatsappURL = `https://wa.me/919819726493?text=${encodeURIComponent(whatsappMessage)}`;
    
    // Also send email as backup
    const emailSubject = `Consultation Request - ${name} - ${dateStr}`;
    const emailBody = `Hi HostUp Team,

I've scheduled a consultation through your calendar system:

Preferred Date & Time: ${dateStr} at ${selectedTime}

Contact Details:
Name: ${name}
Email: ${email}
Phone: ${phone}
Property Location: ${location}

${notes ? `Additional Notes: ${notes}` : ''}

Please confirm this appointment or suggest alternative times.

Best regards,
${name}`;
    
    const emailURL = `mailto:hostup.co.in@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    
    // Open WhatsApp first
    window.open(whatsappURL, '_blank');
    
    // Close modal and show success message
    closeCalendarModal();
    
    // Show success notification
    showSuccessNotification('Consultation scheduled! WhatsApp opened with your details. We\'ll confirm your appointment shortly.');
}

function showSuccessNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-gold text-forest-green px-6 py-3 rounded-lg shadow-lg z-50 max-w-sm';
    notification.innerHTML = `
        <div class="flex items-center">
            <i class="fas fa-check-circle mr-2"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Add WhatsApp automation to chat widget responses
function enhanceWhatsAppResponses() {
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
    whatsappLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add tracking or additional automation here
            trackEvent('WhatsApp Click', { 
                source: this.closest('#chat-widget') ? 'chat-widget' : 'website-link' 
            });
        });
    });
}

// Export functions for potential use by other scripts
window.HostUpJS = {
    trackEvent,
    throttle,
    debounce,
    trapFocus,
    isValidEmail,
    isValidPhone,
    openCalendarModal,
    closeCalendarModal
};
