document.addEventListener('DOMContentLoaded', () => {

    // 1. Navigation Scrolled State & Mobile Menu
    const navbar = document.querySelector('.navbar');
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = menuBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.replace('bx-menu', 'bx-x');
        } else {
            icon.classList.replace('bx-x', 'bx-menu');
        }
    });

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuBtn.querySelector('i').classList.replace('bx-x', 'bx-menu');
        });
    });

    // 2. Active Nav Link on Scroll
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(link => {
            link.classList.remove('active');
            if (current && link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // 3. Typewriter Effect
    const words = ["Full-Stack Developer", "MERN Stack Specialist", "C++ Enthusiast", "Problem Solver"];
    let i = 0;
    let timer;
    const typingText = document.querySelector('.typing-text');
    
    function typingEffect() {
        let word = words[i].split("");
        var loopTyping = function() {
            if (word.length > 0) {
                typingText.innerHTML += word.shift();
            } else {
                setTimeout(deletingEffect, 2000);
                return;
            }
            timer = setTimeout(loopTyping, 100);
        };
        loopTyping();
    }

    function deletingEffect() {
        let word = words[i].split("");
        var loopDeleting = function() {
            if (word.length > 0) {
                word.pop();
                typingText.innerHTML = word.join("");
            } else {
                if (words.length > (i + 1)) {
                    i++;
                } else {
                    i = 0;
                }
                setTimeout(typingEffect, 500);
                return;
            }
            timer = setTimeout(loopDeleting, 50);
        };
        loopDeleting();
    }
    
    if(typingText) {
        typingEffect();
    }

    // 4. Scroll Reveal Animations (Intersection Observer)
    const fadeElements = document.querySelectorAll('.fade-up');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => observer.observe(el));

    // 5. Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', async function (event) {
            event.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Sending...';
            submitBtn.disabled = true;

            const formData = new FormData(this);

            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });
                
                const data = await response.json();

                if (data.success) {
                    formStatus.textContent = 'Message sent successfully!';
                    formStatus.style.color = '#10b981';
                    contactForm.reset();
                } else {
                    formStatus.textContent = data.message || 'Something went wrong. Please try again.';
                    formStatus.style.color = '#ef4444';
                }
            } catch (error) {
                formStatus.textContent = 'Network error. Please try again later.';
                formStatus.style.color = '#ef4444';
            } finally {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                
                setTimeout(() => {
                    formStatus.textContent = '';
                }, 5000);
            }
        });
    }

    // 6. Image Modal (Lightbox)
    const modal = document.getElementById('certModal');
    const modalImg = document.getElementById('certModalImg');
    const modalCaption = document.getElementById('certModalCaption');
    const closeBtn = document.querySelector('.modal-close');
    const certImages = document.querySelectorAll('.cert-img');

    if (modal && certImages.length > 0) {
        certImages.forEach(img => {
            img.parentElement.addEventListener('click', function() {
                // To allow click on entire placeholder, find the img inside it
                const image = this.querySelector('.cert-img');
                if (image && image.getAttribute('src') && image.getAttribute('src') !== '') {
                    modal.classList.add('show');
                    modalImg.src = image.src;
                    modalCaption.innerHTML = image.alt || 'Certificate';
                    document.body.style.overflow = 'hidden'; // Prevent background scroll
                }
            });
        });

        const closeModal = () => {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto'; // Re-enable scroll
        };

        if(closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }

        // Close on background click
        modal.addEventListener('click', (e) => {
            if (e.target !== modalImg) {
                closeModal();
            }
        });
    }
});
