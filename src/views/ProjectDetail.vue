<script setup>
import { onMounted, nextTick, ref } from 'vue'
import { useRoute } from 'vue-router'
import { projects } from '../data/projects.js'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const route = useRoute()
const project = projects.find(p => p.slug === route.params.slug)

// Riferimenti
const headerEl = ref(null)
const titleEl = ref(null)
const subtitleEl = ref(null)
const skillsContainer = ref(null)
const videoEl = ref(null)
const descEl = ref(null)
const ctaEl = ref(null)
const secondDescriptionEl = ref(null)
const contactEl = ref(null)
const galleryContainer = ref(null)

// Lightbox
const lightboxImage = ref(null)
const showLightbox = ref(false)
const openLightbox = (img) => {
  lightboxImage.value = img
  showLightbox.value = true
  document.body.style.overflow = 'hidden'
}
const closeLightbox = () => {
  showLightbox.value = false
  document.body.style.overflow = ''
}

onMounted(async () => {
  await nextTick()

  //
  // --- HERO ANIMATIONS ---
  //
  gsap.from(titleEl.value, {
    opacity: 0,
    y: -100,
    duration: 1.8,
    ease: 'power3.out',
    scrollTrigger: { trigger: headerEl.value, start: 'top 80%', toggleActions: 'play reverse play reverse' },
  })

  gsap.from(subtitleEl.value, {
    opacity: 0,
    y: -80,
    duration: 1.8,
    delay: 0.3,
    ease: 'power3.out',
    scrollTrigger: { trigger: headerEl.value, start: 'top 80%', toggleActions: 'play reverse play reverse' },
  })

  const skills = skillsContainer.value.querySelectorAll('span')
  gsap.from(skills, {
    opacity: 0,
    x: -30,
    duration: 0.8,
    delay: 1,
    stagger: 0.15,
    ease: 'power3.out',
    scrollTrigger: { trigger: skillsContainer.value, start: 'top 80%', toggleActions: 'play reverse play reverse' },
  })

  gsap.from(videoEl.value, {
    opacity: 0,
    y: 80,
    scale: 1.1,
    duration: 1.4,
    delay: 1.4,
    ease: 'power2.out',
    scrollTrigger: { trigger: videoEl.value, start: 'top 80%', toggleActions: 'play reverse play reverse' },
  })

  //
  // --- DESCRIZIONE TESTO ---
  //

  gsap.from(galleryContainer.value, {
    opacity: 0,
    duration: 1,
    delay: 3,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: galleryContainer.value,
      start: 'top 85%',
      toggleActions: 'play none none reverse', // 👈 non torna indietro
      once: true, // 👈 si attiva solo una volta
    },
  })

  gsap.to(descEl.value, {
    y: 420,
    duration: 1.8,
    ease: 'power2.inOut', // transizione in/out più vellutata
    scrollTrigger: {
      trigger: descEl.value,
      start: 'top 30%',   // inizia a spostarsi più tardi
      end: 'bottom top',
      scrub: 1.4,         // rallenta lo spostamento
      toggleActions: 'play none none reverse',
    },
  })
  //
  // --- GALLERIA CINEMATICA ---
  //
  const images = gsap.utils.toArray('.gallery-item')

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.gallery-container',
      start: 'top top',
      end: `+=${images.length * 1000}vh`, 
      scrub: 1.2,
      pin: true,
      anticipatePin: 1,
    },
  })

  images.forEach((img, i) => {
    // Entrata più fluida e proporzionata
    tl.fromTo(
      img,
      { opacity: 0, y: 100, scale: 0.92, filter: 'blur(10px) brightness(0.6)' },
      { opacity: 1, y: 0, scale: 1, filter: 'blur(0px) brightness(1)', duration: 3.5, ease: 'power2.inOut' },
      i * 5 // spazio maggiore = più lente
    )

    // Uscita morbida e centrata
    tl.to(
      img,
      { opacity: 0, y: -200, scale: 1, filter: 'blur(6px) brightness(0.8)', duration: 3, ease: 'power2.inOut' },
      i * 5 + 3.8
    )
  })

    //
  // --- CTA (entrata bilanciata + uscita elegante) ---
  //
  gsap.from(ctaEl.value, {
    opacity: 0,
    y: 100,
    duration: 1.6,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: ctaEl.value,
      start: 'top 85%',
      end: 'bottom 60%',
      toggleActions: 'play none none reverse',
    },
  })

  gsap.from(secondDescriptionEl.value, {
    opacity: 0,
    x: -80,
    duration: 1.4,
    delay: 0.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: ctaEl.value,
      start: 'top 90%',
      toggleActions: 'play none none reverse',
    },
  })

  gsap.from(contactEl.value, {
    opacity: 0,
    x: 80,
    duration: 1.4,
    delay: 0.4,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: ctaEl.value,
      start: 'top 90%',
      toggleActions: 'play none none reverse',
    },
  })

  gsap.to(ctaEl.value, {
    opacity: 0.5,
    y: -50,
    ease: 'power1.inOut',
    scrollTrigger: {
      trigger: ctaEl.value,
      start: 'top 30%',
      end: 'bottom top',
      scrub: 1,
    },
  })
})

</script>

<template>
  <section class="max-w-7xl mx-auto px-6 py-24 space-y-40 overflow-hidden select-none">
    
    <!-- HEADER -->
    <header ref="headerEl" class="flex flex-col lg:flex-row justify-between gap-16 border-b border-base-500 pb-14">
      <div class="flex flex-col w-full lg:w-1/2">
        <h1 ref="titleEl" class="text-7xl font-display mb-2 pt-12">{{ project.title }}</h1>
        <h2 ref="subtitleEl" class="text-xl text-base-300">{{ project.H2 }}</h2>
      </div>
      <div ref="skillsContainer" class="flex flex-wrap w-full lg:w-1/2 justify-end items-end gap-3">
        <span
          v-for="skill in project.skills"
          :key="skill"
          class="bg-stone-800 text-md px-6 py-2 rounded-full text-nowrap"
        >
          {{ skill }}
        </span>
      </div>
    </header>

    <!-- VIDEO -->
    <div ref="videoEl" class="relative w-full overflow-hidden rounded-3xl">
      <video
        v-if="project.video"
        :src="project.video"
        controls autoplay muted loop
        class="w-full rounded-3xl object-cover pointer-events-none"
      ></video>
      <img
        v-else
        :src="project.coverImage"
        :alt="project.title"
        class="w-full rounded-3xl object-cover pointer-events-none"
      />
    </div>

    <!-- GALLERIA CINEMATICA -->
    <section ref="galleryContainer" class="flex flex-col lg:flex-row gap-24 relative gallery-container">
      <!-- Testo Sticky -->
      <div
        ref="descEl"
        class="w-full lg:w-1/2 text-base-300 leading-relaxed  self-start will-change-transform"
      >
        <p class="max-w-md text-lg">{{ project.description }}</p>
      </div>

      <!-- Galleria -->
      <div class="w-full lg:w-1/2 flex items-center justify-center relative h-[66vh]">
        <div
          v-for="(img, i) in project.galleryImages"
          :key="i"
          class="gallery-item absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[700px] h-[460px] flex justify-center cursor-pointer"
          @click="openLightbox(img)"
        >
          <img
            :src="img"
            class="object-cover w-full h-full rounded-2xl shadow-2xl transition-all duration-700"
            alt="project image"
          />
        </div>
      </div>
    </section>

    <!-- CTA -->
    <div ref="ctaEl" class="flex flex-col lg:flex-row gap-16 border-t border-base-600 pt-24">
      <div ref="secondDescriptionEl" class="w-full lg:w-2/3 text-base-300 leading-relaxed">
        <p>{{ project.secondDescription }}</p>
      </div>
      <div ref="contactEl" class="w-full lg:w-1/3 flex justify-start lg:justify-end items-end">
        <router-link
          :to="'/about'"
          class="inline-flex items-center gap-3 px-8 py-4 bg-white rounded-full font-semibold text-lg transition text-black hover:bg-accent hover:text-white"
        >
          <span class="font-display !text-black">Get in touch</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-7 h-7 !text-black transition-all duration-300 group-hover:translate-x-1 group-hover:text-white"
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M17.25 8.25L21 12l-3.75 3.75M21 12H3" />
          </svg>
        </router-link>
      </div>
    </div>

    <!-- LIGHTBOX -->
    <transition name="fade">
      <div
        v-if="showLightbox"
        class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
        @click.self="closeLightbox"
      >
        <button
          @click="closeLightbox"
          class="absolute top-8 right-8 text-white text-3xl font-bold hover:text-accent transition"
        >
          ✕
        </button>
        <img
          :src="lightboxImage"
          alt="lightbox"
          class="max-w-[90%] max-h-[85%] rounded-2xl shadow-2xl object-contain select-none pointer-events-none"
        />
      </div>
    </transition>
  </section>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
* {
  user-select: none;
  -webkit-user-drag: none;
}
body {
  -webkit-touch-callout: none;
}
img {
  pointer-events: none;
}
</style>
