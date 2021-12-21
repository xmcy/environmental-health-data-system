const install = (Vue: any) => {
    Vue.prototype.$bus = new Vue();
};

export default { install };
