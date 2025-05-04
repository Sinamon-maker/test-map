<script setup lang="ts">
import { useAppStore } from '@/stores/app';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const appStore = useAppStore();
const emit = defineEmits(['centerOnMarker']);
</script>

<template>
  <v-select
    v-model="appStore.selectedMarker"
    :items="appStore.markers"
    item-title="address"
    item-value="id"
    :label="`${t('map.placeholder')}`"
    return-object
    @update:modelValue="(marker) => emit('centerOnMarker', marker)"
  />
</template>
