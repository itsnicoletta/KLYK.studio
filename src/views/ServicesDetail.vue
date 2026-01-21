<template>
    <Navbar />

    <main class="min-h-screen">
        <section class="flex flex-col items-center justify-center text-center
                 min-h-[60vh] max-w-4xl mx-auto px-6 py-20
                 sm:py-12 sm:px-4">
            <h1 class="font-display text-5xl font-medium mb-6
                     max-md:text-4xl max-sm:text-3xl">
                Service Details
            </h1>

            <p class="text-lg text-base-300 max-w-3xl
                     max-md:text-base max-sm:text-sm">
                Detailed information about the selected service will be displayed here.
            </p>
        </section>
    </main>

    <Footer />





</template>

<script setup>
    import Navbar from '../components/Navbar.vue';
    import Footer from '../components/Footer.vue';
</script>