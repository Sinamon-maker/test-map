<script setup lang="ts">
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
</script>
<template>
  <h1 class="my-6 text-center">{{ t('home.title') }}</h1>

  <v-container>
    <p>
      Необходимо с помощью
      <strong>Vuejs, Vuex, VueRouter, Vuetify</strong> написать приложение.
      Хэдер приложения должен содержать меню из 2-х пунктов:
      <strong>О задании</strong> и <strong>Карта.</strong>
      В основной части приложения должно отображаться содержимое разделов.
    </p>
    <h2 class="mt-6 mb-4">Раздел “О задании”</h2>
    <p>В разделе должен быть текст этого задания, сверстанный аналогично.</p>
    <h2 class="mt-6 mb-4">Раздел “Карта”</h2>
    <p>На экране должны быть карта и список (см. пример):</p>
    <v-list dense>
      <v-list-item>
        <v-list-item-title>
          1. При клике на кнопку добавления, карта должна перейти в режим
          добавления маркера:
        </v-list-item-title>
        <v-list-item-subtitle class="text-body-2 mt-1">
          В месте клика должен появится маркер, а в списке — запись с адресом
          точки.
        </v-list-item-subtitle>

        <v-list class="mt-2" dense>
          <v-list-item>
            <v-list-item-title class="text-body-2">
              a. Для поиска адреса можно использовать любое бесплатное API для
              геокодирования, например:
              <a href="https://geocode.maps.co/" target="_blank"
                >https://geocode.maps.co/</a
              >
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title class="text-body-2">
              b. В случае, если адрес не найден, необходимо вывести ошибку и не
              добавлять маркер в список.
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-list-item>

      <v-divider class="my-2" />

      <v-list-item>
        <v-list-item-title>
          2. При клике на маркер должна подсвечиваться запись в списке.
        </v-list-item-title>
      </v-list-item>

      <v-list-item>
        <v-list-item-title>
          3. При клике на запись в списке карта должна центрироваться на
          маркере.
        </v-list-item-title>
      </v-list-item>

      <v-list-item>
        <v-list-item-title>
          4. Маркеры должны храниться локально и не пропадать после перезагрузки
          страницы.
        </v-list-item-title>
      </v-list-item>

      <v-list-item>
        <v-list-item-title>
          5. В адресной строке должен отображаться id выбранного маркера.
        </v-list-item-title>
      </v-list-item>
    </v-list>
    <p class="my-6">
      Локальное хранение данных должно быть организовано в виде сервиса,
      эмулирующего бекенд. (Необходим класс Backend, который псевдо-асинхронно
      сохраняет данные в localStorage)
    </p>
    <h3 class="mt-4 mb-2">Дополнительно:</h3>
    <v-list>
      <v-list-item>
        <v-list-item-title>
          1. Продумать отображение на мобильных устройствах.
        </v-list-item-title>
      </v-list-item>
      <v-list-item>
        <v-list-item-title> 2. Предусмотреть локализацию. </v-list-item-title>
      </v-list-item>
      <v-list-item>
        <v-list-item-title>
          3. Необходимо с помощью <strong>jest</strong> написть 1 модульный тест
          на любой компонент.
        </v-list-item-title>
      </v-list-item>
    </v-list>
    <p>
      <strong>Напоминание:</strong> тестовое задание призвано показать умение
      писать хороший модульный код, а также умение пользоваться указанными
      технологиями и не только. Этим кодом нужно гордиться.
    </p>
    <p class="my-6"><strong>Пример:</strong></p>
    <v-img
      class="mx-auto"
      alt="Example image"
      aspect-ratio="16/9"
      max-width="60%"
      src="../assets/example.png"
    />
  </v-container>
</template>
<style scoped>
.v-list-item-title {
  white-space: normal;
  word-wrap: break-word;
  overflow: visible;
}
</style>
