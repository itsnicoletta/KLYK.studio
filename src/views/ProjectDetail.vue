<template>
    <Navbar />

    <!-- HERO -->
    <section :class="sectionPad" class="w-full">
        <section class="w-full flex flex-col items-center
             mt-50 my-20
             max-lg:mt-48 max-lg:my-16
             max-md:mt-40 max-md:my-12
             max-sm:mt-32 max-sm:my-10">
            <header ref="projectTitle" class="w-full lg:w-3/5 mx-auto flex gap-10
               max-lg:flex-col max-lg:gap-8">
                <div class="w-1/2 flex flex-col max-lg:w-full">
                    <h1 class="text-8xl font-bold font-display max-lg:text-7xl max-md:text-5xl max-sm:text-4xl">
                        {{ project.title }}
                    </h1>
                    <h2 class="text-3xl font-light max-lg:text-2xl max-md:text-xl max-sm:text-lg">
                        {{ project.H2 }}
                    </h2>
                </div>

                <div ref="skillsContainer" class="w-1/2 flex flex-wrap gap-3 pt-6 items-end justify-end
                 max-lg:w-full max-lg:pt-2 max-lg:items-start max-lg:justify-start">
                    <span v-for="skill in project.skills" :key="skill" class="skill-badge bg-stone-800 whitespace-nowrap rounded-full
                   text-lg px-5 py-2
                   max-md:text-base max-md:px-4 max-md:py-1.5
                   max-sm:text-sm max-sm:px-3 max-sm:py-1">
                        {{ skill }}
                    </span>
                </div>
            </header>
        </section>
    </section>

    <!-- MEDIA -->
    <section :class="sectionPad" ref="projectVideo" class="w-full flex justify-center items-center
           my-20 rounded-4xl
           max-lg:my-14 max-md:my-10 max-sm:my-8">
        <div class="w-full lg:w-3/5 mx-auto">
            <video v-if="project.video" :src="project.video" autoplay loop muted playsinline
                class="w-full h-full object-cover rounded-4xl" />
            <img v-else :src="project.coverImage" class="w-full h-full object-cover rounded-4xl" :alt="project.title" />
        </div>
    </section>

    <!-- DESCRIPTION -->
    <section :class="sectionPad" class="w-full flex flex-col items-center
           mt-20 mb-10
           max-lg:mt-14">
        <div class="w-full lg:w-3/5 mx-auto flex items-start">
            <div ref="projectDescription" class="w-2/5 flex flex-col gap-6 text-xl leading-relaxed text-base-300
               max-lg:w-full max-md:text-lg max-sm:text-base">
                <p>{{ project.description }}</p>
            </div>
        </div>
    </section>

    <!-- DIVIDER -->
    <div :class="sectionPad" ref="lineEl" class="w-full flex flex-col items-center">
        <div id="line" class="w-full lg:w-3/5 mx-auto h-1 rounded-2xl bg-[var(--color-text-primary)]
             my-10
             max-md:my-8
             max-sm:my-6" />
    </div>

    <!-- GALLERY + CTA -->
    <section :class="sectionPad" class="w-full flex items-center justify-center mt-10 max-lg:mt-8">
        <div class="w-full lg:w-3/5 mx-auto flex items-end gap-20 mb-20
             max-lg:flex-col max-lg:items-stretch max-lg:gap-10
             max-md:mb-14">
            <!-- Slider -->
            <div id="sliderGallery" ref="sliderGallery" class="w-1/2 relative rounded-4xl overflow-hidden h-[500px]
               max-lg:w-full max-lg:h-[460px]
               max-md:h-[380px]
               max-sm:h-[320px]">
                <div v-for="(image, index) in project.galleryImages" :key="index" class="absolute inset-0">
                    <img :src="image"
                        class="w-full h-full object-cover rounded-4xl transition-all duration-700 ease-in-out will-change-transform"
                        :class="index === slideIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.02] pointer-events-none'"
                        alt="" />
                </div>

                <div class="absolute bottom-4 right-4 z-10 flex items-center gap-4
                 max-sm:bottom-3 max-sm:right-3 max-sm:gap-3">
                    <button @click="prevBtn" class="bg-[var(--color-bg-body)] text-[var(--color-text-primary)]
                   px-3 py-1.5 pb-2 rounded-[100px] text-2xl
                   max-sm:px-2.5 max-sm:py-1 max-sm:text-xl">
                        ←
                    </button>
                    <button @click="nextBtn" class="bg-[var(--color-bg-body)] text-[var(--color-text-primary)]
                   px-3 py-1.5 pb-2 rounded-[100px] text-2xl
                   max-sm:px-2.5 max-sm:py-1 max-sm:text-xl">
                        →
                    </button>
                </div>
            </div>

            <!-- Text + CTA -->
            <div ref="textAndCta" class="w-1/2 flex flex-col gap-6 pl-10 items-end justify-end
               max-lg:w-full max-lg:pl-0 max-lg:items-start max-lg:justify-start">
                <p class="w-4/5 text-xl leading-relaxed text-base-300 text-justify
                 max-lg:w-full max-md:text-lg max-sm:text-base">
                    {{ project.secondDescription }}
                </p>

                <div class="flex gap-6 mt-10 max-md:flex-col max-md:w-full max-md:gap-4">
                    <Button variant="outline" :href="project.link" target="_blank"
                        :size="isMobileOrTablet ? 'small' : 'medium'" class="max-md:w-full">
                        <span>View Project Source</span>
                    </Button>

                    <Button variant="primary" href="mailto:klyk.studio@gmail.com" target="_blank"
                        :size="isMobileOrTablet ? 'small' : 'medium'"
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
import { onMounted, onBeforeUnmount, ref, nextTick } from "vue";
import { useRoute } from "vue-router";
import { projects } from "../data/projects.js";

import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
import Button from "../components/Button.vue";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
gsap.registerPlugin(ScrollTrigger);

const route = useRoute();
const project = projects.find((p) => p.slug === route.params.slug);

/* ✅ padding laterale come negli altri dettagli */
const sectionPad = "px-[112px] max-md:px-[80px] max-sm:px-[40px]";

// slider (0-based)
const slideIndex = ref(0);
let intervalId = null;

function nextBtn() {
    const total = project?.galleryImages?.length ?? 0;
    if (!total) return;
    slideIndex.value = (slideIndex.value + 1) % total;
}

function prevBtn() {
    const total = project?.galleryImages?.length ?? 0;
    if (!total) return;
    slideIndex.value = (slideIndex.value - 1 + total) % total;
}

function startAutoplay() {
    stopAutoplay();
    intervalId = setInterval(() => {
        nextBtn();
    }, 5000);
}

function stopAutoplay() {
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    }
}

/* responsive flag (<= 1024px) */
const isMobileOrTablet = ref(false);
let mql;

function syncViewportFlag() {
    isMobileOrTablet.value = !!mql?.matches;
}

// refs animazioni
const projectTitle = ref(null);
const skillsContainer = ref(null);
const projectVideo = ref(null);
const projectDescription = ref(null);
const sliderGallery = ref(null);
const textAndCta = ref(null);
const lineEl = ref(null);

let ctx = null;

onMounted(async () => {
    startAutoplay();

    // matchMedia
    mql = window.matchMedia("(max-width: 1024px)");
    syncViewportFlag();
    if (mql.addEventListener) mql.addEventListener("change", syncViewportFlag);
    else mql.addListener(syncViewportFlag);

    await nextTick();
    ScrollTrigger.refresh();

    // Titolo
    if (projectTitle.value) {
        gsap.from(projectTitle.value, {
            opacity: 0,
            y: -100,
            duration: 2,
            delay: 0.6,
            ease: "power2.out",
            scrollTrigger: {
                trigger: projectTitle.value,
                start: "top 80%",
                toggleActions: "play reverse play reverse",
            },
        });
    }

    // Skills
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (!reduceMotion && skillsContainer.value) {
        ctx = gsap.context(() => {
            const badges = skillsContainer.value.querySelectorAll(".skill-badge");

            gsap.from(badges, {
                opacity: 0,
                y: -24,
                duration: 2,
                ease: "power3.out",
                stagger: 0.3,
                clearProps: "transform",
                delay: 1,
                scrollTrigger: {
                    trigger: skillsContainer.value,
                    start: "top 80%",
                    toggleActions: "play reverse play reverse",
                },
            });
        }, skillsContainer.value);
    }

    // Media
    if (projectVideo.value) {
        gsap.from(projectVideo.value, {
            opacity: 0,
            y: 200,
            duration: 3,
            delay: 1.8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: projectVideo.value,
                start: "top 80%",
                toggleActions: "play reverse play reverse",
            },
        });
    }

    // Description
    if (projectDescription.value) {
        gsap.fromTo(
            projectDescription.value,
            { opacity: 0, x: -70 },
            {
                opacity: 1,
                x: 0,
                duration: 0.9,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: projectDescription.value,
                    start: "top 50%",
                    end: "bottom 0%",
                    toggleActions: "play none none reverse",
                },
            }
        );
    }

    // Divider
    if (lineEl.value) {
        gsap.fromTo(
            lineEl.value,
            { opacity: 0, scaleX: 0 },
            {
                opacity: 1,
                scaleX: 1,
                duration: 0.9,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: lineEl.value,
                    start: "top 70%",
                    end: "bottom 0%",
                    toggleActions: "play reverse play reverse",
                },
            }
        );
    }

    // Slider + CTA
    if (sliderGallery.value && textAndCta.value) {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sliderGallery.value,
                start: "top 62%",
                end: "bottom 0%",
                toggleActions: "play reverse play reverse",
            },
        });

        tl.fromTo(sliderGallery.value, { opacity: 0, y: 80 }, { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" })
            .fromTo(textAndCta.value, { opacity: 0, y: 80 }, { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" }, 0.18);
    }
});

onBeforeUnmount(() => {
    stopAutoplay();
    ctx?.revert();
    ScrollTrigger.getAll().forEach((t) => t.kill());

    if (mql) {
        if (mql.removeEventListener) mql.removeEventListener("change", syncViewportFlag);
        else mql.removeListener(syncViewportFlag);
    }
});
</script>
