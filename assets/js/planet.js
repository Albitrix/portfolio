/**
 * ===================================================================
 * 3D SKILLS PLANET - ALBERTO FERRARI
 * Interactive 3D CSS Sphere with Official Tech Icons (SVGs).
 * Spherical Fibonacci lattice distribution, drag with momentum & damping,
 * auto-rotation, and dynamic category hover details.
 * ===================================================================
 */

(function () {
  'use strict';

  // Official SVG Icons dictionary
  const SKILLS_DATA = [
    {
      name: 'Python',
      cat: 'languages',
      color: '#3776AB',
      svg: `<svg viewBox="0 0 24 24" width="26" height="26"><path fill="#3776AB" d="M11.9 2c-3.1 0-5.1 1.4-5.1 4.1v3.1h5.3v.8H4.6C2.6 10 1 11.8 1 14.5s1.7 4.5 4.5 4.5h2.6v-3.8c0-2.2 1.9-4.1 4.1-4.1h5.3v-.8c0-2.7-2-4.1-5.1-4.1h-.5zm-1.8 1.5c.6 0 1.1.5 1.1 1.1s-.5 1.1-1.1 1.1-1.1-.5-1.1-1.1.5-1.1 1.1-1.1z"/><path fill="#FFD43B" d="M12.1 22c3.1 0 5.1-1.4 5.1-4.1v-3.1h-5.3v-.8h7.5c2 0 3.6-1.8 3.6-4.5s-1.7-4.5-4.5-4.5h-2.6v3.8c0 2.2-1.9 4.1-4.1 4.1H6.5v.8c0 2.7 2 4.1 5.1 4.1h.5zm1.8-1.5c-.6 0-1.1-.5-1.1-1.1s.5-1.1 1.1-1.1 1.1.5 1.1 1.1-.5 1.1-1.1 1.1z"/></svg>`
    },
    {
      name: 'TypeScript',
      cat: 'languages',
      color: '#3178C6',
      svg: `<svg viewBox="0 0 24 24" width="24" height="24"><rect width="24" height="24" rx="4" fill="#3178C6"/><path fill="#fff" d="M11.5 8.5H5.8v2.1h1.7v7.6h2.2v-7.6h1.8V8.5zm3.6 5.8c.4.6 1 1 1.7 1 .8 0 1.3-.4 1.3-1 0-.6-.5-.9-1.5-1.3-1.6-.6-2.6-1.3-2.6-2.7 0-1.5 1.2-2.7 3-2.7 1.3 0 2.3.5 3 1.4l-1.3 1.2c-.4-.5-.9-.8-1.6-.8-.6 0-1 .3-1 .8 0 .5.4.7 1.4 1.1 1.7.6 2.7 1.3 2.7 2.8 0 1.7-1.3 2.8-3.3 2.8-1.5 0-2.7-.6-3.4-1.7l1.6-1.6z"/></svg>`
    },
    {
      name: 'JavaScript',
      cat: 'languages',
      color: '#F7DF1E',
      svg: `<svg viewBox="0 0 24 24" width="24" height="24"><rect width="24" height="24" rx="4" fill="#F7DF1E"/><path fill="#000" d="M6 17.5l1.8-1.1c.4.7.8 1.2 1.5 1.2.7 0 1.2-.3 1.2-1.4V10H13v6.3c0 2.2-1.3 3.2-3.3 3.2-1.8 0-3-1-3.7-2zm8.5-.2l1.8-1c.5.8 1.1 1.4 2.2 1.4 1 0 1.6-.5 1.6-1.2 0-.8-.7-1.1-1.9-1.6-1.8-.7-2.9-1.5-2.9-3.2 0-1.7 1.3-3 3.2-3 1.5 0 2.6.5 3.3 1.8l-1.7 1.1c-.4-.6-.8-.9-1.6-.9-.7 0-1.2.4-1.2 1 0 .7.5 1 1.7 1.4 2 .8 3.1 1.6 3.1 3.4 0 2-1.5 3.2-3.7 3.2-2.1 0-3.5-1-4.1-2.4z"/></svg>`
    },
    {
      name: 'React.js',
      cat: 'frameworks',
      color: '#61DAFB',
      svg: `<svg viewBox="0 0 24 24" width="26" height="26"><ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="#61DAFB" stroke-width="1.4" transform="rotate(0 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="#61DAFB" stroke-width="1.4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="#61DAFB" stroke-width="1.4" transform="rotate(120 12 12)"/><circle cx="12" cy="12" r="2.2" fill="#61DAFB"/></svg>`
    },
    {
      name: 'Node.js',
      cat: 'frameworks',
      color: '#5FA04E',
      svg: `<svg viewBox="0 0 24 24" width="24" height="24"><path fill="#5FA04E" d="M12 2l9 5.2v10.4L12 22.8 3 17.6V7.2L12 2zm0 2.4L5.2 8.3v7.4L12 19.6l6.8-3.9V8.3L12 4.4z"/><circle cx="12" cy="12" r="3" fill="#5FA04E"/></svg>`
    },
    {
      name: 'NestJS',
      cat: 'frameworks',
      color: '#E0234E',
      svg: `<svg viewBox="0 0 24 24" width="24" height="24"><path fill="#E0234E" d="M21.5 5.5l-3.2 4.5 1.5-6.5-6.3 3.5-3.5-5-2.5 7.5L3 7l2 8 4 3 6.5-1 4-5.5 2 7.5 1.5-2.5V5.5z"/><circle cx="8" cy="11" r="1.5" fill="#fff"/></svg>`
    },
    {
      name: 'Apache Kafka',
      cat: 'frameworks',
      color: '#E8E6DF',
      svg: `<svg viewBox="0 0 24 24" width="24" height="24"><circle cx="7" cy="12" r="3.2" fill="#231F20" stroke="#7FD1B9" stroke-width="1.5"/><circle cx="17" cy="6" r="2.5" fill="#231F20" stroke="#7FD1B9" stroke-width="1.5"/><circle cx="17" cy="18" r="2.5" fill="#231F20" stroke="#7FD1B9" stroke-width="1.5"/><line x1="9.8" y1="10.2" x2="14.8" y2="7.3" stroke="#7FD1B9" stroke-width="2"/><line x1="9.8" y1="13.8" x2="14.8" y2="16.7" stroke="#7FD1B9" stroke-width="2"/></svg>`
    },
    {
      name: 'MongoDB',
      cat: 'databases',
      color: '#47A248',
      svg: `<svg viewBox="0 0 24 24" width="24" height="24"><path fill="#47A248" d="M12 2C11.6 3.5 8 9.2 8 13.5c0 3.2 2 6 4 7.5 2-1.5 4-4.3 4-7.5C16 9.2 12.4 3.5 12 2zm-.2 2.7c.1 1.2 1.7 4.8 1.9 8.3H11.8V4.7z"/><path fill="#3FA037" d="M11.8 13.5h2.1c-.2 2.3-1.2 4.4-2.1 5.3v-5.3z"/></svg>`
    },
    {
      name: 'Neo4j',
      cat: 'databases',
      color: '#008CC1',
      svg: `<svg viewBox="0 0 24 24" width="24" height="24"><circle cx="6" cy="16" r="3.2" fill="#008CC1"/><circle cx="12" cy="7" r="3.2" fill="#008CC1"/><circle cx="18" cy="16" r="3.2" fill="#008CC1"/><line x1="8.5" y1="13.5" x2="10" y2="9.5" stroke="#008CC1" stroke-width="1.8"/><line x1="15.5" y1="13.5" x2="14" y2="9.5" stroke="#008CC1" stroke-width="1.8"/><line x1="9.2" y1="16" x2="14.8" y2="16" stroke="#008CC1" stroke-width="1.8"/></svg>`
    },
    {
      name: 'NoSQL Architectures',
      cat: 'databases',
      color: '#10B981',
      svg: `<svg viewBox="0 0 24 24" width="24" height="24"><ellipse cx="12" cy="6" rx="8" ry="3" fill="#10B981"/><path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6" fill="none" stroke="#10B981" stroke-width="1.8"/><path d="M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" fill="none" stroke="#10B981" stroke-width="1.8"/></svg>`
    },
    {
      name: 'SQL & PostgreSQL',
      cat: 'databases',
      color: '#336791',
      svg: `<svg viewBox="0 0 24 24" width="24" height="24"><path fill="#336791" d="M12 2C7 2 3 5 3 8.5v7C3 19 7 22 12 22s9-3 9-6.5v-7C21 5 17 2 12 2zm0 3c3.5 0 6 1.4 6 2.5s-2.5 2.5-6 2.5S6 8.6 6 7.5 8.5 5 12 5z"/></svg>`
    },
    {
      name: 'Cybersecurity & Defense',
      cat: 'security',
      color: '#E63946',
      svg: `<svg viewBox="0 0 24 24" width="24" height="24"><path fill="#E63946" d="M12 2L4 5.5v6.2c0 5.4 3.4 10.4 8 11.8 4.6-1.4 8-6.4 8-11.8V5.5L12 2zm0 4.2c2.1 0 3.8 1.7 3.8 3.8v1.5h.5c.6 0 1 .4 1 1v4.5c0 .6-.4 1-1 1h-8.6c-.6 0-1-.4-1-1v-4.5c0-.6.4-1 1-1h.5V10c0-2.1 1.7-3.8 3.8-3.8zm0 1.5c-1.3 0-2.3 1-2.3 2.3v1.5h4.6V10c0-1.3-1-2.3-2.3-2.3z"/></svg>`
    },
    {
      name: 'HTTP & REST APIs',
      cat: 'networks',
      color: '#005FB8',
      svg: `<svg viewBox="0 0 24 24" width="24" height="24"><circle cx="12" cy="12" r="9" fill="none" stroke="#005FB8" stroke-width="1.8"/><ellipse cx="12" cy="12" rx="4.5" ry="9" fill="none" stroke="#005FB8" stroke-width="1.4"/><line x1="3" y1="12" x2="21" y2="12" stroke="#005FB8" stroke-width="1.5"/><path d="M7 8l-3 4 3 4M17 8l3 4-3 4" fill="none" stroke="#005FB8" stroke-width="1.6" stroke-linecap="round"/></svg>`
    },
    {
      name: 'Git & GitHub',
      cat: 'tools',
      color: '#F05032',
      svg: `<svg viewBox="0 0 24 24" width="24" height="24"><path fill="#F05032" d="M21.6 10.9L13.1 2.4a2.2 2.2 0 0 0-3.1 0L7.8 4.6l3.3 3.3a2.6 2.6 0 0 1 3.3 3.3l3.2 3.2a2.6 2.6 0 0 1 3.4-3.4l.6-.1zm-10.7-2a1.8 1.8 0 1 0-1.8-1.8 1.8 1.8 0 0 0 1.8 1.8zm-1.6 4.9L6.1 10.6a2.6 2.6 0 0 1-3.3-3.3L.6 9.5a2.2 2.2 0 0 0 0 3.1l8.5 8.5a2.2 2.2 0 0 0 3.1 0l2.2-2.2-3.3-3.3a2.6 2.6 0 0 1-1.8-1.8z"/></svg>`
    },
    {
      name: 'Linux Systems',
      cat: 'tools',
      color: '#FCC624',
      svg: `<svg viewBox="0 0 24 24" width="24" height="24"><path fill="#FCC624" d="M12 2c-3.1 0-4.6 2.3-4.6 5.4 0 1.5.3 3.5.7 4.6H7c-1.5 0-3 1.2-3 2.7 0 2.2 1.8 3.5 4 3.5h8c2.2 0 4-1.3 4-3.5 0-1.5-1.5-2.7-3-2.7h-1.1c.4-1.1.7-3.1.7-4.6 0-3.1-1.5-5.4-4.6-5.4z"/><circle cx="10" cy="6.5" r="1" fill="#000"/><circle cx="14" cy="6.5" r="1" fill="#000"/><path d="M10.5 8.5c.8.8 2.2.8 3 0" stroke="#000" stroke-width="1.2" fill="none"/></svg>`
    },
    {
      name: 'Docker',
      cat: 'tools',
      color: '#2496ED',
      svg: `<svg viewBox="0 0 24 24" width="24" height="24"><path fill="#2496ED" d="M1.5 13.5c1 3.5 5 5.5 10.5 5.5s9.5-2 10.5-5.5c-1-.5-3.5-.5-5 0-1.5-2-4.5-2-6.5-1-1.5-.5-3.5-.5-4.5.5-1.5-.5-3.5-.5-5 .5zm6-5h2v2h-2zm3 0h2v2h-2zm3 0h2v2h-2zm-6 3h2v2h-2zm3 0h2v2h-2zm3 0h2v2h-2zm-9 0h2v2h-2z"/></svg>`
    },
    {
      name: 'MS SharePoint',
      cat: 'tools',
      color: '#008272',
      svg: `<svg viewBox="0 0 24 24" width="24" height="24"><circle cx="8" cy="14" r="5" fill="#008272"/><circle cx="15" cy="10" r="4.2" fill="#036C5F"/><circle cx="16" cy="16" r="3.2" fill="#004D43"/></svg>`
    },
    {
      name: 'C++',
      cat: 'languages',
      color: '#00599C',
      svg: `<svg viewBox="0 0 24 24" width="24" height="24"><path fill="#00599C" d="M12 2l9 5.2v10.4L12 22.8 3 17.6V7.2L12 2z"/><path fill="#fff" d="M10.5 14.5c-.8.8-1.9.8-2.7 0-1-1-1-2.7 0-3.7.8-.8 1.9-.8 2.7 0l1.2-1.2c-1.5-1.5-3.8-1.5-5.3 0-2 2-2 5.2 0 7.2 1.5 1.5 3.8 1.5 5.3 0l-1.2-1.2zm3.5-3.5h1.2v1.2h-1.2v1.2h-.8v-1.2H12v-.8h1.2V10h.8v1zm4 0h1.2v1.2h-1.2v1.2h-.8v-1.2H16v-.8h1.2V10h.8v1z"/></svg>`
    },
    {
      name: 'Java',
      cat: 'languages',
      color: '#ED8B00',
      svg: `<svg viewBox="0 0 24 24" width="24" height="24"><path fill="#5382A1" d="M9.5 18c2.5.5 5 .5 7 0-1-.5-3.5-.8-5.5-.5-1 .1-1.5.3-1.5.5z"/><path fill="#ED8B00" d="M14 6c0 2-1 3.5-2 4.5 1.5-.5 3-2 3-4.5zm-3 2c0 1.5-.5 2.5-1.5 3.5 1.2-.5 2.5-1.5 2.5-3.5z"/><path fill="#5382A1" d="M7 15.5c3 1 7.5 1 10.5 0-1.5-.5-5-.8-8-.3-1.5.2-2.5.3-2.5.3z"/><path fill="#ED8B00" d="M17 12c-2.5.5-6.5.5-9 0 0 2 2 3.5 4.5 3.5s4.5-1.5 4.5-3.5z"/></svg>`
    },
    {
      name: 'HTML5 Semantic',
      cat: 'languages',
      color: '#E34F26',
      svg: `<svg viewBox="0 0 24 24" width="24" height="24"><path fill="#E34F26" d="M3 2l1.6 18.5L12 23l7.4-2.5L21 2H3zm14.8 5.5l-.2 2.5H8.7l.2 2.5h7l-.5 5.5L12 19l-3.4-.9-.2-2.7h2.5l.1 1.2 1 .3 1-.3.2-2.4H6.5L5.7 5.5h12.1z"/></svg>`
    },
    {
      name: 'C Language',
      cat: 'languages',
      color: '#555555',
      svg: `<svg viewBox="0 0 24 24" width="24" height="24"><circle cx="12" cy="12" r="10" fill="#283593"/><path fill="#fff" d="M13.5 16.5c-1.2.8-2.6.8-3.8 0-1.8-1.4-2-4.1-.4-5.8 1.4-1.5 3.6-1.5 4.8-.3l1.5-1.5c-2-1.9-5.3-1.8-7.3.3-2.3 2.5-2 6.4.7 8.5 2.2 1.7 5.3 1.5 7.2-.5l-1.7-1.5c-.3.4-.6.6-1 .8z"/></svg>`
    }
  ];

  function initSkillsPlanet() {
    const stage = document.querySelector('.stage');
    const pl = document.querySelector('.pl');
    const hovLabel = document.getElementById('hovLabel');
    const floatingTooltip = document.getElementById('planet-floating-tooltip');
    if (!stage || !pl) return;

    // Clear dynamic icons, preserving rings
    pl.querySelectorAll('.ic').forEach(el => el.remove());

    const total = SKILLS_DATA.length;
    SKILLS_DATA.forEach((sk, i) => {
      const y = 1 - 2 * (i + 0.5) / total;
      const lat = -Math.asin(y) * (180 / Math.PI);
      const lon = i * 137.508; // Golden angle

      const ic = document.createElement('div');
      ic.className = 'ic';
      ic.setAttribute('data-skill', sk.name);
      ic.setAttribute('data-cat', sk.cat);
      ic.style.transform = `rotateY(${lon.toFixed(1)}deg) rotateX(${lat.toFixed(1)}deg) translateZ(35.5cqw)`;

      const inner = document.createElement('span');
      inner.className = 'in';
      inner.title = sk.name;
      inner.innerHTML = sk.svg;

      ic.appendChild(inner);

      // Tooltip floating directly beside cursor
      ic.addEventListener('mouseenter', (e) => {
        if (floatingTooltip) {
          const lang = window.PortfolioI18n ? window.PortfolioI18n.getLang() : 'it';
          let catLabel = sk.cat;
          if (sk.cat === 'languages') catLabel = lang === 'it' ? 'Linguaggio' : 'Language';
          else if (sk.cat === 'frameworks') catLabel = 'Framework';
          else if (sk.cat === 'databases') catLabel = lang === 'it' ? 'Database & Basi di Dati' : 'Database & Storage';
          else if (sk.cat === 'security') catLabel = 'Cybersecurity';
          else if (sk.cat === 'networks') catLabel = 'Web & APIs';
          else if (sk.cat === 'tools') catLabel = 'DevOps & Sistemi';

          floatingTooltip.innerHTML = `<strong>${sk.name}</strong><span class="tt-cat">${catLabel}</span>`;
          floatingTooltip.style.left = `${e.clientX}px`;
          floatingTooltip.style.top = `${e.clientY}px`;
          floatingTooltip.classList.add('visible');
        }
      });

      ic.addEventListener('mousemove', (e) => {
        if (floatingTooltip) {
          floatingTooltip.style.left = `${e.clientX}px`;
          floatingTooltip.style.top = `${e.clientY}px`;
        }
      });

      ic.addEventListener('mouseleave', () => {
        if (floatingTooltip) {
          floatingTooltip.classList.remove('visible');
        }
      });

      pl.appendChild(ic);
    });

    // Rotation physics state
    let rx = -12;
    let ry = 0;
    let vy = 0.22;
    let isDragging = false;
    let lastX = 0;
    let lastY = 0;

    const onStart = (clientX, clientY) => {
      isDragging = true;
      lastX = clientX;
      lastY = clientY;
    };

    const onMove = (clientX, clientY) => {
      if (!isDragging) return;
      const dx = clientX - lastX;
      const dy = clientY - lastY;
      ry += dx * 0.42;
      vy = dx * 0.42;
      rx = Math.max(-55, Math.min(55, rx - dy * 0.42));
      lastX = clientX;
      lastY = clientY;
    };

    const onEnd = () => {
      isDragging = false;
    };

    stage.addEventListener('mousedown', (e) => onStart(e.clientX, e.clientY));
    window.addEventListener('mousemove', (e) => onMove(e.clientX, e.clientY));
    window.addEventListener('mouseup', onEnd);

    // Touch support
    stage.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        onStart(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (e.touches.length === 1) {
        onMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    window.addEventListener('touchend', onEnd);

    // Animation frame loop
    function animate() {
      if (!isDragging) {
        vy += (0.20 - vy) * 0.035;
        ry += vy;
      }
      pl.style.transform = `rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
      requestAnimationFrame(animate);
    }
    animate();
  }

  document.addEventListener('DOMContentLoaded', initSkillsPlanet);
})();
