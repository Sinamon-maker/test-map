import { type Marker } from '../types/types';

export const useMarkersApi = () => {
  const getMarkers = () => {
    return new Promise((resolve) => {
      const res = localStorage.getItem('MARKERS');
      try {
        resolve(res ? JSON.parse(res) : []);
      } catch (e) {
        console.error('Failed to parse MARKERS from localStorage', e);
        resolve([]);
      }
    });
  };

  const addMarker = (marker: Omit<Marker, 'id'>): Promise<Marker> => {
    return new Promise((resolve) => {
      const res = localStorage.getItem('MARKERS');
      let markers = [];

      try {
        markers = res ? JSON.parse(res) : [];
      } catch (e) {
        console.error('Failed to parse existing markers', e);
      }
      const newMarker = { ...marker, id: `Маркер №${markers.length + 1}` };
      markers.push(newMarker);
      localStorage.setItem('MARKERS', JSON.stringify(markers));

      resolve(newMarker);
    });
  };

  return {
    getMarkers,
    addMarker,
  };
};
