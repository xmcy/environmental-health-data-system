import { DirectiveOptions } from "vue";

const clickOutside: DirectiveOptions = {
    bind(el: any, binding: any, vnode: any) {
        function documentHandler(e: any) {
            if (el.contains(e.target)) {
                return false;
            }
            if (binding.expression) {
                binding.value(e);
            }
        }
        el.__vueClickOutside__ = documentHandler;
        document.addEventListener("click", documentHandler);
    },
    unbind(el: any, binding: any) {
        document.removeEventListener("click", el.__vueClickOutside__);
        delete el.__vueClickOutside__;
    }
};

export default clickOutside;
