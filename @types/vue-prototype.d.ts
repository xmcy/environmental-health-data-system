import { AxiosInstance } from "axios";
import dayjs from "dayjs";

declare module "vue/types/vue" {
    interface Vue {
        $bus: {
            $on(event: string | any[], fn: (...arg: any[]) => void, vm: any);
            $off(event: string | any[], fn: any, vm: any);
            $once(event: string | any[], fn: (...arg0: any) => void, vm: any);
            $emit(event: string | number, ...arg: any[]);
        };
        service: AxiosInstance;
        $axios: AxiosInstance;
        $dayjs: dayjs;
        $screen: any;
        getCmp: Function;
        $popup: {
            open(info: { id: string; [index: string]: any }, para?: any, paraStr?: string): any;
            close: Function;
        };
        $timer: {
            setTimeout(vm: any, name: string, cb: Function, timeout: number | undefined): any;
            setInterval(vm: any, name: string, cb: Function, timeout: number | undefined): any;
            clearTimeout(vm: any, name: string): any;
            clearInterval(vm: any, name: string): any;
        };
    }
}
