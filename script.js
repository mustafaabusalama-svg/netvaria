/* ═══════════════════════════════════════════════
   NETVARIA SYSTEM — ENTERPRISE JAVASCRIPT
═══════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── AOS INIT ─── */
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60,
    });
  }

  /* ─── NAVBAR SCROLL ─── */
  const navbar = document.getElementById('navbar');
  const announcementH = document.querySelector('.announcement-strip')?.offsetHeight || 36;

  function handleScroll() {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    // Active nav link
    const sections = ['hero','section-quick','section-services','section-vision','section-cta'];
    let current = '';
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el && window.scrollY >= el.offsetTop - 100) current = id;
    });
    document.querySelectorAll('.nav-links a[data-section]').forEach(a => {
      a.classList.toggle('active', a.dataset.section === current);
    });
  }
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* ─── MOBILE MENU ─── */
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  });
  document.querySelectorAll('.mobile-nav a, .mobile-nav button').forEach(el => {
    el.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* ─── SMOOTH SCROLL ─── */
  function scrollTo(id) {
    const el = document.getElementById(id);
    if (!el) return;
    const offset = 80;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }
  window.smoothScrollTo = scrollTo;

  document.querySelectorAll('[data-scroll]').forEach(el => {
    el.addEventListener('click', () => scrollTo(el.dataset.scroll));
  });

  /* ─── GSAP HERO ANIMATIONS ─── */
  if (typeof gsap !== 'undefined') {

    // Hero entrance
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    heroTl
      .fromTo('.hero-logo-block',
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.9 }, 0.2)
      .fromTo('.hero-eyebrow',
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.7 }, 0.5)
      .fromTo('.hero-desc',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8 }, 0.85)
      .fromTo('.hero-actions',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7 }, 1.0)
      .fromTo('.hero-product-slider',
        { opacity: 0, y: 24, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8 }, 1.08)
      .fromTo('.hero-stats',
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.7 }, 1.15)
      .fromTo('.hero-illustration',
        { opacity: 0, scale: 0.88 },
        { opacity: 1, scale: 1, duration: 1.1 }, 0.3);

    // Stat counters
    document.querySelectorAll('.counter').forEach(el => {
      const target = parseInt(el.dataset.target, 10);
      gsap.fromTo(el,
        { textContent: 0 },
        {
          textContent: target,
          duration: 2.5,
          ease: 'power2.out',
          delay: 1.2,
          snap: { textContent: 1 },
          onUpdate() {
            el.textContent = Math.round(this.targets()[0].textContent);
          }
        }
      );
    });

    // Service cards stagger on scroll
    gsap.utils.toArray('.service-card').forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 0.7,
          delay: i * 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        }
      );
    });

    // Vision cards
    gsap.utils.toArray('.vision-card').forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, x: 30 },
        {
          opacity: 1, x: 0,
          duration: 0.65,
          delay: i * 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
          }
        }
      );
    });

    // Advantage cards
    gsap.utils.toArray('.adv-card').forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0,
          duration: 0.6,
          delay: i * 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
          }
        }
      );
    });

    // CTA section
    gsap.fromTo('#section-cta .cta-inner > *',
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '#section-cta',
          start: 'top 75%',
        }
      }
    );

    // Hero grid pulse
    gsap.to('.hero-bg-grid', {
      opacity: 0.7,
      duration: 3,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });

    /* ─── SUBTLE PARALLAX MOUSE ─── */
    const heroSection = document.getElementById('hero');
    const heroContent = document.querySelector('.hero-content');
    if (heroSection && heroContent) {
      heroSection.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth  - 0.5) * -8;  /* ±4px max */
        const y = (e.clientY / window.innerHeight - 0.5) * -6;  /* ±3px max */
        gsap.to(heroContent, { x, y, duration: 1.2, ease: 'power2.out' });
      });
      heroSection.addEventListener('mouseleave', () => {
        gsap.to(heroContent, { x: 0, y: 0, duration: 1.4, ease: 'power2.out' });
      });
    }

  }

  /* ─── HERO PRODUCT SLIDER ─── */
  const heroSlides = Array.from(document.querySelectorAll('.hero-slide'));
  if (heroSlides.length > 1) {
    let activeSlide = 0;
    setInterval(() => {
      heroSlides[activeSlide].classList.remove('is-active');
      activeSlide = (activeSlide + 1) % heroSlides.length;
      heroSlides[activeSlide].classList.add('is-active');
    }, 3600);
  }

  /* ─── QUICK CARDS HOVER ─── */
  document.querySelectorAll('.quick-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      if (typeof gsap !== 'undefined') {
        gsap.to(card.querySelector('.quick-card-icon'), {
          scale: 1.1, rotation: -5, duration: 0.3, ease: 'back.out(2)'
        });
      }
    });
    card.addEventListener('mouseleave', () => {
      if (typeof gsap !== 'undefined') {
        gsap.to(card.querySelector('.quick-card-icon'), {
          scale: 1, rotation: 0, duration: 0.3, ease: 'back.out(2)'
        });
      }
    });
  });

  /* ─── HERO LINE DRAWING (SVG) ─── */
  const svgLines = document.getElementById('heroSvgLines');
  if (svgLines && typeof gsap !== 'undefined') {
    const paths = svgLines.querySelectorAll('path');
    gsap.fromTo(paths,
      { strokeDashoffset: 400, opacity: 0 },
      {
        strokeDashoffset: 0, opacity: 1,
        duration: 2.5,
        stagger: 0.3,
        ease: 'power2.inOut',
        delay: 0.8,
      }
    );
  }

  /* ─── FLOATING PARTICLES (Canvas) ─── */
  const canvas = document.getElementById('particlesCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const particles = [];
    const count = 40;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.5,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.4 + 0.1,
      });
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,200,83,${p.alpha})`;
        ctx.fill();
      });
      // Draw connections
      particles.forEach((p, i) => {
        particles.slice(i+1).forEach(q => {
          const dx = p.x - q.x, dy = p.y - q.y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(0,200,83,${0.08 * (1 - dist/100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });
      requestAnimationFrame(animateParticles);
    }
    animateParticles();

    window.addEventListener('resize', () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    });
  }

  /* ─── TYPEWRITER EFFECT ───
     "خبراء في" is STATIC in HTML — ONLY the word inside #typewriter changes.
     #typewriter has a fixed CSS width so the layout never shifts.
  */
  const typeEl = document.getElementById('typewriter');
  if (typeEl) {
    const words = ['الأنظمة الأمنية', 'شبكات المؤسسات', 'المنازل الذكية', 'التحول الرقمي'];
    let wi = 0;         /* word index */
    let ci = 0;         /* char index */
    let deleting = false;
    let timer;

    function tick() {
      const word = words[wi];

      if (!deleting) {
        ci++;
        typeEl.innerHTML = word.slice(0, ci) + '<span class="cursor"></span>';
        if (ci === word.length) {
          /* finished typing — pause then start deleting */
          deleting = true;
          timer = setTimeout(tick, 2200);
          return;
        }
        timer = setTimeout(tick, 80);
      } else {
        ci--;
        typeEl.innerHTML = (ci > 0 ? word.slice(0, ci) : '') + '<span class="cursor"></span>';
        if (ci === 0) {
          /* finished deleting — short pause, advance word */
          deleting = false;
          wi = (wi + 1) % words.length;
          timer = setTimeout(tick, 450);
          return;
        }
        timer = setTimeout(tick, 45);
      }
    }

    /* start after entrance animations settle */
    setTimeout(tick, 1400);
  }

});
