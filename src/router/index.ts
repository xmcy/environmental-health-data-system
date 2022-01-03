import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

// 多次点击同一路由报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location: any) {
    return (<any>originalPush.call(this, location)).catch((err: any) => err);
};

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: "/",
        name: "app",
        redirect: "/global",
        children: [
            {
                path: "/global",
                name: "global",
                component: () => import(/* webpackChunkName: "home" */ "@/views/app/global")
            },
            {
                path: "/country",
                name: "country",
                component: () => import(/* webpackChunkName: "home" */ "@/views/app/country")
            },
            {
                path: "/disease",
                name: "disease",
                component: () => import(/* webpackChunkName: "home" */ "@/views/app/disease")
            },
            {
                path: "/psychology",
                name: "psychology",
                component: () => import(/* webpackChunkName: "home" */ "@/views/app/psychology")
            }
        ],
        component: () => import("@/views/app")
    },
    {
        name: "login",
        path: "/login",
        component: () => import(/* webpackChunkName: "login" */ "@/views/login")
    },
    {
        name: "404",
        path: "/404",
        alias: "*",
        component: () => import(/* webpackChunkName: "404" */ "@/views/404")
    }
];

const router = new VueRouter({
    routes
});

export default router;
