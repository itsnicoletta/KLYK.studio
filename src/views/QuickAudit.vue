<template>
    <Navbar />
    <ShaderTop />

    <!-- Desktop-first, solo max-* per override -->
    <main class="mt-30 px-[112px] py-20
           max-lg:mt-24 max-lg:px-[80px] max-lg:py-16
           max-sm:mt-16 max-sm:px-[24px] max-sm:py-12">
        <!-- HERO -->
        <section class="flex flex-col items-center justify-center my-32 max-sm:my-8 max-sm:mb-16">
            <div ref="heroEl" class="max-w-3xl w-full flex flex-col items-center gap-6 max-sm:gap-4">
                <h1 class="text-center text-5xl font-display font-medium leading-tight max-sm:text-3xl">
                    Get a quick audit in 10-15 minutes
                </h1>

                <h2 class="text-center text-lg opacity-85 max-sm:text-base">
                    This helps us understand your needs quickly.
                </h2>

                <Button variant="primary" size="large" @click="scrollToBooking" class="max-sm:w-full">
                    Book your slot
                </Button>
            </div>
        </section>

        <!-- TRUST CARDS -->
        <section
            class="flex flex-col w-full mx-auto items-center justify-center gap-10 mb-32 max-lg:mb-24 max-sm:mb-16">
            <div class="w-full max-w-5xl">
                <div ref="trustCardsEl" class="grid grid-cols-3 gap-6 max-sm:grid-cols-1 max-sm:gap-4">
                    <div class="rounded-3xl border border-[var(--color-body-primary)] bg-black/20 p-6 max-sm:p-5">
                        <h3 class="font-medium text-lg max-sm:text-base">What you’ll get</h3>
                        <ul class="mt-3 space-y-2 text-base opacity-85 max-sm:text-sm">
                            <li>Short video audit (10-15 min).</li>
                            <li>5 prioritized suggestions.</li>
                            <li>Guidance for your project.</li>
                            <li>Actionable next steps.</li>
                        </ul>
                    </div>

                    <div class="rounded-3xl border border-[var(--color-body-primary)] bg-black/20 p-6 max-sm:p-5">
                        <h3 class="font-medium text-lg max-sm:text-base">This is for you if</h3>
                        <ul class="mt-3 space-y-2 text-base opacity-85 max-sm:text-sm">
                            <li>You want quick clarity on what to do first.</li>
                            <li>You care about conversions and results.</li>
                        </ul>
                    </div>

                    <div class="rounded-3xl border border-[var(--color-body-primary)] bg-black/20 p-6 max-sm:p-5">
                        <h3 class="font-medium text-lg max-sm:text-base">Not for you if</h3>
                        <ul class="mt-3 space-y-2 text-base opacity-85 max-sm:text-sm">
                            <li>You want a full redesign immediately.</li>
                            <li>You’re not planning to implement changes.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        <!-- BOOKING -->
        <section ref="bookingSectionEl" class="flex flex-col gap-6 w-full mx-auto my-32 items-center justify-center
             max-sm:gap-4 max-sm:my-24">
            <div ref="bookingHeaderEl" class="max-w-3xl text-center">
                <h2 class="font-display font-medium text-3xl max-sm:text-2xl">
                    Book your quick audit
                </h2>
                <p class="mt-2 text-base opacity-80 max-sm:text-sm">
                    Choose a slot. After booking, the intake form appears below.
                </p>
            </div>

            <!-- Calendly card -->
            <div ref="calendlyWrapEl" class="flex items-center justify-center w-3/5 max-sm:w-full">
                <div ref="calendlyHostEl" class="w-full h-auto"
                    :style="{ minWidth: '320px', height: calendlyHeight }" />
            </div>

            <p class="text-base opacity-70 text-center max-w-3xl max-sm:text-sm">
                Tip: after confirming the booking, scroll down to complete the intake form.
            </p>
        </section>

        <!-- FORM (after booking) -->
        <section v-if="showIntakeForm" id="intake-form" ref="intakeSectionEl" class="w-full">
            <div class="mx-auto w-full max-w-3xl rounded-4xl border border-[var(--color-body-primary)] bg-black/20 p-10
               max-sm:p-5">
                <h3 class="font-display font-medium text-2xl max-sm:text-xl">
                    Quick intake form
                </h3>
                <p class="mt-2 text-base opacity-80 max-sm:text-sm">
                    This helps me tailor the audit.
                </p>

                <form class="mt-7 flex flex-col gap-5 max-sm:mt-6 max-sm:gap-4" name="quick-audit-intake" method="POST"
                    data-netlify="true" data-netlify-honeypot="bot-field" @submit.prevent="submitIntake">
                    <!-- Netlify honeypot -->
                    <input v-model="form.botField" type="text" name="bot-field" class="hidden" tabindex="-1"
                        autocomplete="off" />
                    <input type="hidden" name="form-name" value="quick-audit-intake" />

                    <!-- ... i tuoi altri campi ... -->

                    <div class="grid grid-cols-2 gap-5 max-md:grid-cols-1 max-sm:gap-4">
                        <div class="flex flex-col gap-2">
                            <label class="text-sm font-medium">Name</label>
                            <input v-model.trim="form.name" name="name" type="text" required placeholder="Your name"
                                class="w-full rounded-2xl border border-[var(--color-body-primary)]
                       bg-black/10 px-4 py-3 text-base
                       focus:outline-none focus:ring-2 focus:ring-[var(--color-text-primary)]
                       max-sm:text-sm" />
                        </div>

                        <div class="flex flex-col gap-2">
                            <label class="text-sm font-medium">Email</label>
                            <input v-model.trim="form.email" name="email" type="email" required
                                placeholder="you@email.com" class="w-full rounded-2xl border border-[var(--color-body-primary)]
                       bg-black/10 px-4 py-3 text-base
                       focus:outline-none focus:ring-2 focus:ring-[var(--color-text-primary)]
                       max-sm:text-sm" />
                        </div>

                        <div class="flex flex-col gap-2">
                            <label class="text-sm font-medium">What do you need?</label>
                            <select v-model="form.objective" name="objective" required class="w-full rounded-2xl border border-[var(--color-body-primary)]
                       bg-black/10 px-4 py-3 text-base
                       focus:outline-none focus:ring-2 focus:ring-[var(--color-text-primary)]
                       max-sm:text-sm">
                                <option class="bg-stone-700 text-[var(--color-text-primary)]" value="" disabled>Select
                                    one</option>
                                <option class="bg-stone-700 text-[var(--color-text-primary)]" value="landing_page">
                                    Landing page</option>
                                <option class="bg-stone-700 text-[var(--color-text-primary)]" value="branding">Branding
                                </option>
                                <option class="bg-stone-700 text-[var(--color-text-primary)]" value="portfolio">
                                    Portfolio</option>
                                <option class="bg-stone-700 text-[var(--color-text-primary)]"
                                    value="immersive_experience">Immersive experience</option>
                                <option class="bg-stone-700 text-[var(--color-text-primary)]" value="others">Others
                                </option>
                            </select>
                        </div>

                        <div class="flex flex-col gap-2">
                            <label class="text-sm font-medium">Budget</label>
                            <select v-model="form.budget" name="budget" required class="w-full rounded-2xl border border-[var(--color-body-primary)]
                       bg-black/10 px-4 py-3 text-base
                       focus:outline-none focus:ring-2 focus:ring-[var(--color-text-primary)]
                       max-sm:text-sm">
                                <option value="" disabled>Select one</option>
                                <option class="bg-stone-700 text-[var(--color-text-primary)]" value="under_500">Under
                                    €500</option>
                                <option class="bg-stone-700 text-[var(--color-text-primary)]" value="500_1500">
                                    €500/€1,500</option>
                                <option class="bg-stone-700 text-[var(--color-text-primary)]" value="1500_5000">
                                    €1,500/€5,000</option>
                                <option class="bg-stone-700 text-[var(--color-text-primary)]" value="5000_plus">€5,000+
                                </option>
                            </select>
                        </div>
                    </div>

                    <div class="flex flex-col gap-2">
                        <label class="text-sm font-medium">Timeline</label>
                        <select v-model="form.timeline" name="timeline" required class="w-full rounded-2xl border border-[var(--color-body-primary)]
                     bg-black/10 px-4 py-3 text-base
                     focus:outline-none focus:ring-2 focus:ring-[var(--color-text-primary)]
                     max-sm:text-sm">
                            <option class="bg-stone-700 text-[var(--color-text-primary)]" value="" disabled>Select one
                            </option>
                            <option class="bg-stone-700 text-[var(--color-text-primary)]" value="2_4_weeks">2-4 weeks
                            </option>
                            <option class="bg-stone-700 text-[var(--color-text-primary)]" value="1_2_months">1-2 months
                            </option>
                            <option class="bg-stone-700 text-[var(--color-text-primary)]" value="3_plus_months">3+
                                months</option>
                            <option class="bg-stone-700 text-[var(--color-text-primary)]" value="not_sure">Not sure yet
                            </option>
                        </select>
                    </div>

                    <div class="flex flex-col gap-2">
                        <label class="text-sm font-medium">Notes (optional)</label>
                        <textarea v-model.trim="form.notes" name="notes" rows="4"
                            placeholder="Any context, links, or constraints?" class="w-full rounded-2xl border border-[var(--color-body-primary)]
                     bg-black/10 px-4 py-3 text-base
                     focus:outline-none focus:ring-2 focus:ring-[var(--color-text-primary)]
                     max-sm:text-sm" />
                    </div>

                    <input type="hidden" name="calendly_event_uri" :value="booking.eventUri" />
                    <input type="hidden" name="calendly_invitee_uri" :value="booking.inviteeUri" />

                    <div class="pt-2 flex flex-row gap-4 items-center max-sm:flex-col max-sm:items-start max-sm:gap-3">
                        <Button variant="primary" size="large" type="submit" :disabled="submitting"
                            class="max-sm:w-full">
                            {{ submitting ? 'Sending…' : 'Send' }}
                        </Button>

                        <p class="text-sm opacity-75">
                            No spam. I’ll only use this to prepare your audit and give you valuable feedback.
                        </p>
                    </div>

                    <p v-if="submitOk" class="text-base opacity-90 max-sm:text-sm">
                        Received - thank you. See you on the call.
                    </p>
                    <p v-if="submitError" class="text-base opacity-90 max-sm:text-sm">
                        Error sending. Please try again.
                    </p>
                </form>
            </div>
        </section>
    </main>

    <ShaderBottom />
    <Footer />
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import ShaderTop from '../components/ShaderTop.vue'
import ShaderBottom from '../components/ShaderBottom.vue'
import Button from '../components/Button.vue'

const CALENDLY_URL = 'https://calendly.com/klyk-studio/quick-audit'

const bookingSectionEl = ref(null)
const calendlyHostEl = ref(null)

const heroEl = ref(null)
const trustCardsEl = ref(null)
const bookingHeaderEl = ref(null)
const calendlyWrapEl = ref(null)
const intakeSectionEl = ref(null)

const showIntakeForm = ref(false)
const submitting = ref(false)
const submitOk = ref(false)
const submitError = ref(false)

const booking = ref({ eventUri: '', inviteeUri: '' })

const form = ref({
    botField: '',
    name: '',
    email: '',
    objective: '',
    budget: '',
    timeline: '',
    notes: ''
})

const calendlyHeight = computed(() => 'clamp(720px, 80vh, 900px)')

function scrollToBooking() {
    bookingSectionEl.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

/* ---------------- Calendly embed ---------------- */
function loadCalendlyScript() {
    return new Promise((resolve, reject) => {
        const existing = document.querySelector(
            'script[src="https://assets.calendly.com/assets/external/widget.js"]'
        )
        if (existing) return resolve()

        const s = document.createElement('script')
        s.src = 'https://assets.calendly.com/assets/external/widget.js'
        s.async = true
        s.onload = resolve
        s.onerror = () => reject(new Error('Calendly script failed'))
        document.body.appendChild(s)
    })
}

function initCalendly() {
    if (!calendlyHostEl.value) return
    if (!window.Calendly?.initInlineWidget) return

    calendlyHostEl.value.innerHTML = ''
    window.Calendly.initInlineWidget({
        url: CALENDLY_URL,
        parentElement: calendlyHostEl.value
    })
}

/* ---------------- Calendly postMessage ---------------- */
function isCalendlyEvent(e) {
    return e?.origin === 'https://calendly.com' && e?.data?.event?.startsWith?.('calendly.')
}

async function onCalendlyMessage(e) {
    if (!isCalendlyEvent(e)) return

    if (e.data.event === 'calendly.event_scheduled') {
        booking.value.eventUri = e.data?.payload?.event?.uri ?? ''
        booking.value.inviteeUri = e.data?.payload?.invitee?.uri ?? ''

        showIntakeForm.value = true
        submitOk.value = false
        submitError.value = false

        await nextTick()
        document.getElementById('intake-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
}

/* ---------------- Netlify Forms submit ---------------- */
function encode(data) {
    return new URLSearchParams(data).toString()
}

async function submitIntake() {
    submitOk.value = false
    submitError.value = false

    submitting.value = true
    try {
        const payload = {
            'form-name': 'quick-audit-intake',
            'bot-field': form.value.botField,
            name: form.value.name,
            email: form.value.email,
            objective: form.value.objective,
            budget: form.value.budget,
            timeline: form.value.timeline,
            notes: form.value.notes,
            calendly_event_uri: booking.value.eventUri,
            calendly_invitee_uri: booking.value.inviteeUri
        }

        const res = await fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: encode(payload)
        })

        if (!res.ok) throw new Error('Submit failed')
        submitOk.value = true
    } catch (err) {
        submitError.value = true
    } finally {
        submitting.value = false
    }
}

/* ---------------- Simple animations ---------------- */
let ctx = null

onMounted(async () => {
    window.addEventListener('message', onCalendlyMessage)

    // Calendly
    await loadCalendlyScript()
    await nextTick()
    initCalendly()

    // Animations (respect reduced motion)
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
    if (reduceMotion) return

    ctx = gsap.context(() => {
        // HERO in
        if (heroEl.value) {
            gsap.from(heroEl.value, {
                opacity: 0,
                y: 28,
                duration: 0.9,
                ease: 'power2.out'
            })
        }

        // Trust cards stagger
        if (trustCardsEl.value?.children?.length) {
            gsap.from(trustCardsEl.value.children, {
                opacity: 0,
                y: 22,
                duration: 0.8,
                ease: 'power2.out',
                stagger: 0.12,
                scrollTrigger: {
                    trigger: trustCardsEl.value,
                    start: 'top 75%',
                    end: 'bottom 40%',
                    toggleActions: 'play none none reverse'
                }
            })
        }

        // Booking header + calendly
        if (bookingHeaderEl.value) {
            gsap.from(bookingHeaderEl.value, {
                opacity: 0,
                y: 22,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: bookingHeaderEl.value,
                    start: 'top 75%',
                    end: 'bottom 40%',
                    toggleActions: 'play none none reverse'
                }
            })
        }

        if (calendlyWrapEl.value) {
            gsap.from(calendlyWrapEl.value, {
                opacity: 0,
                y: 22,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: calendlyWrapEl.value,
                    start: 'top 75%',
                    end: 'bottom 40%',
                    toggleActions: 'play none none reverse'
                }
            })
        }
    })
})

onBeforeUnmount(() => {
    window.removeEventListener('message', onCalendlyMessage)
    ctx?.revert()
    ScrollTrigger.getAll().forEach(t => t.kill())
})


import { useHead } from "@unhead/vue";

useHead({
    title: "Quick Audit - KLYK.studio | UX/UI & Website Review",
    meta: [
        {
            name: "description",
            content:
                "Book a 15-minute Quick Audit with KLYK.studio. Get actionable feedback on your website’s UX/UI, clarity, conversion and visual consistency — fast and practical.",
        },
        { name: "robots", content: "index,follow" },

        // Open Graph
        { property: "og:title", content: "Quick Audit — KLYK.studio" },
        {
            property: "og:description",
            content:
                "A 15-minute website review with actionable UX/UI feedback on clarity, conversion and visual consistency.",
        },
        { property: "og:url", content: "https://klyk.studio/quick-audit" },
        { property: "og:type", content: "website" },

        // Twitter
        { name: "twitter:card", content: "summary_large_image" },
    ],
    link: [{ rel: "canonical", href: "https://klyk.studio/quick-audit" }],
    script: [
        {
            type: "application/ld+json",
            children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Service",
                name: "Quick Audit (15 min)",
                provider: {
                    "@type": "Organization",
                    name: "KLYK.studio",
                    url: "https://klyk.studio/",
                },
                areaServed: "Remote",
                serviceType: "Website UX/UI audit",
                url: "https://klyk.studio/quick-audit",
            }),
        },
    ],
});

</script>
