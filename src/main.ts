import Vue from "vue";
import "@/common/utils/vue-function";
import "@/assets/styles";
import Bus from "@/common/bus";
import Timer from "@/common/timer";
import Screen from "@/assets/styles/screen";
import Antd from "ant-design-vue";
import router from "./router";
import store from "./store";
import directives from "@/common/directive";
import "echarts";
import ECharts from "vue-echarts";
import VueAwesomeSwiper from "vue-awesome-swiper";
import { VueAxios } from "@/common/utils/axios";
import dayjs from "dayjs";

require("dayjs/locale/zh-cn");
dayjs.locale("zh-cn");

import * as echarts from "echarts";
import * as VuePropertyDecorator from "vue-property-decorator";
import * as LodashEs from "lodash-es";
// 导入样式
import Style from "@/assets/styles";
new Style();
// Vue.config.silent = true;
Vue.config.productionTip = false;
Vue.use(directives);
Vue.use(Bus);
Vue.use(VueAxios);
Vue.use(Antd);
Vue.use(Timer);
Vue.component("g-ECharts", ECharts);
Vue.use(VueAxios);
Vue.use(VueAwesomeSwiper);

if (!(<any>window).echarts) (<any>window).echarts = echarts;
if (!(<any>window).Vue) (<any>window).Vue = Vue;
if (!(<any>window).VuePropertyDecorator) (<any>window).VuePropertyDecorator = VuePropertyDecorator;
if (!(<any>window).VueAwesomeSwiper) (<any>window).VueAwesomeSwiper = VueAwesomeSwiper;
if (!(<any>window).Antd) (<any>window).Antd = Antd;
if (!(<any>window).LodashEs) (<any>window).LodashEs = LodashEs;

new Vue({
    router,
    store,
    mounted() {
        Vue.prototype.$screen = new Screen();
    },
    template: "<div id='app'><router-view /></div>"
}).$mount("#app");
