import { Vue, Component } from "vue-property-decorator";
import { debounce } from "lodash-es";
@Component
export default class Emitter extends Vue {
    dispatch(componentName: string, eventName: string, params: any) {
        let parent = this.$parent || this.$root;
        let name = parent.$options.name;

        while (parent && (!name || name !== componentName)) {
            parent = parent.$parent;

            if (parent) {
                name = parent.$options.name;
            }
        }
        if (parent) {
            parent.$emit.apply(parent, [eventName, params]);
        }
    }

    broadcast(componentName: string, eventName: string, params: any = []) {
        this.$children.forEach((child: any) => {
            const name = child.$options.name;

            if (name === componentName) {
                child.$emit.apply(child, [eventName, params]);
            }
        });
    }

    onDebounceEmit = debounce(function(this: any, method: string, data: any) {
        this.$emit(method, data);
    }, 300);
}
