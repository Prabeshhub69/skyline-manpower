// Mobile Menu Togggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const closeMenuBtn = document.getElementById('close-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

function toggleMenu() {
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : 'auto';
}

if (mobileMenuBtn && closeMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', toggleMenu);
    closeMenuBtn.addEventListener('click', toggleMenu);
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });
}

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Active Link Highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current) && current !== '') {
            link.classList.add('active');
        }
    });
});

// Scroll Animation Observer (Fade In Up)
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Stop observing once visible
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    // Check initial scroll position for navbar
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    }
    
    // Add elements to observer
    document.querySelectorAll('.fade-in-up').forEach((el) => {
        observer.observe(el);
    });

    // FAQ Accordion Toggle
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            
            // Allow multiple accordions to be open, or close others
            const allItems = document.querySelectorAll('.faq-item');
            allItems.forEach(item => {
                const otherQuestion = item.querySelector('.faq-question');
                const otherAnswer = item.querySelector('.faq-answer');
                
                // If this is another item and it's active, close it
                if (otherQuestion !== question && otherQuestion.classList.contains('active')) {
                    otherQuestion.classList.remove('active');
                    otherAnswer.style.maxHeight = null;
                }
            });
            
            // Toggle current FAQ
            question.classList.toggle('active');
            if (question.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + "px";
            } else {
                answer.style.maxHeight = null;
            }
        });
    });

    // Testimonial Carousel
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevTestimonial');
    const nextBtn = document.getElementById('nextTestimonial');
    
    if (slides.length > 0) {
        let currentSlide = 0;
        let slideInterval;

        const showSlide = (index) => {
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            slides[index].classList.add('active');
            dots[index].classList.add('active');
            currentSlide = index;
        };

        const nextSlide = () => {
            let nextIndex = (currentSlide + 1) % slides.length;
            showSlide(nextIndex);
        };

        const prevSlide = () => {
            let prevIndex = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(prevIndex);
        };

        const startSlider = () => {
            slideInterval = setInterval(nextSlide, 5000); // 5 seconds
        };

        const stopSlider = () => {
            clearInterval(slideInterval);
        };

        // Event Listeners
        if(nextBtn && prevBtn){
            nextBtn.addEventListener('click', () => {
                nextSlide();
                stopSlider();
                startSlider();
            });
            
            prevBtn.addEventListener('click', () => {
                prevSlide();
                stopSlider();
                startSlider();
            });
        }

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
                stopSlider();
                startSlider();
            });
        });

        // Pause on hover
        const carouselContainer = document.querySelector('.testimonial-carousel-container');
        if(carouselContainer){
            carouselContainer.addEventListener('mouseenter', stopSlider);
            carouselContainer.addEventListener('mouseleave', startSlider);
        }

        // Initialize Auto Play
        startSlider();
    }

    // Initialize Particles.js
    if (document.getElementById('particles-js')) {
        // ... (particlesJS configuration remains same)
        particlesJS("particles-js", {
            "particles": {
                "number": { "value": 30, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": ["#3b82f6", "#8b5cf6", "#e2e8f0"] },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.3 },
                "size": { "value": 3, "random": true },
                "line_linked": { "enable": true, "distance": 150, "color": "#cbd5e1", "opacity": 0.2 },
                "move": { "enable": true, "speed": 1 }
            },
            "interactivity": {
                "events": {
                    "onhover": { "enable": true, "mode": "grab" },
                    "onclick": { "enable": true, "mode": "push" }
                }
            }
        });
    }

    // Initialize Job Roles Carousel
    initRolesCarousel();

    // Initialize GSAP Stats Counter
    initStatsCounter();




    function initRolesCarousel() {
        const slider = document.getElementById('rolesSlider');
        const prevBtn = document.getElementById('rolesPrev');
        const nextBtn = document.getElementById('rolesNext');
        
        if (!slider || !prevBtn || !nextBtn) return;

        let currentIndex = 0;
        const totalItems = slider.children.length;

        function getItemsPerView() {
            if (window.innerWidth <= 480) return 1;
            if (window.innerWidth <= 768) return 2;
            if (window.innerWidth <= 1024) return 3;
            return 4;
        }

        function updateSlider() {
            const itemsPerView = getItemsPerView();
            const maxIndex = totalItems - itemsPerView;
            
            if (currentIndex > maxIndex) currentIndex = maxIndex;
            if (currentIndex < 0) currentIndex = 0;

            const translateX = -(currentIndex * (100 / itemsPerView));
            slider.style.transform = `translateX(${translateX}%)`;

            // Update button states
            prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
            prevBtn.style.cursor = currentIndex === 0 ? 'default' : 'pointer';
            nextBtn.style.opacity = currentIndex >= maxIndex ? '0.5' : '1';
            nextBtn.style.cursor = currentIndex >= maxIndex ? 'default' : 'pointer';
        }

        nextBtn.addEventListener('click', () => {
            const itemsPerView = getItemsPerView();
            const maxIndex = totalItems - itemsPerView;
            if (currentIndex < maxIndex) {
                currentIndex++;
                updateSlider();
            }
        });

        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateSlider();
            }
        });

        window.addEventListener('resize', updateSlider);
        updateSlider();
    }

    function initStatsCounter() {
        const statsSection = document.getElementById('company-stats');
        const statCounts = document.querySelectorAll('.stat-count');
        const statCards = document.querySelectorAll('.stat-card');
        const statsHeader = document.querySelector('.stats-header');

        if (!statsSection || !statCounts.length) return;

        // If GSAP is not available, just show final numbers immediately
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
            statCounts.forEach(counter => {
                counter.textContent = parseInt(counter.getAttribute('data-target')).toLocaleString();
            });
            return;
        }

        gsap.registerPlugin(ScrollTrigger);

        // Set initial states explicitly
        gsap.set(statCards, { y: 50, opacity: 0 });
        gsap.set(statsHeader, { y: 30, opacity: 0 });

        // Animate header in
        gsap.to(statsHeader, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: statsSection,
                start: 'top 85%',
                once: true
            }
        });

        // Animate stat cards staggered entrance
        gsap.to(statCards, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: statsSection,
                start: 'top 80%',
                once: true
            }
        });

        // Animate each counter using an object tween (reliable approach)
        statCounts.forEach((counter, index) => {
            const target = parseInt(counter.getAttribute('data-target'));
            const obj = { val: 0 };

            gsap.to(obj, {
                val: target,
                duration: 2,
                delay: index * 0.15,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: statsSection,
                    start: 'top 80%',
                    once: true
                },
                onUpdate: function () {
                    counter.textContent = Math.ceil(obj.val).toLocaleString();
                }
            });
        });
    }
});
