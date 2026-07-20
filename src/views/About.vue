<template>
  <Navbar />

  <main class="w-full px-5 pt-32 pb-16 sm:px-6 sm:pt-36 sm:pb-20 lg:px-12 xl:px-20 2xl:px-28">
    <section class="mx-auto flex w-full max-w-[1780px] flex-col gap-8 sm:gap-8">
      <div
        class="grid grid-cols-1 items-stretch gap-6 xl:grid-cols-[1.04fr_0.96fr] 2xl:grid-cols-[1.08fr_0.92fr]"
      >
        <article
          class="rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-6 sm:p-8 lg:p-9 xl:p-8"
        >
          <div class="mb-7 flex flex-col gap-4">
            <p class="text-sm uppercase tracking-[0.28em] text-base-300">
              {{ t("about.eyebrow") }}
            </p>

            <h1 class="font-display text-[clamp(2.3rem,5.4vw,4.4rem)] leading-[0.94]">
              {{ t("about.h1") }}
            </h1>

            <p class="max-w-3xl text-base leading-relaxed text-base-300 sm:text-lg xl:text-xl">
              {{ t("about.intro") }}
            </p>
          </div>

          <div class="mt-4 grid gap-5 md:grid-cols-2 lg:mt-6">
            <div class="space-y-4 text-base-300 sm:text-lg">
              <h2 class="font-display text-xl text-[var(--color-text-primary)] sm:text-2xl">
                {{ t("about.who") }}
              </h2>
              <p class="leading-relaxed">
                {{ locale === "it"
                  ? "KLYK Studio e il digital design studio che ho fondato. Lavoro su UX/UI design, direzione visiva, branding e sviluppo web per aiutare brand e aziende a costruire esperienze digitali chiare, curate e riconoscibili."
                  : "KLYK Studio is the digital design studio I founded. I work across UX/UI design, visual direction, branding and web development to help brands and companies build clear, polished and recognizable digital experiences." }}
              </p>
              <p class="leading-relaxed">
                {{ locale === "it"
                  ? "L'approccio unisce sensibilita progettuale e precisione tecnica: prima definiamo una direzione visiva chiara, poi la traduciamo in interfacce responsive, strutturate e pronte a evolvere."
                  : "The approach combines design sensitivity and technical precision: first we define a clear visual direction, then we translate it into responsive, structured interfaces that are ready to evolve." }}
              </p>
            </div>

            <div class="space-y-4 text-base-300 sm:text-lg">
              <h2 class="font-display text-xl text-[var(--color-text-primary)] sm:text-2xl">
                {{ t("about.how") }}
              </h2>
              <p class="leading-relaxed">
                {{ locale === "it"
                  ? "KLYK Studio segue i progetti dal concept all'esecuzione, combinando strategia, design thinking e implementazione con stack frontend moderni."
                  : "KLYK Studio supports projects from concept to execution, combining strategy, design thinking and hands-on implementation with modern frontend stacks." }}
              </p>
              <p class="leading-relaxed">
                {{ locale === "it"
                  ? "L'obiettivo non e solo creare qualcosa di bello, ma costruire sistemi intenzionali, utili e gestibili con sicurezza anche dopo il lancio."
                  : "The goal is not only to make something look good, but to build intentional, useful systems that clients can manage confidently after launch." }}
              </p>
            </div>
          </div>

          <div class="mt-7 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <router-link :to="localizedPath(locale, 'quickAudit')" id="hero-cta" class="w-full sm:w-auto">
              <Button
                variant="outline"
                :size="isMobileOrTablet ? 'medium' : 'large'"
                class="w-full sm:w-auto"
              >
                {{ t("common.bookCall") }}
              </Button>
            </router-link>

            <a href="mailto:klyk.studio@gmail.com" class="w-full sm:w-auto">
              <Button
                variant="primary"
                :size="isMobileOrTablet ? 'medium' : 'large'"
                class="w-full sm:w-auto"
              >
                {{ t("about.contact") }}
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
        class="grid grid-cols-1 gap-6 rounded-[2rem] border border-white/8 bg-[var(--color-bg-card)] p-6 sm:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start xl:p-8"
      >
        <div class="space-y-4">
          <p class="text-sm uppercase tracking-[0.28em] text-base-300">
            Collaboration
          </p>
          <h2 class="font-display text-3xl leading-tight sm:text-4xl">
            {{ t("about.partnership") }}
          </h2>
        </div>

        <div class="space-y-4 text-base-300 sm:space-y-5 sm:text-lg">
          <p class="leading-relaxed">
            {{ t("about.partnershipText1") }}
          </p>
          <p class="leading-relaxed">
            {{ t("about.partnershipText2") }}
          </p>
          <p class="leading-relaxed">
            {{ t("about.partnershipText3") }}
          </p>
        </div>
      </section>

      <section class="grid grid-cols-1 gap-6 md:grid-cols-2 2xl:grid-cols-3">
        <article
          class="rounded-[2rem] bg-[var(--color-bg-card)] p-6 text-left"
        >
          <h2 class="font-display text-2xl">{{ t("about.directionTitle") }}</h2>
          <p class="mt-3 leading-relaxed text-base-300">
            {{ t("about.directionText") }}
          </p>
        </article>

        <article
          class="rounded-[2rem] bg-[var(--color-bg-card)] p-6 text-left"
        >
          <h2 class="font-display text-2xl">{{ t("about.buildTitle") }}</h2>
          <p class="mt-3 leading-relaxed text-base-300">
            {{ t("about.buildText") }}
          </p>
        </article>

        <article
          class="rounded-[2rem] bg-[var(--color-bg-card)] p-6 text-left"
        >
          <h2 class="font-display text-2xl">{{ t("about.supportCardTitle") }}</h2>
          <p class="mt-3 leading-relaxed text-base-300">
            {{ t("about.supportCardText") }}
          </p>
        </article>
      </section>

      <section class="rounded-[2rem] border border-white/8 bg-[var(--color-bg-card)] p-6 sm:p-8 xl:p-8">
        <div class="flex flex-col items-center gap-4 pb-12 text-center max-md:pb-10">
          <p class="text-sm uppercase tracking-[0.28em] text-base-300">
            {{ t("common.services") }}
          </p>
          <h2 class="max-w-3xl font-display text-3xl leading-tight sm:text-4xl xl:text-4xl">
            {{ t("about.supportTitle") }}
          </h2>
          <p class="max-w-2xl text-base text-base-300 sm:text-lg">
            {{ t("about.supportText") }}
          </p>
        </div>

        <div class="flex flex-wrap justify-center gap-6 max-md:flex-col max-md:items-stretch">
          <ServicesCard
            v-for="service in services"
            :key="service.id"
            :service="service"
            class="!w-full md:!w-[48%] xl:!w-[30%] 2xl:!w-[20vw] !h-[320px] md:!h-[360px] xl:!h-[38vh] 2xl:!h-[44vh]"
          />
        </div>
      </section>
    </section>
  </main>

  <Footer />
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";


import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
import Button from "../components/Button.vue";
import ServicesCard from "../components/ServicesCard.vue";
import nicolettaPhoto from "../assets/Nicoletta.png";
import { breadcrumbSchema, useSeo } from "../utils/seo.js";
import { getServices, localizedPath, useI18n } from "../i18n";

const isMobileOrTablet = ref(false);
const { locale, t } = useI18n();
const services = computed(() => getServices(locale.value));

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

useSeo(() => ({
  title: t("seo.aboutTitle"),
  description: t("seo.aboutDescription"),
  path: localizedPath(locale.value, "about"),
  lang: locale.value,
  alternates: [
    { hreflang: "it", path: localizedPath("it", "about") },
    { hreflang: "en", path: localizedPath("en", "about") },
    { hreflang: "x-default", path: localizedPath("it", "about") },
  ],
  schemas: [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Nicoletta Pelosi",
      jobTitle: locale.value === "it" ? "Founder di KLYK Studio" : "Founder of KLYK Studio",
      url: localizedPath(locale.value, "about"),
      email: "mailto:klyk.studio@gmail.com",
      worksFor: {
        "@type": "Organization",
        name: "KLYK Studio",
        url: "https://klyk.studio/",
      },
      sameAs: [
        "https://www.linkedin.com/in/nicoletta-pelosi/",
        "https://www.instagram.com/klyk.studio/",
        "https://www.behance.net/klykstudio",
      ],
    },
    breadcrumbSchema([
      { name: t("common.home"), path: localizedPath(locale.value, "home") },
      { name: t("nav.about"), path: localizedPath(locale.value, "about") },
    ]),
  ],
}));
</script>

