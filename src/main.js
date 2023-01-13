import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './store/store';


createApp(App)
    .use(router)
    .use(store)
    .mount('#app')
