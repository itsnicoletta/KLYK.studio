<template>
    <div class="fixed right-8 top-8 z-30 flex items-center gap-1 rounded-full border-2 border-[var(--color-text-primary)] bg-[var(--color-bg-body)] p-1 shadow-lg
        max-lg:top-auto max-lg:right-4 max-lg:bottom-4
        max-sm:right-3 max-sm:bottom-3 max-sm:p-0.5"
        role="group" aria-label="Language selector">
        <button type="button"
            class="rounded-full px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--color-text-primary)] focus:ring-offset-2 focus:ring-offset-[var(--color-bg-body)]
                max-sm:px-2.5 max-sm:py-1"
            :class="locale === 'it' ? 'bg-[var(--color-text-primary)] text-[var(--color-bg-body)]' : 'text-[var(--color-text-primary)]'"
            :aria-pressed="locale === 'it'" @click="switchLocale('it')">
            IT
        </button>
        <button type="button"
            class="rounded-full px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--color-text-primary)] focus:ring-offset-2 focus:ring-offset-[var(--color-bg-body)]
                max-sm:px-2.5 max-sm:py-1"
            :class="locale === 'en' ? 'bg-[var(--color-text-primary)] text-[var(--color-bg-body)]' : 'text-[var(--color-text-primary)]'"
            :aria-pressed="locale === 'en'" @click="switchLocale('en')">
            EN
        </button>
    </div>

    <nav ref="navbar" class="fixed z-20 left-0 right-0 mx-auto shadow-lg overflow-hidden
           border-2 border-[var(--color-text-primary)] bg-[var(--color-bg-body)]
           transition-[max-height,border-radius,padding] duration-1500 ease-in-out" :class="[
            isMobileOrTablet
                ? 'w-11/12 top-4 px-2 pt-1.5'
                : 'w-[48%] top-8 px-3 pt-2',

            isMenuAperto
                ? 'max-h-[600px] rounded-[50px]'
                : 'max-h-[72px] rounded-[60px] max-sm:max-h-[64px] max-sm:px-3'
        ]">
        <!-- HEADER -->
        <section id="navbar-chiusa" class="relative w-full flex items-center justify-between">
            <!-- left -->
            <div class="flex items-center">
                <HamburgerToggle :open="isMenuAperto" :size="isMobileOrTablet ? 48 : 50" @click="openHamburger" />
            </div>

            <!-- center -->
            <div class="absolute left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-none">
                <router-link :to="localizedPath(locale, 'home')" class="inline-flex items-center justify-center pointer-events-auto">
                    <img src="../assets/icon_navbar.svg" alt="Klyk Studio Logo" class="h-7 w-auto max-sm:h-6" />
                </router-link>
            </div>

            <!-- right -->
            <div class="flex items-center">
                <router-link :to="localizedPath(locale, 'contacts')" id="hero-cta" class="inline-flex">
                    <Button variant="primary" :size="isMobileOrTablet ? 'small' : 'medium'">
                        {{ isMobileOrTablet ? t("nav.contact") : t("nav.cta") }}
                    </Button>
                </router-link>
            </div>
        </section>

        <!-- DROPDOWN -->
        <section id="menu-dropdown" class="pt-6 transition-all duration-[700ms] ease-out" :class="isMenuAperto
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-2 pointer-events-none'">
            <ul class="flex flex-col items-center justify-center gap-8 max-sm:gap-4 h-full font-medium">
                <li
                    class="text-2xl max-sm:text-lg transition-transform duration-300 ease-in-out hover:scale-110 origin-center">
                    <router-link :to="localizedPath(locale, 'home')">{{ t("nav.home") }}</router-link>
                </li>
                <li
                    class="text-2xl max-sm:text-lg transition-transform duration-300 ease-in-out hover:scale-110 origin-center">
                    <router-link :to="localizedPath(locale, 'projects')">{{ t("nav.projects") }}</router-link>
                </li>
                <li
                    class="text-2xl max-sm:text-lg transition-transform duration-300 ease-in-out hover:scale-110 origin-center pb-10">
                    <router-link :to="localizedPath(locale, 'about')">{{ t("nav.about") }}</router-link>
                </li>
            </ul>
        </section>
    </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import Button from "./Button.vue";
import HamburgerToggle from "./HamburgerToggle.vue";
import gsap from "gsap";
import { localizedPath, useI18n } from "../i18n";

const props = defineProps({
    animate: { type: Boolean, default: false }, // ✅ anima solo quando vuoi
});

const isMenuAperto = ref(false);
function openHamburger() {
    isMenuAperto.value = !isMenuAperto.value;
}

const navbar = ref(null);
const { locale, t, switchLocale } = useI18n();

/* breakpoints (<= 1024px = mobile/tablet) */
const isMobileOrTablet = ref(false);
let mql;

function syncViewportFlag() {
    isMobileOrTablet.value = mql.matches;
}

onMounted(() => {
    mql = window.matchMedia("(max-width: 1024px)");
    syncViewportFlag();

    if (mql.addEventListener) mql.addEventListener("change", syncViewportFlag);
    else mql.addListener(syncViewportFlag);

    // ✅ anima solo se richiesto
    if (props.animate && navbar.value) {
        gsap.from(navbar.value, {
            opacity: 0,
            y: -100,
            duration: 1.2,
            ease: "power2.out",
            clearProps: "all",
        });
    }
});

onUnmounted(() => {
    if (!mql) return;
    if (mql.removeEventListener) mql.removeEventListener("change", syncViewportFlag);
    else mql.removeListener(syncViewportFlag);
});
</script>

