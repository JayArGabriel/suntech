<template>
  <metainfo>
    <template #title="{ content }">{{ content ? `${content} | ${routeName} | Suntech` : `${routeName} | Suntech` }}</template>
  </metainfo>
  <v-app id="main-app">
    <router-view/>
  </v-app>
</template>

<script lang="ts" setup>
  import { computed, watchEffect } from 'vue';
  import { useRoute } from 'vue-router';
  import { useMeta } from 'vue-meta';

  // Special Data
  const vueMeta = useMeta({ title: '', htmlAttrs: { lang: 'en', amp: true } });
  const route = useRoute();

  // Computed
  const routeName = computed(() => (String(route?.name || '').split(/\s|-/ig).map((data) => (`${data.slice(0, 1).toUpperCase()}${data.slice(1).toLowerCase()}`)).toString().replace(/,/ig, ' ')));

  // Watch
  watchEffect(() => {
    vueMeta.meta.title = route?.hash
  }, { flush: 'post' });
</script>

<style lang="scss" scoped></style>