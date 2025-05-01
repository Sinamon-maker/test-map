// Utilities
import type { Marker } from '@/types/types';
import { defineStore } from 'pinia';

type AppStore = {
  markers: Marker[];
  selectedMarker: Marker | null;
  userLocation: { lat: number; lng: number };
  isInitialized: boolean;
  map: L.Map | null;
};

export const useAppStore = defineStore('app', {
  state: (): AppStore => {
    return {
      map: null,
      markers: [],
      selectedMarker: null,
      userLocation: { lat: 40.7128, lng: -74.006 },
      isInitialized: false,
    };
  },
  actions: {
    setMarkers(markers: Marker[]) {
      this.markers = markers;
    },
    selectMarker(marker: Marker | null) {
      this.selectedMarker = marker;
    },
    setUserLocation(lat: number, lng: number) {
      this.userLocation = { lat, lng };
    },
    setMap(map: L.Map) {
      this.map = map;
    },
    setInitialized(value: boolean) {
      this.isInitialized = value;
    },
  },
});
