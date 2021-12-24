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
        redirect: "/country",
        children: [
            {
                path: "/country",
                name: "country",
                component: () => import(/* webpackChunkName: "home" */ "@/views/app/country")
            }
        ],
        component: () => import("@/views/app")
    },
    {
        path: "/",
        name: "disease",
        redirect: "/login",
        children: [
            {
                path: "/disease",
                name: "disease",
                component: () => import(/* webpackChunkName: "home" */ "@/views/app/disease")
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
// const routes: Array<RouteConfig> = [
//     {
//         path: "/",
//         name: "app",
//         redirect: "/home",
//         component: () => import("@/views/app"),
//         children: [
//             {
//                 path: "/home",
//                 name: "home",
//                 meta: {
//                     title: "模板中心"
//                 },
//                 component: () => import(/* webpackChunkName: "home" */ "@/views/app/home")
//             },
//             {
//                 path: "/screen",
//                 name: "screen",
//                 meta: {
//                     title: "我的大屏"
//                 },
//                 component: () => import(/* webpackChunkName: "screen" */ "@/views/app/screen")
//             },
//             {
//                 path: "/modal",
//                 name: "modal",
//                 meta: {
//                     title: "我的模板"
//                 },
//                 component: () => import(/* webpackChunkName: "modal" */ "@/views/app/modal")
//             },
//             {
//                 path: "/project",
//                 name: "project",
//                 meta: {
//                     title: "我的项目"
//                 },
//                 component: () => import(/* webpackChunkName: "project" */ "@/views/app/project")
//             },
//             {
//                 path: "/icons",
//                 name: "icons",
//                 meta: {
//                     title: "素材广场"
//                 },
//                 component: () => import(/* webpackChunkName: "icons" */ "@/views/app/icons")
//             },
//             {
//                 path: "/themes",
//                 name: "themes",
//                 meta: {
//                     title: "主题管理"
//                 },
//                 component: () => import(/* webpackChunkName: "themes" */ "@/views/app/themes")
//             },
//             {
//                 path: "/management",
//                 name: "management",
//                 meta: {
//                     title: "大屏管理"
//                 },
//                 component: () => import(/* webpackChunkName: "management" */ "@/views/app/management")
//             },
//             {
//                 name: "component",
//                 path: "/component",
//                 meta: {
//                     title: "组件管理"
//                 },
//                 redirect: "/component/manage",
//                 component: { render: r => r("router-view") },
//                 children: [
//                     {
//                         path: "/component/manage",
//                         name: "componentManage",
//                         meta: {
//                             title: "组件管理"
//                         },
//                         component: () => import(/* webpackChunkName: "componentManage" */ "@/views/app/component")
//                     },
//                     {
//                         path: "/component/detail",
//                         name: "componentDetail",
//                         meta: {
//                             title: "组件详情"
//                         },
//                         component: () => import(/* webpackChunkName: "componentDetail" */ "@/views/app/component/detail")
//                     }
//                 ]
//             },
//             {
//                 path: "/userinfo",
//                 name: "userinfo",
//                 meta: {
//                     title: "个人中心"
//                 },
//                 component: () => import(/* webpackChunkName: "userinfo" */ "@/views/app/userinfo")
//             },
//             {
//                 path: "/userinfoRemake",
//                 name: "userinfoRemake",
//                 meta: {
//                     title: "个人中心重构"
//                 },
//                 component: () => import(/* webpackChunkName: "userinfo" */ "@/views/app/userinfoRemake")
//             },
//             {
//                 name: "viewlist",
//                 path: "/viewlist",
//                 meta: {
//                     title: "预览列表"
//                 },
//                 component: () => import(/* webpackChunkName: "viewlist" */ "@/views/app/view-list")
//             }
//             // {
//             //     path: "doc",
//             //     name: "doc",
//             //     meta: {
//             //         title: "帮助中心"
//             //     },
//             //     component: () => import(/* webpackChunkName: "doc" */ "@/views/app/doc")
//             // }
//         ]
//     },
//     {
//         path: "/component",
//         name: "component",
//         redirect: "/component/list",
//         component: { render: r => r("router-view") },
//         children: [
//             {
//                 path: "/component/list",
//                 name: "list",
//                 meta: {
//                     title: "组件列表"
//                 },
//                 component: () => import(/* webpackChunkName: "componentlist" */ "@/views/component/list")
//             },
//             {
//                 path: "/component/upload",
//                 name: "upload",
//                 meta: {
//                     title: "组件发布"
//                 },
//                 component: () => import(/* webpackChunkName: "componentupload" */ "@/views/component/upload")
//             },
//             {
//                 path: "/component/renew",
//                 name: "renew",
//                 meta: {
//                     title: "分享更新"
//                 },
//                 component: () => import(/* webpackChunkName: "componentrenew" */ "@/views/component/renew")
//             }
//         ]
//     },
//     {
//         name: "view",
//         path: "/view",
//         meta: {
//             title: "预览"
//         },
//         component: () => import(/* webpackChunkName: "view" */ "@/views/view")
//     },
//     {
//         name: "create",
//         path: "/create",
//         meta: {
//             title: "新建"
//         },
//         component: () => import(/* webpackChunkName: "create" */ "@/views/create")
//     },
//     {
//         name: "hook",
//         path: "/hook",
//         meta: {
//             title: "渲染"
//         },
//         component: () => import(/* webpackChunkName: "hook" */ "@/views/hook")
//     },
//     {
//         name: "develop",
//         path: "/develop",
//         meta: {
//             title: "组件开发"
//         },
//         component: () => import(/* webpackChunkName: "develop" */ "@/views/develop")
//     },
//     {
//         name: "help",
//         path: "/help",
//         component: () => import(/* webpackChunkName: "login" */ "@/views/app/help")
//     },
//     {
//         name: "create-project",
//         path: "/create-project",
//         redirect: "/create-project/basic",
//         component: () => import(/* webpackChunkName: "create-project" */ "@/views/create-project"),
//         children: [
//             {
//                 name: "basic",
//                 path: "/create-project/basic",
//                 meta: {
//                     title: "基础"
//                 },
//                 component: () => import(/* webpackChunkName: "project-basic" */ "@/views/create-project/basic")
//             },
//             {
//                 name: "theme",
//                 path: "/create-project/theme",
//                 meta: {
//                     title: "主题"
//                 },
//                 component: () => import(/* webpackChunkName: "project-theme" */ "@/views/create-project/theme")
//             },
//             {
//                 name: "pager",
//                 path: "/create-project/pager",
//                 meta: {
//                     title: "页面"
//                 },
//                 component: () => import(/* webpackChunkName: "project-pager" */ "@/views/create-project/pager")
//             },
//             {
//                 name: "map",
//                 path: "/create-project/map",
//                 meta: {
//                     title: "地图"
//                 },
//                 component: () => import(/* webpackChunkName: "project-map" */ "@/views/create-project/map")
//             },
//             {
//                 name: "nav",
//                 path: "/create-project/nav",
//                 meta: {
//                     title: "导航"
//                 },
//                 component: () => import(/* webpackChunkName: "project-nav" */ "@/views/create-project/nav")
//             }
//         ]
//     },
//     {
//         name: "login",
//         path: "/login",
//         component: () => import(/* webpackChunkName: "login" */ "@/views/login")
//     },
//     {
//         name: "404",
//         path: "/404",
//         alias: "*",
//         component: () => import(/* webpackChunkName: "404" */ "@/views/404")
//     }
// ];

const router = new VueRouter({
    routes
});

export default router;
