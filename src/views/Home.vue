<template>
  <section id="Hero-wrapper" class="w-full min-h-screen">
    <div id="hero-text" class="w-full h-full px-40 py-24 xl:px- 50 flex flex-row justify-center items-center gap-10 lg:gap-20">
        <div id="hero-heading" class="w-1/2 flex flex-col justify-center items-center lg:items-start text-center lg:text-left gap-2">   
            <h1 id="hero-title" class="font-display text-hero font-semibold leading-tight">
            Designing immersive digital stories.
            </h1>

            <p id="hero-description" class="mt-6 font-sans text-body text-base-300 max-w-xl mx-auto lg:mx-0">
            At KLYK stud.io, we combine UX/UI design, front-end development and
            storytelling to craft interactive websites and motion-driven
            interfaces.
            </p>

            <router-link to="/about" id="hero-cta" class="mt-10 inline-block font-sans text-small uppercase tracking-wider border border-base-700 hover:bg-base-800 transition-all px-6 py-3 rounded-full mx-auto lg:mx-0">
            Get in touch
            </router-link>
        </div>
        <div id="hero-3D-wrapper" class="w-full lg:w-2/3 h-[300px] lg:h-[80vh] flex justify-center items-start">
        
            <div
            class="w-full h-full max-w-[1024px] rounded-3xl bg-gradient-to-br from-base-800 to-base-700 shadow-xl"
            ></div>
        </div>
    </div>
  </section>
    <section id="projects" class="flex flex-col gap-10 py-24" style="border: 1px #ffffff;">
    <ProjectCard
      v-for="project in projects"
      :key="project.slug"
      :title="project.title"
      :slug="project.slug"
      :image="project.coverImage"
      :skills="project.skills"
    />
  </section>
</template>

<script setup>
import ProjectCard from '../components/ProjectCard.vue'
import { projects } from '../data/projects.js'
</script>