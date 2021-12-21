import axios, { AxiosRequestConfig } from "axios";
import { message } from "ant-design-vue";
import router from "@/router";

const webSetting = (<any>window).webSetting;

const request = axios.create({
    baseURL: webSetting?.serviceUrl,
    timeout: webSetting?.timeout
});

// 异常拦截处理器
const errorHandler = (error: any) => {
    if (error.response) {
        const data = error.response.data;
        // if (error.response.status === 401) {
        //     router.push({ name: "login" });
        // }

        if (error.response.status === 403) {
            message.error("Forbidden");
        }
    }
    return Promise.reject(error);
};

request.interceptors.response.use(res => {
    let data = res.data;
    let url = res.config.url;
    let msg: string;
    if (!data) {
        msg = `接口${url}-结果异常`;
        message.warn(msg);
        console.warn(msg);
        return null;
    }

    if (data.hasError) {
        msg = `请求${url}服务出错: ${data.message}`;
        message.warn(msg);
        console.error(msg);
        return null;
    }

    return res.data;
}, errorHandler);

const installer: any = {
    vm: {},
    install(Vue: any) {
        if (this.installed) {
            return;
        }
        this.installed = true;

        if (!request) {
            console.error("You have to install axios");
            return;
        }

        Vue.axios = request;

        Object.defineProperties(Vue.prototype, {
            service: {
                get: function get() {
                    return request;
                }
            }
        });
    }
};

export default request;
export { installer as VueAxios, request as axios };
