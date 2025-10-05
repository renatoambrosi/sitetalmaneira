// JavaScript Clean e Moderno - A Tal Maneira Landing Page
document.addEventListener('DOMContentLoaded', function() {
    
    // Header Scroll Effect
    const header = document.querySelector('.header');
    
    function handleHeaderScroll() {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(254, 254, 254, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(254, 254, 254, 0.95)';
            header.style.boxShadow = 'none';
        }
    }
    
    window.addEventListener('scroll', handleHeaderScroll);
    
    // Mobile Menu Toggle  
    window.toggleMobileMenu = function() {
        console.log('🍔 Menu mobile clicado!');
        const nav = document.querySelector('.nav');
        const toggle = document.querySelector('.mobile-menu-toggle');
        
        if (nav && toggle) {
            nav.classList.toggle('active');
            toggle.classList.toggle('active');
            console.log('📱 Menu status:', nav.classList.contains('active') ? 'ABERTO' : 'FECHADO');
        } else {
            console.error('❌ Elementos do menu não encontrados!');
        }
    }
    
    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 100; // Header height offset
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu if open
            const nav = document.querySelector('.nav');
            const toggle = document.querySelector('.mobile-menu-toggle');
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                toggle.classList.remove('active');
            }
        });
    });
    
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
    
    // Scroll Animations (Intersection Observer)
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Add stagger effect for grid items
                if (entry.target.classList.contains('problem-card') || 
                    entry.target.classList.contains('achievement-card') ||
                    entry.target.classList.contains('package-item') ||
                    entry.target.classList.contains('testimonial-card')) {
                    
                    const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100;
                    entry.target.style.animationDelay = delay + 'ms';
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll([
        '.problem-card',
        '.achievement-card',
        '.package-item',
        '.testimonial-card',
        '.faq-item',
        '.benefit',
        '.credential',
        '.hero-label',
        '.biblical-quote'
    ].join(', '));
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // Button Hover Effects
    const buttons = document.querySelectorAll('.btn-primary, .btn-checkout');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Checkout Button Click Handler
    const checkoutBtn = document.getElementById('checkout-btn');
    
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add loading state
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Redirecionando...';
            this.style.opacity = '0.8';
            this.style.pointerEvents = 'none';
            
            // Simulate redirect delay
            setTimeout(() => {
                // Replace with actual checkout URL
                alert('Aqui você seria redirecionado para o checkout real.\nSubstitua esta linha pelo link real do seu sistema de pagamento.');
                
                // Reset button
                this.innerHTML = originalText;
                this.style.opacity = '1';
                this.style.pointerEvents = 'auto';
            }, 2000);
        });
    }
    
    // Number Counter Animation for Stats
    function animateNumbers() {
        const numbers = document.querySelectorAll('.stat-number');
        
        numbers.forEach(number => {
            const text = number.textContent;
            let target = parseInt(text);
            const hasPercent = text.includes('%');
            
            if (isNaN(target)) return;
            
            const increment = target / 30;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                number.textContent = Math.floor(current) + (hasPercent ? '%' : '');
            }, 50);
        });
    }
    
    // Trigger number animation when stats section is visible
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumbers();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const statsSection = document.querySelector('.package-stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
    
    // Smooth scroll to investment section on CTA click
    const heroCtaBtn = document.querySelector('.hero .btn-primary');
    if (heroCtaBtn) {
        heroCtaBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const investmentSection = document.querySelector('#investimento');
            if (investmentSection) {
                const offsetTop = investmentSection.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // Form validation for contact inputs (if any)
    const inputs = document.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.borderColor = '#d4a574';
            this.style.boxShadow = '0 0 0 3px rgba(212, 165, 116, 0.1)';
        });
        
        input.addEventListener('blur', function() {
            this.style.borderColor = '';
            this.style.boxShadow = '';
        });
    });
    
    // Scroll to top functionality
    const scrollToTop = document.createElement('button');
    scrollToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTop.className = 'scroll-to-top';
    scrollToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #d4a574, #b8956a);
        border: none;
        border-radius: 50%;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(180, 149, 106, 0.3);
    `;
    
    document.body.appendChild(scrollToTop);
    
    scrollToTop.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    scrollToTop.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
        this.style.boxShadow = '0 6px 20px rgba(180, 149, 106, 0.4)';
    });
    
    scrollToTop.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 15px rgba(180, 149, 106, 0.3)';
    });
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollToTop.style.opacity = '1';
            scrollToTop.style.visibility = 'visible';
        } else {
            scrollToTop.style.opacity = '0';
            scrollToTop.style.visibility = 'hidden';
        }
    });
    
    // Page Load Animation
    function pageLoadAnimation() {
        const hero = document.querySelector('.hero');
        const heroElements = hero.querySelectorAll('.hero-label, .hero-title, .hero-subtitle, .hero-description, .hero-cta');
        
        heroElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.6s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 150);
        });
        
        // Animate product image
        const productImage = document.querySelector('.product-image');
        if (productImage) {
            productImage.style.opacity = '0';
            productImage.style.transform = 'scale(0.9)';
            
            setTimeout(() => {
                productImage.style.transition = 'all 0.8s ease';
                productImage.style.opacity = '1';
                productImage.style.transform = 'scale(1)';
            }, 300);
        }
    }
    
    // Initialize page animations
    setTimeout(pageLoadAnimation, 200);
    
    // Add loading state to external links
    const externalLinks = document.querySelectorAll('a[href^="http"]');
    
    externalLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (!link.querySelector('.fa-spinner')) {
                const loadingIcon = document.createElement('i');
                loadingIcon.className = 'fas fa-spinner fa-spin';
                loadingIcon.style.marginLeft = '8px';
                this.appendChild(loadingIcon);
                
                setTimeout(() => {
                    if (loadingIcon.parentNode) {
                        loadingIcon.parentNode.removeChild(loadingIcon);
                    }
                }, 3000);
            }
        });
    });
    
    // Lazy loading for images (excluindo fotos importantes)
    const images = document.querySelectorAll('img:not(.instructor-photo):not(.logo):not(.product-image):not(.footer-logo)');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.3s ease';
                
                img.onload = function() {
                    this.style.opacity = '1';
                };
                
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
    
    // ===================================
    // MAGICAL SPARKLES EFFECT
    // ===================================
    
    function createSparkles() {
        const heroBackground = document.querySelector('.hero-background');
        if (!heroBackground) return;
        
        // Create 20 sparkles
        for (let i = 0; i < 20; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            
            // Random position
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.animationDelay = Math.random() * 12 + 's';
            
            // Random size variation
            const size = 3 + Math.random() * 4;
            sparkle.style.width = size + 'px';
            sparkle.style.height = size + 'px';
            
            heroBackground.appendChild(sparkle);
        }
    }
    
    // Initialize sparkles
    createSparkles();
    
    // Garantir que a foto da Suellen e logo do footer estejam sempre visíveis
    const suellenPhoto = document.querySelector('.instructor-photo');
    if (suellenPhoto) {
        suellenPhoto.style.opacity = '1';
        suellenPhoto.style.visibility = 'visible';
        suellenPhoto.style.transition = 'none';
    }
    

    
    // ===================================
    // SCROLL PROGRESS BAR
    // ===================================
    
    const progressBar = document.querySelector('.progress-bar');
    
    function updateScrollProgress() {
        const scrollTop = window.scrollY;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        if (progressBar) {
            progressBar.style.width = scrollPercent + '%';
        }
    }
    
    // Update progress on scroll
    window.addEventListener('scroll', updateScrollProgress);
    
    // Initialize progress bar
    updateScrollProgress();
    
    console.log('✅ A Tal Maneira - Landing Page carregada com sucesso!');
    console.log('🎯 Design clean e moderno implementado');
    console.log('🎨 Paleta baseada na imagem do produto aplicada');
    console.log('✨ Partículas mágicas douradas ativadas');
    console.log('📊 Barra de progresso de scroll ativada');
});