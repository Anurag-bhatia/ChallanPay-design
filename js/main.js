/* ==========================================================================
   Main JavaScript - ChallanPay
   ========================================================================== */

/**
 * Initialize mobile hamburger menu
 */
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a, .mobile-nav .cta-btn');

    if (!hamburger || !mobileNav) return;

    // Toggle menu on hamburger click
    hamburger.addEventListener('click', function() {
        const isActive = hamburger.classList.contains('active');

        hamburger.classList.toggle('active');
        mobileNav.classList.toggle('active');

        // Update accessibility attributes
        hamburger.setAttribute('aria-expanded', !isActive);
        mobileNav.setAttribute('aria-hidden', isActive);

        // Prevent body scroll when menu is open
        document.body.style.overflow = !isActive ? 'hidden' : '';
    });

    // Close menu when a link is clicked
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            mobileNav.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            mobileNav.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        });
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
            hamburger.classList.remove('active');
            mobileNav.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            mobileNav.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
    });

    // Close menu on window resize (if switching to desktop)
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768 && mobileNav.classList.contains('active')) {
            hamburger.classList.remove('active');
            mobileNav.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            mobileNav.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
    });
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Initialize page load animations
 */
function initPageLoadAnimations() {
    // Add page-loading class to body initially
    document.body.classList.add('page-loading');

    // Wait for page to fully load
    window.addEventListener('load', function() {
        // Small delay for smoother effect
        setTimeout(() => {
            document.body.classList.remove('page-loading');
            document.body.classList.add('page-loaded');

            // Trigger hero animations after page loads
            triggerHeroAnimations();
        }, 100);
    });
}

/**
 * Trigger hero section animations with stagger
 */
function triggerHeroAnimations() {
    const heroElements = document.querySelectorAll('.hero .reveal, .hero .reveal-left, .hero .reveal-right, .hero .reveal-scale');

    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('revealed');
        }, index * 150);
    });
}

/**
 * Initialize scroll reveal animations using Intersection Observer
 */
function initScrollAnimations() {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
        // Show all elements immediately if user prefers reduced motion
        document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
            el.classList.add('revealed');
        });
        return;
    }

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -80px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add stagger delay for grid children
                const parent = entry.target.parentElement;
                if (parent && parent.classList.contains('stagger-children')) {
                    const children = Array.from(parent.children);
                    const index = children.indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.1}s`;
                }

                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all reveal elements (except hero which is handled separately)
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
        // Skip hero elements - they're handled by triggerHeroAnimations
        if (!el.closest('.hero')) {
            observer.observe(el);
        }
    });
}

/**
 * Initialize vehicle input formatting
 */
function initVehicleInput() {
    const vehicleInput = document.querySelector('.vehicle-input');
    if (vehicleInput) {
        vehicleInput.addEventListener('input', function(e) {
            // Convert to uppercase for vehicle numbers
            this.value = this.value.toUpperCase();
        });
    }
}

/**
 * Initialize check button functionality with modal
 */
function initCheckButton() {
    const checkBtn = document.querySelector('.check-btn');
    const modal = document.getElementById('verificationModal');

    if (checkBtn && modal) {
        checkBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const vehicleInput = document.querySelector('.vehicle-input');
            const vehicleNumber = vehicleInput ? vehicleInput.value.trim() : '';

            if (!vehicleNumber) {
                alert('Please enter a vehicle number');
                return;
            }

            // Store vehicle number for later use
            sessionStorage.setItem('vehicleNumber', vehicleNumber);

            // Open modal
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
}

/**
 * Initialize verification modal functionality
 */
function initVerificationModal() {
    const modal = document.getElementById('verificationModal');
    const modalClose = document.getElementById('modalClose');
    const detailsForm = document.getElementById('detailsForm');
    const otpForm = document.getElementById('otpForm');
    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');
    const backToStep1Btn = document.getElementById('backToStep1');
    const resendOtpBtn = document.getElementById('resendOtp');
    const displayMobile = document.getElementById('displayMobile');
    const otpInputs = document.querySelectorAll('.otp-input');

    if (!modal) return;

    // Close modal function
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        // Reset forms
        detailsForm.reset();
        otpForm.reset();
        step1.classList.add('active');
        step2.classList.remove('active');
    }

    // Close modal on close button
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    // Close modal on overlay click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Handle details form submission (Step 1)
    if (detailsForm) {
        detailsForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('modalUserName').value.trim();
            const mobile = document.getElementById('modalUserMobile').value.trim();

            // Validate mobile number
            if (!/^[0-9]{10}$/.test(mobile)) {
                alert('Please enter a valid 10-digit mobile number');
                return;
            }

            // Store user details
            sessionStorage.setItem('userName', name);
            sessionStorage.setItem('userMobile', mobile);

            // Display mobile number in OTP step
            if (displayMobile) {
                displayMobile.textContent = `+91 ${mobile}`;
            }

            // Simulate sending OTP (in production, call API here)
            console.log('Sending OTP to:', mobile);

            // Switch to OTP step
            step1.classList.remove('active');
            step2.classList.add('active');

            // Focus first OTP input
            if (otpInputs[0]) {
                otpInputs[0].focus();
            }
        });
    }

    // OTP Input auto-focus and auto-tab
    otpInputs.forEach((input, index) => {
        input.addEventListener('input', function(e) {
            // Only allow numbers
            this.value = this.value.replace(/[^0-9]/g, '');

            // Auto-focus next input
            if (this.value.length === 1 && index < otpInputs.length - 1) {
                otpInputs[index + 1].focus();
            }
        });

        input.addEventListener('keydown', function(e) {
            // Handle backspace to go to previous input
            if (e.key === 'Backspace' && !this.value && index > 0) {
                otpInputs[index - 1].focus();
            }
        });

        // Handle paste
        input.addEventListener('paste', function(e) {
            e.preventDefault();
            const pastedData = e.clipboardData.getData('text').replace(/[^0-9]/g, '');

            if (pastedData.length === 4) {
                otpInputs.forEach((inp, i) => {
                    inp.value = pastedData[i] || '';
                });
                otpInputs[3].focus();
            }
        });
    });

    // Handle OTP form submission (Step 2)
    if (otpForm) {
        otpForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Collect OTP
            let otp = '';
            otpInputs.forEach(input => {
                otp += input.value;
            });

            if (otp.length !== 4) {
                alert('Please enter complete 4-digit OTP');
                return;
            }

            // Simulate OTP verification (in production, verify with API)
            console.log('Verifying OTP:', otp);

            // Get stored vehicle number
            const vehicleNumber = sessionStorage.getItem('vehicleNumber');
            console.log('Redirecting to loading page with vehicle:', vehicleNumber);

            // Navigate to loading page first
            window.location.href = `loading.html?vehicle=${encodeURIComponent(vehicleNumber)}`;
        });
    }

    // Back to step 1
    if (backToStep1Btn) {
        backToStep1Btn.addEventListener('click', function() {
            step2.classList.remove('active');
            step1.classList.add('active');
            otpForm.reset();
        });
    }

    // Resend OTP
    if (resendOtpBtn) {
        resendOtpBtn.addEventListener('click', function() {
            const mobile = sessionStorage.getItem('userMobile');
            console.log('Resending OTP to:', mobile);
            alert('OTP has been resent to your mobile number');

            // Clear OTP inputs
            otpInputs.forEach(input => {
                input.value = '';
            });
            otpInputs[0].focus();
        });
    }
}

/**
 * Initialize How It Works accordion with hover interactions
 */
function initHowItWorksAccordion() {
    const accordionSteps = document.querySelectorAll('.accordion-step');
    const stepImages = document.querySelectorAll('.step-image');

    if (accordionSteps.length === 0) return;

    // Function to activate a specific step
    function activateStep(stepNumber) {
        // Remove active class from all steps and images
        accordionSteps.forEach(step => step.classList.remove('active'));
        stepImages.forEach(img => img.classList.remove('active'));

        // Add active class to current step and corresponding image
        const activeStep = document.querySelector(`.accordion-step[data-step="${stepNumber}"]`);
        const activeImage = document.querySelector(`.step-image[data-step="${stepNumber}"]`);

        if (activeStep) activeStep.classList.add('active');
        if (activeImage) activeImage.classList.add('active');
    }

    // Hover handler for each step
    accordionSteps.forEach((step) => {
        step.addEventListener('mouseenter', function() {
            const stepNumber = parseInt(this.getAttribute('data-step'));
            activateStep(stepNumber);
        });
    });

    // Initialize with first step active
    activateStep(1);
}

/**
 * Initialize WhatsApp business modal
 */
function initWhatsAppModal() {
    const whatsappBtn = document.getElementById('whatsappBtn');
    const whatsappModal = document.getElementById('whatsappModal');
    const whatsappModalClose = document.getElementById('whatsappModalClose');
    const whatsappForm = document.getElementById('whatsappForm');

    if (!whatsappBtn || !whatsappModal) return;

    // Open WhatsApp modal
    whatsappBtn.addEventListener('click', function(e) {
        e.preventDefault();
        whatsappModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Close WhatsApp modal
    function closeWhatsAppModal() {
        whatsappModal.classList.remove('active');
        document.body.style.overflow = '';
        if (whatsappForm) {
            whatsappForm.reset();
        }
    }

    if (whatsappModalClose) {
        whatsappModalClose.addEventListener('click', closeWhatsAppModal);
    }

    // Close on overlay click
    whatsappModal.addEventListener('click', function(e) {
        if (e.target === whatsappModal) {
            closeWhatsAppModal();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && whatsappModal.classList.contains('active')) {
            closeWhatsAppModal();
        }
    });

    // Handle form submission
    if (whatsappForm) {
        whatsappForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const companyName = document.getElementById('companyName').value.trim();
            const vehicleCount = document.getElementById('vehicleCount').value;

            if (!companyName || !vehicleCount) {
                alert('Please fill in all fields');
                return;
            }

            // Create WhatsApp message
            const message = `Hello! I'm interested in ChallanPay services for my business.

Company Name: ${companyName}
Number of Vehicles: ${vehicleCount}

I would like to know more about your services for multiple vehicles.`;

            // WhatsApp number (replace with actual business number)
            const whatsappNumber = '919999999999'; // Replace with actual number

            // Encode message for URL
            const encodedMessage = encodeURIComponent(message);

            // Create WhatsApp URL
            const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

            // Open WhatsApp in new tab
            window.open(whatsappURL, '_blank');

            // Close modal
            closeWhatsAppModal();
        });
    }
}

/**
 * Initialize user profile dropdown
 */
function initUserProfile() {
    // Populate user name from sessionStorage
    const userName = sessionStorage.getItem('userName');
    if (userName) {
        const userNameElement = document.getElementById('userName');
        const mobileUserNameElement = document.getElementById('mobileUserName');
        const mobileUserNameDisplay = document.getElementById('mobileUserNameDisplay');

        if (userNameElement) {
            userNameElement.textContent = userName;
        }
        if (mobileUserNameElement) {
            mobileUserNameElement.textContent = userName;
        }
        if (mobileUserNameDisplay) {
            mobileUserNameDisplay.textContent = userName;
        }
    }

    // Desktop User Profile Dropdown functionality
    const userProfileBtn = document.getElementById('userProfileBtn');
    const userProfileDropdown = document.getElementById('userProfileDropdown');

    if (userProfileBtn && userProfileDropdown) {
        userProfileBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            userProfileBtn.classList.toggle('active');
            userProfileDropdown.classList.toggle('active');
        });

        document.addEventListener('click', function(e) {
            if (!userProfileBtn.contains(e.target)) {
                userProfileBtn.classList.remove('active');
                userProfileDropdown.classList.remove('active');
            }
        });
    }

    // Mobile User Profile Dropdown functionality
    const mobileUserProfileBtn = document.getElementById('mobileUserProfileBtn');
    const mobileUserProfileDropdown = document.getElementById('mobileUserProfileDropdown');

    if (mobileUserProfileBtn && mobileUserProfileDropdown) {
        mobileUserProfileBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            mobileUserProfileBtn.classList.toggle('active');
            mobileUserProfileDropdown.classList.toggle('active');
        });

        document.addEventListener('click', function(e) {
            if (!mobileUserProfileBtn.contains(e.target)) {
                mobileUserProfileBtn.classList.remove('active');
                mobileUserProfileDropdown.classList.remove('active');
            }
        });
    }

    // Logout functionality
    const logoutBtn = document.getElementById('logoutBtn');
    const mobileLogoutBtn = document.getElementById('mobileLogoutBtn');

    function handleLogout(e) {
        e.preventDefault();
        sessionStorage.removeItem('userName');
        sessionStorage.removeItem('userMobile');
        sessionStorage.removeItem('vehicleNumber');
        window.location.href = 'index.html';
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
    if (mobileLogoutBtn) {
        mobileLogoutBtn.addEventListener('click', handleLogout);
    }
}

/**
 * Initialize all functionality when DOM is ready
 */
document.addEventListener('DOMContentLoaded', function() {
    initPageLoadAnimations();
    initMobileMenu();
    initSmoothScrolling();
    initScrollAnimations();
    initVehicleInput();
    initCheckButton();
    initVerificationModal();
    initHowItWorksAccordion();
    initWhatsAppModal();
    // initUserProfile(); // Handled by inline scripts on each page to avoid duplicate event listeners
});
