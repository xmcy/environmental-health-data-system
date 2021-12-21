export default class Bus {
    private events: any;
    private uids: any;

    constructor() {
        this.events = {};
        this.uids = {};
    }

    $on(event: string | any[], fn: (...arg: any[]) => void, vm: { _uid: string | number }) {
        if (Array.isArray(event)) {
            for (let i = 0; i < event.length; i++) {
                this.$on(event[i], fn, vm);
            }
        } else {
            this.events[event] = fn;
            if (vm) {
                if (this.uids[vm._uid]) {
                    this.uids[vm._uid].push(fn);
                } else {
                    this.uids[vm._uid] = [fn];
                }
            }
        }
    }

    $off(event: string | any[], fn: any, vm: any) {
        // 清空所有事件
        if (!arguments.length) {
            this.events = {};
            return;
        }
        if (Array.isArray(event)) {
            for (let i = 0; i < event.length; i++) {
                this.$off(event[i], fn, vm);
            }
            return;
        }

        let cb = this.events[event];
        if (!cb) return;

        if (!fn) {
            this.events[event] = null;
            return;
        }
        if (fn === cb) this.events[event] = null;
    }

    $once(event: string | any[], fn: (...arg0: any) => void, vm: { _uid: string | number }) {
        this.$on(
            event,
            (...arg) => {
                this.$off(event, fn, vm);
                fn(...arg);
            },
            vm
        );
    }

    $emit(event: string | number, ...arg: any[]) {
        let cb = this.events[event];
        if (cb) {
            if (typeof cb !== "function") console.error(`[${event}]的回调不是一个函数！`);
            cb(...arg);
        }
    }

    $clear(vm: { _uid: any }) {
        if (!vm) {
            this.events = {};
            return;
        }
        if (vm._uid) {
            let cb = this.uids[vm._uid];
            if (!cb) return;
            cb.forEach((item: any) => {
                delete this.events[item.name];
            });
        }
        delete this.uids[vm._uid];
    }
}
