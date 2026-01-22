<template>
    <Navbar />

    <main class="w-full mt-20 max-sm:mt-0 flex items-center justify-center px-6 pt-28 pb-24 lg:px-40">
        <section class="w-full max-w-4xl flex flex-col items-center justify-center text-center gap-8">
            <header class="flex flex-col items-center gap-4">
                <h1 class="font-display font-semibold leading-tight text-4xl max-sm:text-2xl">
                    Get in touch <br />with KLYK.studio
                </h1>

                <p class="text-base sm:text-lg text-base-300 leading-relaxed max-w-2xl">
                    We’re always excited to hear about new projects and collaborations. Whether you have a specific idea
                    in mind
                    or just want to explore possibilities, feel free to reach out!
                </p>
            </header>

            <div class="w-full rounded-4xl border border-[var(--color-body-primary)] bg-black/20 p-5 sm:p-7 lg:p-10">
                <form name="contact" method="POST" data-netlify="true" data-netlify-honeypot="bot-field"
                    @submit.prevent="submitContact" class="flex flex-col gap-4 sm:gap-5">
                    <!-- Required by Netlify -->
                    <input type="hidden" name="form-name" value="contact" />

                    <input type="text" name="bot-field" class="hidden" />
                    <!-- Honeypot -->
                    <input v-model="form.botField" type="text" name="bot-field" class="hidden" tabindex="-1"
                        autocomplete="off" />

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                        <div class="flex flex-col gap-2">
                            <label class="text-sm font-medium text-start">Name</label>
                            <input v-model.trim="form.name" name="name" type="text" required placeholder="Your name"
                                class="w-full rounded-2xl border border-[var(--color-body-primary)]
                       bg-black/10 px-4 py-3 text-sm sm:text-base
                       focus:outline-none focus:ring-2 focus:ring-[var(--color-text-primary)]" />
                        </div>

                        <div class="flex flex-col gap-2">
                            <label class="text-sm font-medium text-start">Email</label>
                            <input v-model.trim="form.email" name="email" type="email" required
                                placeholder="you@email.com" class="w-full rounded-2xl border border-[var(--color-body-primary)]
                       bg-black/10 px-4 py-3 text-sm sm:text-base
                       focus:outline-none focus:ring-2 focus:ring-[var(--color-text-primary)]" />
                        </div>
                    </div>

                    <div class="flex flex-col gap-2">
                        <label class="text-sm font-medium text-start">Message</label>
                        <textarea v-model.trim="form.message" name="message" rows="5" required
                            placeholder="What are you trying to achieve? Any links or context?" class="w-full rounded-2xl border border-[var(--color-body-primary)]
                     bg-black/10 px-4 py-3 text-sm sm:text-base
                     focus:outline-none focus:ring-2 focus:ring-[var(--color-text-primary)]" />
                    </div>

                    <div class="pt-1 flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center">
                        <Button variant="primary" size="large" type="submit" :disabled="submitting"
                            class="max-sm:w-full">
                            {{ submitting ? 'Sending…' : 'Send message' }}
                        </Button>

                        <p class="text-sm opacity-75">
                            No spam. I’ll only use this to reply.
                        </p>
                    </div>

                    <p v-if="submitOk" class="text-sm sm:text-base opacity-90">
                        Received — thank you. I’ll reply soon.
                    </p>
                    <p v-if="submitError" class="text-sm sm:text-base opacity-90">
                        Error sending. Please try again.
                    </p>
                </form>
            </div>

            <div class="flex flex-col gap-4 w-full sm:w-auto my-10 ">
                <h2>You can contact us in other ways</h2>
                <div class="flex gap-6 max-sm:flex-col">
                    <router-link to="/quick-audit" id="hero-cta" ref="heroCtaEl" class="w-full sm:w-auto">
                        <Button variant="outline" :size="isMobileOrTablet ? 'medium' : 'large'"
                            class="w-full sm:w-auto">
                            Book a 15 min call
                        </Button>
                    </router-link>
                    <a href="mailto:klyk.studio@gmail.com" class="w-full sm:w-auto">
                        <Button variant="primary" :size="isMobileOrTablet ? 'medium' : 'large'"
                            class="w-full sm:w-auto">
                            Contact via Email
                        </Button>
                    </a>
                </div>
            </div>
        </section>
    </main>
    <Footer />
</template>
<script setup>
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import Button from '../components/Button.vue'
import { ref } from 'vue'
const isMobileOrTablet = ref(window.innerWidth <= 768)
window.addEventListener('resize', () => {
    isMobileOrTablet.value = window.innerWidth <= 768
})

const submitting = ref(false)
const submitOk = ref(false)
const submitError = ref(false)

const form = ref({
    botField: '',
    name: '',
    email: '',
    message: ''
})

function encode(data) {
    return new URLSearchParams(data).toString()
}

async function submitContact() {
    submitOk.value = false
    submitError.value = false
    submitting.value = true

    try {
        const payload = {
            'form-name': 'contact',
            'bot-field': form.value.botField,
            name: form.value.name,
            email: form.value.email,
            message: form.value.message
        }

        const res = await fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: encode(payload)
        })

        if (!res.ok) throw new Error('Submit failed')

        submitOk.value = true
        // opzionale: reset campi
        form.value.name = ''
        form.value.email = ''
        form.value.message = ''
    } catch (e) {
        submitError.value = true
    } finally {
        submitting.value = false
    }
}

</script>