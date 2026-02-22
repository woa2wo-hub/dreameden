/* ============================================
   Dream Eden Children Dental Clinic
   Main JavaScript (jQuery)
   ============================================ */

$(document).ready(function(){

    // ===== HERO SLIDER =====
    let slideNumber = 0;
    const totalSlides = 3;
    let autoSlideTimer;

    function goToSlide(n) {
        slideNumber = n;
        if (slideNumber >= totalSlides) slideNumber = 0;
        if (slideNumber < 0) slideNumber = totalSlides - 1;
        
        $('.hero-slides').css({ marginLeft: (-slideNumber * 100) + '%' });
        
        // Update dots
        $('.hero-dots .dot').removeClass('active');
        $('.hero-dots .dot[data-index="' + slideNumber + '"]').addClass('active');
        
        // Restart auto slide
        resetAutoSlide();
    }

    function nextSlide() { goToSlide(slideNumber + 1); }
    function prevSlide() { goToSlide(slideNumber - 1); }

    function startAutoSlide() {
        autoSlideTimer = setInterval(nextSlide, 5000);
    }
    function resetAutoSlide() {
        clearInterval(autoSlideTimer);
        startAutoSlide();
    }

    // Arrow buttons
    $('.btn_next').click(nextSlide);
    $('.btn_prev').click(prevSlide);

    // Dot buttons
    $('.hero-dots .dot').click(function(){
        goToSlide(parseInt($(this).data('index')));
    });

    // Start auto slide
    startAutoSlide();

    // Touch swipe support for hero
    let touchStartX = 0;
    let touchEndX = 0;
    
    $('.hero').on('touchstart', function(e) {
        touchStartX = e.originalEvent.changedTouches[0].screenX;
    });
    $('.hero').on('touchend', function(e) {
        touchEndX = e.originalEvent.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) nextSlide();
            else prevSlide();
        }
    });

    // ===== MOBILE MENU =====
    $('#mobileMenuBtn').click(function(){
        $(this).toggleClass('active');
        $('#mobileNav').addClass('active');
        $('#mobileNavOverlay').addClass('active');
        $('body').css('overflow', 'hidden');
    });

    function closeMobileNav() {
        $('#mobileMenuBtn').removeClass('active');
        $('#mobileNav').removeClass('active');
        $('#mobileNavOverlay').removeClass('active');
        $('body').css('overflow', '');
    }

    $('#mobileNavClose').click(closeMobileNav);
    $('#mobileNavOverlay').click(closeMobileNav);

    // Mobile menu accordion
    $('.mobile-menu-link').click(function(e){
        const $parent = $(this).parent('li');
        const $sub = $parent.find('.mobile-sub');
        
        if ($sub.length) {
            e.preventDefault();
            $sub.toggleClass('open');
            $parent.siblings().find('.mobile-sub').removeClass('open');
        }
    });

    // ===== HEADER SCROLL EFFECT =====
    let lastScroll = 0;
    $(window).scroll(function(){
        const currentScroll = $(this).scrollTop();
        const $header = $('#header');
        
        if (currentScroll > 100) {
            $header.css({
                'box-shadow': '0 2px 20px rgba(0,0,0,0.08)',
                'position': 'sticky',
                'top': '0',
                'z-index': '100'
            });
        } else {
            $header.css({
                'box-shadow': 'none',
                'position': 'relative'
            });
        }
        lastScroll = currentScroll;
    });

    // ===== SCROLL ANIMATIONS =====
    function checkFadeIn() {
        $('.fade-in').each(function(){
            const elementTop = $(this).offset().top;
            const windowBottom = $(window).scrollTop() + $(window).height();
            if (elementTop < windowBottom - 60) {
                $(this).addClass('visible');
            }
        });
    }

    // Add fade-in class to sections
    $('.section1 .board-grid, .section2 .care-cards, .section3 .info-grid, .section4 .treatment-grid, .about-cards, .about-headline, .vision-section .container').addClass('fade-in');
    
    $(window).scroll(checkFadeIn);
    checkFadeIn(); // Initial check

    // ===== BOARD MORE BUTTON ANIMATION =====
    $('.board-more').hover(
        function(){ $(this).find('.material-symbols-outlined').css('transform', 'rotate(90deg)'); },
        function(){ $(this).find('.material-symbols-outlined').css('transform', 'rotate(0)'); }
    );

    // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
    $('a[href^="#"]').click(function(e){
        const target = $(this).attr('href');
        if (target !== '#' && $(target).length) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: $(target).offset().top - 80
            }, 600);
            closeMobileNav();
        }
    });

    // ===== WINDOW RESIZE HANDLER =====
    $(window).resize(function(){
        if ($(window).width() > 1024) {
            closeMobileNav();
        }
    });
});
