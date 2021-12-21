import Bus from "./bus";
let installed = false;

export default function(Vue: any) {
    if (installed) return;
    installed = true;
    Vue.prototype.$bus = new Bus();
    Vue.mixin({
        beforeDestroy() {
            this.$bus.$clear(this);
        }
    });
}
