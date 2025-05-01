<script setup lang="ts">
import { useAppStore } from '@/stores/app';

const appStore = useAppStore();
const emit = defineEmits(['centerOnMarker']);
</script>

<template>
  <v-select
    v-model="appStore.selectedMarker"
    :items="appStore.markers"
    item-title="address"
    item-value="id"
    label="Выберите маркер"
    return-object
    @update:modelValue="(marker) => emit('centerOnMarker', marker)"
  />
</template>
