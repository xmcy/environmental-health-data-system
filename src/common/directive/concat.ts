import { DirectiveOptions } from "vue";
import { getPicUrl, getObjSrc } from "@/common/utils/function";

const concat: DirectiveOptions = {
    bind: (el, binding, vNode) => {
        if (el instanceof HTMLImageElement) {
            el.src = typeof binding.value === "string" ? getPicUrl(binding.value) : getObjSrc(binding.value);
        } else {
            console.error("v-concat智能使用在image标签上!");
        }
    },
    update: (el, binding, vnode) => {
        if (el instanceof HTMLImageElement) {
            if (typeof binding.value === "string") {
                if (binding.oldValue !== binding.value) el.src = getPicUrl(binding.value);
            } else {
                if (binding.oldValue?.value !== binding.value?.value) el.src = getObjSrc(binding.value);
            }
        } else {
            console.error("v-concat智能使用在image标签上!");
        }
    }
};

export default concat;
