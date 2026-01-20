<template>
  <Navbar />

  <main class="w-full lg:h-svh flex items-center justify-center px-6 pt-28 pb-24 lg:px-40">
    <section class="w-full h-[50vh] max-w-4xl flex flex-col items-center justify-center text-center gap-8">
      <header class="flex flex-col items-center gap-4">
        <h1 class="font-display font-semibold leading-tight text-[clamp(2.6rem,6vw,4rem)]">
          About usdig +short klyk.studio A
        </h1>

        <p class="text-base sm:text-lg text-base-300 leading-relaxed max-w-2xl">
          We’re a small team focused on design and development for the web. We build clear, modern interfaces and ship
          reliable front-end experiences.
        </p>
      </header>

      <div class="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        <RouterLink to="/projects" class="w-full sm:w-auto">
          <Button variant="outline" size="large" class="w-full sm:w-auto">
            See projects
          </Button>
        </RouterLink>

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
</script>
