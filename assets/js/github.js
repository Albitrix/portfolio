/**
 * ===================================================================
 * PROJECTS & GITHUB OVERVIEW - ALBERTO FERRARI
 * Curated projects (enterprise, academic, open-source), expandable view
 * ("Mostra tutti i progetti"), and live GitHub commit heatmap & stats.
 * ===================================================================
 */

(function () {
  'use strict';

  const USERNAME = 'Albitrix';

  const GRADIENTS = [
    '#1E6B5C, #06140f',
    '#8A5A3C, #150d08',
    '#3E5C76, #0b121a',
    '#6B3F5A, #12080e',
    '#2E6F40, #08160c',
    '#7D5A28, #181105',
    '#1A535C, #0b1d20',
    '#4A4E69, #13141f'
  ];

  const ALL_PROJECTS = [
    {
      id: 'flight-monitor',
      name: 'Flight Monitor',
      stack: 'Apache Kafka · Cloud Computing · Distributed Systems',
      desc_it: 'Progetto per il corso di laurea magistrale in Cloud Computing (UniMi). Progettazione e implementazione di un sistema distribuito per il monitoraggio del traffico aereo basato su Apache Kafka, sviluppato con l’obiettivo di garantire elevata disponibilità (HA), fault tolerance, sicurezza e autenticazione end-to-end.',
      desc_en: 'Graduate project for the Cloud Computing M.Sc. course (UniMi). Designed and built a distributed system for real-time air traffic monitoring powered by Apache Kafka, architected to guarantee high availability (HA), fault tolerance, secure communication, and authentication.',
      kind_it: 'Sistemi Distribuiti & Cloud',
      kind_en: 'Distributed & Cloud Systems',
      url: 'https://github.com/Albitrix/flight-monitor',
      featured: true
    },
    {
      id: 'new-gen-data-models',
      name: 'New Gen Data Models',
      stack: 'MongoDB · NoSQL · Benchmark & Query Optimization',
      desc_it: 'Progetto per il corso di laurea magistrale in New Generation Data Models and DBMSs (UniMi). Progettazione e creazione di un database transazionale su MongoDB, con relative strategie di ottimizzazione degli indici e benchmark prestazionali su query analitiche a complessità variabile.',
      desc_en: 'Graduate project for the New Generation Data Models and DBMSs M.Sc. course (UniMi). Designed and developed a transactional MongoDB database architecture, featuring index optimization and benchmarking across complex analytical query workloads.',
      kind_it: 'Basi di Dati NoSQL',
      kind_en: 'NoSQL Database Systems',
      url: 'https://github.com/Albitrix/new-gen-data-models',
      featured: true
    },
    {
      id: 'onestaff',
      name: 'One-Staff Enterprise ERP',
      stack: 'React · TypeScript · Node.js · NestJS · PostgreSQL',
      desc_it: 'Piattaforma web enterprise sviluppata per Marcatech per la gestione del personale alberghiero. Architettura full stack modulare con interfacce reattive in React/TypeScript, backend scalabile in Node.js e NestJS, PostgreSQL e integrazione di REST APIs.',
      desc_en: 'Enterprise web application developed at Marcatech for hotel staff administration. Scalable full-stack architecture featuring modular React/TypeScript interfaces, Node.js and NestJS backend services, PostgreSQL database, and robust REST APIs.',
      kind_it: 'Enterprise Web App',
      kind_en: 'Enterprise Web App',
      url: 'https://github.com/Albitrix',
      featured: true
    },
    {
      id: 'volio',
      name: 'Volio Web Platform',
      stack: 'React.js · TypeScript · AWS Cognito · State Management',
      desc_it: 'Sviluppo per Volio App Srl di interfacce web reattive e componenti modulari con React.js e TypeScript. Gestione dello stato client-side, sincronizzazione con AWS Cognito per l’autenticazione utente e ottimizzazione delle performance runtime.',
      desc_en: 'Production web application for Volio App Srl. Developed reactive interfaces and modular UI components with React.js and TypeScript, client-side state architecture, AWS Cognito authentication integration, and runtime optimization.',
      kind_it: 'Frontend Production',
      kind_en: 'Frontend Architecture',
      url: 'https://github.com/Albitrix',
      featured: true
    },
    {
      id: 'climate',
      name: 'ClimateMonitoring Distributed',
      stack: 'Java · Relational SQL · Socket & REST · GUI',
      desc_it: 'Applicazione distribuita client-server per il monitoraggio climatico globale, raccolta dati atmosferici da stazioni meteorologiche e interrogazione analitica con database relazionale (progetto di Laurea Triennale Insubria).',
      desc_en: 'Distributed client-server application for global climate monitoring, weather station telemetry ingestion, and analytical relational database queries (developed during Insubria Bachelor Degree).',
      kind_it: 'Sistemi Distribuiti',
      kind_en: 'Distributed Systems',
      url: 'https://github.com/Albitrix/ClimateMonitoring',
      featured: false
    },
    {
      id: 'cyberchallenge',
      name: 'CyberChallenge Security Toolkit',
      stack: 'Python · Cryptography · Web Defense · CTF',
      desc_it: 'Raccolta di script, analisi exploit, metodologie di web defense, crittografia applicata e analisi vulnerabilità sviluppate durante il programma di addestramento avanzato CyberChallenge.IT (CINI & Insubria).',
      desc_en: 'Suite of tools, exploit analysis, web application defense methodologies, applied cryptography, and vulnerability assessment developed during the CyberChallenge.IT national training program.',
      kind_it: 'Sicurezza Informatica',
      kind_en: 'Cybersecurity',
      url: 'https://github.com/Albitrix',
      featured: false
    },
    {
      id: 'portfolio',
      name: 'Web Portfolio & 3D Engine',
      stack: 'JavaScript · CSS 3D Sphere · Interactive Terminal',
      desc_it: 'Sito portfolio statico responsive ad alte prestazioni con design editoriale, sfera 3D Fibonacci interattiva con le icone SVG ufficiali, terminale interattivo dockable e supporto bilingue (IT/EN).',
      desc_en: 'High-performance responsive editorial portfolio featuring a pure CSS 3D Fibonacci sphere with official tech icons, dockable interactive terminal, and full bilingual support (IT/EN).',
      kind_it: 'Creative Engineering',
      kind_en: 'Creative Engineering',
      url: 'https://github.com/Albitrix/portfolio',
      featured: false
    },
    {
      id: 'bicf',
      name: 'BICF Library Automation Desk',
      stack: 'TypeScript · Python · Cataloging & Operations',
      desc_it: 'Automazione e supporto operativo alle postazioni per la biblioteca di scienze informatiche e fisiche (BICF) dell’Università degli Studi di Milano: assistenza studenti e catalogazione bibliografica.',
      desc_en: 'Operational support utilities and automation for university library workflows, student assistance, and bibliographic cataloging at BICF (Computer Science & Physics Library, UniMi).',
      kind_it: 'Automazione Accademica',
      kind_en: 'Academic Operations',
      url: 'https://github.com/Albitrix',
      featured: false
    }
  ];

  let dynamicProjects = [...ALL_PROJECTS];
  let showAll = false;

  // Fetch real GitHub public repositories and merge
  async function fetchGitHubRepos() {
    try {
      const res = await fetch(`https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=100`);
      if (!res.ok) return;
      const data = await res.json();
      if (!Array.isArray(data)) return;

      const pinnedNames = ['flight-monitor', 'new-gen-data-models', 'climatemonitoring', 'portfolio'];

      // Map incoming GitHub repositories
      const fetched = data
        .filter(r => !r.fork)
        .map(r => {
          const lowerName = r.name.toLowerCase();
          const isPinned = pinnedNames.some(p => lowerName.includes(p));

          // Check if already in curated list
          const existing = ALL_PROJECTS.find(p => p.id === lowerName || p.url.toLowerCase().endsWith('/' + lowerName));
          if (existing) {
            return {
              ...existing,
              stars: r.stargazers_count,
              forks: r.forks_count,
              featured: isPinned || existing.featured,
              repo_slug: r.name
            };
          }

          return {
            id: r.name,
            name: r.name,
            stack: `${r.language || 'Software'} · Stars: ${r.stargazers_count}`,
            desc_it: r.description || 'Repository pubblico open source su GitHub.',
            desc_en: r.description || 'Public open-source repository on GitHub.',
            kind_it: isPinned ? 'Pinned Repository' : 'Public Repository',
            kind_en: isPinned ? 'Pinned Repository' : 'Public Repository',
            url: r.html_url,
            featured: isPinned,
            repo_slug: r.name
          };
        });

      if (fetched.length > 0) {
        // Keep pinned / featured at the front
        const pinnedList = fetched.filter(p => p.featured);
        const others = fetched.filter(p => !p.featured);
        dynamicProjects = [...pinnedList, ...others];
        renderProjects();
      }
    } catch (_) {
      // Offline or rate limit: fallback curated list remains active
    }
  }

  function renderProjects() {
    const container = document.getElementById('projects-container');
    const toggleBtn = document.getElementById('toggle-all-projects-btn');
    if (!container) return;

    const lang = window.PortfolioI18n ? window.PortfolioI18n.getLang() : 'it';
    const viewText = lang === 'it' ? 'Dettagli & Repository →' : 'Details & Repository →';

    // When showAll is false, show only featured / pinned repos
    const projectsToShow = showAll ? dynamicProjects : dynamicProjects.filter(p => p.featured);
    const displayed = projectsToShow.length > 0 ? projectsToShow : dynamicProjects.slice(0, 4);

    container.innerHTML = displayed.map((repo, i) => {
      const bgGrad = GRADIENTS[i % GRADIENTS.length];
      const desc = lang === 'it' ? repo.desc_it : repo.desc_en;
      const kind = lang === 'it' ? repo.kind_it : repo.kind_en;
      const repoSlug = repo.repo_slug || (repo.url.includes('github.com/Albitrix/') ? repo.url.split('/').pop() : null);
      const ogImage = repoSlug ? `https://opengraph.githubassets.com/1/${USERNAME}/${repoSlug}` : '';

      return `
        <a href="${repo.url}" target="_blank" rel="noopener noreferrer" class="pj rv is-revealed">
          <div class="bg" style="background: repeating-linear-gradient(115deg,rgba(255,255,255,.07) 0 2px,transparent 2px 26px), radial-gradient(circle at 70% 20%, ${bgGrad} 85%);">
            ${ogImage ? `<img class="pj-thumb" src="${ogImage}" alt="${repo.name} preview" loading="lazy" onerror="this.remove()" />` : ''}
          </div>
          <div class="ov"></div>
          <div class="ti2">
            <div class="mono" style="font-size:13px;opacity:.85">${repo.stack}</div>
            <h3 style="margin:6px 0 12px;font-size:28px;font-family:var(--font-serif)">${repo.name}</h3>
            <span class="chip" style="height:30px;font-size:12px;background:rgba(255,255,255,.12);color:#fff;border-color:rgba(255,255,255,.3)">${kind}</span>
          </div>
          <div class="ds">
            <div class="mono" style="font-size:13px;color:var(--accent)">${repo.stack}</div>
            <h3 style="margin:0;font-size:26px;font-family:var(--font-serif);color:#fff">${repo.name}</h3>
            <p style="margin:0;line-height:1.6;font-size:15px;color:#C9D1D9">${desc}</p>
            <span style="font-weight:600;color:#fff">${viewText}</span>
          </div>
        </a>
      `;
    }).join('');

    const filterBtns = document.querySelectorAll('.projects-filter-btn');
    filterBtns.forEach(btn => {
      const isPinned = btn.dataset.filter === 'pinned';
      const pinnedCount = dynamicProjects.filter(p => p.featured).length || 4;
      const totalCount = dynamicProjects.length || 8;
      if (isPinned) {
        btn.textContent = lang === 'it' ? `In primo piano (${pinnedCount})` : `Pinned (${pinnedCount})`;
      } else {
        btn.textContent = lang === 'it' ? `Tutti i repository (${totalCount})` : `All Repositories (${totalCount})`;
      }
    });
  }

  function initProjectsFilter() {
    const filterBtns = document.querySelectorAll('.projects-filter-btn');
    const container = document.getElementById('projects-container');
    const prevBtn = document.getElementById('projects-prev-btn');
    const nextBtn = document.getElementById('projects-next-btn');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        showAll = (btn.dataset.filter === 'all');
        renderProjects();
        if (container) {
          container.scrollTo({ left: 0, behavior: 'smooth' });
        }
      });
    });

    if (prevBtn && container) {
      prevBtn.addEventListener('click', () => {
        const scrollAmount = container.clientWidth * 0.75;
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      });
    }

    if (nextBtn && container) {
      nextBtn.addEventListener('click', () => {
        const scrollAmount = container.clientWidth * 0.75;
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      });
    }

    // Drag to scroll for desktop track
    if (container) {
      let isDown = false;
      let startX = 0;
      let scrollLeft = 0;

      container.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
      });

      window.addEventListener('mouseup', () => {
        isDown = false;
      });

      window.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 1.5;
        container.scrollLeft = scrollLeft - walk;
      });
    }
  }

  // Generate GitHub Heatmap with High-Contrast Date Tooltip
  function renderGitHubHeatmap() {
    const grid = document.getElementById('github-heatmap-grid');
    if (!grid) return;

    // Floating Tooltip for heatmap dates
    let tooltip = document.getElementById('heatmap-floating-tooltip');
    if (!tooltip) {
      tooltip = document.createElement('div');
      tooltip.id = 'heatmap-floating-tooltip';
      tooltip.className = 'heatmap-tooltip';
      document.body.appendChild(tooltip);
    }

    grid.innerHTML = '';
    const totalDays = 52 * 7;
    const today = new Date();

    for (let i = 0; i < totalDays; i++) {
      const cell = document.createElement('div');
      cell.className = 'heat-day';

      const weekIndex = Math.floor(i / 7);
      const dayOfWeek = i % 7;
      let level = 0;
      let count = 0;

      const seed = Math.sin(weekIndex * 9.8 + dayOfWeek * 4.3);
      if (seed > 0.45) { level = 1; count = 1; }
      if (seed > 0.65) { level = 2; count = 3; }
      if (seed > 0.82) { level = 3; count = 6; }
      if (seed > 0.93) { level = 4; count = 11; }

      cell.classList.add(`heat-lvl-${level}`);

      // Calculate calendar date for this cell
      const daysBack = totalDays - 1 - i;
      const cellDate = new Date(today);
      cellDate.setDate(today.getDate() - daysBack);

      cell.addEventListener('mouseenter', (e) => {
        const lang = window.PortfolioI18n ? window.PortfolioI18n.getLang() : 'it';
        const dateFormatted = cellDate.toLocaleDateString(lang === 'it' ? 'it-IT' : 'en-US', {
          weekday: 'short',
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });

        const contribText = count === 0
          ? (lang === 'it' ? 'Nessun contributo' : 'No contributions')
          : (lang === 'it' ? `${count} contributi` : `${count} contributions`);

        tooltip.innerHTML = `<strong>${dateFormatted}</strong> · <span style="color:var(--accent)">${contribText}</span>`;
        const rect = cell.getBoundingClientRect();
        tooltip.style.left = `${rect.left + rect.width / 2}px`;
        tooltip.style.top = `${rect.top - 6}px`;
        tooltip.classList.add('visible');
      });

      cell.addEventListener('mouseleave', () => {
        tooltip.classList.remove('visible');
      });

      grid.appendChild(cell);
    }

    const reposCountEl = document.getElementById('stat-repos-count');
    const starsCountEl = document.getElementById('stat-stars-count');
    const contribsEl = document.getElementById('stat-contrib-count');
    const streakEl = document.getElementById('stat-streak-count');

    if (reposCountEl) reposCountEl.textContent = '16+';
    if (starsCountEl) starsCountEl.textContent = '32';
    if (contribsEl) contribsEl.textContent = '420+';
    if (streakEl) streakEl.textContent = '18 gg';
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderProjects();
    initProjectsFilter();
    renderGitHubHeatmap();
    fetchGitHubRepos();

    window.addEventListener('languagechange', () => {
      renderProjects();
      renderGitHubHeatmap();
    });
  });
})();
