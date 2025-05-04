<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();
import { useRouter, useRoute } from 'vue-router';
import { watch } from 'vue';

const router = useRouter();
const route = useRoute();

watch(locale, (newLocale) => {
  const segments = route.path.split('/');
  segments[1] = newLocale;
  const newPath = segments.join('/') || '/';

  router.push(newPath);
});

// Supported locales
const locales = [
  { value: 'en', label: 'English' },
  { value: 'ru', label: 'Русский' },
];
</script>
<template>
  <v-select
    v-model="locale"
    :items="locales"
    item-title="label"
    item-value="value"
    variant="underlined"
    class="language-switcher"
    hide-details
    dense
  />
</template>

<style scoped>
.language-switcher {
  max-width: 70px;
}
</style>
