/**
 * ===================================================================
 * FLOATING INTERACTIVE TERMINAL - ALBERTO FERRARI
 * Auto-typing intro sequence, command processor (man, help, ls, cd,
 * clear, whoami, theme, lang, cv, contact), persistent history,
 * light/dark theme styling, and smooth scroll docking.
 * ===================================================================
 */

(function () {
  'use strict';

  const SECTIONS = ['esperienze', 'progetti', 'github', 'skills', 'contatti'];

  const SCRIPT_LINES = [
    '$ whoami',
    'Alberto Ferrari — Studente Magistrale UniMi & Software Developer',
    '$ cat ruolo.txt',
    'Full Stack Engineer (React, TypeScript, Node.js, NestJS, Distributed Systems)',
    '$ ls',
    'esperienze/  progetti/  github/  skills/  contatti/',
    "# digita 'man' o 'cd <sezione>' per iniziare"
  ];

  function initTerminal() {
    const term = document.querySelector('.term');
    const tspace = document.querySelector('.tspace');
    const home = document.getElementById('home');
    const tb = term ? term.querySelector('.tb') : null;
    const ti = term ? term.querySelector('.ti') : null;
    const pathSpan = document.getElementById('term-path');
    const promptSpan = document.getElementById('term-prompt');
    const header = term ? term.querySelector('.th') : null;
    const fab = document.getElementById('term-fab');
    const backdrop = document.getElementById('term-backdrop');
    const closeBtn = document.getElementById('term-close-btn');

    if (!term) return;

    // Mobile drawer state
    let isDrawerOpen = false;

    function openDrawer() {
      isDrawerOpen = true;
      term.classList.add('is-drawer');
      if (backdrop) backdrop.classList.add('visible');
      if (fab) fab.classList.remove('visible');
      term.style.removeProperty('left');
      term.style.removeProperty('top');
      term.style.removeProperty('width');
      term.style.removeProperty('height');
      term.style.opacity = '1';
      term.style.pointerEvents = 'auto';
      if (ti) {
        setTimeout(() => ti.focus(), 120);
      }
    }

    function closeDrawer() {
      isDrawerOpen = false;
      term.classList.remove('is-drawer');
      if (backdrop) backdrop.classList.remove('visible');
      if (window.innerWidth <= 960) {
        term.style.opacity = '0';
        term.style.pointerEvents = 'none';
        if (fab) fab.classList.add('visible');
      }
    }

    if (fab) fab.addEventListener('click', openDrawer);
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    if (backdrop) backdrop.addEventListener('click', closeDrawer);
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isDrawerOpen) {
        closeDrawer();
      }
    });

    // Persistent command history & scroll lock
    let historyLines = [];
    let currentSec = 'home';
    let isTyping = true;
    let fullScriptText = SCRIPT_LINES.join('\n');
    let charIndex = 0;
    let userScrolledUp = false;

    if (tb) {
      tb.addEventListener('scroll', () => {
        const distFromBottom = tb.scrollHeight - tb.scrollTop - tb.clientHeight;
        userScrolledUp = distFromBottom > 35;
      });
    }

    // Render output
    function renderLines() {
      if (!tb) return;
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

      const historyHtml = historyLines.filter(l => l.trim().length > 0).map(l => {
        let color = isDark ? '#C9D1D9' : '#24292F';
        if (l.startsWith('$')) color = isDark ? '#7EE787' : '#1E6B5C';
        else if (l.startsWith('#')) color = isDark ? '#8B949E' : '#6E7681';
        else if (l.startsWith('→')) color = isDark ? '#79C0FF' : '#0969DA';
        else if (l.startsWith('!')) color = isDark ? '#FFA657' : '#CF222E';
        return `<div style="color:${color};line-height:1.4">${escapeHtml(l)}</div>`;
      }).join('');

      let typingHtml = '';
      if (isTyping) {
        const cursorColor = isDark ? '#7EE787' : '#1E6B5C';
        const currentTyped = fullScriptText.slice(0, charIndex);
        const rawLines = currentTyped.split('\n');

        typingHtml = rawLines.map((l, idx) => {
          const isLast = idx === rawLines.length - 1;
          let color = isDark ? '#C9D1D9' : '#24292F';
          if (l.startsWith('$')) color = isDark ? '#7EE787' : '#1E6B5C';
          else if (l.startsWith('#')) color = isDark ? '#8B949E' : '#6E7681';
          const cursor = isLast ? `<span class="blink" style="color:${cursorColor}">▍</span>` : '';
          return `<div style="color:${color};line-height:1.4">${escapeHtml(l)}${cursor}</div>`;
        }).join('');
      }

      const inputRow = document.getElementById('term-input-row');
      const linesContainer = document.getElementById('term-lines-content');
      if (linesContainer) {
        linesContainer.innerHTML = historyHtml + (isTyping ? typingHtml : '');
      }

      if (inputRow) {
        inputRow.style.display = isTyping ? 'none' : 'flex';
      }

      if (!userScrolledUp) {
        tb.scrollTop = tb.scrollHeight;
      }
    }

    function escapeHtml(str) {
      return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    // Auto-typing sequence (persistently retained in history)
    let typeInterval = null;

    function finishTyping() {
      if (!isTyping) return;
      if (typeInterval) clearInterval(typeInterval);
      isTyping = false;
      historyLines = [...SCRIPT_LINES];
      renderLines();
      if (ti) ti.focus();
    }

    typeInterval = setInterval(() => {
      charIndex += 2;
      renderLines();
      if (charIndex >= fullScriptText.length) {
        finishTyping();
      }
    }, 28);

    // Command processor
    function runCommand(cmdString) {
      userScrolledUp = false;
      const clean = cmdString.trim();
      historyLines.push(`$ ${clean}`);

      if (!clean) {
        renderLines();
        return;
      }

      const parts = clean.split(/\s+/);
      const cmd = parts[0].toLowerCase();
      const arg = (parts[1] || '').replace(/\/$/, '').toLowerCase();

      const currentLang = window.PortfolioI18n ? window.PortfolioI18n.getLang() : 'it';

      switch (cmd) {
        case 'man':
        case 'help':
          if (currentLang === 'en') {
            historyLines.push('MANUAL — ALBERTO FERRARI PORTFOLIO SHELL');
            historyLines.push('Available commands:');
            historyLines.push('  whoami        - About me, education, and profile');
            historyLines.push('  ls            - List sections and document files');
            historyLines.push('  cd <section>  - Navigate to specified section');
            historyLines.push('  pwd           - Print working directory & section');
            historyLines.push('  cv [it|en]    - Download Curriculum Vitae in IT or EN (PDF)');
            historyLines.push('  theme         - Toggle light / dark theme');
            historyLines.push('  lang          - Switch language (Italian / English)');
            historyLines.push('  contact       - Show email, LinkedIn, GitHub, Instagram');
            historyLines.push('  clear         - Clear terminal screen');
          } else {
            historyLines.push('MANUALE — TERMINALE PORTFOLIO ALBERTO FERRARI');
            historyLines.push('Comandi disponibili:');
            historyLines.push('  whoami        - Chi sono, formazione accademica e profilo');
            historyLines.push('  ls            - Elenco delle sezioni e directory');
            historyLines.push('  cd <sezione>  - Naviga verso la sezione specificata');
            historyLines.push('  pwd           - Mostra percorso e sezione attiva');
            historyLines.push('  cv [it|en]    - Scarica il Curriculum Vitae in italiano o inglese (PDF)');
            historyLines.push('  theme         - Inverte tema chiaro / scuro');
            historyLines.push('  lang          - Inverte lingua (Italiano / English)');
            historyLines.push('  contact       - Mostra email, LinkedIn, GitHub e Instagram');
            historyLines.push('  clear         - Pulisce lo schermo del terminale');
          }
          break;

        case 'whoami':
          if (currentLang === 'en') {
            historyLines.push('ALBERTO FERRARI');
            historyLines.push('• Master\'s Student in Computer Science (UniMi) — In progress');
            historyLines.push('• Bachelor\'s in Computer Science (Insubria) — Final Grade 99/110');
            historyLines.push('• Software Engineer: React, TypeScript, Node.js, NestJS, Kafka, MongoDB, SQL');
            historyLines.push('• Experience: Volio App Srl, BICF Library UniMi, Emisfera, Marcatech, CyberChallenge.IT');
          } else {
            historyLines.push('ALBERTO FERRARI');
            historyLines.push('• Studente Magistrale in Informatica (UniMi) — In corso');
            historyLines.push('• Laurea Triennale in Informatica (Insubria) — Voto 99/110');
            historyLines.push('• Sviluppatore Software: React, TypeScript, Node.js, NestJS, Kafka, MongoDB, SQL');
            historyLines.push('• Esperienze: Volio App Srl, Biblioteca BICF UniMi, Emisfera, Marcatech, CyberChallenge.IT');
          }
          break;

        case 'ls':
          historyLines.push('esperienze/   progetti/   github/   skills/   contatti/   cv_it.pdf   cv_en.pdf');
          break;

        case 'pwd':
          historyLines.push(`/home/albitrix/${currentSec}`);
          break;

        case 'cd':
          if (!arg || arg === '~' || arg === '..' || arg === 'home') {
            historyLines.push(currentLang === 'en' ? '→ Navigating to ~ (Home)' : '→ Navigazione verso ~ (Home)');
            if (window.PortfolioSnap) window.PortfolioSnap.snapToSection(0);
            else document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
          } else if (SECTIONS.includes(arg)) {
            historyLines.push(currentLang === 'en' ? `→ Navigating to ~/${arg}` : `→ Navigazione verso ~/${arg}`);
            const idx = ['home', ...SECTIONS].indexOf(arg);
            if (window.PortfolioSnap && idx !== -1) window.PortfolioSnap.snapToSection(idx);
            else document.getElementById(arg)?.scrollIntoView({ behavior: 'smooth' });
          } else {
            historyLines.push(currentLang === 'en' ? `! cd: no such directory: ${arg}. Type 'ls' to see sections.` : `! cd: directory inesistente: ${arg}. Digita 'ls' per visualizzare le cartelle.`);
          }
          break;

        case 'cv':
          let cvDoc = currentLang === 'en' ? 'cv_en.pdf' : 'cv_it.pdf';
          let dlName = currentLang === 'en' ? 'Alberto_Ferrari_CV_EN.pdf' : 'Alberto_Ferrari_CV_IT.pdf';

          if (arg === 'en' || arg === 'eng' || arg === 'english') {
            cvDoc = 'cv_en.pdf';
            dlName = 'Alberto_Ferrari_CV_EN.pdf';
          } else if (arg === 'it' || arg === 'ita' || arg === 'italiano') {
            cvDoc = 'cv_it.pdf';
            dlName = 'Alberto_Ferrari_CV_IT.pdf';
          }

          historyLines.push(currentLang === 'en' ? `→ Starting download: ${dlName}` : `→ Avvio download: ${dlName}`);
          const a = document.createElement('a');
          a.href = `assets/docs/${cvDoc}`;
          a.download = dlName;
          document.body.appendChild(a);
          a.click();
          a.remove();
          break;

        case 'theme':
          if (window.PortfolioTheme && window.PortfolioTheme.toggle) {
            window.PortfolioTheme.toggle();
            historyLines.push(currentLang === 'en' ? '→ Theme switched successfully' : '→ Tema invertito con successo');
          }
          break;

        case 'lang':
          if (window.PortfolioI18n && window.PortfolioI18n.toggle) {
            window.PortfolioI18n.toggle();
            historyLines.push(currentLang === 'en' ? '→ Language switched successfully' : '→ Lingua invertita con successo');
          }
          break;

        case 'contact':
          if (currentLang === 'en') {
            historyLines.push('Official Contact Information:');
            historyLines.push('• Email: alberto.ferrari2002@gmail.com');
            historyLines.push('• GitHub: https://github.com/Albitrix');
            historyLines.push('• LinkedIn: https://linkedin.com/in/alberto-ferrari-18111529b');
            historyLines.push('• Instagram: https://instagram.com/alby_ferra');
          } else {
            historyLines.push('Recapiti Ufficiali:');
            historyLines.push('• Email: alberto.ferrari2002@gmail.com');
            historyLines.push('• GitHub: https://github.com/Albitrix');
            historyLines.push('• LinkedIn: https://linkedin.com/in/alberto-ferrari-18111529b');
            historyLines.push('• Instagram: https://instagram.com/alby_ferra');
          }
          break;

        case 'clear':
          historyLines = [];
          break;

        case 'cat':
          if (arg === 'ruolo.txt' || !arg) {
            historyLines.push('Full Stack Engineer (React, TypeScript, Node.js, NestJS, Distributed Systems)');
          } else {
            historyLines.push(currentLang === 'en' ? `! cat: ${arg}: No such file` : `! cat: ${arg}: File non trovato`);
          }
          break;

        default:
          historyLines.push(currentLang === 'en' 
            ? `! command not found: '${cmd}'. Type 'man' or 'help' to see available commands.`
            : `! comando non trovato: '${cmd}'. Digita 'man' per visualizzare i comandi.`);
          break;
      }

      renderLines();
    }

    // ===================================================================
    // TAB AUTOCOMPLETION (BASH-STYLE SINGLE & DOUBLE TAB)
    // ===================================================================
    let lastTabTime = 0;
    let lastTabPrefix = '';

    const COMMAND_LIST = ['cat', 'cd', 'clear', 'contact', 'cv', 'help', 'lang', 'ls', 'man', 'pwd', 'theme', 'whoami'];
    const DIR_LIST = ['contatti/', 'esperienze/', 'github/', 'home/', 'progetti/', 'skills/'];
    const FILE_LIST = ['contatti/', 'cv_en.pdf', 'cv_it.pdf', 'esperienze/', 'github/', 'progetti/', 'ruolo.txt', 'skills/'];

    function getLCP(arr) {
      if (!arr || !arr.length) return '';
      let prefix = arr[0];
      for (let i = 1; i < arr.length; i++) {
        while (!arr[i].toLowerCase().startsWith(prefix.toLowerCase())) {
          prefix = prefix.slice(0, -1);
          if (!prefix) return '';
        }
      }
      return prefix;
    }

    function handleTabCompletion() {
      if (!ti) return;
      const val = ti.value;
      const now = performance.now();
      const isConsecutive = (now - lastTabTime < 600) || (val === lastTabPrefix && now - lastTabTime < 2500);

      // Distinguish command vs argument completion
      const match = val.match(/^(\s*)(\S+)(\s+)(.*)$/);
      let candidates = [];
      let currentWord = '';
      let baseBeforeWord = '';

      if (match) {
        // Completing an argument
        const cmdName = match[2].toLowerCase();
        baseBeforeWord = match[1] + match[2] + match[3];
        currentWord = match[4];

        if (cmdName === 'cd') {
          candidates = DIR_LIST;
        } else if (cmdName === 'cv') {
          candidates = ['en', 'it'];
        } else if (cmdName === 'cat') {
          candidates = ['ruolo.txt'];
        } else if (cmdName === 'man' || cmdName === 'help') {
          candidates = COMMAND_LIST;
        } else if (cmdName === 'ls') {
          candidates = FILE_LIST;
        } else {
          candidates = DIR_LIST;
        }
      } else {
        // Completing the command name
        const leadingSpaces = (val.match(/^\s*/) || [''])[0];
        baseBeforeWord = leadingSpaces;
        currentWord = val.trim();
        candidates = COMMAND_LIST;
      }

      const matches = candidates.filter(c => c.toLowerCase().startsWith(currentWord.toLowerCase()));

      if (matches.length === 0) {
        lastTabTime = 0;
        lastTabPrefix = '';
        return;
      }

      if (matches.length === 1) {
        // Unique match: complete fully
        const completion = matches[0];
        const trailing = completion.endsWith('/') ? '' : ' ';
        ti.value = baseBeforeWord + completion + trailing;
        ti.selectionStart = ti.selectionEnd = ti.value.length;
        lastTabTime = 0;
        lastTabPrefix = '';
        return;
      }

      // Multiple matches: calculate longest common prefix (LCP)
      const lcp = getLCP(matches);

      if (lcp.length > currentWord.length) {
        // Common prefix can be extended
        ti.value = baseBeforeWord + lcp;
        ti.selectionStart = ti.selectionEnd = ti.value.length;
        lastTabTime = now;
        lastTabPrefix = ti.value;
      } else {
        // Already at common prefix: on double-tab print available completions
        if (isConsecutive) {
          userScrolledUp = false;
          historyLines.push(`$ ${ti.value}`);
          historyLines.push(matches.join('   '));
          renderLines();
          lastTabTime = 0;
          lastTabPrefix = '';
        } else {
          lastTabTime = now;
          lastTabPrefix = ti.value;
        }
      }
    }

    function onTabKeyDown(e) {
      const isTab = (e.key === 'Tab' || e.code === 'Tab' || e.keyCode === 9 || e.which === 9);
      if (!isTab) return;

      const activeEl = document.activeElement;
      const isTerminalTarget = (
        activeEl === ti ||
        e.target === ti ||
        (term && (term.contains(activeEl) || term.contains(e.target)))
      );

      if (isTerminalTarget) {
        e.preventDefault();
        e.stopPropagation();
        if (e.stopImmediatePropagation) e.stopImmediatePropagation();

        if (isTyping) {
          finishTyping();
        }

        if (ti && document.activeElement !== ti) {
          ti.focus();
        }

        handleTabCompletion();
      }
    }

    if (ti) {
      ti.addEventListener('keydown', (e) => {
        if (e.key === 'Tab' || e.code === 'Tab' || e.keyCode === 9 || e.which === 9) {
          e.preventDefault();
          e.stopPropagation();
          if (e.stopImmediatePropagation) e.stopImmediatePropagation();
          handleTabCompletion();
          return;
        }

        if (e.key === 'Enter') {
          const val = ti.value;
          ti.value = '';
          lastTabTime = 0;
          lastTabPrefix = '';
          runCommand(val);
        }
      });

      ti.addEventListener('input', () => {
        lastTabTime = 0;
        lastTabPrefix = '';
      });
    }

    if (term) {
      term.addEventListener('click', () => {
        if (isTyping) finishTyping();
        if (ti) ti.focus();
      });
    }

    window.addEventListener('keydown', onTabKeyDown, true);
    document.addEventListener('keydown', onTabKeyDown, true);

    // Re-render when theme changes so text colors match
    window.addEventListener('themechange', () => {
      renderLines();
    });

    // Update active section label without resetting history!
    function updateSection() {
      const vh = window.innerHeight;
      let active = 'home';
      SECTIONS.forEach(id => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= vh * 0.45) {
          active = id;
        }
      });
      if (active !== currentSec) {
        currentSec = active;
        if (pathSpan) pathSpan.textContent = `albitrix@portfolio: ~/${currentSec}`;
        if (promptSpan) promptSpan.textContent = `~/${currentSec} $`;
      }
    }

    // Scroll-based docking animation
    const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
    const lerp = (a, b, t) => a + (b - a) * t;

    function onScrollTick() {
      updateSection();

      if (tspace && home) {
        const vw = window.innerWidth;
        const vh = window.innerHeight;

        // Constant speed and smoother/slower progress over 85% of viewport height
        const exitDistance = Math.max(480, vh * 0.85);
        const t = clamp(-home.getBoundingClientRect().top / exitDistance, 0, 1);

        const r = tspace.getBoundingClientRect();

        if (vw <= 960) {
          // Mobile / Tablet Responsive Mode
          if (isDrawerOpen) {
            if (t < 0.5) {
              closeDrawer();
            } else {
              term.style.removeProperty('left');
              term.style.removeProperty('top');
              term.style.removeProperty('width');
              term.style.removeProperty('height');
              term.style.opacity = '1';
              term.style.pointerEvents = 'auto';
              term.style.fontSize = '12px';
            }
          } else {
            if (t < 0.65) {
              // In Hero: natural inline flow over tspace
              term.style.left = `${r.left}px`;
              term.style.top = `${r.top}px`;
              term.style.width = `${r.width}px`;
              term.style.height = `${r.height}px`;
              term.style.fontSize = '12px';
              term.style.opacity = '1';
              term.style.pointerEvents = 'auto';
              if (fab) fab.classList.remove('visible');
            } else {
              // In subsequent sections: hide bulky terminal, reveal sleek FAB
              term.style.opacity = '0';
              term.style.pointerEvents = 'none';
              if (fab) fab.classList.add('visible');
            }
          }
        } else {
          // DESKTOP 16:9 MODE (vw > 960px): 100% UNCHANGED, FULL DOCKING GLIDE
          if (isDrawerOpen) {
            closeDrawer();
          }
          if (fab) fab.classList.remove('visible');
          if (backdrop) backdrop.classList.remove('visible');
          term.classList.remove('is-drawer');
          term.style.opacity = '1';
          term.style.pointerEvents = 'auto';

          // Docked dimensions in subsequent sections (440px wide x 260px high)
          const dw = Math.min(440, vw - 32);
          const dh = 260;
          const dl = vw - dw - 24;
          const dt = vh - dh - 24;

          // Linear constant speed glide
          term.style.left = `${lerp(r.left, dl, t)}px`;
          term.style.top = `${lerp(r.top, dt, t)}px`;
          term.style.width = `${lerp(r.width, dw, t)}px`;
          term.style.height = `${lerp(r.height, dh, t)}px`;
          term.style.fontSize = `${lerp(13.5, 12, t)}px`;
        }

        if (!userScrolledUp && tb) {
          tb.scrollTop = tb.scrollHeight;
        }
      }

      requestAnimationFrame(onScrollTick);
    }

    requestAnimationFrame(onScrollTick);
  }

  document.addEventListener('DOMContentLoaded', initTerminal);
})();
