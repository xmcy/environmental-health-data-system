import Timer from "./timer";
let installed = false;

export default function(Vue: any) {
    if (installed) return;
    installed = true;
    Vue.prototype.$timer = new Timer();
    Vue.mixin({
        beforeDestroy() {
            this.$timer.clear(this);
        }
    });
}
