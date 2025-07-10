<script setup>
import { ref, onMounted } from 'vue'
import { strapi } from '@/plugins/strapi'

const projects = ref([])

onMounted(async () => {
  const { data } = await strapi.get('/projects?populate=image')
  projects.value = data.data.map(item => {
    const { id, attributes } = item
    return {
      id,
      ...attributes,
      imageUrl: attributes.image.data.attributes.url
    }
  })
})
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-8">
    <div v-for="p in projects" :key="p.id" class="border rounded overflow-hidden">
      <img :src="p.imageUrl" class="w-full h-48 object-cover"/>
      <div class="p-4">
        <h3 class="text-xl font-bold">{{ p.title }}</h3>
        <p class="text-gray-600">{{ p.description }}</p>
        <router-link :to="`/projects/${p.slug}`" class="text-blue-600">Vedi dettagli →</router-link>
      </div>
    </div>
  </div>
</template>