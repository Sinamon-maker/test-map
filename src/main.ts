/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue';

// Composables
import { createApp } from 'vue';
import i18n from '../src/i18n/index';

// Plugins
import { registerPlugins } from '@/plugins';

// Styles
import 'unfonts.css';
console.log('Current locale main:', i18n.global);
const app = createApp(App);
app.use(i18n);
registerPlugins(app);

app.mount('#app');
