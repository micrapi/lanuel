<template>
  <div id="container">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
const route = useRoute()

useHead({
  titleTemplate: title => title ? `${title} - ${config.appName}` : config.appName,
  bodyAttrs: {
    id: 'larnuxele',
    class: computed(() => {
      return route.name.toString() + ' layout-' + (route.meta.layout || 'default')
    }),
  },
})
</script>
