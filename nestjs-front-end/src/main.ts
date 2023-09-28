/** @format */

import { createApp } from 'vue';
import App from './App.vue';
import { setupStore } from './store';
import { setupRouter } from './router';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function bootstrap() {
  const app = createApp(App);

  setupRouter(app);

  setupStore(app);
  app.mount('#app');
}

bootstrap();
