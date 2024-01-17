import { createApp } from 'vue';

import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import './assets/style/main.scss';
import '@jsonforms/vue-vanilla/vanilla.css';
import { createMetaManager } from 'vue-meta';

const app = createApp(App);

app.use(router);
app.use(vuetify);
app.use(createMetaManager());

app.mount('#app');
