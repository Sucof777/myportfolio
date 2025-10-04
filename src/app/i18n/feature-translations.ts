export const featureTranslationsEn = {
  LAYOUT: {
    NAV: {
      ARIA: 'Primary navigation',
      BRAND: 'My Portfolio',
      LINKS: {
        HOME: 'Home',
        ABOUT: 'About',
        CONTACT: 'Contact',
      },
    },
    FOOTER: {
      COPYRIGHT: '© {{year}} Sućo Ferizović. All rights reserved.',
      SOCIAL: {
        GITHUB: 'GitHub',
        GITHUB_ARIA: 'Open my GitHub profile in a new tab',
        LINKEDIN: 'LinkedIn',
        LINKEDIN_ARIA: 'Visit my LinkedIn profile',
        EMAIL: 'Email',
        EMAIL_ARIA: 'Send me an email',
      },
    },
  },
  HOME: {
    TAGLINE: 'Product-minded frontend engineer',
    TITLE: 'Welcome to my portfolio 🚀',
    DESCRIPTION:
      "Explore the products I've shipped while building delightful, resilient web experiences. Each case study comes with a quick summary, live demo, and source code for a transparent look at my process.",
    ACTION: "Let's build something",
    ACTION_ARIA: 'Open the contact form',
    SECONDARY_ACTION: 'Browse recent work',
    PROJECTS_TITLE: 'Featured case studies',
    PROJECTS_DESCRIPTION:
      'Curated projects that highlight my focus on performance, accessibility, and clean architecture across the full stack.',
  },
  SKILLS: {
    PRETITLE: 'Skill set',
    TITLE: 'Tools I use every day',
    DESCRIPTION:
      'A mix of frameworks, languages, and workflows that help me deliver polished experiences—from first prototype to production-ready release.',
    CALL_OUT: 'Continuously evolving with modern web standards',
    EXPERIENCE_BADGE: 'Hands-on',
    ERROR: 'Unable to load skills at the moment. Please refresh to try again.',
    CATEGORIES: {
      FRONTEND: {
        TITLE: 'Frontend',
        DESCRIPTION: 'Component-driven UIs, accessible design systems, and smooth interactions.',
      },
      BACKEND: {
        TITLE: 'Backend',
        DESCRIPTION: 'APIs and server-side logic that keep products fast, reliable, and secure.',
      },
      TOOLS: {
        TITLE: 'Tools',
        DESCRIPTION: 'Collaboration and delivery tooling that keeps teams in sync.',
      },
    },
    ITEMS: {
      ANGULAR: 'Angular',
      TYPESCRIPT: 'TypeScript',
      TAILWIND: 'Tailwind CSS',
      HTML: 'Semantic HTML',
      CSS: 'Modern CSS',
      NODE: 'Node.js',
      EXPRESS: 'Express',
      REST: 'REST APIs',
      GIT: 'Git',
      GITHUB: 'GitHub',
      JIRA: 'Jira',
      DOCKER: 'Docker',
    },
  },
  EXPERIENCE: {
    SUBTITLE: 'Timeline',
    TITLE: 'Experience',
    DESCRIPTION:
      'A snapshot of the roles where I honed my craft, collaborated with cross-functional teams, and shipped features that mattered.',
    TIMELINE_LABEL: 'Professional experience timeline',
    ITEMS: {
      FREELANCE: {
        PERIOD: '2023 — Present',
        ROLE: 'Frontend Developer',
        COMPANY: 'Freelance',
        DESCRIPTION:
          'Partner with founders and teams to design, prototype, and launch web apps with a focus on maintainability and accessibility.',
        HIGHLIGHT: 'Leadership',
        RESULT: 'Delivered high-impact MVPs with measurable UX improvements.',
      },
      STARTUP: {
        PERIOD: '2021 — 2023',
        ROLE: 'Junior Developer',
        COMPANY: 'Tech Startup',
        DESCRIPTION:
          'Built cross-platform features, automated CI/CD workflows, and collaborated closely with designers to iterate quickly.',
        HIGHLIGHT: 'Scale',
        RESULT: 'Accelerated release cadence and improved Lighthouse scores across the product.',
      },
      AGENCY: {
        PERIOD: '2019 — 2021',
        ROLE: 'Intern Developer',
        COMPANY: 'Digital Agency',
        DESCRIPTION:
          'Supported senior engineers on bespoke marketing sites and e-commerce builds across diverse industries.',
        HIGHLIGHT: 'Craft',
        RESULT: 'Shipped accessible interfaces for clients in fintech, travel, and education.',
      },
    },
  },
  RESUME: {
    PRETITLE: 'Resume',
    TITLE: 'Download my CV',
    SUBTITLE: 'Comprehensive experience overview',
    DESCRIPTION: 'Take a closer look at my journey, responsibilities, and achievements across recent roles.',
    BADGE: 'PDF',
    PRIVACY_NOTE: 'The file is hosted locally in this project so you can access it instantly.',
    DOWNLOAD: 'Download CV',
    ACCESSIBLE_LABEL: 'Download a PDF copy of my CV',
    SECONDARY_TEXT: 'Updated regularly with the latest projects and certifications.',
  },
  PROJECT: {
    CARD: {
      FEATURED: 'Featured',
      OPEN_SOURCE: 'Open source',
    },
    BUTTONS: {
      LIVE: 'View live',
      LIVE_ARIA: 'Open the live demo in a new tab',
      SOURCE: 'Source code',
      SOURCE_ARIA: 'Open the source code repository',
      MORE: 'Case study',
      MORE_ARIA: 'Open the detailed case study',
    },
  },
  PROJECTS: {
    CAR_QUIZ: {
      TITLE: 'Car Quiz App',
      DESCRIPTION:
        'An interactive Angular + Node.js experience that suggests the ideal car based on real-time quiz responses.',
    },
    WEATHER_APP: {
      TITLE: 'Weather App',
      DESCRIPTION:
        'A responsive weather dashboard with location search, forecast charts, and animated states powered by Angular.',
    },
    PORTFOLIO: {
      TITLE: 'Portfolio redesign',
      DESCRIPTION:
        'This very site—built as a component-driven Angular app with Tailwind theming and granular localization.',
    },
  },
  ABOUT: {
    IMAGE_ALT: 'Portrait of Sućo Ferizović',
    NAME: 'Šućo Ferizović',
    ROLE: 'Web Developer',
    DESCRIPTION: {
      PARAGRAPH_1:
        'I am a passionate web developer with a deep interest in crafting modern, responsive, and user-friendly applications.',
      PARAGRAPH_2:
        'Angular, TypeScript, and Node.js are my go-to tools, and I am constantly exploring new technologies to keep my skill set fresh.',
      PARAGRAPH_3:
        'Clean code, modular architecture, and accessible interfaces are the principles that guide every project I take on.',
      PARAGRAPH_4:
        'Beyond coding I enjoy UI/UX design, cloud technologies, and sharing knowledge through open-source and technical writing.',
      PARAGRAPH_5:
        'Seeing an idea evolve into a production-ready product—and optimizing it along the way—is what motivates me the most.',
    },
  },
  CONTACT: {
    TITLE: 'Contact me',
    FORM: {
      NAME_LABEL: 'Name',
      NAME_PLACEHOLDER: 'Your name',
      EMAIL_LABEL: 'Email',
      EMAIL_PLACEHOLDER: 'your@email.com',
      MESSAGE_LABEL: 'Message',
      MESSAGE_PLACEHOLDER: 'Tell me more about your project or idea…',
      SUBMIT: 'Send message',
      ALERT: {
        SUCCESS: 'Thank you! Your message has been submitted.',
        ERROR: 'Please fill in all fields correctly before sending.',
      },
    },
  },
} as const;

export const featureTranslationsSr = {
  LAYOUT: {
    NAV: {
      ARIA: 'Glavna navigacija',
      BRAND: 'Moj portfolio',
      LINKS: {
        HOME: 'Početna',
        ABOUT: 'O meni',
        CONTACT: 'Kontakt',
      },
    },
    FOOTER: {
      COPYRIGHT: '© {{year}} Šućo Ferizović. Sva prava zadržana.',
      SOCIAL: {
        GITHUB: 'GitHub',
        GITHUB_ARIA: 'Otvori moj GitHub profil u novom prozoru',
        LINKEDIN: 'LinkedIn',
        LINKEDIN_ARIA: 'Posjeti moj LinkedIn profil',
        EMAIL: 'Email',
        EMAIL_ARIA: 'Pošalji mi email',
      },
    },
  },
  HOME: {
    TAGLINE: 'Frontend inženjer fokusiran na proizvod',
    TITLE: 'Dobrodošli u moj portfolio 🚀',
    DESCRIPTION:
      'Istražite projekte koje sam gradio dok sam unapređivao iskustva korisnika i održive web aplikacije. Svaki primjer sadrži kratak opis, live demo i kod otvoren za uvid.',
    ACTION: 'Hajde da napravimo nešto novo',
    ACTION_ARIA: 'Otvori kontakt formu',
    SECONDARY_ACTION: 'Pogledaj projekte',
    PROJECTS_TITLE: 'Izdvojeni projekti',
    PROJECTS_DESCRIPTION:
      'Pažljivo odabrane studije slučaja koje pokazuju fokus na performanse, pristupačnost i čitljiv kod.',
  },
  SKILLS: {
    PRETITLE: 'Set vještina',
    TITLE: 'Alati koje koristim svakodnevno',
    DESCRIPTION:
      'Kombinacija okvira, jezika i procesa koji mi omogućavaju da isporučim uglađena digitalna rješenja – od prve ideje do produkcije.',
    CALL_OUT: 'Uvijek u korak sa savremenim web standardima',
    EXPERIENCE_BADGE: 'Praksa',
    ERROR: 'Vještine trenutno nije moguće učitati. Osvježite stranicu i pokušajte ponovo.',
    CATEGORIES: {
      FRONTEND: {
        TITLE: 'Frontend',
        DESCRIPTION: 'Komponentni dizajn, pristupačni sistemi i glatke interakcije.',
      },
      BACKEND: {
        TITLE: 'Backend',
        DESCRIPTION: 'API slojevi i serverska logika koji drže aplikacije brzima i pouzdanim.',
      },
      TOOLS: {
        TITLE: 'Alati',
        DESCRIPTION: 'Kolaboracija i isporuka koje tim drže usklađenim.',
      },
    },
    ITEMS: {
      ANGULAR: 'Angular',
      TYPESCRIPT: 'TypeScript',
      TAILWIND: 'Tailwind CSS',
      HTML: 'Semantički HTML',
      CSS: 'Moderni CSS',
      NODE: 'Node.js',
      EXPRESS: 'Express',
      REST: 'REST API-ji',
      GIT: 'Git',
      GITHUB: 'GitHub',
      JIRA: 'Jira',
      DOCKER: 'Docker',
    },
  },
  EXPERIENCE: {
    SUBTITLE: 'Hronologija',
    TITLE: 'Iskustvo',
    DESCRIPTION:
      'Najvažnija radna mjesta na kojima sam brusio zanat, sarađivao sa timovima i isporučivao funkcionalnosti koje donose vrijednost.',
    TIMELINE_LABEL: 'Vremenska linija profesionalnog iskustva',
    ITEMS: {
      FREELANCE: {
        PERIOD: '2023 — danas',
        ROLE: 'Frontend developer',
        COMPANY: 'Freelance',
        DESCRIPTION:
          'Saradnja sa osnivačima i timovima na dizajnu, prototipovanju i lansiranju web aplikacija sa fokusom na održivost i pristupačnost.',
        HIGHLIGHT: 'Vodstvo',
        RESULT: 'Isporučeni MVP projekti sa mjerljivim unapređenjem korisničkog iskustva.',
      },
      STARTUP: {
        PERIOD: '2021 — 2023',
        ROLE: 'Junior developer',
        COMPANY: 'Tech Startup',
        DESCRIPTION:
          'Razvoj funkcionalnosti za više platformi, automatizacija CI/CD procesa i bliska saradnja sa dizajnerima na brzim iteracijama.',
        HIGHLIGHT: 'Skaliranje',
        RESULT: 'Ubrzani ciklus isporuke i bolji Lighthouse rezultati kroz cijelu aplikaciju.',
      },
      AGENCY: {
        PERIOD: '2019 — 2021',
        ROLE: 'Intern developer',
        COMPANY: 'Digitalna agencija',
        DESCRIPTION:
          'Podrška senior inženjerima na marketinškim i e-commerce projektima za klijente iz različitih industrija.',
        HIGHLIGHT: 'Zanat',
        RESULT: 'Isporučeni pristupačni interfejsi za fintech, turizam i obrazovanje.',
      },
    },
  },
  RESUME: {
    PRETITLE: 'CV',
    TITLE: 'Preuzmite moj CV',
    SUBTITLE: 'Detaljan pregled iskustva',
    DESCRIPTION: 'Pogledajte moj profesionalni put, odgovornosti i ključne rezultate u nedavnim ulogama.',
    BADGE: 'PDF',
    PRIVACY_NOTE: 'Fajl je hostovan lokalno u projektu pa mu možete odmah pristupiti.',
    DOWNLOAD: 'Preuzmi CV',
    ACCESSIBLE_LABEL: 'Preuzmi PDF verziju mog CV-ja',
    SECONDARY_TEXT: 'Redovno ažuriran najnovijim projektima i sertifikatima.',
  },
  PROJECT: {
    CARD: {
      FEATURED: 'Izdvojeno',
      OPEN_SOURCE: 'Open source',
    },
    BUTTONS: {
      LIVE: 'Pregled uživo',
      LIVE_ARIA: 'Otvori live demo u novom tabu',
      SOURCE: 'Izvorni kod',
      SOURCE_ARIA: 'Otvori repozitorij sa kodom',
      MORE: 'Studija slučaja',
      MORE_ARIA: 'Otvori detaljnu studiju slučaja',
    },
  },
  PROJECTS: {
    CAR_QUIZ: {
      TITLE: 'Car Quiz App',
      DESCRIPTION:
        'Interaktivna Angular + Node.js aplikacija koja na osnovu odgovora predlaže idealan automobil.',
    },
    WEATHER_APP: {
      TITLE: 'Weather App',
      DESCRIPTION:
        'Responzivna meteorološka tabla sa pretragom lokacija, prognozama i animiranim stanjima u Angularu.',
    },
    PORTFOLIO: {
      TITLE: 'Redizajn portfolija',
      DESCRIPTION:
        'Ovaj sajt – komponentno vođen Angular projekat sa Tailwind temiranjem i potpunom lokalizacijom.',
    },
  },
  ABOUT: {
    IMAGE_ALT: 'Portret Šuće Ferizovića',
    NAME: 'Šućo Ferizović',
    ROLE: 'Web developer',
    DESCRIPTION: {
      PARAGRAPH_1:
        'Strastveni sam web developer sa željom da kreiram moderne, responzivne i pristupačne aplikacije.',
      PARAGRAPH_2:
        'Angular, TypeScript i Node.js su alati koje najčešće koristim, a nove tehnologije istražujem čim se pojave.',
      PARAGRAPH_3:
        'Čist kod, modularna arhitektura i intuitivni interfejsi vodiči su kroz svaki projekat na kojem radim.',
      PARAGRAPH_4:
        'Pored programiranja volim UI/UX dizajn, cloud tehnologije i razmjenu znanja kroz open-source i članke.',
      PARAGRAPH_5:
        'Najviše me motiviše kada ideja preraste u proizvod spreman za korisnike – uz stalnu optimizaciju performansi.',
    },
  },
  CONTACT: {
    TITLE: 'Kontaktirajte me',
    FORM: {
      NAME_LABEL: 'Ime',
      NAME_PLACEHOLDER: 'Vaše ime',
      EMAIL_LABEL: 'Email',
      EMAIL_PLACEHOLDER: 'vas@email.com',
      MESSAGE_LABEL: 'Poruka',
      MESSAGE_PLACEHOLDER: 'Podijelite detalje o projektu ili ideji…',
      SUBMIT: 'Pošalji poruku',
      ALERT: {
        SUCCESS: 'Hvala! Vaša poruka je uspješno poslata.',
        ERROR: 'Popunite ispravno sva polja prije slanja.',
      },
    },
  },
} as const;
