<template>
  <Navbar :animate="true" />
  <Shader />
  <!-- HERO -->
  <section id="Hero-wrapper" class="relative w-full min-h-screen mt-16 max-sm:mt-16">
    <component
      :is="Hero3D"
      v-if="shouldLoadHero3D"
      class="absolute inset-0 z-0 pointer-events-auto"
    />
    <img
      v-else
      src="/cover.jpg"
      alt=""
      aria-hidden="true"
      class="absolute inset-0 z-0 h-full w-full object-cover opacity-35"
    />

    <div id="hero-text" class="relative z-10 w-full h-full flex justify-center items-center flex-row gap-20
             px-22 py-20 pt-0
             max-lg:flex-col max-lg:gap-8 max-lg:mt-15
             max-md:px-16 max-md:py-14
             max-sm:px-7 max-sm:py-10 max-sm:pt-20
             pointer-events-none">
      <div class="w-full flex justify-center items-center max-lg:flex-col max-lg:items-center">
        <div id="hero-heading" class="w-1/2 max-w-2xl flex flex-col gap-2 items-start text-left
                 max-lg:w-full max-lg:items-center max-lg:text-center">
          <h1 id="hero-title" ref="heroTitleEl" class="font-display font-semibold leading-tight
                   text-[clamp(3.1rem,8vw,4.8rem)]
                   max-md:text-[clamp(2.7rem,10vw,3.8rem)]
                   max-sm:text-[clamp(2.25rem,9vw,3.1rem)]">
            {{ infoAgency.Usp }}
          </h1>

          <p id="hero-description" ref="heroDescriptionEl" class="mt-6 mb-6 font-sans text-body text-base-300 max-w-xl
                   mx-0 text-lg
                   max-lg:mx-auto max-lg:text-base">
            {{ infoAgency.Hero }}
          </p>

          <router-link :to="localizedPath(locale, 'quickAudit')" id="hero-cta" ref="heroCtaEl" class="w-auto max-sm:w-full pointer-events-auto">
            <Button variant="outline" :size="isMobileOrTablet ? 'medium' : 'large'" class="w-auto max-sm:w-full">
              {{ t("common.bookCall") }}
            </Button>
          </router-link>
        </div>

        <div id="hero-3D-wrapper" ref="hero3dWrapperEl" class="relative w-1/2 h-[80vh]
                 max-lg:w-full max-lg:h-105
                 max-md:h-85
                 max-sm:h-70 overflow-visible" />
      </div>
    </div>
  </section>

  <!-- SERVICES -->
  <section id="services" class="px-22 py-20 mb-32 flex flex-col gap-8
           max-md:px-16 max-md:py-16 max-md:mb-28 max-md:gap-8
           max-sm:px-7 max-sm:py-14 max-sm:mb-0">
    <div class="flex flex-col items-center pb-20 max-md:pb-14 max-sm:pb-10">
      <h3 ref="whyUsTitleEl" class="w-1/2 text-4xl font-display font-medium text-center
               max-lg:w-3/4
               max-md:w-11/12 max-md:text-4xl
               max-sm:text-2xl">
        {{ infoAgency.WhyUs }}
      </h3>
    </div>

    <!-- Cards -->
    <div class="flex flex-wrap justify-center gap-8 mb-32
             max-md:flex-col max-md:flex-nowrap max-md:items-stretch max-md:w-full max-md:mb-24
             max-sm:gap-6 max-sm:mb-16">
      <div ref="servicesCardsWrapEl" class="flex flex-wrap justify-center gap-8
               max-md:flex-col max-md:flex-nowrap max-md:items-stretch max-md:w-full
               max-sm:gap-6">
        <ServicesCard v-for="service in services" :key="service.id" :service="service" class="max-md:w-full" />
      </div>
    </div>

    <div class="flex flex-col items-center pt-30 max-md:pt-20 max-sm:pt-10">
      <h4 ref="otherServicesTitleEl" class="text-4xl text-center max-md:text-3xl max-sm:text-2xl">
        {{ t("common.otherIdeas") }}
      </h4>
    </div>

    <div class="w-full">
      <div ref="otherServicesWrapEl" class="w-3/5 mx-auto flex flex-row justify-center gap-8
               max-lg:w-3/4
               max-md:w-11/12 max-md:flex-col max-md:items-center
               max-sm:w-full max-sm:gap-6">
        <OtherServices v-for="service in otherServices" :key="`other-${service.id}`" :service="service" />
      </div>
    </div>
  </section>

  <!-- PROJECTS -->
  <section id="projects" class="px-22 py-20 flex flex-col gap-8
           max-md:px-16 max-md:py-16 max-md:gap-8
           max-sm:px-7 max-sm:py-14">
    <div class="flex flex-col items-center pb-20 max-md:pb-14 max-sm:pb-10">
      <h4 ref="projectsTitleEl" class="w-1/2 text-4xl font-display font-medium text-center
               max-lg:w-3/4
               max-md:w-11/12 max-md:text-4xl
               max-sm:text-3xl">
        {{ infoAgency.Products }}
      </h4>
    </div>

    <ProjectCard v-for="project in homeProjects" :key="project.slug" :title="project.title" :slug="project.slug"
      :image="project.coverImage" :skills="project.skills" class="max-sm:w-full" />
  </section>

  <Footer />
  <ShaderBottom />
</template>

<script setup>
import { defineAsyncComponent, ref, onMounted, onBeforeUnmount, nextTick, computed } from "vue";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
import Button from "../components/Button.vue";
import Shader from "../components/ShaderTop.vue";
import ShaderBottom from "../components/ShaderBottom.vue";

import ServicesCard from "../components/ServicesCard.vue";
import OtherServices from "../components/OtherServices.vue";
import ProjectCard from "../components/ProjectCard.vue";

import { localizedPath, useI18n, getServices, getOtherServices, getProjects } from "../i18n";

gsap.registerPlugin(ScrollTrigger);

const Hero3D = defineAsyncComponent({
  loader: () => import("../components/Hero3D.vue"),
  delay: 0,
  timeout: 10000,
  onError(error, retry, fail, attempts) {
    if (attempts <= 1) retry();
    else fail(error);
  },
});

const homeProjects = computed(() =>
  [...getProjects(locale.value)].sort((a, b) => b.year - a.year).slice(0, 4)
);
const { locale, t } = useI18n();
const services = computed(() => getServices(locale.value));
const otherServices = computed(() => getOtherServices(locale.value));
const infoAgency = computed(() => ({
  Usp: t("home.usp"),
  Hero: t("home.hero"),
  WhyUs: t("home.why"),
  Products: t("home.projects"),
}));

/* Responsive flag (<= 1024px) */
const isMobileOrTablet = ref(false);
const isClient = typeof window !== "undefined";
const prefersReducedMotion = isClient && window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
const shouldLoadHero3D = ref(isClient ? window.matchMedia("(min-width: 1025px)").matches && !prefersReducedMotion : false);
let mql;
let hero3DIdleId = null;
let hero3DTimeoutId = null;

function loadHero3DOnce() {
  if (shouldLoadHero3D.value || prefersReducedMotion) return;
  shouldLoadHero3D.value = true;
  cleanupHero3DDeferral();
}

function cleanupHero3DDeferral() {
  window.removeEventListener("pointerdown", loadHero3DOnce);
  window.removeEventListener("keydown", loadHero3DOnce);
  window.removeEventListener("touchstart", loadHero3DOnce);

  if (hero3DIdleId && window.cancelIdleCallback) window.cancelIdleCallback(hero3DIdleId);
  if (hero3DTimeoutId) clearTimeout(hero3DTimeoutId);
  hero3DIdleId = null;
  hero3DTimeoutId = null;
}

function deferMobileHero3D() {
  if (!isMobileOrTablet.value || shouldLoadHero3D.value || prefersReducedMotion) return;

  window.addEventListener("pointerdown", loadHero3DOnce, { once: true, passive: true });
  window.addEventListener("keydown", loadHero3DOnce, { once: true });
  window.addEventListener("touchstart", loadHero3DOnce, { once: true, passive: true });

  if (window.requestIdleCallback) {
    hero3DIdleId = window.requestIdleCallback(loadHero3DOnce, { timeout: 3500 });
  }
  hero3DTimeoutId = setTimeout(loadHero3DOnce, 5000);
}

function syncViewportFlag() {
  isMobileOrTablet.value = !!mql?.matches;
}

/* DOM refs */
const heroTitleEl = ref(null);
const heroDescriptionEl = ref(null);
const heroCtaEl = ref(null);
const hero3dWrapperEl = ref(null);

const whyUsTitleEl = ref(null);
const otherServicesTitleEl = ref(null);
const projectsTitleEl = ref(null);

const servicesCardsWrapEl = ref(null);
const otherServicesWrapEl = ref(null);

/* GSAP lifecycle */
let ctx = null;

onMounted(async () => {
  // matchMedia
  mql = window.matchMedia("(max-width: 1024px)");
  syncViewportFlag();
  if (mql.addEventListener) mql.addEventListener("change", syncViewportFlag);
  else mql.addListener(syncViewportFlag);

  if (!isMobileOrTablet.value && !prefersReducedMotion) shouldLoadHero3D.value = true;
  deferMobileHero3D();

  await nextTick();
  ScrollTrigger.refresh();

  const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  if (reduceMotion) return;

  ctx = gsap.context(() => {
    const heroTl = gsap.timeline({ defaults: { ease: "power2.out" } });

    heroTl
      .from(heroTitleEl.value, { opacity: 0, y: 40, duration: 1.1 })
      .from(heroDescriptionEl.value, { opacity: 0, y: 28, duration: 1 }, "-=0.6")
      .from(heroCtaEl.value?.$el ?? heroCtaEl.value, { opacity: 0, y: 22, duration: 1 }, "-=0.55")
      .from(hero3dWrapperEl.value, { opacity: 0, y: 30, duration: 1.0 }, "-=0.6");

    const makeTitleAnim = (el) => {
      if (!el) return;
      gsap.from(el, {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 70%",
          end: "bottom 40%",
          toggleActions: "play none none reverse",
        },
      });
    };

    makeTitleAnim(whyUsTitleEl.value);
    makeTitleAnim(otherServicesTitleEl.value);
    makeTitleAnim(projectsTitleEl.value);

    if (servicesCardsWrapEl.value) {
      const cards = servicesCardsWrapEl.value.children;
      if (cards?.length) {
        gsap.from(cards, {
          opacity: 0,
          y: 26,
          duration: 1,
          ease: "power2.out",
          stagger: 0.2,
          delay: 1,
          scrollTrigger: {
            trigger: servicesCardsWrapEl.value,
            start: "top 75%",
            end: "bottom 40%",
            toggleActions: "play none none reverse",
          },
        });
      }
    }

    if (otherServicesWrapEl.value) {
      const els = otherServicesWrapEl.value.children;
      if (els?.length) {
        gsap.from(els, {
          opacity: 0,
          y: 26,
          duration: 1,
          ease: "power2.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: otherServicesWrapEl.value,
            start: "top 75%",
            end: "bottom 40%",
            toggleActions: "play none none reverse",
          },
        });
      }
    }
  });
});

onBeforeUnmount(() => {
  if (mql) {
    if (mql.removeEventListener) mql.removeEventListener("change", syncViewportFlag);
    else mql.removeListener(syncViewportFlag);
  }
  cleanupHero3DDeferral();

  ctx?.revert();
  ScrollTrigger.getAll().forEach((t) => t.kill());
});

import { organizationSchema, useSeo } from "../utils/seo.js";

useSeo(() => ({
  title: t("seo.homeTitle"),
  description: t("seo.homeDescription"),
  path: localizedPath(locale.value, "home"),
  lang: locale.value,
  alternates: [
    { hreflang: "it", path: localizedPath("it", "home") },
    { hreflang: "en", path: localizedPath("en", "home") },
    { hreflang: "x-default", path: localizedPath("it", "home") },
  ],
  schema: organizationSchema,
}));
</script>


