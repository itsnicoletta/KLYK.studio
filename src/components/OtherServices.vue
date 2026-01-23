<template>
    <div class="flex flex-col items-center justify-center p-4 max-sm:p-0 w-full h-full">
        <router-link :to="{ name: 'OtherServicesDetails', params: { slug: props.service.slug } }">
            <div class="bg-white shadow-md rounded-4xl p-10 max-sm:p-6  h-auto">

                <h5 class="font-display text-2xl font-medium text-[var(--color-bg-body)]  ">{{ props.service.title }}</h5>
                <p class="mt-4 text-base text-neutral-800">{{ props.service.description }}</p>

            </div>
        </router-link>
    </div>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
    service: {
        type: Object,
        required: true,
    },
});
const serviceUrl = computed(() => `/services/${props.service.slug}`);

</script>
