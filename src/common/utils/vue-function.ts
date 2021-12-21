import Vue from "vue";

function getComponent(item: any, code?: string) {
    let curcode = code || item?.base?.code || item?.code;
    let configs: any = {};
    if (curcode) {
        let curComponent: any = Vue.component(curcode);
        if (curComponent) configs = curComponent?.getConfigs(item.style);
    }
    return configs;
}

function getComponentInstance(this: any, id: string) {
    let instance = this;
    let curInstance = null;
    for (const item of instance.$children) {
        if (item) {
            curInstance = null;
            if (item.$el?.id && item.$el.id === id) {
                curInstance = item;
                break;
            } else {
                const res = item.getInstance(id);
                if (res) {
                    curInstance = res;
                    break;
                }
            }
        }
    }

    if (curInstance) return curInstance;
}

Vue.prototype.getCmp = getComponent;
Vue.prototype.getInstance = getComponentInstance;
