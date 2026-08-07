import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { projects } from "../data/projects.js";
import { services, otherServices } from "../data/services.js";

export const locales = ["it", "en"];
export const defaultLocale = "it";

export const pagePaths = {
  home: { it: "", en: "" },
  projects: { it: "progetti", en: "projects" },
  about: { it: "chi-siamo", en: "about" },
  contacts: { it: "contatti", en: "contact" },
  quickAudit: { it: "audit-sito-brand", en: "website-brand-audit" },
  services: { it: "servizi", en: "services" },
  otherServices: { it: "servizi-extra", en: "additional-services" },
  projectDetail: { it: "progetti", en: "projects" },
};

export const messages = {
  it: {
    nav: { home: "Home", projects: "Progetti", about: "Chi siamo", contact: "Contatti", cta: "Contattami" },
    common: {
      bookCall: "Prenota una call di 15 min",
      connect: "Parliamone",
      services: "Servizi",
      home: "Home",
      selectedProjects: "Progetti selezionati",
      otherIdeas: "Hai in mente qualcos'altro?",
      relatedTitle: "Cerchi un altro servizio?",
      relatedText: "Ecco alcune soluzioni che potrebbero esserti utili.",
      lookAtThese: "Oppure guarda anche questi servizi",
      viewProject: "Visita il progetto",
      close: "Chiudi anteprima immagine",
      prev: "Immagine precedente",
      next: "Immagine successiva",
      lightboxHint: "Clicca fuori o premi Esc per chiudere",
      discoverMore: "Scopri di piu",
    },
    home: {
      usp: "Digital Design Studio per brand e aziende",
      hero: "KLYK Studio realizza branding, siti web, UX/UI, e-commerce, CMS, social media, digital marketing e SEO per aziende, professionisti, startup e PMI.",
      why: "Strategia, identita e sviluppo per dare forma al tuo progetto digitale.",
      projects: "Progetti selezionati di branding, web design e UX/UI.",
    },
    about: {
      eyebrow: "Chi e KLYK Studio",
      h1: "Nicoletta Pelosi, founder di KLYK Studio",
      intro: "Sono founder di KLYK Studio, un digital design studio che unisce branding, UX/UI, sviluppo web e strategia digitale per aziende e professionisti.",
      who: "Chi sono",
      how: "Come lavora lo studio",
      partnership: "Partnership con The Froggy Studio",
      supportTitle: "Ti serve supporto su design, brand o sviluppo?",
      supportText: "Questi sono i servizi principali con cui aiutiamo brand, aziende e professionisti a lanciare, migliorare e far crescere progetti digitali.",
      contact: "Contatti",
      partnershipText1: "Collaboro anche con The Froggy Studio, dove sono partner. E una relazione costruita su fiducia, visione condivisa e competenze creative complementari.",
      partnershipText2: "Scambiamo clienti, opinioni e competenze, lavorando su direzioni creative, esperienze digitali e storytelling visivo. Questa collaborazione crea un ponte tra Italia e Sri Lanka.",
      partnershipText3: "Per KLYK Studio significa restare aperti, connessi e internazionali, mantenendo comunque un approccio diretto e curato in ogni progetto.",
      directionTitle: "Direzione Design",
      directionText: "Sistemi UI, storytelling visivo, ritmo di layout e interfacce riconoscibili senza perdere chiarezza.",
      buildTitle: "Sviluppo Web",
      buildText: "Sviluppo Vue, componenti strutturati e siti pensati per essere eleganti in movimento e solidi in produzione.",
      supportCardTitle: "Supporto Continuativo",
      supportCardText: "Sistemi flessibili, comunicazione chiara e soluzioni pratiche per far crescere il progetto nel tempo.",
    },
    contacts: {
      h1: "Parliamo del tuo progetto",
      intro: "KLYK Studio ascolta nuove idee, collaborazioni e percorsi digitali continuativi. Scrivici per branding, siti web, UX/UI, social media e strategie digitali.",
      name: "Nome",
      email: "Email",
      message: "Messaggio",
      namePlaceholder: "Il tuo nome",
      messagePlaceholder: "Cosa vuoi realizzare? Link o contesto utili?",
      send: "Invia messaggio",
      sending: "Invio...",
      privacy: "Niente spam. Useremo questi dati solo per risponderti.",
      ok: "Ricevuto, grazie. Ti risponderemo presto.",
      error: "Errore nell'invio. Riprova.",
      otherWays: "Puoi contattarci anche cosi",
      emailCta: "Contatta via email",
    },
    audit: {
      h1: "Audit rapido del tuo sito e del tuo brand",
      subtitle: "Ci aiuta a capire velocemente cosa serve al tuo progetto.",
      slot: "Prenota il tuo slot",
      what: "Cosa ricevi",
      forYou: "Fa per te se",
      notForYou: "Non fa per te se",
      bookingTitle: "Prenota il tuo audit rapido",
      bookingText: "Scegli uno slot. Dopo la prenotazione comparira il form di intake.",
      tip: "Dopo aver confermato la prenotazione, scorri in basso e completa il form.",
      intake: "Form di intake rapido",
      intakeText: "Ci aiuta a preparare l'audit.",
      objective: "Di cosa hai bisogno?",
      budget: "Budget",
      timeline: "Timeline",
      notes: "Note (opzionale)",
      select: "Seleziona",
      send: "Invia",
      ok: "Ricevuto, grazie. Ci vediamo in call.",
      whatItems: ["Video audit breve di 10-15 min.", "5 suggerimenti prioritari.", "Indicazioni pratiche per il progetto.", "Prossimi passi concreti."],
      forYouItems: ["Vuoi chiarezza rapida su cosa fare prima.", "Ti interessano conversioni, contenuti e risultati."],
      notForYouItems: ["Vuoi subito un redesign completo.", "Non prevedi di implementare miglioramenti."],
    },
    seo: {
      homeTitle: "KLYK Studio | Branding, Web Design e Digital Marketing",
      homeDescription: "KLYK Studio realizza branding, siti web, UX/UI, social media e strategie digitali per aziende e professionisti a Brescia e in tutta Italia.",
      projectsTitle: "Progetti di Branding, Web Design e UX/UI | KLYK Studio",
      projectsDescription: "Scopri i progetti KLYK Studio: branding, siti web, e-commerce, UX/UI, social media e soluzioni digitali per aziende e professionisti.",
      contactsTitle: "Contatta KLYK Studio | Parliamo del tuo progetto",
      contactsDescription: "Contatta KLYK Studio per branding, siti web, UX/UI, social media, digital marketing e collaborazioni continuative in Italia e in Europa.",
      aboutTitle: "Nicoletta Pelosi | Founder di KLYK Studio",
      aboutDescription: "Conosci Nicoletta Pelosi, founder di KLYK Studio, e l'approccio dello studio a branding, UX/UI, sviluppo web e strategia digitale.",
      auditTitle: "Audit Sito Web e Brand | KLYK Studio",
      auditDescription: "Prenota un audit del tuo sito o brand e ricevi indicazioni concrete su UX, identita, contenuti, performance e opportunita di crescita.",
    },
  },
  en: {
    nav: { home: "Home", projects: "Projects", about: "About", contact: "Contact", cta: "Contact me" },
    common: {
      bookCall: "Book a 15-min call",
      connect: "Let's connect",
      services: "Services",
      home: "Home",
      selectedProjects: "Selected projects",
      otherIdeas: "Have anything else in mind?",
      relatedTitle: "Are you looking for something else?",
      relatedText: "Here are some other solutions you might find useful.",
      lookAtThese: "Or take a look at these",
      viewProject: "Visit project",
      close: "Close image preview",
      prev: "Previous image",
      next: "Next image",
      lightboxHint: "Click outside or press Esc to close",
      discoverMore: "Discover more",
    },
    home: {
      usp: "Digital Design Studio for brands and companies",
      hero: "KLYK Studio creates branding, websites, UX/UI, e-commerce, CMS, social media, digital marketing and SEO for companies, professionals, startups and SMEs.",
      why: "Strategy, identity and development to shape your digital project.",
      projects: "Selected branding, web design and UX/UI projects.",
    },
    about: {
      eyebrow: "About KLYK Studio",
      h1: "Nicoletta Pelosi, founder of KLYK Studio",
      intro: "I am the founder of KLYK Studio, a digital design studio combining branding, UX/UI, web development and digital strategy for companies and professionals.",
      who: "Who I Am",
      how: "How The Studio Works",
      partnership: "The Froggy Studio partnership",
      supportTitle: "Need support on brand, design or development?",
      supportText: "These are the core services we use to help brands, companies and professionals launch, improve and grow digital projects.",
      contact: "Contact",
      partnershipText1: "I also collaborate with The Froggy Studio, where I am a partner. It is a relationship built on trust, shared perspective and complementary creative skills.",
      partnershipText2: "We exchange clients, opinions and creative expertise, working across design direction, digital experiences and visual storytelling. That collaboration creates a bridge between Italy and Sri Lanka.",
      partnershipText3: "For KLYK Studio, this means staying open, connected and internationally minded while keeping a direct and carefully crafted approach to every project.",
      directionTitle: "Design Direction",
      directionText: "UI systems, visual storytelling, layout rhythm and interfaces that feel distinctive without losing clarity.",
      buildTitle: "Web Development",
      buildText: "Vue-based development, structured components and websites designed to be elegant in motion and solid in production.",
      supportCardTitle: "Long-Term Support",
      supportCardText: "Flexible systems, clear communication and practical solutions that help clients grow their project over time.",
    },
    contacts: {
      h1: "Let's talk about your project",
      intro: "KLYK Studio is open to new ideas, collaborations and ongoing digital support. Write to us for branding, websites, UX/UI, social media and digital strategy.",
      name: "Name",
      email: "Email",
      message: "Message",
      namePlaceholder: "Your name",
      messagePlaceholder: "What are you trying to achieve? Any links or context?",
      send: "Send message",
      sending: "Sending...",
      privacy: "No spam. We will only use this to reply.",
      ok: "Received, thank you. We will reply soon.",
      error: "Error sending. Please try again.",
      otherWays: "You can contact us in other ways",
      emailCta: "Contact via email",
    },
    audit: {
      h1: "Quick audit for your website and brand",
      subtitle: "This helps us understand your needs quickly.",
      slot: "Book your slot",
      what: "What you'll get",
      forYou: "This is for you if",
      notForYou: "Not for you if",
      bookingTitle: "Book your quick audit",
      bookingText: "Choose a slot. After booking, the intake form appears below.",
      tip: "After confirming the booking, scroll down to complete the intake form.",
      intake: "Quick intake form",
      intakeText: "This helps us tailor the audit.",
      objective: "What do you need?",
      budget: "Budget",
      timeline: "Timeline",
      notes: "Notes (optional)",
      select: "Select one",
      send: "Send",
      ok: "Received, thank you. See you on the call.",
      whatItems: ["Short video audit, 10-15 min.", "5 prioritized suggestions.", "Project guidance.", "Actionable next steps."],
      forYouItems: ["You want quick clarity on what to do first.", "You care about conversions, content and results."],
      notForYouItems: ["You want a full redesign immediately.", "You are not planning to implement improvements."],
    },
    seo: {
      homeTitle: "KLYK Studio | Branding, Web Design and Digital Marketing",
      homeDescription: "KLYK Studio creates branding, websites, UX/UI, social media and digital strategies for companies and professionals in Italy and Europe.",
      projectsTitle: "Branding, Web Design and UX/UI Projects | KLYK Studio",
      projectsDescription: "Explore KLYK Studio projects: branding, websites, e-commerce, UX/UI, social media and digital solutions for companies and professionals.",
      contactsTitle: "Contact KLYK Studio | Let's Talk About Your Project",
      contactsDescription: "Contact KLYK Studio for branding, websites, UX/UI, social media, digital marketing and ongoing collaborations in Italy and Europe.",
      aboutTitle: "Nicoletta Pelosi | Founder of KLYK Studio",
      aboutDescription: "Meet Nicoletta Pelosi, founder of KLYK Studio, and discover the studio approach to branding, UX/UI, web development and digital strategy.",
      auditTitle: "Website and Brand Audit | KLYK Studio",
      auditDescription: "Book an audit for your website or brand and get practical guidance on UX, identity, content, performance and growth opportunities.",
    },
  },
};

export function getLocaleFromRoute(route) {
  return route.meta?.locale || (locales.includes(route.params.locale) ? route.params.locale : defaultLocale);
}

export function localizedPath(locale, page, params = {}) {
  const segment = pagePaths[page]?.[locale] ?? "";
  const base = `/${locale}${segment ? `/${segment}` : ""}`;
  if (page === "projectDetail") return `${base}/${params.slug}`;
  if (page === "services") return `${base}/${params.slug}`;
  if (page === "otherServices") return `${base}/${params.slug}`;
  return `${base}/`;
}

export function useI18n() {
  const route = useRoute();
  const router = useRouter();
  const locale = computed(() => getLocaleFromRoute(route));
  const t = (path) => path.split(".").reduce((acc, key) => acc?.[key], messages[locale.value]) || path;

  function switchLocale(targetLocale) {
    localStorage.setItem("klyk-locale", targetLocale);
    const page = route.meta.page || "home";
    const slug = route.params.slug;
    router.push(localizedPath(targetLocale, page, slug ? { slug } : {}));
  }

  return { locale, t, switchLocale };
}

export function getServices(locale) {
  const translated = {
    it: {
      "ux-research-prototyping": {
        title: "UX Research e Prototipazione",
        subtitle: "Analisi dei bisogni reali per progettare esperienze intuitive.",
        description: "Conduciamo ricerca utenti, wireframe e prototipi interattivi per validare idee, ridurre incertezze e migliorare usabilita e chiarezza dei prodotti digitali.",
        bullets: ["Interviste e survey", "User journey e flussi", "Wireframe e prototipi interattivi"],
        client: "Per startup e aziende che vogliono migliorare esperienza utente, chiarezza e conversioni con un approccio basato sulla ricerca.",
      },
      "landing-pages-3d-web-experiences": {
        title: "Landing Page ed Esperienze 3D",
        subtitle: "Esperienze web immersive, responsive e orientate alla conversione.",
        description: "Progettiamo landing page, interfacce interattive e contenuti 3D per creare una presenza digitale memorabile senza perdere chiarezza, performance e obiettivi di business.",
        bullets: ["Modellazione e animazioni 3D", "Esperienze WebGL interattive", "Design responsive e ottimizzato"],
        client: "Per aziende che vogliono una presenza online distintiva con contenuti visuali e interattivi evoluti.",
      },
      "frontend-development-webflow": {
        title: "Sviluppo Web, CMS e Webflow",
        subtitle: "Siti responsive, veloci e gestibili con stack moderni.",
        description: "Sviluppiamo siti web professionali con Vue, Tailwind, Webflow e soluzioni CMS per dare ai clienti autonomia nella gestione dei contenuti e una base tecnica solida.",
        bullets: ["Sviluppo siti custom", "Webflow e CMS", "Performance e SEO tecnico"],
        client: "Per aziende e professionisti che vogliono lanciare o migliorare un sito web professionale, chiaro e facile da gestire.",
      },
    },
    en: {},
  };
  return services.map((service) => ({ ...service, ...(translated[locale]?.[service.slug] || service) }));
}

export function getOtherServices(locale) {
  const translated = {
    it: {
      "brand-identity-graphic-design": {
        title: "Brand Identity e Graphic Design",
        subtitle: "Identita visive coerenti, riconoscibili e facili da usare.",
        description: "Creiamo identita visive, logo, linee guida, materiali grafici e asset digitali per comunicare valori, tono e personalita del brand in modo coerente.",
        bullets: ["Logo e brand guidelines", "Materiali marketing e stampa", "Asset social e digitali"],
        client: "Per aziende e professionisti che vogliono creare o rinnovare la propria identita visiva.",
      },
      "digital-project-consultation-and-support-in-development": {
        title: "Consulenza e Supporto Digitale",
        subtitle: "Supporto continuativo per dare direzione e concretezza ai progetti.",
        description: "Ti aiutiamo a chiarire priorita, definire soluzioni digitali e portare avanti il progetto con consulenza, sviluppo, design e supporto operativo continuativo.",
        bullets: ["Consulenza e ideazione", "Soluzioni su misura", "Supporto continuativo"],
        client: "Per chi ha un'idea digitale e cerca una guida professionale per trasformarla in un progetto concreto.",
      },
    },
    en: {},
  };
  return otherServices.map((service) => ({ ...service, ...(translated[locale]?.[service.slug] || service) }));
}

export function getProjects(locale) {
  if (locale === "en") return projects;
  return projects.map((project) => ({
    ...project,
    shortDescription: project.shortDescription,
    ...(project.slug === "ramzen-ramen-restaurant-conversion-website"
      ? {
          H2: "Un concept di sito per ristorante lanciato a maggio 2026, progettato per trasformare un'identità food anime-inspired in azioni chiare di prenotazione e takeaway.",
          shortDescription:
            "Concept di sito restaurant result-driven per un brand ramen, costruito attorno a identità visiva forte, menu interattivo, prenotazione tavolo e flusso order-to-go.",
          description:
            'Ramzen è stato pubblicato a maggio 2026 come concept di sito per ristorante con una direzione creativa molto marcata. Il progetto non comunica semplicemente "ristorante ramen": costruisce un immaginario riconoscibile attorno al brand attraverso una hero anime-style, una tipografia in stile Asimovian, una palette nero, bianco e rosso, UI bold e immagini food generate con AI. La strategia della pagina è semplice: rendere il brand memorabile prima, poi trasformare quell\'attenzione in azione utile. In un sito food, soprattutto da mobile o da traffico social, la prima vittoria è farsi ricordare. Ramzen usa l\'impatto visivo per creare desiderio e riconoscibilità, mentre la struttura accompagna l\'utente verso menu, prenotazione tavolo e ordine takeaway.',
          secondDescription:
            'La UX è costruita come una piccola esperienza interattiva da ristorante, non come una landing statica. Le chip di categoria rendono il menu facile da esplorare senza cambiare pagina, mentre le card prodotto combinano immagine, descrizione, spicy level, prezzo e segnale "Best appreciated" per aiutare l\'utente a confrontare i piatti velocemente. La parte più result-driven è il flusso ordine: selezione quantità, totale dinamico, pickup time, nome, telefono e conferma rendono il percorso takeaway concreto. Book your table segue la stessa logica, con un form breve e orari chiari. Il risultato è una pagina con identità forte, menu leggibile e percorsi di conversione chiari per prenotare e ordinare.',
          buttonLabel: "Vedi live",
        }
      : project.slug === "atlas-pro-social-media-management-content-strategy"
      ? {
          H2: "Gestione social media e content strategy continuativa per un'associazione sportiva, con focus su campi estivi, fiducia dei genitori e community locale.",
          shortDescription:
            "Social media management, content strategy e pianificazione campagne Instagram per Atlas Pro, associazione sportiva attiva in campi estivi, sport e formazione.",
          description:
            "Atlas Pro e un'associazione sportiva che organizza campi estivi, attivita sportive e percorsi di formazione per bambini, ragazzi e adulti. Da marzo a luglio 2026, KLYK Studio ha seguito la comunicazione digitale con l'obiettivo di costruire una presenza social credibile e costante, promuovere i campi estivi, raccontare le attivita e rafforzare la fiducia con genitori e community locale. Il lavoro ha incluso analisi del profilo, analisi competitor, tone of voice, content pillars, strategia editoriale, gestione Instagram, copywriting, calendario editoriale, grafiche, reel, carousel, stories e comunicazione campagne.",
          secondDescription:
            "La comunicazione si e sviluppata in tre fasi: Reconnect, per riattivare profilo e community; Summer Campaign, dedicata alla promozione dei campi estivi; Follow-up, per copertura live e comunicazione post-attivita. Dal 17 marzo all'11 luglio 2026 sono stati pubblicati 29 contenuti Instagram. Il progetto ha generato 85.314 visualizzazioni, 47.541 account raggiunti, 1.239 interazioni e 83 nuovi follower. Meta Insights ha registrato anche 79.200 visualizzazioni, 32.700 account raggiunti, circa 1.000 interazioni, 556 click e 468 visite al profilo tra il 16 aprile e il 14 luglio 2026.",
          buttonLabel: "Vedi profilo Instagram",
        }
      : {
          H2: `Case study KLYK Studio su ${project.skills.slice(0, 3).join(", ")} per ${project.title}.`,
          description: `Questo case study presenta il lavoro svolto da KLYK Studio per ${project.title}, con attenzione a identita digitale, chiarezza dei contenuti, UX/UI e sviluppo di una presenza online coerente con gli obiettivi del progetto.`,
          secondDescription: `Il progetto e stato strutturato per rendere l'esperienza piu chiara, riconoscibile e facile da esplorare. Nomi, clienti e tecnologie restano invariati, mentre descrizione, approccio e benefici sono presentati in italiano.`,
        }),
  }));
}
