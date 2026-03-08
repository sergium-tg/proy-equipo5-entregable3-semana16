Ñ// js/main.js

// Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    // Toggle mobile menu
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.innerHTML = navMenu.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's a regular link or empty
            if (href === '#' || href.startsWith('#') === false) return;
            
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.main-header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Sticky header hide/show on scroll
    const header = document.querySelector('.main-header');
    let lastScroll = 0;
    const hideThreshold = 150;
    
    window.addEventListener('scroll', () => {
        if (!header) return;

        const currentScroll = window.pageYOffset;

        header.style.boxShadow = currentScroll > 100
            ? '0 4px 12px rgba(0,0,0,0.1)'
            : '0 2px 8px rgba(0,0,0,0.08)';

        if (currentScroll <= 0) {
            header.classList.remove('is-hidden');
        } else if (currentScroll > lastScroll && currentScroll > hideThreshold) {
            header.classList.add('is-hidden');
        } else if (currentScroll < lastScroll) {
            header.classList.remove('is-hidden');
        }

        lastScroll = currentScroll;
    });
    
    // Form submission handling
    const contactForms = document.querySelectorAll('.contact-form');
    
    contactForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());
            
            // Basic validation
            if (!validateForm(data)) {
                showAlert('Por favor complete todos los campos requeridos correctamente.', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitBtn.disabled = true;
            
            // Simulate API call (replace with actual API endpoint)
            setTimeout(() => {
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Show success message
                showAlert('Â¡Mensaje enviado con Ã©xito! Nos pondremos en contacto pronto.', 'success');
                
                // Reset form
                this.reset();
                
                // For demo purposes - log data to console
                console.log('Form data:', data);
                
            }, 1500);
        });
    });
    
    // Form validation function
    function validateForm(data) {
        // Check required fields
        if (!data.nombre || !data.telefono || !data.email) {
            return false;
        }

        // Privacy policy acceptance when present
        if ('privacidad' in data && !data.privacidad) {
            return false;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            return false;
        }
        
        // Phone validation (basic)
        const phoneRegex = /^[0-9\s\-\+\(\)]{10,}$/;
        if (!phoneRegex.test(data.telefono)) {
            return false;
        }
        
        return true;
    }
    
    // Alert function
    function showAlert(message, type = 'info') {
        // Remove existing alerts
        const existingAlert = document.querySelector('.custom-alert');
        if (existingAlert) existingAlert.remove();
        
        // Create alert element
        const alert = document.createElement('div');
        alert.className = `custom-alert alert-${type}`;
        alert.innerHTML = `
            <div class="alert-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
                <span>${message}</span>
                <button class="alert-close"><i class="fas fa-times"></i></button>
            </div>
        `;
        
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .custom-alert {
                position: fixed;
                top: 100px;
                right: 20px;
                z-index: 10000;
                min-width: 300px;
                max-width: 400px;
                background: white;
                border-radius: 8px;
                box-shadow: 0 8px 24px rgba(0,0,0,0.15);
                overflow: hidden;
                animation: slideIn 0.3s ease;
            }
            
            .alert-success {
                border-left: 4px solid #27ae60;
            }
            
            .alert-error {
                border-left: 4px solid #e74c3c;
            }
            
            .alert-info {
                border-left: 4px solid #3498db;
            }
            
            .alert-content {
                display: flex;
                align-items: center;
                padding: 1rem 1.5rem;
                gap: 1rem;
            }
            
            .alert-content i:first-child {
                font-size: 1.2rem;
            }
            
            .alert-success .alert-content i:first-child {
                color: #27ae60;
            }
            
            .alert-error .alert-content i:first-child {
                color: #e74c3c;
            }
            
            .alert-close {
                background: none;
                border: none;
                margin-left: auto;
                cursor: pointer;
                color: #666;
                font-size: 0.9rem;
            }
            
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Add to page
        document.body.appendChild(alert);
        
        // Add close functionality
        const closeBtn = alert.querySelector('.alert-close');
        closeBtn.addEventListener('click', () => {
            alert.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => alert.remove(), 300);
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (alert.parentElement) {
                alert.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => alert.remove(), 300);
            }
        }, 5000);
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.servicio-card, .beneficio').forEach(el => {
        observer.observe(el);
    });

    // Clientes carousel controls (show 4 at a time)
    const clientesCarousel = document.querySelector('.clientes-carousel');
    if (clientesCarousel) {
        const track = clientesCarousel.querySelector('.clientes-track');
        const prevBtn = clientesCarousel.querySelector('.carousel-btn.prev');
        const nextBtn = clientesCarousel.querySelector('.carousel-btn.next');
        const cards = Array.from(track.querySelectorAll('.cliente-card'));
        let isAnimating = false;
        const visibleCards = 4; // Number of cards to show at once
        let currentIndex = 0;

        // Set initial position
        updateTrackPosition();

        // Clone cards for infinite loop
        const totalCards = cards.length;
        const totalClones = visibleCards * 2; // Clone enough cards for smooth transitions
        
        // Add clones to the beginning and end of the track
        for (let i = 0; i < totalClones; i++) {
            const cloneFront = cards[i % totalCards].cloneNode(true);
            const cloneBack = cards[totalCards - 1 - (i % totalCards)].cloneNode(true);
            track.appendChild(cloneFront);
            track.insertBefore(cloneBack, track.firstChild);
        }

        // Update track position based on current index
        function updateTrackPosition() {
            const cardWidth = cards[0].offsetWidth;
            const gap = parseFloat(getComputedStyle(track).gap || 0);
            const offset = (cardWidth + gap) * visibleCards * -currentIndex;
            track.style.transform = `translateX(${offset}px)`;
        }

        // Handle carousel navigation
        function moveCarousel(direction = 'next') {
            if (isAnimating) return;
            isAnimating = true;
            
            // Set up transition
            track.style.transition = 'transform 0.5s ease';
            
            // Update current index
            if (direction === 'next') {
                currentIndex++;
                if (currentIndex > Math.ceil(cards.length / visibleCards)) {
                    // Reset to first set without animation
                    setTimeout(() => {
                        track.style.transition = 'none';
                        currentIndex = 0;
                        updateTrackPosition();
                    }, 500);
                }
            } else {
                currentIndex--;
                if (currentIndex < 0) {
                    // Reset to last set without animation
                    currentIndex = Math.floor((cards.length - 1) / visibleCards);
                    updateTrackPosition();
                    // Force reflow
                    void track.offsetWidth;
                    currentIndex--;
                }
            }
            
            // Update position with animation
            updateTrackPosition();
            
            // Reset animation flag after transition
            track.addEventListener('transitionend', () => {
                isAnimating = false;
            }, { once: true });
        }

        // Button event listeners
        prevBtn.addEventListener('click', () => moveCarousel('prev'));
        nextBtn.addEventListener('click', () => moveCarousel('next'));
        
        // Auto-advance carousel
        let autoSlide = setInterval(() => moveCarousel('next'), 5000);
        
        // Pause auto-slide on hover
        clientesCarousel.addEventListener('mouseenter', () => {
            clearInterval(autoSlide);
        });
        
        clientesCarousel.addEventListener('mouseleave', () => {
            autoSlide = setInterval(() => moveCarousel('next'), 5000);
        });
    }
});

// Additional form validation for specific pages
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                validateField(input);
            });
        });
    });
    
    function validateField(field) {
        const value = field.value.trim();
        const errorElement = field.parentElement.querySelector('.error-message') || 
                           createErrorElement(field);
        
        // Clear previous error
        errorElement.textContent = '';
        field.style.borderColor = '';
        
        // Validate based on field type
        if (field.required && !value) {
            showError(field, errorElement, 'Este campo es requerido');
            return false;
        }
        
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showError(field, errorElement, 'Ingrese un correo electrÃ³nico vÃ¡lido');
                return false;
            }
        }
        
        if (field.type === 'tel' && value) {
            const phoneRegex = /^[0-9\s\-\+\(\)]{10,}$/;
            if (!phoneRegex.test(value.replace(/\s/g, ''))) {
                showError(field, errorElement, 'Ingrese un nÃºmero de telÃ©fono vÃ¡lido');
                return false;
            }
        }
        
        return true;
    }
    
    function createErrorElement(field) {
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.style.color = '#e74c3c';
        errorElement.style.fontSize = '0.85rem';
        errorElement.style.marginTop = '0.25rem';
        field.parentElement.appendChild(errorElement);
        return errorElement;
    }
    
    function showError(field, errorElement, message) {
        errorElement.textContent = message;
        field.style.borderColor = '#e74c3c';
        field.style.boxShadow = '0 0 0 3px rgba(231, 76, 60, 0.1)';
    }
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFormValidation);
} else {
    initFormValidation();
}

// Carrusel Rectangular de Clientes
function initClientesCarouselRect() {
    const carousel = document.querySelector('.clientes-carousel-rectangular');
    if (!carousel) return;

    const track = carousel.querySelector('.clientes-track-rect');
    const prevBtn = carousel.querySelector('.carousel-btn-rect.prev');
    const nextBtn = carousel.querySelector('.carousel-btn-rect.next');
    const indicators = carousel.querySelectorAll('.carousel-indicators-rect .indicator');
    
    if (!track || !prevBtn || !nextBtn) return;
    
    const slides = Array.from(track.children);
    const slideWidth = slides[0].getBoundingClientRect().width;
    const slidesPerView = Math.floor(track.parentElement.offsetWidth / slideWidth);
    const totalSlides = slides.length;
    const slidesPerGroup = Math.min(slidesPerView, 3); // Mover grupos de 3 mÃ¡ximo
    
    let currentIndex = 0;
    let isAnimating = false;
    
    // Actualizar indicadores
    function updateIndicators() {
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === Math.floor(currentIndex / slidesPerGroup));
        });
    }
    
    // Mover al slide especÃ­fico
    function goToSlide(index) {
        if (isAnimating) return;
        
        isAnimating = true;
        currentIndex = Math.max(0, Math.min(index, totalSlides - slidesPerGroup));
        
        const translateX = -currentIndex * slideWidth;
        track.style.transform = `translateX(${translateX}px)`;
        
        // Habilitar/deshabilitar botones
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= totalSlides - slidesPerGroup;
        
        updateIndicators();
        
        // Reset animating flag
        setTimeout(() => {
            isAnimating = false;
        }, 500);
    }
    
    // Event Listeners
    prevBtn.addEventListener('click', () => {
        goToSlide(currentIndex - slidesPerGroup);
    });
    
    nextBtn.addEventListener('click', () => {
        goToSlide(currentIndex + slidesPerGroup);
    });
    
    // Indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            goToSlide(index * slidesPerGroup);
        });
    });
    
    // Auto-slide (opcional)
    let autoSlideInterval = setInterval(() => {
        if (!carousel.matches(':hover')) {
            if (currentIndex + slidesPerGroup >= totalSlides) {
                goToSlide(0);
            } else {
                goToSlide(currentIndex + slidesPerGroup);
            }
        }
    }, 5000);
    
    // Pausar auto-slide al hover
    carousel.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });
    
    carousel.addEventListener('mouseleave', () => {
        autoSlideInterval = setInterval(() => {
            if (currentIndex + slidesPerGroup >= totalSlides) {
                goToSlide(0);
            } else {
                goToSlide(currentIndex + slidesPerGroup);
            }
        }, 5000);
    });
    
    // Inicializar
    goToSlide(0);
    
    // Responsive: recalcular en resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const newSlideWidth = slides[0].getBoundingClientRect().width;
            const translateX = -currentIndex * newSlideWidth;
            track.style.transform = `translateX(${translateX}px)`;
        }, 250);
    });
}

// Inicializar cuando el DOM estÃ© listo
document.addEventListener('DOMContentLoaded', initClientesCarouselRect);© ©½*cascade08
½‘ ‘°*cascade08
°ã ã*cascade08
¼ ¼Ò*cascade08
ÒÓ ÓÕ*cascade08
Õõ õö*cascade08
ö“ ““*cascade08
“¤ ¤å*cascade08
åú ú*cascade08
ƒ ƒ¡*cascade08
¡¢ ¢£*cascade08
£¤ ¤³*cascade08
³´ ´½*cascade08
½¾ ¾À*cascade08
ÀÁ ÁÄ*cascade08
ÄÅ ÅÇ*cascade08
ÇÊ ÊÎ*cascade08
ÎÏ ÏØ*cascade08
ØÙ ÙÜ*cascade08
Üİ İê*cascade08
êì ì÷*cascade08
÷¢" ¢"±#*cascade08
±#ŒD ŒDD*cascade08
D¦D ¦DªD*cascade08
ªD¯D ¯D³D*cascade08
³D¿D ¿DÂD*cascade08
ÂDÃD ÃDÄD*cascade08
ÄDÆD ÆDÇD*cascade08
ÇDÉD ÉDËD*cascade08
ËDÌD ÌDĞD*cascade08ĞDÒD *cascade08ÒDÔD*cascade08ÔDÕD *cascade08ÕDßD*cascade08ßDàD *cascade08àDâD*cascade08âDãD *cascade08
ãDäD äDèD*cascade08èDíD*cascade08
íDîD îDşD*cascade08
şDÿD ÿD€E*cascade08
€E¡E ¡E¢E*cascade08
¢E£E £E¦E*cascade08
¦E§E §E«E*cascade08
«E­E ­E¯E *cascade08¯E³E*cascade08³E´E *cascade08
´EµE µE·E*cascade08
·E¹E ¹EÂE*cascade08
ÂEÃE ÃEÈE*cascade08
ÈEËE ËEÏE*cascade08
ÏEÙE ÙEáE*cascade08
áEçE çEêE*cascade08
êEëE ëEïE*cascade08
ïEòE òEúE*cascade08
úEûE ûEüE*cascade08
üEıE ıEşE*cascade08
şEÿE ÿE„F*cascade08
„F…F …F‡F*cascade08
‡F‰F ‰FF*cascade08
F‘F ‘F”F *cascade08”F•F*cascade08
•F™F ™FœF*cascade08œF¡F*cascade08
¡F¢F ¢F©F*cascade08
©FªF ªF«F*cascade08
«F¬F ¬FáF*cascade08
áFâF âFäF*cascade08
äFèF èFêF*cascade08êFïF*cascade08
ïFğF ğF÷F*cascade08
÷FøF øFùF*cascade08
ùFúF úFûF*cascade08
ûFüF üFıF*cascade08
ıF€G €GG*cascade08
G‚G ‚G‘G*cascade08
‘G’G ’G“G*cascade08
“G”G ”G—G*cascade08
—GšG šGG*cascade08
G¢G ¢G°G *cascade08°G³G*cascade08³G·G *cascade08·G¸G*cascade08¸GƒH*cascade08ƒH‡H *cascade08‡HŠH*cascade08
ŠH‹H ‹HH*cascade08
HH HH*cascade08H‘H *cascade08‘H’H*cascade08’H•H *cascade08•HšH*cascade08šHœH *cascade08œH H*cascade08 HªH *cascade08ªH°H*cascade08°H±H *cascade08±H²H*cascade08²H³H *cascade08³H¶H*cascade08¶H¸H *cascade08
¸H¹H ¹H»H*cascade08
»H¼H ¼H¾H*cascade08
¾H¿H ¿HÅH*cascade08ÅHÆH *cascade08ÆHÈH*cascade08ÈHÉH *cascade08ÉHÎH*cascade08ÎHÏH *cascade08ÏHÑH*cascade08ÑHÒH *cascade08ÒHÖH*cascade08
ÖH×H ×HÙH*cascade08
ÙHÚH ÚHßH*cascade08
ßHåH åHëH*cascade08
ëHìH ìHğH*cascade08
ğHòH òHõH*cascade08
õHöH öH÷H*cascade08
÷HúH úHŠI*cascade08ŠIŒI *cascade08ŒI–I*cascade08
–I—I —I¦I*cascade08
¦I§I §I¨I*cascade08¨I©I *cascade08©IªI*cascade08ªI«I *cascade08
«I¬I ¬I­I*cascade08
­I®I ®I±I *cascade08±IºI*cascade08ºI»I *cascade08»I¼I *cascade08¼I½I*cascade08½IÆI *cascade08ÆIÈI*cascade08ÈIÉI *cascade08ÉIÎI*cascade08ÎIÏI *cascade08ÏIÔI*cascade08ÔIÕI *cascade08ÕI×I*cascade08×IØI *cascade08ØIàI*cascade08àIáI *cascade08áIñI*cascade08ñIòI *cascade08òIôI*cascade08ôIõI *cascade08õIøI*cascade08øIúI *cascade08úIÿI*cascade08ÿI€J *cascade08€JJ*cascade08J‚J *cascade08‚JƒJ*cascade08ƒJ…J *cascade08…J†J*cascade08†J‡J *cascade08‡J‰J*cascade08‰JŠJ *cascade08ŠJ™J*cascade08
™JšJ šJœJ*cascade08œJJ *cascade08J¡J*cascade08
¡J¢J ¢J£J *cascade08£J§J*cascade08
§J¨J ¨J©J*cascade08©JªJ *cascade08ªJ«J*cascade08«J¬J *cascade08¬J¼J*cascade08¼J½J *cascade08½JêJ*cascade08êJïJ *cascade08ïJóJ*cascade08óJôJ *cascade08ôJöJ*cascade08öJúJ *cascade08úJüJ*cascade08üJƒK*cascade08ƒK„K *cascade08„K…K*cascade08
…K†K †K‡K *cascade08‡KˆK*cascade08ˆK‰K *cascade08‰KŠK*cascade08ŠK‹K *cascade08‹KŒK*cascade08ŒKK *cascade08KK*cascade08KK *cascade08K›K*cascade08›KœK *cascade08œKK*cascade08KK *cascade08K¡K*cascade08¡K¢K*cascade08¢K¦K*cascade08¦K§K *cascade08§K¨K*cascade08¨K©K*cascade08©KªK *cascade08ªK»K*cascade08»K½K *cascade08½KÂK*cascade08ÂKÄK *cascade08ÄKİK*cascade08İKàK *cascade08àKäK*cascade08äKìK *cascade08ìKòK*cascade08òKøK*cascade08øKùK *cascade08ùKûK*cascade08ûKüK *cascade08üK€L*cascade08€LL *cascade08
L‚L ‚LƒL *cascade08ƒL†L*cascade08†L‡L *cascade08‡LˆL*cascade08ˆL‰L *cascade08‰LŠL*cascade08ŠLŒL*cascade08ŒLL *cascade08LL *cascade08LL*cascade08L‘L *cascade08‘L”L*cascade08”L•L *cascade08•L—L*cascade08—L˜L*cascade08˜LšL *cascade08šLœL*cascade08œLL *cascade08L£L*cascade08£L¤L *cascade08¤L®L *cascade08®L²L*cascade08²L¶L*cascade08¶L·L *cascade08·L»L*cascade08»L¼L *cascade08¼LÁL*cascade08ÁLÂL *cascade08ÂLÆL*cascade08ÆLÇL *cascade08ÇLÈL*cascade08ÈLÉL *cascade08ÉLÊL*cascade08ÊLËL *cascade08ËLÏL*cascade08ÏLÓL *cascade08ÓLÔL*cascade08ÔLÕL *cascade08ÕLÚL*cascade08ÚLÛL *cascade08ÛLÜL*cascade08ÜLİL *cascade08İLâL*cascade08âLãL *cascade08ãLåL*cascade08åLéL *cascade08éLìL*cascade08ìLíL *cascade08íLïL*cascade08ïLğL *cascade08ğLñL*cascade08ñLòL *cascade08òLôL*cascade08ôLõL *cascade08õL÷L*cascade08÷LøL *cascade08øLüL*cascade08üLşL *cascade08şL‚M*cascade08‚M†M *cascade08†MŠM*cascade08ŠM§M*cascade08§M©M *cascade08©M­M*cascade08­M¯M*cascade08¯M³M *cascade08³MµM*cascade08µM¸M*cascade08¸M¹M *cascade08¹M¼M*cascade08¼M¾M *cascade08¾MÀM*cascade08ÀMÁM *cascade08ÁMÄM*cascade08ÄMÅM *cascade08ÅMÆM*cascade08ÆMÇM *cascade08ÇMÊM*cascade08ÊMËM *cascade08ËMÌM*cascade08ÌMÍM *cascade08ÍMÒM*cascade08ÒMÓM *cascade08ÓMÔM*cascade08ÔMÕM *cascade08ÕMÖM*cascade08ÖM×M*cascade08×MİM*cascade08İMŞM *cascade08ŞMàM*cascade08àMáM*cascade08áMæM*cascade08æMêM *cascade08êMîM*cascade08îMñM*cascade08ñMùM *cascade08ùMûM*cascade08ûMüM *cascade08üM‹N*cascade08‹NN *cascade08NN *cascade08NN*cascade08N‘N *cascade08‘N—N*cascade08—N˜N *cascade08˜NN*cascade08NŸN*cascade08ŸN N *cascade08 N¡N*cascade08¡N¢N *cascade08¢N¤N*cascade08¤N¥N *cascade08¥N¨N*cascade08¨N©N *cascade08©N¬N*cascade08¬N±N *cascade08±N´N*cascade08´NµN *cascade08µN·N*cascade08·N¸N *cascade08¸N¹N *cascade08¹NºN *cascade08ºN½N*cascade08½N¾N *cascade08¾N¿N *cascade08¿NÀN *cascade08ÀNÂN*cascade08ÂNÃN *cascade08ÃNÈN*cascade08ÈNÊN *cascade08ÊNÍN*cascade08ÍNÏN *cascade08ÏNÑN*cascade08ÑNÒN *cascade08ÒNÖN*cascade08ÖNŞN *cascade08ŞNãN*cascade08ãNäN *cascade08
äNåN åNæN*cascade08æNçN *cascade08çNèN *cascade08èNêN*cascade08êNìN *cascade08
ìNíN íNïN*cascade08ïNğN *cascade08ğNòN*cascade08òNóN*cascade08óNıN*cascade08ıNşN *cascade08şNÿN *cascade08ÿN„O*cascade08„O…O *cascade08…O†O*cascade08†OˆO *cascade08ˆOŒO*cascade08ŒOO*cascade08O‘O *cascade08‘O’O *cascade08’O”O*cascade08”O•O *cascade08•O–O*cascade08–O—O *cascade08—O˜O*cascade08˜O™O*cascade08™O›O*cascade08›OO *cascade08
OO O§O*cascade08§O¨O *cascade08¨O°O*cascade08°O±O *cascade08±O²O*cascade08²O³O *cascade08³OÊO*cascade08ÊOËO *cascade08
ËOÌO ÌOĞO*cascade08
ĞOØO ØOİO*cascade08
İOŞO ŞOáO*cascade08áOâO*cascade08âOãO*cascade08ãOäO *cascade08
äOåO åOæO*cascade08
æOçO çOèO*cascade08èOòO *cascade08òOóO*cascade08óOôO *cascade08ôOøO *cascade08øO—P*cascade08—P™P *cascade08™PœP*cascade08
œP¡P ¡P¤P*cascade08¤P¥P*cascade08¥P¨P*cascade08
¨P©P ©P«P*cascade08«P­P *cascade08­PºP*cascade08ºP»P *cascade08»P¾P*cascade08¾PÂP*cascade08ÂPÃP *cascade08ÃPÅP*cascade08ÅPÆP *cascade08ÆPÇP *cascade08ÇPïP*cascade08ïPğP *cascade08ğPòP*cascade08òPóP *cascade08óPùP*cascade08ùPúP *cascade08úPûP*cascade08ûPüP *cascade08üPıP*cascade08ıPşP *cascade08şP‰Q*cascade08‰QŠQ *cascade08ŠQ§Q*cascade08§Q©Q*cascade08©Q«Q *cascade08«Q¯Q*cascade08¯Q°Q *cascade08°Q´Q *cascade08´QµQ *cascade08
µQ¶Q ¶Q·Q *cascade08·Q¹Q*cascade08¹QÃQ*cascade08ÃQÄQ *cascade08ÄQÇQ*cascade08ÇQÈQ *cascade08ÈQÍQ*cascade08ÍQÎQ *cascade08ÎQÏQ *cascade08ÏQÓQ*cascade08ÓQÔQ *cascade08ÔQÖQ*cascade08ÖQ×Q *cascade08×QÛQ*cascade08ÛQÜQ *cascade08ÜQâQ*cascade08âQäQ *cascade08äQîQ*cascade08îQğQ*cascade08ğQôQ*cascade08ôQõQ *cascade08õQ÷Q*cascade08÷QøQ *cascade08øQÿQ*cascade08ÿQ‚R *cascade08‚R¯R*cascade08¯RºR *cascade08ºR¼R *cascade08¼RÆR*cascade08ÆRÇR *cascade08ÇRÈR*cascade08ÈRÉR *cascade08ÉRÊR*cascade08ÊRËR *cascade08ËRêR *cascade08êRìR *cascade08ìRğR*cascade08ğRøR *cascade08øR‹S*cascade08‹SŒS *cascade08
ŒSS S“S*cascade08
“S”S ”S•S*cascade08
•S–S –S˜S*cascade08
˜S™S ™SªS*cascade08
ªS«S «S´S*cascade08
´SµS µS¶S*cascade08
¶S¸S ¸SºS*cascade08
ºS»S »S¿S*cascade08¿SÀS *cascade08ÀSØS*cascade08ØSÙS *cascade08ÙSÚS*cascade08ÚSÛS *cascade08ÛSÜS *cascade08ÜSßS*cascade08
ßSàS àSøS*cascade08
øSùS ùSÿS*cascade08ÿS€T *cascade08€TT*cascade08T‚T *cascade08‚T‰T*cascade08‰TŠT *cascade08ŠT‹T *cascade08‹TT*cascade08TT *cascade08T“T*cascade08“T”T *cascade08”T˜T*cascade08˜TšT *cascade08šT­T*cascade08
­T®T ®T±T*cascade08
±T²T ²TºT*cascade08ºT¾T*cascade08¾T¿T*cascade08
¿TÃT ÃTÆT*cascade08ÆTĞT*cascade08ĞTÑT *cascade08ÑTÕT*cascade08ÕT×T *cascade08
×TØT ØTßT*cascade08ßTàT *cascade08àTäT*cascade08äTæT *cascade08æTèT*cascade08èTéT *cascade08éTíT *cascade08íTïT*cascade08
ïTğT ğTúT*cascade08
úTûT ûTU*cascade08UU*cascade08
UU U•U*cascade08•UU*cascade08U¡U*cascade08
¡U¥U ¥U©U*cascade08©U°U*cascade08
°U±U ±U³U*cascade08
³UµU µU¶U*cascade08
¶U¸U ¸U¹U*cascade08
¹UºU ºU½U*cascade08
½U¿U ¿UÈU*cascade08ÈUÊU *cascade08ÊUÌU*cascade08ÌUÎU *cascade08ÎUÑU*cascade08ÑUÙU *cascade08ÙUÚU*cascade08ÚUÛU*cascade08ÛUÜU *cascade08
ÜUŞU ŞUéU*cascade08éUêU*cascade08êUëU *cascade08ëUìU*cascade08ìUíU *cascade08íUîU*cascade08îUïU *cascade08ïUòU*cascade08òUõU *cascade08
õUüU üU€V*cascade08€VV*cascade08
V…V …VˆV*cascade08ˆV‰V *cascade08‰V’V*cascade08’V“V *cascade08“V—V*cascade08—V˜V *cascade08˜V™V*cascade08™VšV *cascade08šVŸV*cascade08ŸV¡V*cascade08¡V£V *cascade08£V¨V*cascade08
¨V©V ©V½V*cascade08
½V¾V ¾VÁV*cascade08ÁVÂV *cascade08ÂVËV*cascade08
ËVÌV ÌVÕV*cascade08ÕVŞV *cascade08ŞVáV *cascade08áVëV*cascade08ëVìV *cascade08ìVíV *cascade08
íVôV ôVûV*cascade08ûVüV *cascade08üVÿV*cascade08ÿV€W *cascade08€WW *cascade08W„W*cascade08„W…W *cascade08…W›W*cascade08›WœW *cascade08œWW*cascade08WŸW*cascade08ŸW¡W*cascade08¡W¢W *cascade08¢W£W *cascade08£W¥W *cascade08¥W¦W *cascade08¦W¨W*cascade08¨W©W *cascade08©W¯W*cascade08¯W°W *cascade08°W²W*cascade08
²W»W »W¿W*cascade08¿WÀW *cascade08ÀWÃW*cascade08ÃWÄW*cascade08ÄWÅW *cascade08ÅWËW*cascade08ËWÌW *cascade08ÌWÓW*cascade08ÓWÔW*cascade08ÔWØW*cascade08
ØWÚW ÚWÛW*cascade08ÛWÜW *cascade08ÜWíW*cascade08íWîW *cascade08îWğW*cascade08ğWøW *cascade08øWúW*cascade08úWşW *cascade08şW‚X*cascade08‚XƒX *cascade08ƒXŠX*cascade08ŠX‹X *cascade08‹XŒX*cascade08ŒXX *cascade08X“X*cascade08“X”X *cascade08”X–X*cascade08–X—X *cascade08—X™X*cascade08™XœX *cascade08œXX*cascade08XX *cascade08
XŸX ŸX¡X*cascade08¡X¢X *cascade08¢X£X*cascade08£X¥X *cascade08¥X¦X *cascade08¦X§X*cascade08§X¨X *cascade08¨X©X *cascade08©X²X*cascade08²X³X *cascade08³X¶X*cascade08¶X·X *cascade08·X»X*cascade08»X¼X *cascade08¼XËX*cascade08ËXÌX *cascade08ÌXØX*cascade08ØXÙX *cascade08ÙXÛX*cascade08ÛXÜX *cascade08ÜXİX*cascade08İXŞX *cascade08ŞXßX *cascade08ßXâX*cascade08âXäX *cascade08äXæX*cascade08æXçX *cascade08çXèX*cascade08
èXéX éXêX*cascade08
êXóX óX÷X*cascade08÷XùX*cascade08ùXûX *cascade08ûXY*cascade08Y“Y *cascade08“Y—Y*cascade08—Y™Y*cascade08™YY *cascade08YŸY*cascade08ŸY©Y*cascade08©YªY *cascade08ªY±Y*cascade08±Y²Y *cascade08²Y³Y*cascade08³Y´Y *cascade08´YµY*cascade08µY¶Y *cascade08¶Y·Y*cascade08·Y¸Y *cascade08¸YºY*cascade08ºY»Y *cascade08»Y¿Y*cascade08¿YÇY *cascade08ÇYÊY*cascade08
ÊYËY ËYÏY*cascade08ÏYÔY*cascade08ÔYÖY *cascade08ÖY×Y*cascade08×YØY *cascade08ØYÙY*cascade08ÙYÚY *cascade08ÚYİY*cascade08İYŞY *cascade08ŞYëY *cascade08ëYïY*cascade08ïYğY*cascade08ğYñY*cascade08ñYşY*cascade08şYÿY *cascade08ÿY€Z*cascade08€Z‹Z *cascade08‹ZŒZ*cascade08ŒZZ *cascade08ZZ*cascade08ZZ*cascade08ZŸZ *cascade08ŸZ Z*cascade08 Z¡Z *cascade08¡Z£Z*cascade08£Z¤Z *cascade08¤Z¦Z*cascade08¦Z¨Z *cascade08¨Z©Z*cascade08©ZªZ *cascade08ªZ­Z*cascade08­Z®Z *cascade08®Z°Z*cascade08°Z²Z *cascade08²Z³Z *cascade08³ZµZ*cascade08
µZ¶Z ¶Z·Z*cascade08
·Z¸Z ¸Z¹Z*cascade08¹ZºZ*cascade08ºZ»Z *cascade08»ZÈZ*cascade08ÈZÉZ *cascade08ÉZËZ*cascade08ËZÎZ *cascade08ÎZÏZ *cascade08ÏZÓZ*cascade08ÓZÕZ *cascade08ÕZÖZ *cascade08ÖZ×Z*cascade08
×ZØZ ØZÙZ *cascade08ÙZÚZ*cascade08ÚZİZ *cascade08İZàZ*cascade08àZèZ *cascade08èZéZ*cascade08éZêZ *cascade08êZ[*cascade08[Ÿ[*cascade08Ÿ[£[ *cascade08£[§[*cascade08§[«[ *cascade08«[°[*cascade08°[±[ *cascade08
±[²[ ²[¶[*cascade08
¶[·[ ·[Ã[ *cascade08Ã[Ä[*cascade08Ä[Å[ *cascade08Å[Ç[*cascade08Ç[É[ *cascade08É[Í[*cascade08Í[Î[ *cascade08Î[Ğ[*cascade08Ğ[Ó[ *cascade08Ó[ñ[*cascade08ñ[ò[ *cascade08ò[ô[*cascade08ô[õ[ *cascade08õ[û[*cascade08û[ü[ *cascade08ü[ı[*cascade08ı[ş[ *cascade08ş[‘\*cascade08‘\“\ *cascade08“\\*cascade08\ \ *cascade08 \¡\*cascade08¡\¥\ *cascade08¥\¨\*cascade08¨\©\ *cascade08©\ª\*cascade08ª\«\ *cascade08«\Ì\*cascade08Ì\Í\ *cascade08Í\Ñ\*cascade08Ñ\Ö\ *cascade08Ö\Ş\*cascade08
Ş\ß\ ß\è\*cascade08è\é\ *cascade08
é\ê\ ê\ì\*cascade08
ì\í\ í\ò\*cascade08ò\ô\ *cascade08ô\ş\*cascade08ş\ÿ\ *cascade08ÿ\†]*cascade08†]‡] *cascade08‡]‰]*cascade08‰]Š] *cascade08Š]‘]*cascade08
‘]”] ”]—]*cascade08—]›] *cascade08›]œ]*cascade08œ]¦]*cascade08¦]§] *cascade08§]©]*cascade08©]ª] *cascade08ª]«]*cascade08«]¬] *cascade08¬]¯]*cascade08¯]°] *cascade08°]±]*cascade08±]²] *cascade08²]Í]*cascade08Í]Î] *cascade08Î]Ğ]*cascade08Ğ]Ñ] *cascade08Ñ]Ø]*cascade08Ø]…a*cascade08
…a‡a ‡aˆa *cascade08ˆaŒa*cascade08Œaa *cascade08a‘a*cascade08
‘a‘t ‘t“t	“tÑ2Ffile:///Users/santiagovalencia/Documents/mock%20up%20siprac/js/main.js