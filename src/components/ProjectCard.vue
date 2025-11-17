<template>
  <article
    ref="card"
    class="relative w-[90vw] max-w-6xl mx-auto overflow-hidden rounded-3xl aspect-[16/7] group transition-all duration-500"
  >
    <!-- Immagine di copertina -->
    <router-link :to="`/projects/${slug}`" class="block w-full h-full">
      <img
        :src="image"
        :alt="`${title} cover image`"
        class="absolute inset-0 w-full h-full object-cover rounded-3xl brightness-90 group-hover:brightness-50 transition-all duration-700"
      />

      <!-- Overlay hover -->
      <div
        class="absolute inset-0 flex flex-col justify-center items-start p-10 opacity-0 group-hover:opacity-100 transition-all duration-700"
      >
        <h3 class="text-3xl md:text-4xl font-display text-white mb-3">{{ title }}</h3>
        <p class="text-sm md:text-base text-gray-300 mb-4">{{ skills.join(' • ') }}</p>
        <span class="text-accent font-medium underline underline-offset-4">Scopri di più →</span>
      </div>
    </router-link>
  </article>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { gsap } from 'gsap'

defineProps({
  title: String,
  slug: String,
  image: String,
  skills: Array
})

const card = ref(null)

// Animazione GSAP on enter (fade + slight rise)
onMounted(() => {
  gsap.from(card.value, {
    opacity: 0,
    y: 50,
    duration: 1.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: card.value,
      start: 'top 85%',
    },
  })
})
</script>