import 'vexip-ui/css/index.css';
import { createApp } from 'vue';
import { install } from 'vexip-ui';
// import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue';
import router from './route';

const app = createApp(App);
app.use(router);
// app.use(ElementPlus);
app.use(install);
app.mount('#app');
