import { createApp } from 'vue'
import App from './App.vue';
import router from './router';
import './style.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';


const app = createApp(App);

const toastOptions = {
    position : 'bottom-right',
    timeout : 3000,
    closeOnClick:true,
    pauseOnHover : true,
    draggable : true,
}

app.use(Toast,toastOptions);
app.use(router);

app.mount('#app')
