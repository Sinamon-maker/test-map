<script setup lang="ts">
import { useAppStore } from '@/stores/app';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const appStore = useAppStore();
defineEmits(['centerOnMarker']);
</script>
<template>
  <h3 class="text-h5">{{ t('map.marker') }}</h3>
  <!-- List of markers -->
  <v-list style="background-color: transparent">
    <v-list-item
      v-for="marker in appStore.markers"
      :key="marker.id"
      :class="{
        'selected-marker': appStore.selectedMarker?.id === marker.id,
      }"
      @click="() => $emit('centerOnMarker', marker)"
    >
      <v-list-item-title>{{ marker.id }}</v-list-item-title>
      <v-list-item-subtitle>{{ marker.address }}</v-list-item-subtitle>
    </v-list-item>
  </v-list>
</template>

<style scoped>
::v-deep(.selected-marker) {
  background-color: #f0f0f0 !important;
}
</style>
