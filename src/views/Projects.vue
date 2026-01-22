<template>
    <Navbar />
    <ShaderTop />

    <!-- TIMELINE VERTICALE — fixed overlay, non interferisce col layout -->
    <aside class="fixed top-0 left-0 h-screen
           w-[84px] sm:w-[120px] lg:w-[160px] max-sm:w-[30px]
           z-9
           border-r-2 border-[var(--color-body-primary)] max-sm:border-none
           flex items-center justify-center
           pointer-events-none" aria-label="Projects years navigation">
        <div class="relative h-full w-full flex items-center justify-center">
            <!-- nav cliccabile -->
            <nav class="relative h-full w-full
               flex flex-col items-center justify-center
               py-5 sm:py-7 lg:py-10
               gap-2.5 max-sm:gap-8 lg:gap-6
               pointer-events-auto ">
                <button v-for="year in years" :key="year" type="button" class="group relative flex items-center
                 gap-2 max-sm:gap-6
                 w-full justify-center cursor-pointer
                 px-1 sm:px-2" @click="scrollToYear(year)">
                    <span class="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full border-2
                   transition-transform duration-200
                   group-hover:scale-110" :class="activeYear === year
                    ? 'bg-[var(--color-text-primary)] border-[var(--color-text-primary)]'
                    : 'bg-[var(--color-bg-body)] border-[var(--color-text-primary)]'" aria-hidden="true"></span>

                    <span class="text-[11px] sm:text-sm font-medium tracking-wide
                   transition-opacity duration-200 max-sm:-rotate-90 max-sm:origin-left max-sm:whitespace-nowrap"
                        :class="activeYear === year ? 'opacity-100' : 'opacity-60 group-hover:opacity-90'">
                        {{ year }}
                    </span>
                </button>
            </nav>
        </div>
    </aside>

    <section id="projectsArchive" class="mt-20 sm:mt-28 lg:mt-40
           px-[40px] md:px-[80px] lg:px-[112px]
           flex flex-col gap-5 sm:gap-8 lg:gap-10
           py-10 sm:py-14 lg:py-24">
        <header class="flex flex-col items-center pb-6 sm:pb-10 lg:pb-20">
            <h4 ref="projectsTitleEl" class="text-6xl font-display font-medium text-center w-1/2
               max-lg:w-3/4 max-md:w-11/12
               max-md:text-5xl max-sm:text-4xl">
                {{ infoAgency?.Products ?? 'Projects' }}
            </h4>
        </header>

        <div class="flex flex-col gap-10 sm:gap-14 lg:gap-16">
            <section v-for="group in projectsByYear" :key="group.year" :id="`year-${group.year}`"
                :ref="setYearSectionRef(group.year)" class="scroll-mt-24 sm:scroll-mt-32 lg:scroll-mt-40">
                <div class="flex items-end justify-between mb-4 sm:mb-6 lg:mb-8
                 pl-[100px] sm:pl-[140px] lg:pl-[190px] max-sm:pl-0 max-sm:flex-col">
                    <h5 class="text-3xl md:text-4xl font-display font-medium">
                        {{ group.year }}
                    </h5>
                    <p class="text-sm opacity-70">
                        {{ group.items.length }} projects
                    </p>
                </div>

                <div class="flex flex-col gap-6 sm:gap-7 lg:gap-8">
                    <ProjectCard  v-for="project in group.items" :key="project.slug" :title="project.title"
                        :slug="project.slug" :image="project.coverImage" :skills="project.skills" />
                </div>
            </section>
        </div>
    </section>

    <Footer />
    <ShaderBottom />
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import ShaderTop from '../components/ShaderTop.vue'
import ShaderBottom from '../components/ShaderBottom.vue'
import ProjectCard from '../components/ProjectCard.vue'

import { projects } from '../data/projects.js'
import { infoAgency } from '../data/Info.js'

/* -------------------------------------------------------------------------- */
/* Raggruppamento per anno (DESC: recenti -> vecchi)                          */
/* -------------------------------------------------------------------------- */
const projectsByYear = computed(() => {
    const map = new Map()

    for (const p of projects) {
        const y = Number(p.year)
        if (!map.has(y)) map.set(y, [])
        map.get(y).push(p)
    }

    const entries = Array.from(map.entries())
    entries.sort((a, b) => b[0] - a[0]) // DESC

    return entries.map(([year, items]) => ({ year, items }))
})

const years = computed(() => projectsByYear.value.map(g => g.year))

/* -------------------------------------------------------------------------- */
/* Active year (scroll) + fallback per ultimo anno a fondo pagina             */
/* -------------------------------------------------------------------------- */
const activeYear = ref(null)

const yearSectionEls = new Map()
function setYearSectionRef(year) {
    return (el) => {
        if (el) yearSectionEls.set(year, el)
    }
}

let io = null

function setActiveFromBottomIfNeeded() {
    const nearBottom =
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2

    if (nearBottom && years.value.length) {
        activeYear.value = years.value[years.value.length - 1]
    }
}

onMounted(() => {
    activeYear.value = years.value[0] ?? null

    io = new IntersectionObserver(
        (entries) => {
            const visible = entries
                .filter((e) => e.isIntersecting)
                .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

            if (visible.length) {
                const raw = visible[0].target.id.replace('year-', '')
                const y = Number(raw)
                if (!Number.isNaN(y)) activeYear.value = y
            }

            setActiveFromBottomIfNeeded()
        },
        {
            root: null,
            rootMargin: '-35% 0px -55% 0px',
            threshold: 0.01
        }
    )

    for (const el of yearSectionEls.values()) io.observe(el)
    window.addEventListener('scroll', setActiveFromBottomIfNeeded, { passive: true })
})

onBeforeUnmount(() => {
    io?.disconnect()
    io = null
    window.removeEventListener('scroll', setActiveFromBottomIfNeeded)
})

function scrollToYear(year) {
    const el = document.getElementById(`year-${year}`)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>
