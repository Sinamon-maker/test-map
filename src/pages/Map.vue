<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useDisplay } from 'vuetify';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const { mdAndUp } = useDisplay();

import { useAddressApi } from '../api/useAddressApi';
import { useMarkersApi } from '../api/useMarkersApi';

import { useAppStore } from '@/stores/app';

const appStore = useAppStore();

import { type Marker, type Markers } from '../types/types';
import MarkerList from '@/components/MarkerList.vue';
import MobileMarkerList from '@/components/MobileMarkerList.vue';

const { getAddress } = useAddressApi();
const { addMarker, getMarkers } = useMarkersApi();

const map = ref<L.Map | null>(null);

const currentComponent = computed(() =>
  mdAndUp.value ? MarkerList : MobileMarkerList
);

onMounted(async () => {
  if (!appStore.isInitialized) {
    const markers = (await getMarkers()) as Markers;
    appStore.setMarkers(markers);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          appStore.setUserLocation(
            position.coords.latitude,
            position.coords.longitude
          );
          initMap();
        },
        (error) => {
          console.warn('Geolocation denied or failed:', error);
          initMap(); // fallback to default
        }
      );
    } else {
      console.warn('Geolocation not supported.');
      initMap(); // fallback
    }

    async function initMap() {
      console.log('I am map and initialize', appStore.selectedMarker);
      if (appStore.selectedMarker === null) {
        map.value = L.map('map').setView(
          [appStore.userLocation.lat, appStore.userLocation.lng],
          10
        );
      } else {
        map.value = L.map('map').setView(
          [appStore.selectedMarker.lat, appStore.selectedMarker.lng],
          13
        );
      }

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map.value as L.Map);

      //click on map
      map.value.on('click', async (e) => {
        const { lat, lng } = e.latlng;
        const res = await getAddress(lat, lng);
        let popupText: string;
        if (res.data) {
          popupText = res.data;

          const newMarker = await addMarker({
            address: res.data,
            lat,
            lng,
          });

          // Add to Leaflet map new Marker and click event on it

          const newLeafletMarker = L.marker([lat, lng])
            .addTo(map.value as L.Map)
            .bindPopup(`<b>${newMarker.id}</b><br>${newMarker.address}`)
            .openPopup();

          newLeafletMarker.on('click', () => {
            appStore.selectMarker(newMarker);
            newLeafletMarker.openPopup();
          });
          appStore.selectMarker(newMarker);

          centerOnMarker(newMarker);
          appStore.setMarkers([...appStore.markers, newMarker]);
        } else {
          popupText = res.error as string;
        }
        L.popup()
          .setLatLng([lat, lng])
          .setContent(`${t('map.click')}:<br> ${popupText}`)
          .openOn(map.value as L.Map);
      });

      // place markers on map and add click on each marker
      appStore.markers.forEach((marker) => {
        const leafletMarker = L.marker([marker.lat, marker.lng])
          .addTo(map.value as L.Map)
          .bindPopup(`<b>${marker.id}</b><br>${marker.address}`);

        leafletMarker.on('click', () => {
          appStore.selectMarker(marker);
          leafletMarker.openPopup();
        });
      });
    }
    appStore.setInitialized(false);
  }
});

function centerOnMarker(marker: Marker) {
  appStore.selectMarker(marker);
  if (map.value) {
    map.value.setView([marker.lat, marker.lng], 13); // 13 is zoom level
  }
}
</script>

<template>
  <v-theme-provider theme="light">
    <v-container class="py-6">
      <!-- Row for layout -->
      <v-row>
        <!-- Left column: List of markers -->
        <v-col cols="12" md="4">
          <div class="scrollable-list">
            <component
              :is="currentComponent"
              @centerOnMarker="centerOnMarker"
            />
          </div>
        </v-col>

        <!-- Right column: Map -->
        <v-col cols="12" md="8" class="pa-4">
          <div id="map" style="height: 500px"></div>
        </v-col>
      </v-row>
    </v-container>
  </v-theme-provider>
</template>
<style scoped>
.scrollable-list {
  max-height: 500px;
  overflow-y: auto;
}

@media (max-width: 960px) {
  .scrollable-list {
    max-height: none;
  }
}
</style>
