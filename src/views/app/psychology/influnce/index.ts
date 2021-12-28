import { Component, Prop } from "vue-property-decorator";
import { GTemplate } from "@/component/template";
import option from "./option";
import "./index.scss";

@Component({
    template: require("./index.html")
})
export class Influnce extends GTemplate {
    @Prop({ default: "心理健康影响因素分析" })
    title!: string;

    chartOption = option;
    data: Array<any> = [];
    max: any = 0;

    async query() {
        let data: any = await this.service.get("/free/depression/influence");
        if (!data || !data.result) {
            this.data = [];
            return;
        }
        this.data = data.result;
        this.initChart();
    }

    initChart() {
        let arr: Array<any> = [];
        this.data.forEach((g: any) => {
            arr.push(g.value?.max);
        });
        this.max = Math.max(...arr);
    }

    computedMaxMin(item: any) {
        let left = (item.value?.min * 100) / this.max + "%";
        let width = ((item.value?.max - item.value?.min) * 100) / this.max + "%";
        return `left:${left};width:${width}`;
    }
}
