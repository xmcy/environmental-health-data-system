import { Component, Prop, Watch } from "vue-property-decorator";
import { GTemplate } from "@/component/template";
import option from "./option";
import "./index.scss";

@Component({
    template: require("./index.html")
})
export class AgeDistribution extends GTemplate {
    @Prop({ default: "不同年龄慢病分布" })
    title!: string;
    @Prop({ default: "" })
    country!: string;

    get colors() {
        return this.chartOption.color;
    }
    data: Array<any> = [];
    chartOption = option;
    yData: any = [];

    @Watch("country", { immediate: true, deep: true })
    change() {
        this.query();
    }

    created() {
        this.chartOption.color = this.colors;
    }

    async query() {
        let data: any = await this.service.get(`/free/country/disease-age-distribution/${this.country}`);
        if (!data || !data.result) {
            this.data = [];
            return;
        }
        this.data = data.result;
        this.initChart();
    }

    initChart() {
        this.chartOption.color = this.colors;
        this.chartOption.series = [];
        this.chartOption.yAxis.data = [];
        this.yData = this.data.map((i: any) => i.text);
        let data = this.data[0].value.map((g: any) => g);
        data.forEach((g: any, index: any) => {
            let obj = {
                name: g.text,
                stack: "total",
                type: "bar",
                barMaxWidth: "34%",
                label: {
                    show: true
                },
                emphasis: {
                    focus: "series"
                },
                data: this.data.map((i: any) => i.value[index].value)
            };
            this.chartOption.series.push(obj);
        });
        this.chartOption.yAxis.data = this.yData;
    }
}
