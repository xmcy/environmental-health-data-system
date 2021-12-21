import { cloneDeep, forEach, forIn, get, find, isEmpty, round } from "lodash-es";
import { renderText } from "javascriptx";
import qs from "qs";
import dayjs from "dayjs";

export const getPicUrl = (value: string) => {
    if (value && !(value.indexOf("http://") === 0 || value.indexOf("https://") === 0 || value.indexOf("./static/") === 0)) {
        return (<any>window).webSetting?.serviceUrl + value;
    }
    return value;
};

export const getObjSrc = (obj: { value: string; localImg: { [index: string]: string } }) => {
    let { value, localImg } = obj || {};
    if (value && !(value.indexOf("http://") === 0 || value.indexOf("https://") === 0 || value.indexOf("./static/") === 0)) {
        if (value.indexOf("./assets/") === 0) return localImg[value];
        return (<any>window).webSetting?.serviceUrl + value;
    }
    return value;
};

export function isMapCode(item: any) {
    let curIs = false;
    let mapCodes = ["Map2d", "Map3d", "Map2D", "Map3D"];
    for (const code of mapCodes) {
        if (item?.base?.code?.includes(code)) {
            curIs = true;
            break;
        }
    }
    return curIs;
}

export function dataURItoBlob(dataURI: string) {
    let byteString = atob(dataURI.split(",")[1]);
    let mimeString = dataURI
        .split(",")[0]
        .split(":")[1]
        .split(";")[0];
    let ab = new ArrayBuffer(byteString.length);
    let ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
}

export function oneOf(value: string, validList: Array<string>) {
    return validList.includes(value);
}

export function getProp<T extends object, K extends keyof T>(obj: T, key: K) {
    return obj[key];
}

export function reduceConfig(config: Array<any>) {
    if (!Array.isArray(config)) return config;

    return config.reduce((result, item) => {
        result[item.name] = item.type ? item.value : reduceConfig(item.value);
        return result;
    }, {});
}

export function getPageConfigs(config: any) {
    if (!config) return {};
    let { screen, background } = reduceConfig(config);

    if (!screen || !background) return {};
    return {
        ...screen,
        style: {
            width: screen?.width + "px",
            height: screen?.height + "px",
            backgroundColor: background?.color,
            ...(background?.image ? { backgroundImage: `url(${getPicUrl(background?.image)})` } : {})
        }
    };
}

export function updateConfig(config: Array<any>, para: { one: string; two: string; value: any }) {
    if (!Array.isArray(config)) {
        return config;
    }
    config.forEach(item => {
        if (item.name === para.one) {
            item.value?.forEach((it: any) => {
                if (it.name === para.two) it.value = para.value;
            });
        }
    });

    return config;
}

export function getConfigItem(config: Array<any>, para: { one: string; two: string }) {
    let item;
    if (!Array.isArray(config)) return item;
    let oneData = find(config, ["name", para.one]);
    item = find(oneData?.value, ["name", para.two]);
    return item;
}

export function getParents(id: string, data: Array<any>) {
    for (const i in data) {
        if (data[i].id === id) return [data[i].id];
        if (data[i].children) {
            const result: any = getParents(id, data[i].children);
            if (result !== undefined) return result.concat(data[i].id);
        }
    }
}

export function toFixed(num: number, decimal = 1) {
    let numStr = num.toString();
    let index = numStr.indexOf(".");
    if (index !== -1) {
        numStr = numStr.substring(0, decimal + index + 1);
    } else {
        numStr = numStr.substring(0);
    }
    return Number(parseFloat(numStr).toFixed(decimal));
}

export function loadScript(param: { para: any; attr?: "defer" | "async" }) {
    return new Promise((resolve, reject) => {
        try {
            let { para, attr } = param;
            if (isEmpty(para) || !para.src || !para.code) return;
            if (document.querySelector(`#js_${para.code}`)) {
                resolve(loadScript);
                return;
            }
            let script: any = document.createElement("script");
            script.id = `js_${para.code}`;
            script.type = "text/javascript";
            if (attr) script[attr] = true;
            script.onload = () => {
                resolve(loadScript);
            };
            script.onerror = (err: any) => {
                reject(err);
            };
            script.src = para.src;
            document.head.appendChild(script);
        } catch (err) {
            reject(err);
        }
    });
}

export function loadLink(param: { para: any; as?: string; el?: Document }) {
    return new Promise((resolve, reject) => {
        try {
            let { para, rel, as, el } = { ...param, rel: "stylesheet" };
            if (isEmpty(para) || !para.src || !para.code) return;
            let curEl = el || document;
            if (curEl.querySelector(`#css_${para.code}`)) {
                resolve(loadLink);
                return;
            }
            let link = curEl.createElement("link");
            link.id = `css_${para.code}`;
            link.rel = rel;
            if (as) link.as = as;
            link.onload = () => {
                resolve(loadLink);
            };
            link.onerror = (err: any) => {
                reject(err);
            };
            link.href = para.src;
            curEl.head.appendChild(link);
        } catch (error) {
            reject(error);
        }
    });
}

export function hasApacity(str: string) {
    if (!str) {
        return false;
    }
    let aNum = str.replace(/#/, "").split("");
    let apacity = "";
    if (aNum.length !== 6 && aNum.length !== 3) apacity = str?.slice(-2);
    if (apacity === "00") return;
    return true;
}

export function getStr(str: string) {
    if (!str) return "";
    let index = str.indexOf("/file");
    if (index < 0) return "";
    return str.substring(index, str.length);
}

export function isAInB(aList: Array<string>, bList: Array<string>) {
    for (const item of aList) {
        if (!bList.includes(item)) return false;
    }
    return true;
}

export function isAOneInB(aList: Array<string>, bList: Array<string>) {
    for (const item of aList) {
        if (bList.includes(item)) return true;
    }
    return false;
}

function hexToAlpha(hex: string) {
    let decimal = parseInt(hex, 16) || 255;
    let alpha = round(decimal / 255, 2);
    return alpha;
}

export function hexToRgbA(color: string) {
    if (!color) return "";
    let c: any;
    let alpha = 1;
    if (color.includes("#")) {
        color = color.substring(0, 7);
        alpha = hexToAlpha(color.substring(7));
    }
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(color)) {
        c = color.substring(1).split("");
        if (c.length == 3) {
            c = [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c = "0x" + c.join("");
        return "rgba(" + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",") + "," + alpha + ")";
    } else return color;
}

export function getLegendPosition(val: string) {
    let position = { left: "auto", top: "auto", right: "auto", bottom: "auto" };
    if (val?.includes("top")) position.top = "top";
    if (val?.includes("bottom")) position.top = "bottom";
    if (val?.includes("middle")) position.top = "middle";
    if (val?.includes("left")) position.left = "left";
    if (val?.includes("center")) position.left = "center";
    if (val?.includes("right")) position.left = "right";
    return position;
}

export function getRgbaPointOne(str: string, opacity = 0.2) {
    str = hexToRgbA(str);
    return str?.replace(", 1)", `, ${opacity})`)?.replace(",1)", `, ${opacity})`);
}

export function getFunction(this: any, codeFunc: string) {
    try {
        let func = new Function(`return ${codeFunc}`);
        let currentFunc = func.bind(this);
        return currentFunc();
    } catch (err) {
        console.log(err);
    }
}

export function getInteraction(isEnable: boolean, interaction: any, para: { [index: string]: any }) {
    return interaction?.logicEnable ? isEnable && interaction?.logicContent && !isEmpty(para) && getFunction(interaction.logicContent)(para) : isEnable;
}

export function getCardData(enable: boolean, filter: string, data: any) {
    let list = cloneDeep(data);
    return enable && filter && list ? getFunction(filter)(list) : list;
}

export function getStaticData(data: any) {
    if (!data || !data.cardData) return [];
    return getCardData(data.extractorEnable, data.extractor, data.cardData);
}

// Data
const toFormData = (data: any) => {
    if (!data || isEmpty(data)) return undefined;

    return Object.keys(data).reduce((formData, item) => {
        if (item === "files") {
            data[item] &&
                data[item].forEach((curr: any) => {
                    formData.append("upload_file[]", curr.originFileObj);
                });
        } else {
            formData.append(item, JSON.stringify(data[item]));
        }

        return formData;
    }, new FormData());
};

function getDealData(res: any, that: any, data: any, cmpCb: Function) {
    let result = [];
    if (!res || res.hasError) {
        res?.message && that.$message.error(res.message);
    } else {
        result = res.result || [];
    }
    cmpCb(getCardData(data.extractorEnable, data.extractor, result));
}

async function requestData(that: any, data: any, cb: Function, cmpCb: Function) {
    let res = await cb();
    getDealData(res, that, data, cmpCb);
    if (data.refreshEnable && data.refreshInterval) {
        that.$timer.setInterval(
            that,
            `${data.type}${data.id}`,
            async () => {
                let res = await cb();
                getDealData(res, that, data, cmpCb);
            },
            data.refreshInterval
        );
    } else {
        that.$timer.clearInterval(that, `${data.type}${data.id}`);
    }
}

function globalParams() {
    return {
        global_year: dayjs().year(),
        global_month: dayjs().month(1),
        global_day: dayjs().get("date"),
        global_time: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        global_currentTime: dayjs().format("YYYY-MM-DD")
    };
}

function dealRequest(params: any, request: any) {
    let para = cloneDeep(params);
    let templateArr = ["header", "queryParams", "body"];
    forEach(templateArr, item => {
        forIn(request[item], (val, key) => {
            if (val?.includes("{")) request[item][key] = renderText(val, para, { startString: "{", stopString: "}" });
        });
    });
    let url = renderText(request.url, para, { startString: "{", stopString: "}" });
    if (url) request.url = !isEmpty(request.queryParams) ? (request.url?.includes("?") ? `${url}&${qs.stringify(request.queryParams)}` : `${url}?${qs.stringify(request.queryParams)}`) : url;
    return request;
}

export async function getDynamicData(paramsObj: { that: any; data: any; para?: any; cb: Function }) {
    let { that, data, para, cb } = paramsObj;
    let errData: any = [];
    if (!data || !data.request) return errData;
    try {
        let request = cloneDeep(data.request);
        let paraClone = { ...cloneDeep(para), ...globalParams() };
        if (!request || !request.url) return errData;
        if (data.proxy) {
            if (!data.id) return errData;
            requestData(that, data, () => that.service.post(`/free/card-data/${data.id}/serve`, paraClone), cb);
        } else {
            let method = request.method?.toLowerCase();
            request = dealRequest(paraClone, request);
            let params = request.body;
            let headers = { ...request.header };
            if (request.bodyType === "Form") {
                params = toFormData(params);
                delete headers["Content-Type"];
            }
            if (request.bodyType === "X_www_form_urlencoded") params = qs.stringify(params);
            let timeout = data.timeoutTime ? { timeout: data.timeoutTime } : {};
            let paraService = [request.url, params, { headers, ...timeout }];
            if (method !== "post") {
                paraService = [request.url, { params, headers, ...timeout }];
            }
            requestData(that, data, () => (<any>that.service)?.[method](...paraService), cb);
        }
    } catch (error) {
        return errData;
    }
}

export function getmappingPara(para: { [index: string]: any }, mapping: Array<{ name: string; text: string; value: string }>) {
    let data = cloneDeep(para);
    if (isEmpty(data) || isEmpty(mapping)) return data;
    forEach(mapping, (item: any) => (data[item.name] = get(data, item.value) || item.value));
    return data;
}

export function getstringifyPara(para: { [index: string]: any }, mapping: Array<{ name: string; text: string; value: string }>) {
    let data = getmappingPara(para, mapping);
    return qs.stringify(data);
}

export function getJsonStringPara(para: { [index: string]: any }, mapping: Array<{ name: string; text: string; value: string }>) {
    let data = getmappingPara(para, mapping);
    return escape(JSON.stringify(data));
}

export function dealJump(item: any, para: string) {
    if (item.jumpType === "exist") {
        if (item.jumpPage) window.open(`#/view?id=${item.jumpPage}&wukong_para=${para}`, "_self");
    } else {
        if (item?.jumpUrl) window.open(item.jumpUrl.includes("?") ? `${item?.jumpUrl}&wukong_para=${para}` : `${item?.jumpUrl}?wukong_para=${para}`);
    }
}

export function loadFontFamily(font: any) {
    if (isEmpty(font) || !font.value || !font.id || !font.path) return;
    let { value, id, path } = font;
    if (document.querySelector(`#font${id}`)) return;
    let style = document.createElement("style");
    style.id = `font${id}`;
    style.innerHTML = `@font-face{font-family:${value};src:url(${(<any>window).webSetting?.serviceUrl + path})}`;
    document.head.appendChild(style);
}
