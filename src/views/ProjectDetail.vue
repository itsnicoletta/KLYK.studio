<template>
    <Navbar />

    <section class="flex flex-col items-center w-full mt-50 max-lg:mt-32 max-md:mt-24 max-sm:mt-60">
        <header class="w-3/5 flex gap-10 max-lg:w-11/12 max-lg:flex-col max-lg:gap-8" ref="projectTitle">
            <div class="flex flex-col w-1/2 max-lg:w-full">
                <h1 class="text-8xl font-bold font-display max-lg:text-7xl max-md:text-5xl max-sm:text-4xl">
                    {{ project.title }}
                </h1>
                <h2 class="text-3xl font-light max-lg:text-2xl max-md:text-xl max-sm:text-lg">
                    {{ project.H2 }}
                </h2>
            </div>

            <div ref="skillsContainer" class="flex flex-wrap gap-3 pt-6 w-1/2 justify-end items-end
               max-lg:w-full max-lg:justify-start max-lg:items-start max-lg:pt-2">
                <span v-for="skill in project.skills" :key="skill" class="skill-badge bg-stone-800 text-lg px-5 py-2 rounded-full whitespace-nowrap
                 max-md:text-base max-md:px-4 max-md:py-1.5 max-sm:text-sm max-sm:px-3 max-sm:py-1">
                    {{ skill }}
                </span>
            </div>
        </header>
    </section>

    <section ref="projectVideo" class="flex justify-center items-center w-full my-20 rounded-4xl
           max-lg:my-14 max-md:my-10 max-sm:my-8">
        <div class="w-3/5 max-lg:w-4/5 max-md:w-11/12">
            <video v-if="project.video" :src="project.video" autoplay loop muted playsinline
                class="w-full h-full object-cover rounded-4xl" />
            <img v-else :src="project.coverImage" class="w-full h-full object-cover rounded-4xl" alt="" />
        </div>
    </section>

    <section
        class="w-full flex flex-col items-center mt-20 mb-10 px-10 max-lg:mt-14 max-lg:px-8 max-md:px-6 max-sm:px-4">
        <div class="flex items-start w-3/5 max-lg:w-4/5 max-md:w-11/12">
            <div ref="projectDescription" class="w-2/5 flex flex-col gap-6 text-xl leading-relaxed text-base-300
               max-lg:w-full max-md:text-lg max-sm:text-base">
                <p>{{ project.description }}</p>
            </div>
        </div>
    </section>

    <div ref="lineEl" class="w-full flex flex-col items-center">
        <div id="line" class="bg-[var(--color-text-primary)] h-1 my-10 w-3/5 flex items-center rounded-2xl
             max-lg:w-4/5 max-md:w-11/12 max-md:my-8 max-sm:my-6"></div>
    </div>

    <section class="flex w-full items-center justify-center mt-10 max-lg:mt-8">
        <div
            class="w-3/5 flex items-end mb-20 gap-20 max-lg:w-4/5 max-lg:flex-col max-lg:items-stretch max-lg:gap-10 max-md:w-11/12 max-md:mb-14">
            <div id="sliderGallery" ref="sliderGallery" class="w-1/2 relative rounded-4xl overflow-hidden h-[500px]
               max-lg:w-full max-lg:h-[460px] max-md:h-[380px] max-sm:h-[320px]">
                <div v-for="(image, index) in project.galleryImages" :key="index" class="absolute inset-0">
                    <img :src="image"
                        class="w-full h-full object-cover rounded-4xl transition-all duration-700 ease-in-out will-change-transform"
                        :class="index === slideIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.02] pointer-events-none'"
                        alt="" />
                </div>

                <div
                    class="navigation flex items-center gap-4 absolute bottom-4 right-4 z-10 max-sm:gap-3 max-sm:bottom-3 max-sm:right-3">
                    <button @click="prevBtn" class="bg-[var(--color-bg-body)] text-[var(--color-text-primary)] px-3 py-1.5 rounded-[100px] text-2xl
                   max-sm:px-2.5 max-sm:py-1 max-sm:text-xl">
                        ←
                    </button>
                    <button @click="nextBtn" class="bg-[var(--color-bg-body)] text-[var(--color-text-primary)] px-3 py-1.5 rounded-[100px] text-2xl
                   max-sm:px-2.5 max-sm:py-1 max-sm:text-xl">
                        →
                    </button>
                </div>
            </div>

            <div ref="textAndCta" class="w-1/2 flex flex-col gap-6 pl-10 !justify-end !items-end
               max-lg:w-full max-lg:pl-0 max-lg:items-start max-lg:justify-start">
                <p
                    class="text-xl leading-relaxed text-base-300 text-justify w-4/5 max-lg:w-full max-md:text-lg max-sm:text-base">
                    {{ project.secondDescription }}
                </p>

                <div class="flex gap-6 mt-10 max-md:flex-col max-md:w-full max-md:gap-4">
                    <Button variant="outline" size="large" :href="project.link" target="_blank" class="max-md:w-full">
                        <span>View Project Source</span>
                    </Button>

                    <Button variant="primary" size="large" href="mailto:klyk.studio@gmail.com" target="_blank"
                        class="text-[var(--color-bg-body)]! max-md:w-full">
                        <span class="text-[var(--color-bg-body)]">Let's Connect</span>
                    </Button>
                </div>
            </div>
        </div>
    </section>

    <Footer />
</template>


<script setup>
import { onMounted, onBeforeUnmount, ref, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { projects } from '../data/projects.js'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import Button from '../components/Button.vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger.js'
gsap.registerPlugin(ScrollTrigger)

const route = useRoute()
const project = projects.find(p => p.slug === route.params.slug)

// slider (0-based)
const slideIndex = ref(0)
let intervalId = null

function nextBtn() {
    const total = project?.galleryImages?.length ?? 0
    if (!total) return
    slideIndex.value = (slideIndex.value + 1) % total
}

function prevBtn() {
    const total = project?.galleryImages?.length ?? 0
    if (!total) return
    slideIndex.value = (slideIndex.value - 1 + total) % total
}

function startAutoplay() {
    stopAutoplay()
    intervalId = setInterval(() => {
        nextBtn()
    }, 5000)
}

function stopAutoplay() {
    if (intervalId) {
        clearInterval(intervalId)
        intervalId = null
    }
}

// refs animazioni
const projectTitle = ref(null)
const skillsContainer = ref(null)
const projectVideo = ref(null)
const projectDescription = ref(null)
const sliderGallery = ref(null)
const textAndCta = ref(null)
const lineEl = ref(null)

let ctx = null

onMounted(async () => {
    startAutoplay()

    await nextTick()
    ScrollTrigger.refresh()

    // Titolo
    if (projectTitle.value) {
        gsap.from(projectTitle.value, {
            opacity: 0,
            y: -100,
            duration: 2,
            delay: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: projectTitle.value,
                start: 'top 80%',
                toggleActions: 'play reverse play reverse',
                // markers: true
            }
        })
    }

    // Skills: animazione in sequenza (stagger)
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
    if (!reduceMotion && skillsContainer.value) {
        ctx = gsap.context(() => {
            const badges = skillsContainer.value.querySelectorAll('.skill-badge')

            gsap.from(badges, {
                opacity: 0,
                y: -24,
                duration: 2,
                ease: 'power3.out',
                stagger: 0.3,
                clearProps: 'transform',
                delay: 1,
                scrollTrigger: {
                    trigger: skillsContainer.value,
                    start: 'top 80%',
                    toggleActions: 'play reverse play reverse',
                    // markers: true
                }
            })
        }, skillsContainer.value)
    }

    // Video
    if (projectVideo.value) {
        gsap.from(projectVideo.value, {
            opacity: 0,
            y: 200,
            duration: 3,
            delay: 1.8,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: projectVideo.value,
                start: 'top 80%',
                toggleActions: 'play reverse play reverse',
                // markers: true
            }
        })
    }


    // Descrizione

    if (projectDescription.value) {
        gsap.fromTo(
            projectDescription.value,
            { opacity: 0, x: -70 },
            {
                opacity: 1,
                x: 0,
                duration: 0.9,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: projectDescription.value,
                    start: 'top 50%',
                    end: 'bottom 0%',
                    toggleActions: 'play none none reverse',
                    // markers: true
                }
            }
        )
    }

    if (lineEl.value) {
        gsap.fromTo(
            lineEl.value,
            { opacity: 0, scaleX: 0 },
            {
                opacity: 1,
                scaleX: 1,
                duration: 0.9,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: lineEl.value,
                    start: 'top 70%',
                    end: 'bottom 0%',
                    toggleActions: 'play reverse play reverse',
                    // markers: true
                }
            }
        )
    }


    // Slider + testo/cta: start più tardivo e trigger sulla sezione (non sul singolo box)
    if (sliderGallery.value && textAndCta.value) {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sliderGallery.value,
                start: 'top 62%',
                end: 'bottom 35%',
                toggleActions: 'play reverse play reverse',
                // markers: true
            }
        })

        tl.fromTo(
            sliderGallery.value,
            { opacity: 0, y: 80 },
            { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' }
        ).fromTo(
            textAndCta.value,
            { opacity: 0, y: 80 },
            { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' },
            0.18
        )
    }


})




onBeforeUnmount(() => {
    stopAutoplay()
    ctx?.revert()
    ScrollTrigger.getAll().forEach(t => t.kill())
})

</script>