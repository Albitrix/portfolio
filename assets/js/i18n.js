/**
 * ===================================================================
 * INTERNATIONALIZATION (i18n) - ALBERTO FERRARI
 * Bilingual support (Italian & English) with localStorage persistence.
 * ===================================================================
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'portfolio-lang-preference';

  const translations = {
    it: {
      nav: {
        home: 'Hey',
        esperienze: 'Percorso',
        progetti: 'Progetti',
        github: 'GitHub',
        skills: 'Skills',
        contatti: 'Contatti',
      },
      hero: {
        role: 'Studente Magistrale & Sviluppatore Software',
        bio: 'Sviluppatore software specializzato in React, TypeScript e Node.js e studente magistrale in Informatica all\'Università degli Studi di Milano. Unisco solida preparazione teorica (Laurea Triennale 99/110 all\'Università dell\'Insubria) ed esperienza pratica su progetti web enterprise reali.',
        eduBadge: 'UniMi Magistrale · Insubria Triennale 99/110 · Software Engineer',
      },
      esperienze: {
        eyebrow: 'Percorso',
        title: 'Esperienze & Formazione',
        scrollHint: '← Scorri orizzontalmente con frecce o drag · 8 schede →',
        filterAll: 'Tutte (8)',
        filterWork: 'Esperienze (4)',
        filterEdu: 'Formazione (4)',
        chipEdu: 'Formazione',
        chipWork: 'Esperienza',
        jobs: [
          {
            when: 'SETTEMBRE 2025 — PRESENTE',
            role: 'Laurea Magistrale in Informatica',
            company: 'Università degli Studi di Milano (UniMi)',
            desc: 'Percorso magistrale focalizzato su algoritmi complessi, infrastrutture di reti, sicurezza informatica e architetture software scalabili ad alte prestazioni.',
            tags: ['UniMi', 'Algoritmi Complessi', 'Infrastrutture di Reti', 'Sicurezza Informatica']
          },
          {
            when: 'AGOSTO 2026 — OTTOBRE 2026',
            role: 'React Frontend Developer',
            company: 'Volio App Srl — Remoto, Italia',
            desc: 'Sviluppo di interfacce web reattive e componenti modulari con React.js e TypeScript. Gestione dello stato client-side, sincronizzazione con AWS Cognito per l’autenticazione utente e ottimizzazione delle performance dell’applicazione.',
            tags: ['React.js', 'TypeScript', 'AWS Cognito', 'State Management']
          },
          {
            when: 'MAGGIO 2026 — LUGLIO 2026',
            role: 'Collaborazione Studentesca',
            company: 'Biblioteca BICF (Scienze Informatiche e Fisiche) – UniMi',
            desc: 'Supporto operativo e assistenza agli studenti per l’accesso alle risorse bibliotecarie e alle aule studio. Gestione dei servizi di front-office e supporto alla catalogazione.',
            tags: ['UniMi BICF', 'Supporto Operativo', 'Front-Office', 'Catalogazione']
          },
          {
            when: 'MARZO 2025 — SETTEMBRE 2025',
            role: 'Specialista Sistemi IT Aziendali',
            company: 'Emisfera — Verbania (VB), Italia',
            desc: 'Gestione operativa di sistemi e piattaforme enterprise a tempo pieno. Personalizzazione di ambienti Microsoft SharePoint, configurazione e manutenzione del sistema helpdesk osTicket e supporto alla migrazione di database aziendali.',
            tags: ['Microsoft SharePoint', 'osTicket Helpdesk', 'Migrazione Database', 'Enterprise IT']
          },
          {
            when: 'LUGLIO 2024 — MARZO 2025',
            role: 'Full Stack Developer',
            company: 'Marcatech — Gazzada Schianno (VA), Italia',
            desc: 'Sviluppo dell’applicazione web enterprise One-Staff per la gestione del personale alberghiero. Implementazione frontend con React e TypeScript, backend scalabile basato su Node.js, NestJS e PostgreSQL, e integrazione di REST APIs.',
            tags: ['One-Staff ERP', 'React', 'TypeScript', 'Node.js & NestJS', 'PostgreSQL', 'REST APIs']
          },
          {
            when: 'EDIZIONE 2024',
            role: 'CyberChallenge.IT — Formazione & Gara di Cybersecurity',
            company: 'Cybersecurity National Lab (CINI) & Università dell’Insubria',
            desc: 'Addestramento avanzato su crittografia applicata, sicurezza web, software defense, analisi di vulnerabilità, reti e partecipazione alla competizione CTF.',
            tags: ['Cybersecurity', 'Web Security', 'Crittografia Applicata', 'Software Defense', 'Gara CTF']
          },
          {
            when: 'SETTEMBRE 2021 — DICEMBRE 2024',
            role: 'Laurea Triennale in Informatica',
            company: 'Università degli Studi dell’Insubria (Voto: 99/110)',
            desc: 'Votazione: 99/110. Solida preparazione in ingegneria del software, basi di dati relazionali, reti di calcolatori e sistemi operativi.',
            tags: ['Voto: 99/110', 'Ingegneria del Software', 'Basi di Dati Relazionali', 'Reti & Sistemi Operativi']
          },
          {
            when: 'SETTEMBRE 2016 — GIUGNO 2021',
            role: 'Diploma Liceo Scientifico (Scienze Applicate)',
            company: 'IIS Lorenzo Cobianchi — Verbania (Voto: 85/100)',
            desc: 'Votazione: 85/100. Solida preparazione logico-matematica, fisica e primi fondamenti di programmazione e informatica.',
            tags: ['Voto: 85/100', 'Scienze Applicate', 'STEM', 'Matematica & Fisica']
          }
        ]
      },
      progetti: {
        eyebrow: 'Lavori Selezionati',
        title: 'Progetti & Architetture',
        filterPinned: 'In primo piano',
        filterAll: 'Tutti i repository',
        viewGithub: 'Dettagli & Repository →',
        showAllBtn: 'Mostra tutti i repository pubblici (8) ↓',
        showLessBtn: 'Mostra solo pinned ↑'
      },
      github: {
        eyebrow: 'Open Source',
        title: 'Attività su GitHub',
        subtitle: 'Statistiche e commit activity dal profilo @Albitrix su GitHub.',
        stats: {
          contributions: 'Contributi nell\'ultimo anno',
          repos: 'Repository Pubblici',
          stars: 'Stelle Ricevute',
          streak: 'Streak di Commit',
        },
        less: 'Meno',
        more: 'Più',
        viewProfile: 'Vedi Profilo GitHub ↗',
      },
      skills: {
        eyebrow: 'Il mio pianeta',
        title: 'Tech Skills Universe',
        hint: 'Trascina il pianeta 3D · passa sulle icone per i dettagli',
        tabLanguages: 'Linguaggi Dev',
        tabWeb: 'Web & Backend',
        tabDatabases: 'Database',
        tabSecurity: 'Security',
        tabSpoken: 'Lingue Parlate',
        groups: [
          { title: 'LINGUAGGI DI PROGRAMMAZIONE', val: 'TypeScript, JavaScript, Python, Java, C, C++' },
          { title: 'SVILUPPO WEB & BACKEND', val: 'React.js, Node.js, NestJS, Next.js, Apache Kafka, REST APIs, HTML, HTTP/HTTPS, AWS Cognito' },
          { title: 'DATABASE & SISTEMI', val: 'SQL, PostgreSQL, MongoDB, Neo4j, NoSQL, Linux, Docker, Git, SharePoint, osTicket' },
          { title: 'CYBERSECURITY', val: 'Web Security, Crittografia Applicata, Software Defense, Analisi Vulnerabilità, CTF' },
          { title: 'LINGUE PARLATE', val: 'Italiano (Madrelingua), Inglese (Fluente)' }
        ]
      },
      contatti: {
        tag: '05 · Contatti',
        title: 'Lavoriamo insieme?',
        subtext: 'Vuoi discutere di un progetto software, di un\'opportunità professionale o consultare il mio CV? Sentiti libero di scrivermi.',
        downloadCv: 'Scarica CV (PDF) ↓',
        cvChooseLang: 'Seleziona lingua:',
        rights: 'Tutti i diritti riservati.',
      }
    },
    en: {
      nav: {
        home: 'Hey',
        esperienze: 'Journey',
        progetti: 'Projects',
        github: 'GitHub',
        skills: 'Skills',
        contatti: 'Contact',
      },
      hero: {
        role: 'Software Engineer & M.Sc. Student',
        bio: 'Software engineer specializing in React, TypeScript, and Node.js, and Computer Science Master\'s student at University of Milan (UniMi). Combining solid theoretical foundations (Bachelor\'s degree 99/110 at University of Insubria) with hands-on enterprise development experience.',
        eduBadge: 'UniMi Master\'s · Insubria Bachelor 99/110 · Software Engineer',
      },
      esperienze: {
        eyebrow: 'Journey',
        title: 'Experience & Education',
        scrollHint: '← Scroll horizontally with arrows or drag · 8 cards →',
        filterAll: 'All (8)',
        filterWork: 'Work (4)',
        filterEdu: 'Education (4)',
        chipEdu: 'Education',
        chipWork: 'Work',
        jobs: [
          {
            when: 'SEPTEMBER 2025 — PRESENT',
            role: 'M.Sc. in Computer Science',
            company: 'University of Milan (UniMi) — Milan, Italy',
            desc: 'Curriculum focused on complex algorithms, network infrastructures, cybersecurity, and scalable high-performance software architectures.',
            tags: ['UniMi', 'Complex Algorithms', 'Network Infrastructures', 'Cybersecurity']
          },
          {
            when: 'AUGUST 2026 — OCTOBER 2026',
            role: 'React Frontend Developer',
            company: 'Volio App Srl — Remote, Italy',
            desc: 'Developed reactive web interfaces and modular UI components with React.js and TypeScript. Managed client-side state, integrated AWS Cognito synchronization for user authentication, and optimized application runtime performance.',
            tags: ['React.js', 'TypeScript', 'AWS Cognito', 'State Management']
          },
          {
            when: 'MAY 2026 — JULY 2026',
            role: 'Student Academic Collaboration',
            company: 'BICF Library (Computer Science & Physics) – UniMi',
            desc: 'Provided operational support and technical assistance to students accessing university library resources and study rooms. Assisted in front-office library services and bibliographic cataloging.',
            tags: ['UniMi BICF', 'Operations Support', 'Front-Office', 'Cataloging']
          },
          {
            when: 'MARCH 2025 — SEPTEMBER 2025',
            role: 'Enterprise IT Systems Specialist',
            company: 'Emisfera — Verbania, Italy',
            desc: 'Full-time operational management of enterprise IT systems and platforms. Customization of Microsoft SharePoint environments, configuration and maintenance of the osTicket helpdesk system, and execution of database migrations.',
            tags: ['Microsoft SharePoint', 'osTicket Helpdesk', 'Database Migration', 'Enterprise IT']
          },
          {
            when: 'JULY 2024 — MARCH 2025',
            role: 'Full Stack Developer',
            company: 'Marcatech — Varese, Italy',
            desc: 'Core contributor to the One-Staff enterprise web application for hotel staff administration. Engineered responsive React and TypeScript interfaces, developed scalable Node.js/NestJS backend services with PostgreSQL, and integrated robust REST APIs.',
            tags: ['One-Staff ERP', 'React', 'TypeScript', 'Node.js & NestJS', 'PostgreSQL', 'REST APIs']
          },
          {
            when: '2024 EDITION',
            role: 'CyberChallenge.IT — Training & CTF Competition',
            company: 'Cybersecurity National Lab (CINI) & University of Insubria',
            desc: 'Advanced training in applied cryptography, web application security, software defense, vulnerability assessment, networks, and CTF competition.',
            tags: ['Cybersecurity', 'Web Security', 'Applied Cryptography', 'Software Defense', 'CTF Contest']
          },
          {
            when: 'SEPTEMBER 2021 — DECEMBER 2024',
            role: 'B.Sc. in Computer Science',
            company: 'University of Insubria (Final Grade: 99/110)',
            desc: 'Final Grade: 99/110. Rigorous foundation in software engineering, relational databases, computer networks, and operating systems.',
            tags: ['Grade: 99/110', 'Software Engineering', 'Relational Databases', 'Networks & OS']
          },
          {
            when: 'SEPTEMBER 2016 — JUNE 2021',
            role: 'High School Diploma in Applied Sciences',
            company: 'IIS Lorenzo Cobianchi — Verbania (Final Grade: 85/100)',
            desc: 'Final Grade: 85/100. Strong STEM background in mathematics, physics, and computer science foundations.',
            tags: ['Grade: 85/100', 'Applied Sciences', 'STEM', 'Math & Physics']
          }
        ]
      },
      progetti: {
        eyebrow: 'Selected Work',
        title: 'Projects & Architectures',
        filterPinned: 'Pinned Repositories',
        filterAll: 'All Repositories',
        viewGithub: 'Details & Repository →',
        showAllBtn: 'Show all public repositories (8) ↓',
        showLessBtn: 'Show only pinned ↑'
      },
      github: {
        eyebrow: 'Open Source',
        title: 'GitHub Activity',
        subtitle: 'Statistics and commit activity from @Albitrix on GitHub.',
        stats: {
          contributions: 'Contributions in the last year',
          repos: 'Public Repositories',
          stars: 'Stars Earned',
          streak: 'Commit Streak',
        },
        less: 'Less',
        more: 'More',
        viewProfile: 'View GitHub Profile ↗',
      },
      skills: {
        eyebrow: 'My Universe',
        title: 'Tech Skills Universe',
        hint: 'Drag the 3D planet · hover over icons for details',
        tabLanguages: 'Programming Languages',
        tabWeb: 'Web & Backend',
        tabDatabases: 'Databases',
        tabSecurity: 'Security',
        tabSpoken: 'Spoken Languages',
        groups: [
          { title: 'PROGRAMMING LANGUAGES', val: 'TypeScript, JavaScript, Python, Java, C, C++' },
          { title: 'WEB & BACKEND DEVELOPMENT', val: 'React.js, Node.js, NestJS, Next.js, Apache Kafka, REST APIs, HTML, HTTP/HTTPS, AWS Cognito' },
          { title: 'DATABASES & SYSTEMS', val: 'SQL, PostgreSQL, MongoDB, Neo4j, NoSQL, Linux, Docker, Git, SharePoint, osTicket' },
          { title: 'CYBERSECURITY', val: 'Web Security, Applied Cryptography, Software Defense, Vulnerability Assessment, CTF' },
          { title: 'LANGUAGES SPOKEN', val: 'Italian (Native), English (Fluent)' }
        ]
      },
      contatti: {
        tag: '05 · Contact',
        title: 'Let\'s work together?',
        subtext: 'Looking to discuss a software project, an opportunity, or view my CV? Feel free to reach out.',
        downloadCv: 'Download CV (PDF) ↓',
        cvChooseLang: 'Select language:',
        rights: 'All rights reserved.',
      }
    }
  };

  let currentLang = 'it';

  function getSavedLang() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'it' || saved === 'en') return saved;
    const browserLang = (navigator.language || '').slice(0, 2);
    return browserLang === 'it' ? 'it' : 'en';
  }

  function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.setAttribute('lang', lang);

    const t = translations[lang];

    // Language toggle button in top-right
    document.querySelectorAll('.lang-toggle-btn').forEach((btn) => {
      btn.textContent = lang === 'it' ? 'EN' : 'IT';
      btn.setAttribute('title', lang === 'it' ? 'Switch to English' : 'Passa all\'Italiano');
    });

    // Helper text setter
    const setText = (selector, val) => {
      document.querySelectorAll(selector).forEach(el => {
        if (val !== undefined) el.textContent = val;
      });
    };

    const setHTML = (selector, val) => {
      document.querySelectorAll(selector).forEach(el => {
        if (val !== undefined) el.innerHTML = val;
      });
    };

    // Nav
    setText('[data-i18n="nav.home"]', t.nav.home);
    setText('[data-i18n="nav.esperienze"]', t.nav.esperienze);
    setText('[data-i18n="nav.progetti"]', t.nav.progetti);
    setText('[data-i18n="nav.github"]', t.nav.github);
    setText('[data-i18n="nav.skills"]', t.nav.skills);
    setText('[data-i18n="nav.contatti"]', t.nav.contatti);

    // Hero
    setText('[data-i18n="hero.role"]', t.hero.role);
    setHTML('[data-i18n="hero.bio"]', t.hero.bio);
    setText('[data-i18n="hero.eduBadge"]', t.hero.eduBadge);

    // Esperienze
    setText('[data-i18n="esperienze.eyebrow"]', t.esperienze.eyebrow);
    setText('[data-i18n="esperienze.title"]', t.esperienze.title);
    setText('[data-i18n="esperienze.scrollHint"]', t.esperienze.scrollHint);
    setText('[data-i18n="esperienze.filterAll"]', t.esperienze.filterAll);
    setText('[data-i18n="esperienze.filterWork"]', t.esperienze.filterWork);
    setText('[data-i18n="esperienze.filterEdu"]', t.esperienze.filterEdu);
    setText('[data-i18n="esperienze.chipEdu"]', t.esperienze.chipEdu);
    setText('[data-i18n="esperienze.chipWork"]', t.esperienze.chipWork);

    // Job cards
    const jobCards = document.querySelectorAll('.jc');
    jobCards.forEach((card, index) => {
      const jobData = t.esperienze.jobs[index];
      if (!jobData) return;
      const whenEl = card.querySelector('.jc-when');
      const roleEl = card.querySelector('.jc-role');
      const companyEl = card.querySelector('.jc-company');
      const descEl = card.querySelector('.jc-desc');
      const chipEl = card.querySelector('.jc-cat-chip');
      const category = card.getAttribute('data-category');

      if (whenEl) whenEl.textContent = jobData.when;
      if (roleEl) roleEl.textContent = jobData.role;
      if (companyEl) companyEl.textContent = jobData.company;
      if (descEl) descEl.textContent = jobData.desc;
      if (chipEl) {
        chipEl.textContent = category === 'work' ? t.esperienze.chipWork : t.esperienze.chipEdu;
      }

      const tagsEl = card.querySelector('.jc-tags');
      if (tagsEl && jobData.tags) {
        tagsEl.innerHTML = jobData.tags.map(tag => `<span class="jc-tag">${tag}</span>`).join('');
      }
    });

    // Progetti
    setText('[data-i18n="progetti.eyebrow"]', t.progetti.eyebrow);
    setText('[data-i18n="progetti.title"]', t.progetti.title);
    setText('[data-i18n="progetti.filterPinned"]', t.progetti.filterPinned);
    setText('[data-i18n="progetti.filterAll"]', t.progetti.filterAll);

    // GitHub
    setText('[data-i18n="github.eyebrow"]', t.github.eyebrow);
    setText('[data-i18n="github.title"]', t.github.title);
    setText('[data-i18n="github.subtitle"]', t.github.subtitle);
    setText('[data-i18n="github.statContrib"]', t.github.stats.contributions);
    setText('[data-i18n="github.statRepos"]', t.github.stats.repos);
    setText('[data-i18n="github.statStars"]', t.github.stats.stars);
    setText('[data-i18n="github.statStreak"]', t.github.stats.streak);
    setText('[data-i18n="github.less"]', t.github.less);
    setText('[data-i18n="github.more"]', t.github.more);
    setText('[data-i18n="github.viewProfile"]', t.github.viewProfile);

    // Skills
    setText('[data-i18n="skills.eyebrow"]', t.skills.eyebrow);
    setText('[data-i18n="skills.title"]', t.skills.title);
    setText('[data-i18n="skills.tabLanguages"]', t.skills.tabLanguages);
    setText('[data-i18n="skills.tabWeb"]', t.skills.tabWeb);
    setText('[data-i18n="skills.tabDatabases"]', t.skills.tabDatabases);
    setText('[data-i18n="skills.tabSecurity"]', t.skills.tabSecurity);
    setText('[data-i18n="skills.tabSpoken"]', t.skills.tabSpoken);
    const hovLabel = document.getElementById('hovLabel');
    if (hovLabel) {
      hovLabel.setAttribute('data-default', t.skills.hint);
      hovLabel.textContent = t.skills.hint;
    }
    const skillGroups = document.querySelectorAll('.skill-group');
    skillGroups.forEach((grp, i) => {
      const gData = t.skills.groups[i];
      if (!gData) return;
      const titleEl = grp.querySelector('.skill-group-title');
      const valEl = grp.querySelector('.skill-group-val');
      if (titleEl) titleEl.textContent = gData.title;
      if (valEl) valEl.textContent = gData.val;
    });

    // Contatti
    setText('[data-i18n="contatti.tag"]', t.contatti.tag);
    setText('[data-i18n="contatti.title"]', t.contatti.title);
    setText('[data-i18n="contatti.subtext"]', t.contatti.subtext);
    setText('[data-i18n="contatti.downloadCv"]', t.contatti.downloadCv);
    setText('[data-i18n="contatti.cvChooseLang"]', t.contatti.cvChooseLang);
    setText('[data-i18n="contatti.rights"]', t.contatti.rights);

    window.dispatchEvent(new CustomEvent('languagechange', { detail: { lang } }));
  }

  function toggleLanguage() {
    applyLanguage(currentLang === 'it' ? 'en' : 'it');
  }

  document.addEventListener('DOMContentLoaded', () => {
    applyLanguage(getSavedLang());

    document.querySelectorAll('.lang-toggle-btn').forEach((btn) => {
      btn.addEventListener('click', toggleLanguage);
    });
  });

  window.PortfolioI18n = {
    getLang: () => currentLang,
    setLang: applyLanguage,
    toggle: toggleLanguage,
    getData: () => translations[currentLang]
  };
})();
