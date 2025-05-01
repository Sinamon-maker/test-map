import { API_KEY } from './constants';

export const useAddressApi = () => {
  const getAddress = async (lat: number, lon: number) => {
    const url = `https://geocode.maps.co/reverse?lat=${lat}&lon=${lon}&api_key=${API_KEY}`;
    try {
      const response = await fetch(url);

      if (!response.ok) {
        console.log('RESP', response);
        throw new Error('Не удалось получить адрес');
      }

      const data = await response.json();

      if (data?.display_name) {
        console.log('Response', data?.display_name);
        return { data: data?.display_name };
      } else {
        throw new Error('Адрес не найден');
      }
    } catch (error) {
      return { error: 'Не удается создать канал' };
    }
  };

  return {
    getAddress,
  };
};
