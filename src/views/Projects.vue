<template>
    <Navbar />
    <ShaderTop />

    <!-- TIMELINE -->
    <aside class="fixed top-0 left-0 h-screen
           w-[160px] z-9
           border-r-2 border-[var(--color-body-primary)]
           flex items-center justify-center
           pointer-events-none
           max-lg:w-[140px]
           max-sm:w-[30px] max-sm:border-none" aria-label="Projects years navigation">
        <div class="relative h-full w-full flex items-center justify-center">
            <nav class="relative h-full w-full flex flex-col items-center justify-center
               py-10 gap-6 pointer-events-auto
               max-lg:py-7 max-lg:gap-2.5
               max-sm:py-5 max-sm:gap-8">
                <button v-for="year in years" :key="year" type="button" class="group relative flex items-center justify-center cursor-pointer w-full
                 gap-2 px-1
                 max-lg:px-2
                 max-sm:gap-6" @click="scrollToYear(year)">
                    <span class="h-3 w-3 rounded-full border-2 transition-transform duration-200 group-hover:scale-110
                   max-lg:h-2.5 max-lg:w-2.5" :class="activeYear === year
                    ? 'bg-[var(--color-text-primary)] border-[var(--color-text-primary)]'
                    : 'bg-[var(--color-bg-body)] border-[var(--color-text-primary)]'" aria-hidden="true"></span>

                    <span class="text-sm font-medium tracking-wide transition-opacity duration-200
                   max-lg:text-[11px]
                   max-sm:-rotate-90 max-sm:origin-left max-sm:whitespace-nowrap"
                        :class="activeYear === year ? 'opacity-100' : 'opacity-60 group-hover:opacity-90'">
                        {{ year }}
                    </span>
                </button>
            </nav>
        </div>
    </aside>

    <!-- ARCHIVE -->
    <section id="projectsArchive" class="mt-40 px-[112px] py-24 flex flex-col gap-10
           max-lg:mt-28 max-lg:px-[80px] max-lg:py-14 max-lg:gap-8
           max-sm:mt-20 max-sm:px-[40px] max-sm:py-10 max-sm:gap-5">
        <header class="flex flex-col items-center pb-20 max-lg:pb-10 max-sm:pb-6">
            <h4 ref="projectsTitleEl" class="text-6xl font-display font-medium text-center w-1/2
               max-lg:w-3/4
               max-md:w-11/12 max-md:text-5xl
               max-sm:text-4xl">
                {{ infoAgency?.Products ?? 'Projects' }}
            </h4>
        </header>

        <div class="flex flex-col gap-16 max-lg:gap-14 max-sm:gap-10">
            <section v-for="group in projectsByYear" :key="group.year" :id="`year-${group.year}`"
                :ref="setYearSectionRef(group.year)" class="scroll-mt-40 max-lg:scroll-mt-32 max-sm:scroll-mt-24">
                <div class="flex items-end justify-between mb-8 pl-[190px]
                 max-lg:mb-6 max-lg:pl-[140px]
                 max-sm:mb-4 max-sm:pl-0 max-sm:flex-col max-sm:items-end max-sm:gap-2">
                    <h5 class="text-3xl font-display font-medium max-md:text-4xl">
                        {{ group.year }}
                    </h5>
                    <p class="text-sm opacity-70">
                        {{ group.items.length }} projects
                    </p>
                </div>

                <div class="flex flex-col gap-8 max-lg:gap-7 max-sm:gap-6">
                    <ProjectCard v-for="project in group.items" :key="project.slug" :title="project.title"
                        :slug="project.slug" :image="project.coverImage" :skills="project.skills" />
                </div>
            </section>
        </div>
    </section>

    <Footer />
    <ShaderBottom />
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import ShaderTop from '../components/ShaderTop.vue'
import ShaderBottom from '../components/ShaderBottom.vue'
import ProjectCard from '../components/ProjectCard.vue'

import { projects } from '../data/projects.js'
import { infoAgency } from '../data/Info.js'

/* -------------------------------------------------------------------------- */
/* Raggruppamento per anno (DESC)                                             */
/* -------------------------------------------------------------------------- */
const projectsByYear = computed(() => {
    const map = new Map()
    for (const p of projects) {
        const y = Number(p.year)
        if (!map.has(y)) map.set(y, [])
        map.get(y).push(p)
    }
    const entries = Array.from(map.entries())
    entries.sort((a, b) => b[0] - a[0])
    return entries.map(([year, items]) => ({ year, items }))
})

const years = computed(() => projectsByYear.value.map(g => g.year))

/* -------------------------------------------------------------------------- */
/* Active year                                                                */
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
    const nearBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2
    if (nearBottom && years.value.length) {
        activeYear.value = years.value[years.value.length - 1]
    }
}

/* -------------------------------------------------------------------------- */
/* Anim refs                                                                  */
/* -------------------------------------------------------------------------- */
const projectsTitleEl = ref(null)
let ctx = null

onMounted(async () => {
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

    await nextTick()
    ScrollTrigger.refresh()

    // prefers-reduced-motion
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
    if (reduceMotion) return

    ctx = gsap.context(() => {
        // Title in
        if (projectsTitleEl.value) {
            gsap.from(projectsTitleEl.value, {
                opacity: 0,
                y: 24,
                duration: 0.9,
                ease: 'power2.out'
            })
        }

        // Per-year sections: header + cards stagger
        for (const el of yearSectionEls.values()) {
            const yearHeader = el.querySelector('div') // il blocco con anno + count
            const cardsWrap = el.querySelector('div + div') // il blocco sotto (cards)
            const cards = cardsWrap?.children ?? []

            if (yearHeader) {
                gsap.from(yearHeader, {
                    opacity: 0,
                    y: 18,
                    duration: 0.7,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 70%',
                        end: 'bottom 40%',
                        toggleActions: 'play none none reverse'
                    }
                })
            }

            if (cards.length) {
                gsap.from(cards, {
                    opacity: 0,
                    y: 18,
                    duration: 0.7,
                    ease: 'power2.out',
                    stagger: 0.12,
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 70%',
                        end: 'bottom 30%',
                        toggleActions: 'play none none reverse'
                    }
                })
            }
        }
    })
})

onBeforeUnmount(() => {
    io?.disconnect()
    io = null
    window.removeEventListener('scroll', setActiveFromBottomIfNeeded)

    ctx?.revert()
    ScrollTrigger.getAll().forEach(t => t.kill())
})

function scrollToYear(year) {
    const el = document.getElementById(`year-${year}`)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

/* -------------------------------------------------------------------------- */
/* Micro feedback timeline: pop sul dot attivo                                 */
/* -------------------------------------------------------------------------- */
watch(activeYear, (y) => {
    const btn = document.querySelector(`button[type="button"]:has(span + span):not([disabled])`) // fallback
    // Non faccio query complesse: animiamo solo i dot attivi via selettore semplice
    const activeDot = document.querySelector(
        `aside button span + span.opacity-100`
    )?.previousElementSibling

    if (!activeDot) return

    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
    if (reduceMotion) return

    gsap.fromTo(activeDot, { scale: 1 }, { scale: 1.18, duration: 0.18, yoyo: true, repeat: 1, ease: 'power2.out' })
})

import { useHead } from "@unhead/vue";

useHead({
    title: "Projects - KLYK.studio | UI/UX, Motion & Frontend",
    meta: [
        {
            name: "description",
            content:
                "Explore selected projects by KLYK.studio — UI/UX design, interactive websites, motion-driven interfaces and frontend development in Vue.",
        },
        { name: "robots", content: "index,follow" },

        // Open Graph
        { property: "og:title", content: "Projects — KLYK.studio" },
        {
            property: "og:description",
            content:
                "Selected work: UI/UX design, interactive websites, motion-driven interfaces and Vue frontend development.",
        },
        { property: "og:url", content: "https://klyk.studio/projects" },
        { property: "og:type", content: "website" },

        // Twitter
        { name: "twitter:card", content: "summary_large_image" },
    ],
    link: [{ rel: "canonical", href: "https://klyk.studio/projects" }],
    script: [
        {
            type: "application/ld+json",
            children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "CollectionPage",
                name: "Projects — KLYK.studio",
                url: "https://klyk.studio/projects",
                isPartOf: {
                    "@type": "WebSite",
                    name: "KLYK.studio",
                    url: "https://klyk.studio/",
                },
                about: [
                    "UI/UX Design",
                    "Web Design",
                    "Motion Design",
                    "Frontend Development",
                    "Vue.js",
                    "Interactive Storytelling",
                ],
            }),
        },
    ],
});


</script>
