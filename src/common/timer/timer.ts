import { isEmpty } from "lodash-es";

export default class Timer {
    private intervalTimers: any;
    private outTimers: any;

    constructor() {
        this.intervalTimers = {};
        this.outTimers = {};
    }

    clearInterval(vm: { _uid: any }, name?: string) {
        // console.log(vm, this.intervalTimers);
        if (name) {
            if (this.intervalTimers[vm._uid]?.[name]) {
                clearInterval(this.intervalTimers[vm._uid]?.[name]);
                delete this.intervalTimers[vm._uid]?.[name];
            }
        } else {
            let times = this.intervalTimers[vm._uid];
            if (!times) return;
            Object.keys(times).forEach((item: string) => {
                clearInterval(times[item]);
                delete times[item];
            });
        }
    }

    setInterval(vm: { _uid: string | number }, name: string, cb: Function, timeout: number | undefined) {
        if (!this.intervalTimers || !vm || !name) return null;
        if (!this.intervalTimers[vm._uid]) this.intervalTimers[vm._uid] = {};
        if (this.intervalTimers[vm._uid]?.[name]) this.clearInterval(vm, name);
        this.intervalTimers[vm._uid][name] = setInterval(cb, timeout);
    }

    clearTimeout(vm: { _uid: any }, name?: string) {
        // console.log(vm, this.outTimers);
        if (name) {
            if (this.outTimers[vm._uid]?.[name]) {
                clearTimeout(this.outTimers[vm._uid]?.[name]);
                delete this.outTimers[vm._uid]?.[name];
            }
        } else {
            let times = this.outTimers[vm._uid];
            if (!times) return;
            Object.keys(times).forEach((item: string) => {
                clearTimeout(times[item]);
                delete times[item];
            });
        }
    }

    setTimeout(vm: { _uid: string | number }, name: string, cb: Function, timeout: number | undefined) {
        if (!this.outTimers || !vm || !name) return null;
        if (!this.outTimers[vm._uid]) this.outTimers[vm._uid] = {};
        if (this.outTimers[vm._uid]?.[name]) this.clearTimeout(vm, name);
        this.outTimers[vm._uid][name] = setTimeout(cb, timeout);
    }

    clear(vm: { _uid: any }) {
        if (!isEmpty(this.intervalTimers) && !isEmpty(this.intervalTimers[vm._uid])) this.clearInterval(vm);
        if (!isEmpty(this.outTimers) && !isEmpty(this.outTimers[vm._uid])) this.clearTimeout(vm);
    }
}
