// ====== ECO LIFE SMP - FINAL JAVASCRIPT ======
// Mobile First, Fully Responsive, Bug Free

// ====== NAVBAR MOBILE & DROPDOWN FIX ======
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    const navbar = document.querySelector('.navbar');
    
    // ====== MOBILE MENU TOGGLE ======
    if (hamburger) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            body.classList.toggle('menu-open');
        });
    }
    
    // ====== CLOSE MENU WHEN CLICKING LINKS ======
    document.querySelectorAll('.nav-links a:not(.dropdown-toggle)').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });
    });
    
    // ====== CLOSE MENU WHEN CLICKING OUTSIDE ======
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.navbar') && window.innerWidth <= 768) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });
    
    // ====== DROPDOWN FUNCTIONALITY ======
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        
        // Desktop: Hover
        if (window.innerWidth > 768) {
            dropdown.addEventListener('mouseenter', function() {
                this.classList.add('active');
            });
            
            dropdown.addEventListener('mouseleave', function() {
                this.classList.remove('active');
            });
        }
        
        // Mobile: Click
        if (window.innerWidth <= 768) {
            toggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Close other dropdowns
                dropdowns.forEach(other => {
                    if (other !== dropdown) {
                        other.classList.remove('active');
                    }
                });
                
                // Toggle current dropdown
                dropdown.classList.toggle('active');
            });
        }
    });
    
    // Close dropdowns when clicking outside (mobile only)
    if (window.innerWidth <= 768) {
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.dropdown')) {
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        });
    }
    
    // ====== NAVBAR SCROLL EFFECT ======
    window.addEventListener('scroll', function() {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // ====== SET ACTIVE NAV LINK ======
    function setActiveLink() {
        const currentPage = window.location.pathname.split('/').pop();
        const navLinks = document.querySelectorAll('.nav-links a');
        
        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href');
            if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    setActiveLink();
    
    // ====== COPY IP FUNCTIONALITY ======
    function copyToClipboard(text) {
        // Fallback untuk browser lama
        const fallbackCopy = function(text) {
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.opacity = '0';
            document.body.appendChild(textArea);
            textArea.select();
            
            try {
                const successful = document.execCommand('copy');
                return successful;
            } catch (err) {
                console.error('Fallback copy failed:', err);
                return false;
            } finally {
                document.body.removeChild(textArea);
            }
        };
        
        // Coba Clipboard API modern dulu
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(text).then(function() {
                showCopyNotification();
            }).catch(function(err) {
                console.error('Clipboard API failed:', err);
                if (fallbackCopy(text)) {
                    showCopyNotification();
                } else {
                    alert('Failed to copy IP. Please copy manually: ' + text);
                }
            });
        } else {
            // Fallback untuk HTTP atau browser lama
            if (fallbackCopy(text)) {
                showCopyNotification();
            } else {
                alert('Failed to copy IP. Please copy manually: ' + text);
            }
        }
        
        function showCopyNotification() {
            const notification = document.createElement('div');
            notification.className = 'copy-notification';
            notification.textContent = '✓ IP Copied!';
            document.body.appendChild(notification);
            
            setTimeout(function() {
                notification.classList.add('show');
            }, 10);
            
            setTimeout(function() {
                notification.classList.remove('show');
                setTimeout(function() {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 300);
            }, 2000);
        }
    }
    
    // Setup copy buttons
    document.querySelectorAll('.btn-copy').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const ip = this.getAttribute('data-ip');
            if (ip) {
                copyToClipboard(ip);
            }
        });
    });
    
    // ====== FAQ TOGGLE ======
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Close all other FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Open current if not active
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
    
    // ====== SMOOTH SCROLL ======
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '#!') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                // Close mobile menu jika terbuka
                if (window.innerWidth <= 768) {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('active');
                    body.classList.remove('menu-open');
                }
                
                // Smooth scroll
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ====== GALLERY IMAGE LOADING ======
    function loadGalleryImages() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        if (!galleryItems.length) return;
        
        galleryItems.forEach(function(item, index) {
            const img = item.querySelector('img');
            if (!img) return;
            
            const imageNumber = index + 1;
            const imagePath = `images/gallery/${imageNumber}.jpg`;
            
            // Set loading state
            img.style.opacity = '0';
            
            // Test if image exists
            const testImage = new Image();
            testImage.onload = function() {
                // Image exists, use it
                img.src = imagePath;
                img.alt = `EcoLife SMP Gallery ${imageNumber}`;
                img.style.opacity = '1';
            };
            
            testImage.onerror = function() {
                // Image doesn't exist, use placeholder
                const placeholders = [
                    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                    'https://images.unsplash.com/photo-1601042879364-f3947d1f9fc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                    'https://images.unsplash.com/photo-1531315630201-bb15abeb1653?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                    'https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                    'https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
                ];
                
                img.src = placeholders[index % placeholders.length];
                img.alt = `EcoLife SMP Gallery ${imageNumber} (Placeholder)`;
                img.style.opacity = '1';
            };
            
            // Delay loading untuk performance
            setTimeout(function() {
                testImage.src = imagePath;
            }, index * 100);
        });
    }
    
    // Load gallery images jika ada
    if (document.querySelector('.gallery-item')) {
        setTimeout(loadGalleryImages, 500);
    }
    
    // ====== CONTACT FORM ======
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name')?.value || '';
            const email = document.getElementById('email')?.value || '';
            const subject = document.getElementById('subject')?.value || '';
            const message = document.getElementById('message')?.value || '';
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Create mailto link
            const mailtoLink = `mailto:EcoLifeSmpEvo@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
            
            // Open email client
            window.location.href = mailtoLink;
        });
    }
    
    // ====== SET CURRENT YEAR ======
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
    // ====== TOUCH DEVICE OPTIMIZATION ======
    if ('ontouchstart' in window) {
        // Add touch feedback
        document.querySelectorAll('.btn, .btn-copy, .dropdown-toggle').forEach(element => {
            element.addEventListener('touchstart', function() {
                this.style.opacity = '0.8';
            });
            
            element.addEventListener('touchend', function() {
                this.style.opacity = '1';
            });
        });
        
        // Prevent zoom on double tap
        let lastTouchEnd = 0;
        document.addEventListener('touchend', function(e) {
            const now = Date.now();
            if (now - lastTouchEnd <= 300) {
                e.preventDefault();
            }
            lastTouchEnd = now;
        }, { passive: false });
    }
    
    // ====== SCROLL ANIMATIONS ======
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        document.querySelectorAll('.fade-in-on-scroll').forEach(function(el) {
            observer.observe(el);
        });
    }
    
    // ====== WINDOW RESIZE HANDLER ======
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            // Close mobile menu on resize to desktop
            if (window.innerWidth > 768) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                body.classList.remove('menu-open');
            }
            
            // Reset dropdowns
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }, 250);
    });
    
    // ====== PAGE LOAD TRANSITION ======
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Remove loading indicator jika ada
        const loader = document.getElementById('page-loader');
        if (loader) {
            setTimeout(function() {
                loader.style.opacity = '0';
                setTimeout(function() {
                    if (loader.parentNode) {
                        loader.parentNode.removeChild(loader);
                    }
                }, 300);
            }, 500);
        }
    });
});

// ====== ERROR HANDLING ======
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
});

// ====== OFFLINE DETECTION ======
window.addEventListener('offline', function() {
    console.log('You are offline');
});

window.addEventListener('online', function() {
    console.log('You are back online');
});