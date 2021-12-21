import { Component, Prop, Watch } from "vue-property-decorator";
import { GTemplate } from "@/component/template";
import option from "./option";
import bgOption from "./option-bg";
import "./_index.scss";

@Component({
    template: require("./index.html")
})
export class Relevance extends GTemplate {
    @Prop({ default: "关联性分析（生活习惯与慢病）" })
    title!: string;
    @Prop({ default: "" })
    country!: string;

    data: Array<any> = [];
    chartOption = option;
    chartBgOption = bgOption;
    colors: any = ["#FB9A55", "#FFBE46", "#0291FF"];
    symbols = [`image://${require("@/assets/images/red.png")}`, `image://${require("@/assets/images/yellow.png")}`, `image://${require("@/assets/images/blue.png")}`];
    bgs = [`image://${require("@/assets/images/red-bg.png")}`, `image://${require("@/assets/images/yellow-bg.png")}`, `image://${require("@/assets/images/blue-bg.png")}`];

    @Watch("country", { immediate: true, deep: true })
    change() {
        this.query();
    }

    async query() {
        let data: any = await this.service.get(`/free/country/disease-living-income/$this.country}`);
        if (!data || !data.result) {
            this.data = [];
            return;
        }
        this.data = data.result;
        this.initChart();
    }

    initChart() {
        let maxValue = 20;
        let valueArr: any = [];
        this.chartOption.xAxis.data = this.data.map(g => g.text);
        this.data.forEach((g: any, index: any) => {
            let obj = {
                name: g.text,
                color: this.colors[index],
                type: "pictorialBar",
                barWidth: 20,
                barGap: "30%"
            };
            this.chartBgOption.series[index] = {
                ...obj,
                symbol: this.bgs[index]
            };
            this.chartOption.series[index] = {
                ...obj,
                symbol: this.symbols[index]
            };
            this.chartOption.series[index].data = this.data.map(g => {
                return {
                    name: g.value[index].text,
                    value: g.value[index].value
                };
            });
            let values= this.data.map(g => g.value[index].value);
            valueArr = valueArr.concat(values);
            maxValue = Math.max(...valueArr);
        });
        this.initBg(maxValue);
    }
    initBg(maxValue: any) {
        this.data.forEach((g: any, index: any) => {
            this.chartBgOption.series[index].data = this.data.map(g => {
                return {
                    name: g.value[index].text,
                    value: maxValue
                };
            });
        });
    }
}
