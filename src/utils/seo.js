import { computed } from "vue";
import { useHead } from "@unhead/vue";

export const SITE_URL = "https://klyk.studio";
export const SITE_NAME = "KLYK Studio";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/cover.jpg`;

const sameAs = [
  "https://www.linkedin.com/in/nicoletta-pelosi/",
  "https://www.instagram.com/klyk.studio/",
  "https://www.behance.net/klykstudio",
];

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/favicon_klyk.svg`,
  image: DEFAULT_OG_IMAGE,
  description:
    "KLYK Studio realizza branding, siti web, UX/UI, e-commerce, CMS, social media, digital marketing e SEO per aziende e professionisti.",
  telephone: "+39 334 119 59 25",
  email: "mailto:klyk.studio@gmail.com",
  sameAs,
  areaServed: ["Brescia", "Cremona", "Bergamo", "Milano", "Verona", "Italia", "Europa"],
  knowsAbout: [
    "Branding",
    "Web Design",
    "Web Development",
    "UX Design",
    "UI Design",
    "E-commerce",
    "CMS",
    "Social Media Management",
    "Digital Marketing",
    "SEO",
  ],
};

export function absoluteUrl(path = "/") {
  if (!path) return SITE_URL;
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function breadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function useSeo(options) {
  const resolved = computed(() => {
    const value = typeof options === "function" ? options() : options;
    const canonical = absoluteUrl(value.path || "/");
    const image = absoluteUrl(value.image || DEFAULT_OG_IMAGE);
    const schemas = [value.schema, ...(value.schemas || [])].filter(Boolean);

    return { ...value, canonical, image, schemas };
  });

  useHead(() => {
    const seo = resolved.value;

    return {
      title: seo.title,
      htmlAttrs: { lang: seo.lang || "it" },
      meta: [
        { name: "description", content: seo.description },
        { name: "robots", content: seo.robots || "index,follow" },
        { property: "og:site_name", content: SITE_NAME },
        { property: "og:locale", content: seo.lang === "en" ? "en_US" : "it_IT" },
        { property: "og:locale:alternate", content: seo.lang === "en" ? "it_IT" : "en_US" },
        { property: "og:title", content: seo.ogTitle || seo.title },
        { property: "og:description", content: seo.ogDescription || seo.description },
        { property: "og:url", content: seo.canonical },
        { property: "og:type", content: seo.ogType || "website" },
        { property: "og:image", content: seo.image },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: seo.twitterTitle || seo.ogTitle || seo.title },
        {
          name: "twitter:description",
          content: seo.twitterDescription || seo.ogDescription || seo.description,
        },
        { name: "twitter:image", content: seo.image },
      ],
      link: [
        { rel: "canonical", href: seo.canonical },
        ...(seo.alternates || []).map((alternate) => ({
          rel: "alternate",
          hreflang: alternate.hreflang,
          href: absoluteUrl(alternate.path),
        })),
      ],
      script: seo.schemas.map((schema) => ({
        type: "application/ld+json",
        children: JSON.stringify(schema),
      })),
    };
  });
}
