// ============================================
// MENÚ ELEGANTE - NUEVO CÓDIGO
// ============================================

// Elementos del menú
const header = document.querySelector('.main-header');
const menuToggle = document.getElementById('menuToggle');
const closeMenu = document.getElementById('closeMenu');
const mobileMenu = document.getElementById('mobileMenu');
const mobileItems = document.querySelectorAll('.mobile-nav-item');

// Efecto scroll en header
let lastScroll = 0;

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    // Header background al hacer scroll
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Esconder/mostrar header según dirección del scroll
    if (currentScroll > lastScroll && currentScroll > 100) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
        if (currentScroll > 50) {
            header.classList.add('header-scroll-effect');
        }
    }
    
    lastScroll = currentScroll;
});

// Menú móvil
menuToggle.addEventListener('click', function() {
    mobileMenu.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Animación del botón hamburguesa
    const bars = this.querySelectorAll('.bar');
    bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    bars[1].style.opacity = '0';
    bars[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
});

closeMenu.addEventListener('click', function() {
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
    
    // Resetear botón hamburguesa
    const bars = menuToggle.querySelectorAll('.bar');
    bars[0].style.transform = 'none';
    bars[1].style.opacity = '1';
    bars[2].style.transform = 'none';
});

// Cerrar menú al hacer clic en un enlace
mobileItems.forEach(item => {
    item.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
        
        // Resetear botón hamburguesa
        const bars = menuToggle.querySelectorAll('.bar');
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
    });
});

// Cerrar menú al hacer clic fuera
document.addEventListener('click', function(event) {
    if (!mobileMenu.contains(event.target) && !menuToggle.contains(event.target) && mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
        
        // Resetear botón hamburguesa
        const bars = menuToggle.querySelectorAll('.bar');
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
    }
});

// ============================================
// TESTIMONIOS SLIDER
// ============================================
const testimonios = document.querySelectorAll('.testimonio');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.prev-testimonio');
const nextBtn = document.querySelector('.next-testimonio');
let currentTestimonio = 0;
let testimonioInterval;

function showTestimonio(index) {
    // Ocultar todos
    testimonios.forEach(testimonio => {
        testimonio.classList.remove('active');
    });
    
    // Remover active de todos los dots
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Mostrar el actual
    testimonios[index].classList.add('active');
    dots[index].classList.add('active');
    currentTestimonio = index;
}

// Inicializar slider
function initTestimoniosSlider() {
    if (testimonios.length > 0) {
        showTestimonio(0);
        
        // Event listeners para dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showTestimonio(index);
                resetTestimonioInterval();
            });
        });
        
        // Event listeners para botones
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                let newIndex = currentTestimonio - 1;
                if (newIndex < 0) newIndex = testimonios.length - 1;
                showTestimonio(newIndex);
                resetTestimonioInterval();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                let newIndex = currentTestimonio + 1;
                if (newIndex >= testimonios.length) newIndex = 0;
                showTestimonio(newIndex);
                resetTestimonioInterval();
            });
        }
        
        // Auto-avance cada 5 segundos
        testimonioInterval = setInterval(() => {
            let newIndex = currentTestimonio + 1;
            if (newIndex >= testimonios.length) newIndex = 0;
            showTestimonio(newIndex);
        }, 5000);
    }
}

function resetTestimonioInterval() {
    clearInterval(testimonioInterval);
    testimonioInterval = setInterval(() => {
        let newIndex = currentTestimonio + 1;
        if (newIndex >= testimonios.length) newIndex = 0;
        showTestimonio(newIndex);
    }, 5000);
}

// ============================================
// RATING DE ESTRELLAS
// ============================================
const estrellas = document.querySelectorAll('.estrellas-calificacion i');
const ratingValue = document.getElementById('ratingValue');

function initRatingStars() {
    if (estrellas.length > 0) {
        estrellas.forEach(estrella => {
            estrella.addEventListener('click', function() {
                const value = this.getAttribute('data-rating');
                if (ratingValue) ratingValue.value = value;
                
                // Actualizar visualmente
                estrellas.forEach((star, index) => {
                    if (index < value) {
                        star.classList.add('active');
                        star.classList.remove('far');
                        star.classList.add('fas');
                    } else {
                        star.classList.remove('active');
                        star.classList.remove('fas');
                        star.classList.add('far');
                    }
                });
            });
            
            // Hover effect
            estrella.addEventListener('mouseover', function() {
                const value = this.getAttribute('data-rating');
                estrellas.forEach((star, index) => {
                    if (index < value) {
                        star.style.color = '#D4A574';
                    } else {
                        star.style.color = '#ddd';
                    }
                });
            });
            
            estrella.addEventListener('mouseout', function() {
                const currentValue = ratingValue ? ratingValue.value : 0;
                estrellas.forEach((star, index) => {
                    if (index < currentValue) {
                        star.style.color = '#D4A574';
                    } else {
                        star.style.color = '#ddd';
                    }
                });
            });
        });
    }
}

// ============================================
// FORMULARIO TESTIMONIO
// ============================================
const testimonioForm = document.getElementById('testimonioForm');

function initTestimonioForm() {
    if (testimonioForm) {
        testimonioForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const rating = ratingValue ? ratingValue.value : '0';
            if (rating === '0') {
                mostrarNotificacion('Por favor califica con estrellas', 'warning');
                return;
            }
            
            // Obtener datos del formulario
            const nombre = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const mensaje = this.querySelector('textarea').value;
            
            // Validación básica
            if (!nombre || !email || !mensaje) {
                mostrarNotificacion('Por favor completa todos los campos', 'warning');
                return;
            }
            
            // Validar email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                mostrarNotificacion('Por favor ingresa un email válido', 'warning');
                return;
            }
            
            // Simular envío
            const btn = this.querySelector('button[type="submit"]');
            const originalHTML = btn.innerHTML;
            
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            btn.disabled = true;
            
            // Simular delay de envío
            setTimeout(() => {
                // Éxito
                btn.innerHTML = '<i class="fas fa-check"></i> ¡Enviado!';
                btn.style.background = '#2E7D32';
                
                // Resetear después de 2 segundos
                setTimeout(() => {
                    testimonioForm.reset();
                    if (ratingValue) ratingValue.value = '0';
                    
                    // Resetear estrellas
                    if (estrellas.length > 0) {
                        estrellas.forEach(star => {
                            star.classList.remove('active');
                            star.classList.remove('fas');
                            star.classList.add('far');
                            star.style.color = '';
                        });
                    }
                    
                    // Restaurar botón
                    btn.innerHTML = originalHTML;
                    btn.disabled = false;
                    btn.style.background = '';
                    
                    // Mostrar mensaje de éxito
                    mostrarNotificacion('Gracias por tu testimonio. Será revisado antes de publicarse.', 'success');
                }, 2000);
            }, 1500);
        });
    }
}

// ============================================
// BOTÓN SCROLL TOP
// ============================================
const scrollTopBtn = document.getElementById('scrollTopBtn');

function initScrollTop() {
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });
        
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ============================================
// NOTIFICACIONES
// ============================================
function mostrarNotificacion(mensaje, tipo = 'info') {
    // Crear elemento de notificación
    const notificacion = document.createElement('div');
    notificacion.className = 'notificacion-flotante';
    
    let icono = 'fa-info-circle';
    let color = '#2196F3';
    
    if (tipo === 'success') {
        icono = 'fa-check-circle';
        color = '#2E7D32';
    } else if (tipo === 'warning') {
        icono = 'fa-exclamation-triangle';
        color = '#FF9800';
    } else if (tipo === 'error') {
        icono = 'fa-times-circle';
        color = '#D32F2F';
    }
    
    notificacion.innerHTML = `
        <div class="notificacion-contenido">
            <i class="fas ${icono}"></i>
            <span>${mensaje}</span>
        </div>
    `;
    
    notificacion.style.background = color;
    
    // Añadir al body
    document.body.appendChild(notificacion);
    
    // Mostrar con animación
    setTimeout(() => {
        notificacion.classList.add('show');
    }, 10);
    
    // Ocultar después de 4 segundos
    setTimeout(() => {
        notificacion.classList.remove('show');
        setTimeout(() => {
            if (notificacion.parentNode) {
                notificacion.parentNode.removeChild(notificacion);
            }
        }, 300);
    }, 4000);
}

// ============================================
// SCROLL SUAVE PARA ENLACES INTERNOS
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Solo si es un enlace interno (no a otra página)
            if (href.startsWith('#') && href !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.main-header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// ============================================
// DETECTAR PÁGINA ACTUAL
// ============================================
function setActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-item, .mobile-nav-item');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        if (href === currentPage || 
            (currentPage === '' && href === 'index.html') ||
            (href === 'index.html' && currentPage.includes('index'))) {
            link.classList.add('active');
        }
    });
}

// ============================================
// ANIMACIONES AL SCROLL
// ============================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    // Observar elementos a animar
    document.querySelectorAll('.feature, .valor-card, .proyecto-card, .especialidad').forEach(el => {
        observer.observe(el);
    });
}

// ============================================
// INICIALIZACIÓN
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todas las funcionalidades
    setActiveNav();
    initTestimoniosSlider();
    initRatingStars();
    initTestimonioForm();
    initScrollTop();
    initSmoothScroll();
    initScrollAnimations();
    
    // Actualizar año en el footer
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        yearElement.innerHTML = yearElement.innerHTML.replace('2024', new Date().getFullYear());
    }
    
    // Añadir clase de animación a elementos al cargar
    setTimeout(() => {
        document.querySelectorAll('.feature, .valor-card, .proyecto-card, .especialidad').forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(20px)';
                el.classList.add('animated');
            }, index * 100);
        });
    }, 500);
    
    // Efecto hover suave en items del menú
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        item.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(0)';
            }
        });
    });
});

// ============================================
// PREVENIR ENVÍO DE FORMULARIOS POR DEFECTO
// ============================================
document.addEventListener('submit', function(e) {
    if (e.target.tagName === 'FORM' && !e.target.id) {
        e.preventDefault();
        mostrarNotificacion('Formulario enviado correctamente', 'success');
        e.target.reset();
    }
});

// ============================================
// CARGAR IMÁGENES PESADAS CON LAZY LOAD
// ============================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}