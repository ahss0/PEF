
    // ===== MENU MOBILE =====
    (function() {
      const menuToggle = document.getElementById('menuToggle');
      const mainNav = document.getElementById('mainNav');
      const overlay = document.getElementById('navOverlay');
      const navItems = document.querySelectorAll('.nav-item');

      function toggleMenu() {
        const isOpen = mainNav.classList.toggle('open');
        //overlay.classList.toggle('active');
        menuToggle.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
      }

      function closeMenu() {
        mainNav.classList.remove('open');
        overlay.classList.remove('active');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        // Fecha todos os submenus 
        navItems.forEach(item => item.classList.remove('open')); } menuToggle.addEventListener('click', toggleMenu); overlay.addEventListener('click', closeMenu);
      // Fecha o menu ao clicar em um link
      mainNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function(e) {
          // Se for um link com dropdown, não fecha
          if (this.parentElement.classList.contains('nav-item') && this.nextElementSibling?.classList.contains('dropdown')) {
            return;
          }
          closeMenu();
        });
      });

      // Toggle submenu no mobile
      navItems.forEach(item => {
        const link = item.querySelector('a');
        if (item.querySelector('.dropdown')) {
          link.addEventListener('click', function(e) {
            if (window.innerWidth <= 960) {
              e.preventDefault();
              item.classList.toggle('open');
            }
          });
        }
      });

      // Fecha menu ao redimensionar para desktop
      window.addEventListener('resize', function() {
        if (window.innerWidth > 960 && mainNav.classList.contains('open')) {
          closeMenu();
        }
      });
    })();

    // ===== HERO SLIDES =====
    (function() {
      const slides = document.querySelector('.hero-slides');
      const dots = document.querySelectorAll('.hero-dots button');
      const prevBtn = document.getElementById('prevSlide');
      const nextBtn = document.getElementById('nextSlide');
      const totalSlides = 5;
      let currentIndex = 0;
      let autoPlayTimer = null;
      const AUTO_INTERVAL = 5000;

      function goToSlide(index) {
        if (index < 0) index = totalSlides - 1;
        if (index >= totalSlides) index = 0;
        currentIndex = index;
        slides.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';
        dots.forEach(function(dot, i) {
          if (i === currentIndex) {
            dot.classList.add('is-active');
          } else {
            dot.classList.remove('is-active');
          }
        });
      }

      function nextSlide() {
        goToSlide(currentIndex + 1);
      }

      function prevSlide() {
        goToSlide(currentIndex - 1);
      }

      function startAutoPlay() {
        stopAutoPlay();
        autoPlayTimer = setInterval(nextSlide, AUTO_INTERVAL);
      }

      function stopAutoPlay() {
        if (autoPlayTimer) {
          clearInterval(autoPlayTimer);
          autoPlayTimer = null;
        }
      }

      prevBtn.addEventListener('click', function() {
        prevSlide();
        startAutoPlay();
      });

      nextBtn.addEventListener('click', function() {
        nextSlide();
        startAutoPlay();
      });

      dots.forEach(function(dot, index) {
        dot.addEventListener('click', function() {
          goToSlide(index);
          startAutoPlay();
        });
      });

      const hero = document.querySelector('.hero');
      hero.addEventListener('mouseenter', stopAutoPlay);
      hero.addEventListener('mouseleave', startAutoPlay);

      startAutoPlay();

      document.addEventListener('keydown', function(e) { if (e.key === 'ArrowLeft') { prevSlide(); startAutoPlay(); } else if (e.key === 'ArrowRight') { nextSlide(); startAutoPlay(); } }); })();
