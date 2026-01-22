<template>
    <article class="group relative flex flex-col items-end justify-start
           w-full sm:w-[46%] lg:w-[20vw]
           h-[320px] sm:h-[360px] lg:h-[50vh]
           rounded-4xl overflow-hidden
           focus-within:ring-2 focus-within:ring-[var(--color-text-primary)] focus-within:ring-offset-4 focus-within:ring-offset-[var(--color-bg-body)]
           transition-transform duration-300 ease-out hover:-translate-y-2">
        <!-- SFONDO: immagine -->
        <div class="absolute inset-0 -z-20 bg-center bg-cover" :style="{ backgroundImage: `url(${service.image})` }"
            aria-hidden="true"></div>

        <div class="absolute inset-0 -z-10
             bg-black/55
             transition-opacity duration-700 ease-in-out
             group-hover:opacity-70" aria-hidden="true"></div>

        <div class="absolute inset-0 -z-10
             opacity-60 group-hover:opacity-80
             transition-opacity duration-700 ease-in-out
             bg-gradient-to-bl from-white/0 to-black/70" aria-hidden="true"></div>

        <router-link :to="serviceUrl" class="relative z-10 block w-full h-full">
            <div class="flex flex-row items-end justify-between h-full p-6 gap-4">
                <div class="flex flex-col gap-4 max-w-[75%]">
                    <h4 class="font-display text-3xl font-regular text-[var(--color-text-primary)] max-md:text-3xl">
                        {{ service.title }}
                    </h4>

                    <p class="break-words max-md:text-lg text-base-300">
                        {{ service.subtitle }}
                    </p>

                    <ul v-if="service.bullets?.length" class="hidden md:flex flex-col gap-2 text-base text-base-300">
                        <li v-for="(b, i) in service.bullets" :key="i" class="flex items-start gap-2">
                            <span class="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--color-text-primary)] shrink-0"></span>
                            <span class="leading-relaxed">{{ b }}</span>
                        </li>
                    </ul>
                </div>

                <div id="accordion" class="bg-[var(--color-text-primary)] rounded-full p-4
                 transition-transform duration-300 ease-out
                 group-hover:translate-x-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6 text-[var(--color-bg-body)]
                   transition-transform duration-300 ease-out
                   group-hover:translate-x-0.5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                </div>
            </div>
        </router-link>
    </article>
</template>

<script setup>
import { computed } from "vue";

const { service } = defineProps({
    service: { type: Object, required: true },
});

const serviceUrl = computed(() => `/services/${service.slug}`);
</script>
