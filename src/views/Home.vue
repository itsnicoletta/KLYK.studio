<template>
  <Navbar />
  <Shader />

  <!-- HERO -->
  <section id="Hero-wrapper" class="w-full min-h-screen mt-16 lg:mt-30">
    <div id="hero-text" class="w-full h-full flex justify-center items-center
             gap-8 lg:gap-20
             px-[40px] md:px-[80px] lg:px-[112px]
             py-10 md:py-14 lg:py-24
             pt-20 sm:pt-20 lg:pt-0
             flex-col lg:flex-row" :class="isMobileOrTablet ? 'mt-[60px]' : 'mt-0'">
      <div id="hero-heading" class="flex flex-col gap-2 max-w-2xl
               w-full items-center text-center
               lg:w-1/2 lg:items-start lg:text-left">
        <h1 id="hero-title" ref="heroTitleEl" class="font-display text-hero font-semibold leading-tight
                 text-[clamp(2.6rem,10vw,3.8rem)]
                 lg:text-[clamp(4rem,25vw,6rem)]
                 xl:text-[clamp(5rem,30vw,7rem)]
                 2xl:text-[clamp(6rem,40vw,8rem)]/30">
          {{ infoAgency.Usp }}
        </h1>

        <p id="hero-description" ref="heroDescriptionEl" class="mt-6 mb-6 font-sans text-body text-base-300 max-w-xl
                 mx-auto lg:mx-0
                 text-base sm:text-lg
                 2xl:text-[clamp(1rem,1vw,4rem)]/12">
          {{ infoAgency.Hero }}
        </p>

        <router-link to="/about" id="hero-cta" ref="heroCtaEl" class="w-full sm:w-auto">
          <Button variant="outline" :size="isMobileOrTablet ? 'medium' : 'large'" class="w-full sm:w-auto">
            Discover more of us
          </Button>
        </router-link>
      </div>

      <div id="hero-3D-wrapper" ref="hero3dWrapperEl" class="w-full flex justify-center items-start
               h-[280px] sm:h-[340px] md:h-[420px]
               lg:w-2/3 lg:h-[80vh]">
        <div class="w-full h-full rounded-3xl bg-gradient-to-br from-base-800 to-base-700 shadow-xl
                 max-w-none lg:max-w-[60vw]"></div>
      </div>
    </div>
  </section>

  <!-- SERVICES -->
  <section id="services" class="px-[40px] md:px-[80px] lg:px-[112px]
           flex flex-col gap-8 lg:gap-10
           py-14 md:py-16 lg:py-24
           mb-20 md:mb-28 lg:mb-40">
    <div class="flex flex-col items-center pb-10 md:pb-14 lg:pb-20">
      <h3 ref="whyUsTitleEl" class="text-6xl font-display font-medium text-center w-1/2
               max-lg:w-3/4 max-md:w-11/12
               max-md:text-5xl max-sm:text-4xl">
        {{ infoAgency.WhyUs }}
      </h3>
    </div>

    <!-- Cards: desktop/tablet wrap, mobile stacked -->
    <div class="flex flex-wrap justify-center gap-6 md:gap-8 mb-16 md:mb-24 lg:mb-40
             max-md:flex-col max-md:flex-nowrap max-md:items-stretch max-md:w-full">
      <div ref="servicesCardsWrapEl" class="flex flex-wrap gap-6 md:gap-8 justify-center
               max-md:flex-col max-md:flex-nowrap max-md:items-stretch max-md:w-full">
        <ServicesCard v-for="service in services" :key="service.id" :service="service" class="max-md:w-full" />
      </div>
    </div>

    <div class="flex flex-col items-center pt-40 md:pt-20 lg:pt-30">
      <h4 ref="otherServicesTitleEl" class="text-4xl text-center
               max-md:text-3xl max-sm:text-2xl">
        Have anything else in mind?
      </h4>
    </div>

    <div class="w-full">
      <div ref="otherServicesWrapEl" class="w-3/5 mx-auto flex flex-row justify-center gap-6 md:gap-8
               max-lg:w-3/4 max-md:w-11/12
               max-md:flex-col max-md:items-center">
        <OtherServices v-for="service in otherServices" :key="`other-${service.id}`" :service="service" />
      </div>
    </div>
  </section>

  <!-- PROJECTS -->
  <section id="projects" class="px-[40px] md:px-[80px] lg:px-[112px]
           flex flex-col gap-8 lg:gap-10
           py-14 md:py-16 lg:py-24">
    <div class="flex flex-col items-center pb-10 md:pb-14 lg:pb-20">
      <h4 ref="projectsTitleEl" class="text-6xl font-display font-medium text-center w-1/2
               max-lg:w-3/4 max-md:w-11/12
               max-md:text-5xl max-sm:text-4xl">
        {{ infoAgency.Products }}
      </h4>
    </div>

    <ProjectCard v-for="project in homeProjects" :key="project.slug" :title="project.title" :slug="project.slug"
      :image="project.coverImage" :skills="project.skills" />
  </section>

  <Footer />
  <ShaderBottom />
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick, computed } from 'vue'
import { gsap } from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import Button from '../components/Button.vue'
import Shader from '../components/ShaderTop.vue'
import ShaderBottom from '../components/ShaderBottom.vue'

import ServicesCard from '../components/ServicesCard.vue'
import OtherServices from '../components/OtherServices.vue'
import ProjectCard from '../components/ProjectCard.vue'

import { infoAgency } from '../data/Info.js'
import { services, otherServices } from '../data/services.js'
import { projects } from '../data/projects.js'

gsap.registerPlugin(ScrollTrigger)

const homeProjects = computed(() =>
  [...projects]
    .sort((a, b) => b.year - a.year)
    .slice(0, 4)
)

/* -------------------------------------------------------------------------- */
/* Responsive flag                                                            */
/* -------------------------------------------------------------------------- */
const isMobileOrTablet = ref(false)
let mql

function syncViewportFlag() {
  isMobileOrTablet.value = !!mql?.matches
}

/* -------------------------------------------------------------------------- */
/* DOM refs                                                                   */
/* -------------------------------------------------------------------------- */
const heroTitleEl = ref(null)
const heroDescriptionEl = ref(null)
const heroCtaEl = ref(null)
const hero3dWrapperEl = ref(null)

const whyUsTitleEl = ref(null)
const otherServicesTitleEl = ref(null)
const projectsTitleEl = ref(null)

const servicesCardsWrapEl = ref(null)
const otherServicesWrapEl = ref(null)

/* -------------------------------------------------------------------------- */
/* GSAP lifecycle                                                             */
/* -------------------------------------------------------------------------- */
let ctx = null

onMounted(async () => {
  // matchMedia
  mql = window.matchMedia('(max-width: 1024px)')
  syncViewportFlag()
  if (mql.addEventListener) mql.addEventListener('change', syncViewportFlag)
  else mql.addListener(syncViewportFlag)

  await nextTick()
  ScrollTrigger.refresh()

  // prefers reduced motion
  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
  if (reduceMotion) return

  ctx = gsap.context(() => {
    /* ------------------------------ HERO timeline ------------------------------ */
    const heroTl = gsap.timeline({ defaults: { ease: 'power2.out' } })

    heroTl
      .from(heroTitleEl.value, { opacity: 0, y: 40, duration: 1.1 })
      .from(heroDescriptionEl.value, { opacity: 0, y: 28, duration: 1 }, '-=0.6')
      .from(heroCtaEl.value?.$el ?? heroCtaEl.value, { opacity: 0, y: 22, duration: 1 }, '-=0.55')
      .from(hero3dWrapperEl.value, { opacity: 0, y: 30, duration: 1.0 }, '-=0.6')

    /* -------------------------- Titles on scroll -------------------------- */
    const makeTitleAnim = (el) => {
      if (!el) return
      gsap.from(el, {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 70%',
          end: 'bottom 40%',
          toggleActions: 'play none none reverse'
        }
      })
    }

    makeTitleAnim(whyUsTitleEl.value)
    makeTitleAnim(otherServicesTitleEl.value)
    makeTitleAnim(projectsTitleEl.value)

    /* --------------------- Services cards stagger (scroll) --------------------- */
    if (servicesCardsWrapEl.value) {
      const cards = servicesCardsWrapEl.value.children
      if (cards?.length) {
        gsap.from(cards, {
          opacity: 0,
          y: 26,
          duration: 1,
          ease: 'power2.out',
          stagger: 0.2,
          delay: 1,
          scrollTrigger: {
            trigger: servicesCardsWrapEl.value,
            start: 'top 75%',
            end: 'bottom 40%',
            toggleActions: 'play none none reverse'
          }
        })
      }
    }

    /* --------------------- Other services stagger (scroll) --------------------- */
    if (otherServicesWrapEl.value) {
      const els = otherServicesWrapEl.value.children
      if (els?.length) {
        gsap.from(els, {
          opacity: 0,
          y: 26,
          duration: 1,
          ease: 'power2.out',
          stagger: 0.2,
          scrollTrigger: {
            trigger: otherServicesWrapEl.value,
            start: 'top 75%',
            end: 'bottom 40%',
            toggleActions: 'play none none reverse'
          }
        })
      }
    }
  })
})

onBeforeUnmount(() => {
  // cleanup mql
  if (mql) {
    if (mql.removeEventListener) mql.removeEventListener('change', syncViewportFlag)
    else mql.removeListener(syncViewportFlag)
  }

  // cleanup gsap
  ctx?.revert()
  ScrollTrigger.getAll().forEach((t) => t.kill())
})
</script>
