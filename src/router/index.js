import { createRouter, createWebHashHistory} from 'vue-router';



const routes=[
    {
        name:'home',
        path:'/',
        meta:{
            title:'home'
        },
        component:()=> import('@/layout/Home.vue'),
        redirct:'/welcome',
        children:[
            {
                name:'welcome',
                path:'/welcome',
                meta:{
                    title:'welcome'
                },
                component:()=> import('@/views/Welcome.vue'),
            },
            {
                name:'user',
                path:'/system//user',
                meta:{
                    title:'User management'
                },
                component:()=> import('@/views/User.vue'),
            },
            {
                name:'menu',
                path:'/system/menu',
                meta:{
                    title:'Menu management'
                },
                component:()=> import('@/views/Menu.vue'),
            },
        ]
    },
    {
        name:'login',
        path:'/login',
        meta:{
            title:'登录'
        },
        component:()=> import('../views/Login.vue'),
        children:[]
        // redirct:'/home'
    }
];

const router=createRouter({
    history:createWebHashHistory(),
    routes
});

export default router;