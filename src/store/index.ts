import Vue from "vue";
import Vuex from "vuex";
import task from "./modules/task";
const modules = {
    task
};
Vue.use(Vuex);

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: modules
});
