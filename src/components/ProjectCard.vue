<template>
  <article ref="CardEl" class="relative mx-auto overflow-hidden rounded-4xl group
           w-11/12 sm:w-4/5 md:w-3/5
           aspect-[4/5] sm:aspect-[3/4] md:aspect-[16/9] lg:aspect-[16/7]">
    <router-link :to="`/projects/${slug}`" class="block w-full h-full">
      <img :src="image" :alt="`${title} cover image`" class="absolute inset-0 w-full h-full object-cover rounded-4xl transition-all duration-700
               brightness-40
               [@media(hover:hover)]:brightness-80
               [@media(hover:hover)]:group-hover:brightness-40" />

      <!-- Overlay: sempre visibile su no-hover, solo in hover su hover-capable -->
      <div class="absolute inset-0 flex transition-all duration-700
               opacity-100 pointer-events-none
               [@media(hover:hover)]:opacity-0
               [@media(hover:hover)]:group-hover:opacity-100
               [@media(hover:hover)]:pointer-events-auto">
        <div class="w-full flex flex-col gap-3 p-6 sm:p-8 md:p-10
                 justify-end items-start
                 bg-gradient-to-t from-black/60 via-black/25 to-transparent
                 [@media(hover:hover)]:bg-none
                 [@media(hover:hover)]:justify-center">
          <h3 class="font-display text-[var(--color-text-primary)]
                   text-2xl sm:text-3xl md:text-4xl
                   [@media(hover:hover)]:text-6xl [@media(hover:hover)]:md:text-7xl">
            {{ title }}
          </h3>

          <p class="text-[var(--color-text-secondary)] text-sm sm:text-base md:text-lg"> 
            {{ skills.join(' • ') }}
          </p>

          <Button variant="simple" size="noPadding" class="font-medium [@media(hover:hover)]:text-2xl">
            Discover more →
          </Button>
        </div>
      </div>
    </router-link>
  </article>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'
import Button from './Button.vue'

defineProps({
  title: String,
  slug: String,
  image: String,
  skills: Array
})

const CardEl = ref(null)

let observer
let entered = false

onMounted(() => {
  gsap.set(CardEl.value, { opacity: 0, y: 14 })

  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        entered = true
        gsap.to(CardEl.value, {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power2.out',
          overwrite: 'auto'
        })
      } else if (entered) {
        gsap.to(CardEl.value, {
          opacity: 0,
          y: 14,
          duration: 0.5,
          ease: 'power2.inOut',
          overwrite: 'auto'
        })
      }
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -10% 0px'
    }
  )

  observer.observe(CardEl.value)
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>
