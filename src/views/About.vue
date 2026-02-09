<template>
  <Navbar />

  <main class="w-full lg:h-svh flex items-center justify-center px-6 pt-28 pb-24 lg:px-40">
    <section class="w-full max-w-4xl flex flex-col items-center justify-center text-center gap-8">
      <header class="flex flex-col items-center gap-4">
        <h1 class="font-display font-semibold leading-tight text-[clamp(2.6rem,6vw,4rem)]">
          About <br> KLYK.studio
        </h1>

        <p class="text-base sm:text-lg text-base-300 leading-relaxed max-w-2xl">
          It's a small team focused on design and development for the web made by Nicoletta Pelosi and few other indipendent collaborators. We build clear, modern interfaces and ship
          reliable front-end experiences.
        </p>
      </header>

      <div class="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
       <router-link to="/quick-audit" id="hero-cta" ref="heroCtaEl" class="w-full sm:w-auto">
          <Button variant="outline" :size="isMobileOrTablet ? 'medium' : 'large'" class="w-full sm:w-auto">
            Book a 15 min call
          </Button>
        </router-link>

        <a href="mailto:klyk.studio@gmail.com" class="w-full sm:w-auto">
          <Button variant="primary" size="large" class="w-full sm:w-auto">
            Contact
          </Button>
        </a>
      </div>

      <div class="w-full mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <article class="rounded-4xl bg-[var(--color-bg-card)] p-6 flex flex-col items-center text-center gap-2">
          <h2 class="font-display text-2xl">Design</h2>
          <p class="text-base-300 leading-relaxed">
            UI systems, visual direction, and layouts that stay clean across devices.
          </p>
        </article>

        <article class="rounded-4xl bg-[var(--color-bg-card)] p-6 flex flex-col items-center text-center gap-2">
          <h2 class="font-display text-2xl">Development</h2>
          <p class="text-base-300 leading-relaxed">
            Vue-based front-ends with scalable components and solid performance.
          </p>
        </article>

        <article class="rounded-4xl bg-[var(--color-bg-card)] p-6 flex flex-col items-center text-center gap-2">
          <h2 class="font-display text-2xl">Delivery</h2>
          <p class="text-base-300 leading-relaxed">
            Fast iterations, clear communication, and results you can ship.
          </p>
        </article>
      </div>
    </section>
  </main>

  <Footer />
</template>

<script setup>
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import Button from '../components/Button.vue'
import { ref } from 'vue'
const isMobileOrTablet = ref(window.innerWidth <= 768)
window.addEventListener('resize', () => {
  isMobileOrTablet.value = window.innerWidth <= 768
})

import { useHead } from "@unhead/vue";

useHead({
  title: "About - KLYK.studio | Nicoletta Pelosi",
  meta: [
    {
      name: "description",
      content:
        "KLYK.studio is the portfolio of Nicoletta Pelosi, a UX/UI designer & frontend developer crafting interactive websites, motion-driven interfaces and immersive digital storytelling.",
    },
    { name: "robots", content: "index,follow" },

    // Open Graph
    { property: "og:title", content: "About — KLYK.studio | Nicoletta Pelosi" },
    {
      property: "og:description",
      content:
        "Meet Nicoletta Pelosi — UX/UI designer & frontend developer focused on interactive websites, motion design and immersive storytelling.",
    },
    { property: "og:url", content: "https://klyk.studio/about" },
    { property: "og:type", content: "website" },

    // Twitter
    { name: "twitter:card", content: "summary_large_image" },
  ],
  link: [{ rel: "canonical", href: "https://klyk.studio/about" }],
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Nicoletta Pelosi",
        jobTitle: "Digital Designer & Frontend Developer",
        url: "https://klyk.studio/about",
        email: "mailto:pelosinicoletta@gmail.com",
        worksFor: {
          "@type": "Organization",
          name: "KLYK.studio",
          url: "https://klyk.studio/",
        },
        sameAs: [
          "https://www.linkedin.com/in/nicoletta-pelosi/",
          "https://www.instagram.com/klyk.studio/",
          "https://www.behance.net/klykstudio",
        ],
        address: {
          "@type": "PostalAddress",
          addressCountry: "IT",
        },
      }),
    },
  ],
});


</script>
