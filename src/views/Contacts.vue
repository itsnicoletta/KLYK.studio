<template>
    <Navbar />

    <main class="w-full flex items-center justify-center
           px-6 pt-28 pb-24 mt-20
           max-lg:px-24
           max-md:px-12 max-md:pt-24 max-md:pb-20
           max-sm:px-6 max-sm:pt-22 max-sm:pb-16 max-sm:mt-0">
        <section class="w-full max-w-4xl flex flex-col items-center justify-center text-center gap-8">
            <header ref="headerEl" class="flex flex-col items-center gap-4">
                <h1 class="font-display font-semibold leading-tight text-4xl max-sm:text-2xl">
                    Get in touch <br />with KLYK.studio
                </h1>

                <p class="text-lg text-base-300 leading-relaxed max-w-2xl max-md:text-base">
                    We’re always excited to hear about new projects and collaborations. Whether you have a specific idea
                    in mind
                    or just want to explore possibilities, feel free to reach out!
                </p>
            </header>

            <div ref="formCardEl" class="w-full rounded-4xl border border-[var(--color-body-primary)] bg-black/20
               p-10
               max-md:p-7
               max-sm:p-5">
                <form name="contact" method="POST" data-netlify="true" data-netlify-honeypot="bot-field"
                    @submit.prevent="submitContact" class="flex flex-col gap-5 max-sm:gap-4">
                    <!-- Required by Netlify -->
                    <input type="hidden" name="form-name" value="contact" />

                    <!-- Honeypot -->
                    <input type="text" name="bot-field" class="hidden" />
                    <input v-model="form.botField" type="text" name="bot-field" class="hidden" tabindex="-1"
                        autocomplete="off" />

                    <div class="grid grid-cols-2 gap-5 max-md:grid-cols-1 max-md:gap-4">
                        <div class="flex flex-col gap-2">
                            <label class="text-sm font-medium text-start">Name</label>
                            <input v-model.trim="form.name" name="name" type="text" required placeholder="Your name"
                                class="w-full rounded-2xl border border-[var(--color-body-primary)]
                       bg-black/10 px-4 py-3 text-base
                       max-sm:text-sm
                       focus:outline-none focus:ring-2 focus:ring-[var(--color-text-primary)]" />
                        </div>

                        <div class="flex flex-col gap-2">
                            <label class="text-sm font-medium text-start">Email</label>
                            <input v-model.trim="form.email" name="email" type="email" required
                                placeholder="you@email.com" class="w-full rounded-2xl border border-[var(--color-body-primary)]
                       bg-black/10 px-4 py-3 text-base
                       max-sm:text-sm
                       focus:outline-none focus:ring-2 focus:ring-[var(--color-text-primary)]" />
                        </div>
                    </div>

                    <div class="flex flex-col gap-2">
                        <label class="text-sm font-medium text-start">Message</label>
                        <textarea v-model.trim="form.message" name="message" rows="5" required
                            placeholder="What are you trying to achieve? Any links or context?" class="w-full rounded-2xl border border-[var(--color-body-primary)]
                     bg-black/10 px-4 py-3 text-base
                     max-sm:text-sm
                     focus:outline-none focus:ring-2 focus:ring-[var(--color-text-primary)]" />
                    </div>

                    <div class="pt-1 flex items-center gap-4 max-sm:flex-col max-sm:items-start max-sm:gap-3">
                        <Button variant="primary" :size="isMobileOrTablet ? 'medium' : 'large'" type="submit"
                            :disabled="submitting" class="max-sm:w-full">
                            {{ submitting ? "Sending…" : "Send message" }}
                        </Button>

                        <p class="text-sm opacity-75">
                            No spam. I’ll only use this to reply.
                        </p>
                    </div>

                    <p v-if="submitOk" ref="okEl" class="text-base opacity-90 max-sm:text-sm">
                        Received — thank you. I’ll reply soon.
                    </p>

                    <p v-if="submitError" ref="errEl" class="text-base opacity-90 max-sm:text-sm">
                        Error sending. Please try again.
                    </p>
                </form>
            </div>

            <div ref="otherWaysEl" class="w-full flex flex-col gap-4 my-10 max-sm:my-8">
                <h2 class="text-xl max-sm:text-lg">You can contact us in other ways</h2>

                <div class="flex gap-6 justify-center max-sm:flex-col">
                    <router-link to="/quick-audit" class="w-auto max-sm:w-full">
                        <Button variant="outline" :size="isMobileOrTablet ? 'medium' : 'large'"
                            class="w-auto max-sm:w-full">
                            Book a 15 min call
                        </Button>
                    </router-link>

                    <a href="mailto:klyk.studio@gmail.com" class="w-auto max-sm:w-full">
                        <Button variant="primary" :size="isMobileOrTablet ? 'medium' : 'large'"
                            class="w-auto max-sm:w-full">
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
import { ref, onMounted, onBeforeUnmount, nextTick, watch } from "vue";
import gsap from "gsap";

import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
import Button from "../components/Button.vue";

/* -------------------------------------------------------------------------- */
/* Responsive flag (max-md ~ 768)                                              */
/* -------------------------------------------------------------------------- */
const isMobileOrTablet = ref(false);
let mql;

function syncViewportFlag() {
    isMobileOrTablet.value = !!mql?.matches;
}

/* -------------------------------------------------------------------------- */
/* Form state                                                                  */
/* -------------------------------------------------------------------------- */
const submitting = ref(false);
const submitOk = ref(false);
const submitError = ref(false);

const form = ref({
    botField: "",
    name: "",
    email: "",
    message: "",
});

function encode(data) {
    return new URLSearchParams(data).toString();
}

async function submitContact() {
    submitOk.value = false;
    submitError.value = false;
    submitting.value = true;

    try {
        const payload = {
            "form-name": "contact",
            "bot-field": form.value.botField,
            name: form.value.name,
            email: form.value.email,
            message: form.value.message,
        };

        const res = await fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: encode(payload),
        });

        if (!res.ok) throw new Error("Submit failed");

        submitOk.value = true;
        form.value.name = "";
        form.value.email = "";
        form.value.message = "";
    } catch (e) {
        submitError.value = true;
    } finally {
        submitting.value = false;
    }
}

/* -------------------------------------------------------------------------- */
/* GSAP refs + simple animations                                               */
/* -------------------------------------------------------------------------- */
const headerEl = ref(null);
const formCardEl = ref(null);
const otherWaysEl = ref(null);
const okEl = ref(null);
const errEl = ref(null);

onMounted(async () => {
    // matchMedia
    mql = window.matchMedia("(max-width: 768px)");
    syncViewportFlag();
    if (mql.addEventListener) mql.addEventListener("change", syncViewportFlag);
    else mql.addListener(syncViewportFlag);

    await nextTick();

    // simple entry animations
    gsap.from(headerEl.value, { opacity: 0, y: 24, duration: 0.9, ease: "power2.out" });
    gsap.from(formCardEl.value, { opacity: 0, y: 28, duration: 0.9, ease: "power2.out", delay: 0.15 });
    gsap.from(otherWaysEl.value, { opacity: 0, y: 22, duration: 0.9, ease: "power2.out", delay: 0.3 });
});

onBeforeUnmount(() => {
    if (!mql) return;
    if (mql.removeEventListener) mql.removeEventListener("change", syncViewportFlag);
    else mql.removeListener(syncViewportFlag);
});

// animate feedback messages
watch(submitOk, (v) => {
    if (!v) return;
    requestAnimationFrame(() => {
        if (!okEl.value) return;
        gsap.fromTo(okEl.value, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" });
    });
});

watch(submitError, (v) => {
    if (!v) return;
    requestAnimationFrame(() => {
        if (!errEl.value) return;
        gsap.fromTo(errEl.value, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" });
    });
});
</script>
