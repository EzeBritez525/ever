// =======================
// ANIMATIONS ON SCROLL
// =======================

// Intersection Observer para animaciones al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos con animación
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.benefit-card, .product-card, .testimonial-card');
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
});

// =======================
// NAVBAR SCROLL EFFECT
// =======================

let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Agregar sombra al navbar cuando se hace scroll
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.classList.remove('scrolled');
        navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
    }
    
    lastScroll = currentScroll;
});

// =======================
// SMOOTH SCROLL
// =======================

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

// =======================
// CAROUSEL AUTO-PAUSE ON HOVER
// =======================

const carousel = document.querySelector('#heroCarousel');
if (carousel) {
    carousel.addEventListener('mouseenter', () => {
        const bsCarousel = bootstrap.Carousel.getInstance(carousel);
        if (bsCarousel) {
            bsCarousel.pause();
        }
    });
    
    carousel.addEventListener('mouseleave', () => {
        const bsCarousel = bootstrap.Carousel.getInstance(carousel);
        if (bsCarousel) {
            bsCarousel.cycle();
        }
    });
}

// =======================
// LAZY LOADING IMAGES
// =======================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
    });
}

// =======================
// PRODUCT CARD INTERACTIONS
// =======================

document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// =======================
// WHATSAPP BUTTON TRACKING
// =======================

const whatsappButton = document.querySelector('.whatsapp-float');
if (whatsappButton) {
    whatsappButton.addEventListener('click', () => {
        // Opcional: tracking analytics
        console.log('WhatsApp button clicked');
    });
}

// =======================
// NAVBAR COLLAPSE ON CLICK (MOBILE)
// =======================

document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    link.addEventListener('click', () => {
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse.classList.contains('show')) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse);
            bsCollapse.hide();
        }
    });
});

// =======================
// CAROUSEL TOUCH SWIPE ENHANCEMENT
// =======================

let touchStartX = 0;
let touchEndX = 0;

if (carousel) {
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const bsCarousel = bootstrap.Carousel.getInstance(carousel);
        
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left - next
            if (bsCarousel) bsCarousel.next();
        }
        
        if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right - prev
            if (bsCarousel) bsCarousel.prev();
        }
    }
}

// =======================
// PERFORMANCE: Preload next carousel image
// =======================

if (carousel) {
    carousel.addEventListener('slide.bs.carousel', (e) => {
        const nextItem = e.relatedTarget;
        if (nextItem) {
            const nextImg = nextItem.querySelector('img');
            if (nextImg && nextImg.loading === 'lazy') {
                nextImg.loading = 'eager';
            }
        }
    });
}

// =======================
// SECTION REVEAL ANIMATION
// =======================

const revealSections = () => {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.75) {
            section.classList.add('revealed');
        }
    });
};

window.addEventListener('scroll', revealSections);
window.addEventListener('load', revealSections);

// =======================
// TESTIMONIALS AUTO-ROTATE (Optional)
// =======================

// Opcional: rotar testimonios automáticamente
// Descomenta si quieres agregar esta funcionalidad

/*
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-card');

function rotateTestimonials() {
    if (testimonials.length > 0) {
        testimonials.forEach(t => t.style.opacity = '0.5');
        testimonials[currentTestimonial].style.opacity = '1';
        testimonials[currentTestimonial].style.transform = 'scale(1.02)';
        
        setTimeout(() => {
            testimonials[currentTestimonial].style.transform = 'scale(1)';
        }, 300);
        
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    }
}

setInterval(rotateTestimonials, 5000);
*/

// =======================
// LOADING STATE
// =======================

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Opcional: ocultar loading spinner si lo tienes
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 300);
    }
});

// =======================
// CONSOLE MESSAGE
// =======================

console.log('%c🛍️ EverShop ', 'background: #2a2a2a; color: #F4F0E5; font-size: 20px; padding: 10px; font-weight: bold;');
console.log('%cDiseñá tu estilo en cada prenda', 'color: #555; font-size: 14px; font-style: italic;');
