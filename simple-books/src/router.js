import {createRouter,createWebHistory} from 'vue-router';
import SignUp from './components/SignUp.vue';
import Login from './components/Login.vue';
import Dashboard from './components/Dashboard.vue';


const routes = [
    {path:'/',name : 'Login',component : Login},
    {path:'/signup' , name:'SignUp',component:SignUp},
    {path:'/dashboard',name:'Dashboard',component:Dashboard,meta:{requiresAuth:true}},
];

const router = createRouter({
    history:createWebHistory(),
    routes
});

router.beforeEach((to,from,next) => {
    if(to.meta.requiresAuth){
        const token = localStorage.getItem('token');
        if(!token){
            alert('Unauthorized access , Please login');
            return next({name:'Login'});
        }
    }
    next();
})

export default router;