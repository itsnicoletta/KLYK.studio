<template>
    <Navbar />



    <!-- HERO + CTA  -->
    <section :class="sectionPad" class="w-full">
        <!-- HERO -->
        <section class="w-full flex flex-col items-center
                 mt-50 my-20
                 max-lg:mt-48 max-lg:my-16
                 max-md:mt-40 max-md:my-12
                 max-sm:mt-32 max-sm:my-10">
            <header ref="heroEl" class="w-full lg:w-3/5 mx-auto flex gap-10
                   max-lg:flex-col max-lg:gap-8">
                <!-- Left -->
                <div class="w-1/2 flex flex-col max-lg:w-full">
                    <h1 class="text-4xl font-bold font-display max-lg:text-7xl max-md:text-5xl max-sm:text-4xl">
                        {{ service.title }}
                    </h1>

                    <h2 class="text-3xl font-light max-lg:text-2xl max-md:text-xl max-sm:text-lg">
                        {{ service.subtitle }}
                    </h2>

                    <p class="pt-10 max-lg:pt-8 max-md:pt-6 max-sm:pt-5">
                        {{ service.client }}
                    </p>
                </div>

                <!-- Right -->
                <div ref="badgesEl" class="w-1/2 flex flex-col gap-3 pt-6 items-end justify-end
                     max-lg:w-full max-lg:pt-2 max-lg:items-start max-lg:justify-start">
                    <span v-for="bullet in service.bullets" :key="bullet" class="bg-stone-800 whitespace-nowrap rounded-full
                       text-lg px-5 py-2
                       max-md:text-base max-md:px-4 max-md:py-1.5
                       max-sm:text-sm max-sm:px-3 max-sm:py-1">
                        {{ bullet }}
                    </span>
                </div>
            </header>

            <!-- Divider -->
            <div ref="dividerEl" class="w-full flex flex-col items-center mt-14 max-md:mt-10 max-sm:mt-8">
                <div class="w-full lg:w-3/5 mx-auto h-1 rounded-2xl bg-[var(--color-text-primary)]
                     my-10
                     max-md:my-8
                     max-sm:my-6" />
            </div>
        </section>

        <!-- CTA -->
        <section ref="ctaEl" class="w-full flex justify-center items-center mb-36
                 max-md:mb-28
                 max-sm:mb-20">
            <div class="w-full lg:w-3/5 mx-auto flex items-end justify-center gap-10
                   max-lg:flex-col max-lg:items-stretch max-lg:gap-8">
                <!-- Image -->
                <div ref="imageEl" class="w-full aspect-video">
                    <img :src="service.image" class="w-full h-full object-cover rounded-4xl" :alt="service.title" />
                </div>

                <!-- Text + CTA -->
                <div ref="textCtaEl" class="w-full flex flex-col items-end justify-end max-lg:items-start">
                    <p class="w-3/5 text-end max-lg:w-full max-lg:text-start">
                        {{ service.description }}
                    </p>

                    <div ref="buttonsEl" class="flex gap-6 mt-10
                       max-md:flex-col max-md:w-full max-md:gap-4
                       max-sm:mt-8">
                        <router-link to="/quick-audit" class="w-full sm:w-auto">
                            <Button variant="outline" :size="isSmall ? 'small' : 'medium'"
                                class="w-full sm:w-auto max-md:w-full">
                                Book a 15-min call
                            </Button>
                        </router-link>

                        <Button variant="primary" :size="isSmall ? 'small' : 'medium'"
                            href="mailto:klyk.studio@gmail.com" target="_blank"
                            class="text-[var(--color-bg-body)]! max-md:w-full">
                            <span class="text-[var(--color-bg-body)]">Let's Connect</span>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    </section>

    <!-- RELATED  -->
    <section ref="relatedEl" id="related-services" :class="sectionPad" class="py-24 mb-40 flex flex-col gap-10
               max-md:py-16 max-md:mb-28 max-md:gap-8
               max-sm:py-14 max-sm:mb-0">
        <div class="flex flex-col items-center pb-16 max-md:pb-12 max-sm:pb-10">
            <h3 class="w-1/2 text-5xl font-display font-medium text-center
                   max-lg:w-3/4
                   max-md:w-11/12 max-md:text-4xl
                   max-sm:text-2xl">
                Are you looking for something else?
            </h3>

            <p class="mt-6 w-1/2 text-center opacity-80
                   max-lg:w-3/4
                   max-md:w-11/12
                   max-sm:text-sm">
                Here are some other solutions you might find useful.
            </p>
        </div>

        <div class="flex flex-wrap justify-center gap-8
                 max-md:flex-col max-md:flex-nowrap max-md:items-stretch max-md:w-full
                 max-sm:gap-6">
            <ServicesCard v-for="s in relatedServices" :key="`service-${s.id}`" :service="s" class="max-md:w-full" />
        </div>

        <div class="flex flex-col items-center pt-20 max-md:pt-14 max-sm:pt-10">
            <h4 class="text-3xl text-center max-md:text-2xl max-sm:text-xl">
                Or take a look at these
            </h4>
        </div>

        <div class="w-full">
            <div class="w-3/5 mx-auto flex flex-row justify-center gap-8
                   max-lg:w-3/4
                   max-md:w-11/12 max-md:flex-col max-md:items-center
                   max-sm:w-full max-sm:gap-6">
                <OtherServices v-for="os in relatedOtherServices" :key="`other-${os.id}`" :service="os" />
            </div>
        </div>
    </section>

    <Footer />

</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch, nextTick } from "vue";
import { useRoute } from "vue-router";
import gsap from "gsap";

import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
import Button from "../components/Button.vue";
import ServicesCard from "../components/ServicesCard.vue";
import OtherServices from "../components/OtherServices.vue";

import { services, otherServices } from "../data/services.js";

const route = useRoute();

/* padding laterale identico a RELATED */
const sectionPad = "px-[112px] max-md:px-[80px] max-sm:px-[40px]";

/* data */
const service = computed(() => services.find((p) => p.slug === route.params.slug) || null);

const relatedServices = computed(() => {
    const currentSlug = service.value?.slug;
    return services.filter((p) => p.slug !== currentSlug).slice(0, 3);
});

const relatedOtherServices = computed(() => otherServices.slice(0, 2));

/* breakpoint coerente con max-sm (640px) */
const isSmall = ref(false);
let mql;

function syncViewportFlag() {
    isSmall.value = !!mql?.matches;
}

/* refs */
const heroEl = ref(null);
const badgesEl = ref(null);
const dividerEl = ref(null);
const ctaEl = ref(null);
const imageEl = ref(null);
const textCtaEl = ref(null);
const buttonsEl = ref(null);
const relatedEl = ref(null);

let tl;

async function runAnimations() {
    if (!service.value) return;
    await nextTick();

    if (tl) tl.kill();
    tl = gsap.timeline({ defaults: { duration: 0.6, ease: "power2.out" } });

    const steps = [
        heroEl.value,
        badgesEl.value,
        dividerEl.value,
        ctaEl.value,
        imageEl.value,
        textCtaEl.value,
        buttonsEl.value,
        relatedEl.value,
    ].filter(Boolean);

    tl.from(steps, { opacity: 0, y: 18, stagger: 0.08, clearProps: "all" });
}

onMounted(() => {
    mql = window.matchMedia("(max-width: 640px)");
    syncViewportFlag();

    if (mql.addEventListener) mql.addEventListener("change", syncViewportFlag);
    else mql.addListener(syncViewportFlag);

    runAnimations();
});

watch(() => route.params.slug, () => {
    runAnimations();
});

onBeforeUnmount(() => {
    if (tl) tl.kill();
    if (!mql) return;
    if (mql.removeEventListener) mql.removeEventListener("change", syncViewportFlag);
    else mql.removeListener(syncViewportFlag);
});
</script>
