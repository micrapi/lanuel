<template>
  <div class="app">
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
    id: 'lanuel',
    class: computed(() => {
      const classes = ['layout-' + (route.meta.layout || 'default')]

      if (route.name) {
        classes.push(route.name.toString())
      }

      return classes.join(' ')
    }),
  },
})
</script>
