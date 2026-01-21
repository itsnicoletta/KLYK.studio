<template>
    <nav ref="navbar" class="fixed z-10 left-0 right-0 mx-auto p-4 pt-3 shadow-lg overflow-hidden border-2
           border-[var(--color-text-primary)] bg-[var(--color-bg-body)]
           transition-[max-height,border-radius,padding] duration-1500 ease-in-out" :class="[
            isMobileOrTablet ? 'w-11/12 top-4 p-2' : 'w-3/5 top-10 p-4',
            isMenuAperto ? 'max-h-[580px] rounded-[50px]' : 'max-h-[84px] rounded-[75px]'
        ]">
        <!-- HEADER: flex, logo centrato “reale” con absolute -->
        <section id="navbar-chiusa" class="relative w-full flex flex-row justify-between items-center">
            <!-- left -->
            <div class="flex items-center">
                <HamburgerToggle :open="isMenuAperto" :size="56" @click="openHamburger" />
            </div>

            <!-- center (indipendente da left/right) -->
            <div class="absolute left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-none">
                <router-link to="/" class="inline-flex items-center justify-center pointer-events-auto">
                    <img src="../assets/icon_navbar.svg" alt="Klyk Studio Logo" class="h-8 w-auto" />
                </router-link>
            </div>

            <!-- right -->
            <div class="flex items-center">
                <router-link to="/about" id="hero-cta" class="inline-flex">
                    <Button variant="primary" :size="isMobileOrTablet ? 'small' : 'medium'">
                        {{ isMobileOrTablet ? 'Touch' : 'Get in touch' }}
                    </Button>
                </router-link>
            </div>
        </section>

        <!-- DROPDOWN -->
        <section id="menu-dropdown" class="pt-6 transition-all duration-[700ms] ease-out" :class="isMenuAperto
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-2 pointer-events-none'">
            <ul class="flex flex-col justify-center items-center gap-8 h-full font-medium">
                <li class="text-2xl transition-transform duration-300 ease-in-out hover:scale-110 origin-center">
                    <router-link to="/">Home</router-link>
                </li>
                <li class="text-2xl transition-transform duration-300 ease-in-out hover:scale-110 origin-center">
                    <router-link to="/projects">Projects</router-link>
                </li>
                <li class="text-2xl transition-transform duration-300 ease-in-out hover:scale-110 origin-center">
                    <router-link to="/about">About</router-link>
                </li>
            </ul>
        </section>
    </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Button from './Button.vue'
import HamburgerToggle from './HamburgerToggle.vue'
import gsap from 'gsap'

const isMenuAperto = ref(false)
function openHamburger() {
    isMenuAperto.value = !isMenuAperto.value
}

const navbar = ref(null)

// <= 1024px = mobile/tablet
const isMobileOrTablet = ref(false)
let mql

function syncViewportFlag() {
    isMobileOrTablet.value = mql.matches
}

onMounted(() => {
    mql = window.matchMedia('(max-width: 1024px)')
    syncViewportFlag()

    if (mql.addEventListener) mql.addEventListener('change', syncViewportFlag)
    else mql.addListener(syncViewportFlag)

    gsap.from(navbar.value, {
        opacity: 0,
        y: -100,
        duration: 1.2,
        ease: 'power2.out',
    })
})

onUnmounted(() => {
    if (!mql) return
    if (mql.removeEventListener) mql.removeEventListener('change', syncViewportFlag)
    else mql.removeListener(syncViewportFlag)
})
</script>
