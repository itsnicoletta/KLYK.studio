<template>
  <Navbar />

  <main class="w-full px-5 pt-32 pb-16 sm:px-6 sm:pt-36 sm:pb-20 lg:px-12 xl:px-20 2xl:px-28">
    <section class="mx-auto flex w-full max-w-[1780px] flex-col gap-8 sm:gap-10">
      <div
        class="grid grid-cols-1 items-stretch gap-6 xl:grid-cols-[1.04fr_0.96fr] 2xl:grid-cols-[1.08fr_0.92fr]"
      >
        <article
          class="rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-6 sm:p-8 lg:p-9 xl:p-10"
        >
          <div class="mb-7 flex flex-col gap-4">
            <p class="text-sm uppercase tracking-[0.28em] text-base-300">
              About KLYK.studio
            </p>

            <h1 class="font-display text-[clamp(2.3rem,5.4vw,4.4rem)] leading-[0.94]">
              Nicoletta Pelosi
            </h1>

            <p class="max-w-3xl text-base leading-relaxed text-base-300 sm:text-lg xl:text-xl">
              I am a <strong class="font-semibold text-[var(--color-text-primary)]">digital designer</strong>
              and <strong class="font-semibold text-[var(--color-text-primary)]">frontend developer</strong>
              building websites, interfaces, and brand experiences with a strong
              focus on <strong class="font-semibold text-[var(--color-text-primary)]">clarity</strong>,
              <strong class="font-semibold text-[var(--color-text-primary)]">motion</strong>, and
              <strong class="font-semibold text-[var(--color-text-primary)]">emotional direction</strong>.
            </p>
          </div>

          <div class="mt-4 grid gap-5 md:grid-cols-2 lg:mt-6">
            <div class="space-y-4 text-base-300 sm:text-lg">
              <h2 class="font-display text-xl text-[var(--color-text-primary)] sm:text-2xl">
                Who I Am
              </h2>
              <p class="leading-relaxed">
                <strong class="font-semibold text-[var(--color-text-primary)]">KLYK.studio</strong>
                is my independent practice. I work across
                <strong class="font-semibold text-[var(--color-text-primary)]"> UX/UI design</strong>,
                <strong class="font-semibold text-[var(--color-text-primary)]"> visual direction</strong>,
                and <strong class="font-semibold text-[var(--color-text-primary)]">frontend development</strong>,
                helping brands shape digital experiences that feel
                <strong class="font-semibold text-[var(--color-text-primary)]"> polished</strong>,
                <strong class="font-semibold text-[var(--color-text-primary)]"> usable</strong>, and
                full of character.
              </p>
              <p class="leading-relaxed">
                My approach sits between
                <strong class="font-semibold text-[var(--color-text-primary)]">design sensitivity</strong>
                and <strong class="font-semibold text-[var(--color-text-primary)]">build precision</strong>.
                I like giving projects a
                <strong class="font-semibold text-[var(--color-text-primary)]">clear visual identity</strong>,
                then translating that direction into real interfaces that are
                <strong class="font-semibold text-[var(--color-text-primary)]">responsive</strong>,
                <strong class="font-semibold text-[var(--color-text-primary)]"> structured</strong>, and
                ready to evolve.
              </p>
            </div>

            <div class="space-y-4 text-base-300 sm:text-lg">
              <h2 class="font-display text-xl text-[var(--color-text-primary)] sm:text-2xl">
                How I Work
              </h2>
              <p class="leading-relaxed">
                I usually support projects from
                <strong class="font-semibold text-[var(--color-text-primary)]">concept to execution</strong>,
                combining <strong class="font-semibold text-[var(--color-text-primary)]">design thinking</strong>
                with hands-on implementation in
                <strong class="font-semibold text-[var(--color-text-primary)]">modern frontend stacks</strong>.
                The goal is never just to make something look nice, but to make
                it feel <strong class="font-semibold text-[var(--color-text-primary)]">intentional</strong>,
                <strong class="font-semibold text-[var(--color-text-primary)]"> useful</strong>, and easy
                to manage over time.
              </p>
              <p class="leading-relaxed">
                I care a lot about
                <strong class="font-semibold text-[var(--color-text-primary)]">collaboration</strong>,
                <strong class="font-semibold text-[var(--color-text-primary)]"> honest feedback</strong>,
                and building systems that clients can use
                <strong class="font-semibold text-[var(--color-text-primary)]">confidently after launch</strong>.
              </p>
            </div>
          </div>

          <div class="mt-7 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <router-link to="/quick-audit" id="hero-cta" class="w-full sm:w-auto">
              <Button
                variant="outline"
                :size="isMobileOrTablet ? 'medium' : 'large'"
                class="w-full sm:w-auto"
              >
                Book a 15 min call
              </Button>
            </router-link>

            <a href="mailto:klyk.studio@gmail.com" class="w-full sm:w-auto">
              <Button
                variant="primary"
                :size="isMobileOrTablet ? 'medium' : 'large'"
                class="w-full sm:w-auto"
              >
                Contact
              </Button>
            </a>
          </div>
        </article>

        <aside
          class="min-h-[340px] overflow-hidden rounded-[2rem] border border-white/8 bg-[var(--color-bg-card)] sm:min-h-[460px] xl:min-h-0"
        >
          <img
            :src="nicolettaPhoto"
            alt="Portrait of Nicoletta Pelosi"
            class="h-full w-full object-cover object-center"
          />
        </aside>
      </div>

      <section
        class="grid grid-cols-1 gap-6 rounded-[2rem] border border-white/8 bg-[var(--color-bg-card)] p-6 sm:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start xl:p-10"
      >
        <div class="space-y-4">
          <p class="text-sm uppercase tracking-[0.28em] text-base-300">
            Collaboration
          </p>
          <h2 class="font-display text-3xl leading-tight sm:text-4xl">
            The Froggy Studio partnership
          </h2>
        </div>

        <div class="space-y-4 text-base-300 sm:space-y-5 sm:text-lg">
          <p class="leading-relaxed">
            I also collaborate with
            <strong class="font-semibold text-[var(--color-text-primary)]">The Froggy Studio</strong>,
            where I am a <strong class="font-semibold text-[var(--color-text-primary)]">partner</strong>.
            It is a relationship built on
            <strong class="font-semibold text-[var(--color-text-primary)]">mutual trust</strong>,
            shared perspective, and the idea that great work becomes stronger
            when different backgrounds and talents meet.
          </p>
          <p class="leading-relaxed">
            We exchange
            <strong class="font-semibold text-[var(--color-text-primary)]">clients</strong>,
            <strong class="font-semibold text-[var(--color-text-primary)]"> opinions</strong>, and
            <strong class="font-semibold text-[var(--color-text-primary)]">creative skills</strong>,
            working across design directions, digital experiences, and visual
            storytelling. That collaboration creates a bridge between
            <strong class="font-semibold text-[var(--color-text-primary)]">Italy</strong> and
            <strong class="font-semibold text-[var(--color-text-primary)]">Sri Lanka</strong>,
            turning two different contexts into one shared way of building
            meaningful projects for clients around the world.
          </p>
          <p class="leading-relaxed">
            For me, this means staying
            <strong class="font-semibold text-[var(--color-text-primary)]">open</strong>,
            <strong class="font-semibold text-[var(--color-text-primary)]"> connected</strong>, and
            <strong class="font-semibold text-[var(--color-text-primary)]">internationally minded</strong>
            while still keeping a personal and hands-on approach in every project
            I take on.
          </p>
        </div>
      </section>

      <section class="grid grid-cols-1 gap-6 md:grid-cols-2 2xl:grid-cols-3">
        <article
          class="rounded-[2rem] bg-[var(--color-bg-card)] p-6 text-left"
        >
          <h2 class="font-display text-2xl">Design Direction</h2>
          <p class="mt-3 leading-relaxed text-base-300">
            UI systems, visual storytelling, layout rhythm, and interfaces that
            feel distinctive without losing clarity.
          </p>
        </article>

        <article
          class="rounded-[2rem] bg-[var(--color-bg-card)] p-6 text-left"
        >
          <h2 class="font-display text-2xl">Frontend Build</h2>
          <p class="mt-3 leading-relaxed text-base-300">
            Vue-based development, structured components, and websites designed
            to be elegant in motion and solid in production.
          </p>
        </article>

        <article
          class="rounded-[2rem] bg-[var(--color-bg-card)] p-6 text-left"
        >
          <h2 class="font-display text-2xl">Long-Term Support</h2>
          <p class="mt-3 leading-relaxed text-base-300">
            Flexible systems, clear communication, and practical solutions that
            help clients update and grow their project with confidence.
          </p>
        </article>
      </section>

      <section class="rounded-[2rem] border border-white/8 bg-[var(--color-bg-card)] p-6 sm:p-8 xl:p-10">
        <div class="flex flex-col items-center gap-4 pb-12 text-center max-md:pb-10">
          <p class="text-sm uppercase tracking-[0.28em] text-base-300">
            Services
          </p>
          <h2 class="max-w-3xl font-display text-3xl leading-tight sm:text-4xl xl:text-5xl">
            Need support on the design or build side?
          </h2>
          <p class="max-w-2xl text-base text-base-300 sm:text-lg">
            These are the core services I use most often to help brands launch,
            refine, and grow digital projects with more clarity and confidence.
          </p>
        </div>

        <div class="flex flex-wrap justify-center gap-6 max-md:flex-col max-md:items-stretch">
          <ServicesCard
            v-for="service in services"
            :key="service.id"
            :service="service"
            class="!w-full md:!w-[48%] xl:!w-[30%] 2xl:!w-[20vw] !h-[320px] md:!h-[360px] xl:!h-[42vh] 2xl:!h-[50vh]"
          />
        </div>
      </section>
    </section>
  </main>

  <Footer />
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
import { useHead } from "@unhead/vue";

import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
import Button from "../components/Button.vue";
import ServicesCard from "../components/ServicesCard.vue";
import nicolettaPhoto from "../assets/Nicoletta.png";
import { services } from "../data/services.js";

const isMobileOrTablet = ref(false);

function syncViewport() {
  isMobileOrTablet.value = window.innerWidth <= 768;
}

onMounted(() => {
  syncViewport();
  window.addEventListener("resize", syncViewport);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", syncViewport);
});

useHead({
  title: "About - KLYK.studio | Nicoletta Pelosi",
  meta: [
    {
      name: "description",
      content:
        "KLYK.studio is the independent practice of Nicoletta Pelosi, a digital designer and frontend developer working across UX/UI, visual storytelling, and modern web experiences.",
    },
    { name: "robots", content: "index,follow" },
    {
      property: "og:title",
      content: "About - KLYK.studio | Nicoletta Pelosi",
    },
    {
      property: "og:description",
      content:
        "Meet Nicoletta Pelosi and discover the design, frontend, and international collaboration behind KLYK.studio.",
    },
    { property: "og:url", content: "https://klyk.studio/about" },
    { property: "og:type", content: "website" },
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
        memberOf: {
          "@type": "Organization",
          name: "The Froggy Studio",
          url: "https://thefroggystudio.com",
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
