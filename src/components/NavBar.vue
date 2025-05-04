<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import Switcher from './Switcher.vue';

const { locale, t } = useI18n();
</script>
<template>
  <nav>
    <v-toolbar color="light-blue lighten-3" dark title="SquareGPS">
      <v-toolbar-items class="d-flex align-center ml-6 ml-6">
        <router-link class="v-btn" exact :to="{ path: `/${locale}/` }">{{
          t('link.home')
        }}</router-link>
        <router-link class="v-btn ml-6" :to="{ path: `/${locale}/map` }">{{
          t('link.map')
        }}</router-link>
      </v-toolbar-items>
      <v-spacer />
      <Switcher />
    </v-toolbar>
  </nav>
</template>
<style scoped>
.v-btn {
  color: blue;
}
.router-link-exact-active {
  color: #3b39ba;
  border-radius: 4px;
}
</style>
