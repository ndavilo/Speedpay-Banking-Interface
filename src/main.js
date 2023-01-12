import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import router from './router'
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Create a new store instance.
const store = createStore({
    state() {
        return {
            customer_page: 1
        }
    },
    mutations: {
        customer_increment(state) {
            state.customer_page++
        },
        customer_decrement(state) {
            state.customer_page--
        }
    }
})

createApp(App)
    .use(router)
    .use(store)
    .mount('#app')