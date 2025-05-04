/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import vuetify from './vuetify';
import pinia from '../stores';
import router from '../router';

// Types
import type { App } from 'vue';

import i18n from '../i18n';

const supportedLocales = ['en', 'ru'];
const defaultLocale = 'en';

router.beforeEach((to, from, next) => {
  const locale = to.params?.locale as string | undefined;

  if (locale && supportedLocales.includes(locale)) {
    if (i18n.global.locale.value !== locale) {
      i18n.global.locale.value = locale;
    }
    next();
  } else {
    next(`/${defaultLocale}${to.fullPath}`);
  }
});

export function registerPlugins(app: App) {
  app.use(vuetify).use(router).use(pinia);
}
