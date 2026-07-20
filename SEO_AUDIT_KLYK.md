# SEO Audit Tecnico KLYK Studio

Framework: Vue 3 con Vite, Vue Router in history mode e head management con `@vueuse/head` / `@unhead/vue`.

Rendering: single page application client-side. I metadati delle route vengono generati nel browser: sono gestiti correttamente con il sistema head ufficiale, ma il markup iniziale resta quello di `index.html` fino all'esecuzione JavaScript.

Route pubbliche rilevate: `/`, `/about`, `/projects`, `/projects/:slug`, `/services/:slug`, `/other-services/:slug`, `/contacts`, `/quick-audit`.

| Gravita | Problema | File interessati | Modifica proposta | Stato finale |
| --- | --- | --- | --- | --- |
| Critica | Posizionamento ancora da portfolio personale UX/UI/frontend | `src/views/Home.vue`, `src/data/Info.js`, metadati route | Aggiornare title, description, H1 e copy principale verso digital design studio | Completato |
| Critica | Metadati route solo client-side in SPA | `index.html`, `src/views/*.vue` | Centralizzare head e mantenere fallback HTML coerente | Migliorato, resta limite CSR |
| Alta | Meta duplicati/incompleti e OG/Twitter non completi | `src/views/*.vue` | Implementare metadati unici con immagine fallback | Completato |
| Alta | Nessun SEO sui dettagli dinamici | `src/views/ProjectDetail.vue`, `src/views/ServicesDetail.vue`, `src/views/OtherServicesDetails.vue` | Generare title, description, canonical, OG e breadcrumb per slug | Completato |
| Alta | Sitemap incompleta | `public/sitemap.xml` | Includere tutte le URL pubbliche indicizzabili canoniche | Completato |
| Media | Redirect `/contact` non gestito e config non allineata | `public/_redirects`, `netlify.toml` | Aggiungere redirect 301 per `/contact`, slash finali e www | Completato |
| Media | `site.webmanifest` referenziato ma assente | `public/site.webmanifest` | Aggiungere manifest coerente | Completato |
| Media | Homepage JSON-LD Person non coerente con studio | `src/utils/seo.js`, `src/views/Home.vue` | Usare ProfessionalService con dati reali pubblici | Completato |
| Bassa | Alt text generici su immagini progetto | `src/components/ProjectCard.vue`, `src/views/ProjectDetail.vue` | Rendere gli alt descrittivi | Completato |

## Problemi rimasti

- Per massima affidabilita SEO/social preview serve valutare prerendering o SSG, perche il progetto resta una SPA CSR.
- Non e stata trovata una nuova immagine OG 1200x630 dedicata; viene usato `public/cover.jpg` come fallback.
- La build segnala chunk JavaScript oltre 500 kB e alcuni asset media pesanti, in particolare video WebM e immagini progetto/Nicoletta. Non sono stati rimossi per non alterare visual e animazioni.

## Route, title, description e canonical

| Route | Title | Description | Canonical |
| --- | --- | --- | --- |
| `/` | KLYK Studio \| Branding, Web Design e Digital Marketing | KLYK Studio realizza branding, siti web, UX/UI, social media e strategie digitali per aziende e professionisti a Brescia e in tutta Italia. | `https://klyk.studio/` |
| `/projects` | Progetti di Branding, Web Design e UX/UI \| KLYK Studio | Scopri i progetti KLYK Studio: branding, siti web, e-commerce, UX/UI, social media e soluzioni digitali per aziende e professionisti. | `https://klyk.studio/projects` |
| `/contacts` | Contatta KLYK Studio \| Parliamo del tuo progetto | Contatta KLYK Studio per branding, siti web, UX/UI, social media, digital marketing e collaborazioni continuative in Italia e in Europa. | `https://klyk.studio/contacts` |
| `/about` | Nicoletta Pelosi \| Founder di KLYK Studio | Conosci Nicoletta Pelosi, founder di KLYK Studio, e l'approccio dello studio a branding, UX/UI, sviluppo web e strategia digitale. | `https://klyk.studio/about` |
| `/quick-audit` | Audit Sito Web e Brand \| KLYK Studio | Prenota un audit del tuo sito o brand e ricevi indicazioni concrete su UX, identita, contenuti, performance e opportunita di crescita. | `https://klyk.studio/quick-audit` |
| `/services/ux-research-prototyping` | UX Research e Prototipazione \| KLYK Studio | UX research, wireframe e prototipi interattivi per progettare prodotti digitali chiari, intuitivi e basati sulle esigenze reali degli utenti. | `https://klyk.studio/services/ux-research-prototyping` |
| `/projects/:slug` | `[Nome progetto] \| Case Study KLYK Studio` | Generata dal progetto con servizi/skill e beneficio principale. | `https://klyk.studio/projects/:slug` |

## Validazione eseguita

- `npm run build`: completato con successo.
- Preview locale su `http://127.0.0.1:4174`: verificate `/`, `/projects`, `/contacts`, `/about`, `/quick-audit`, un case study, `/sitemap.xml`, `/robots.txt`, tutte con HTTP 200.
- JSON-LD generato tramite oggetti JavaScript serializzati da `useSeo`: ProfessionalService homepage, Person about, Service quick audit/servizi, CreativeWork case study, BreadcrumbList pagine interne.
- Sitemap aggiornata con URL canonici e senza `lastmod` non affidabile.
- Robots confermato permissivo con riferimento sitemap.

## Attivita manuali consigliate

- Valutare prerendering/SSG per rendere title, description, canonical e JSON-LD specifici visibili gia nel markup iniziale di ogni route.
- Creare una immagine Open Graph dedicata 1200x630 per KLYK Studio.
- Ottimizzare/code-splittare asset pesanti: video progetto da 6-10 MB, `Nicoletta.png` oltre 2 MB, bundle JS principale oltre 900 kB.
