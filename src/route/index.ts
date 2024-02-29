/* eslint-disable */
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import HomePage from '../pages/HomePage.vue'
import LoginPage from '../pages/LoginPage.vue'
import RegisterPage from '../pages/RegisterPage.vue'
import SharePage from '../pages/home/SharePage.vue'
import MyActivityPage from '../pages/home/MyActivityPage.vue'
import PlaygroundPage from '../pages/home/PlaygroundPage.vue'
import SpacePage from '../pages/home/SpacePage.vue'
import GuidePage from '../pages/home/myActivity/GuidePage.vue'
import ActivityHomePage from '../pages/home/myActivity/ActivityHomePage.vue'
import AdminPage from '../pages/home/AdminPage.vue'
// import CreateActivity from '../pages/home/adminPage/CreateActivity.vue'
import ActivityList from '../pages/home/adminPage/ActivityList.vue'

// 二级路由不要用懒加载，否则跳转会有错
const Routes=[
    { 
        path: '/',
        redirect: '/home',
    },
    {
        path: '/home',
        name: 'home',
        redirect:"/home/playground",
        component: HomePage,
        children: [
            {
                path: '/home/playground',
                name: 'playground',
                // redirect:"/home/playground",
                // component: ()=> import('../pages/home/PlaygroundPage.vue')
                component: PlaygroundPage,
            },
            {
                path: '/home/myActivity',
                name: 'myActivity',
                redirect:"/home/myActivity/guide",
                component: MyActivityPage,
                children: [
                    {
                        path: '/home/myActivity/guide',
                        name: 'guide',
                        // component: ()=> import('../pages/home/MyActivityPage.vue'),
                        component: GuidePage,
                    },
                    {
                        path: '/home/myActivity/activityHome/:activityId',
                        name: 'activityHome',
                        // component: ()=> import('../pages/home/MyActivityPage.vue'),
                        component: ActivityHomePage,
                    },
                ]
            },
            {
                path: '/home/space',
                name: 'space',
                // component: ()=> import('../pages/home/SpacePage.vue')
                component: SpacePage,
            },
            {
                path: '/home/admin',
                name: 'admin',
                redirect:"/home/admin/activityList",
                component: AdminPage,
                children: [
                    // {
                    //     path: '/home/admin/createActivity',
                    //     name: 'createActivity',
                    //     // component: ()=> import('../pages/home/MyActivityPage.vue'),
                    //     component: CreateActivity,
                    // },
                    {
                        path: '/home/admin/activityList',
                        name: 'activityList',
                        // component: ()=> import('../pages/home/MyActivityPage.vue'),
                        component: ActivityList,
                    },
                ]
            },
            {
                path: '/home/share',
                name: 'share',
                component: SharePage,
            },
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: LoginPage,
    },
    {
        path: '/register',
        name: 'register',
        component: RegisterPage,
    },
    
];

const router = createRouter({
    // #### 生产环境下 ####
    history: createWebHistory(process.env.BASE_URL),
    // #### 开发环境下 ####
    // history: createWebHashHistory(process.env.BASE_URL),
    // routes: routes
    routes: Routes
});

export default router;

