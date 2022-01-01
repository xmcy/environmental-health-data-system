import { Component, Prop, Watch } from "vue-property-decorator";
import { GTemplate } from "@/component/template";
import option from "./option";
import bgOption from "./option-bg";
import "./index.scss";

@Component({
    template: require("./index.html")
})
export class Relevance extends GTemplate {
    @Prop({ default: "关联性分析（生活习惯与慢病）" })
    title!: string;
    @Prop({ default: "" })
    disease!: string;

    data: Array<any> = [];
    chartOption = option;
    chartBgOption = bgOption;
    colors: any = ["rgba(90, 133, 231, 1)", "rgba(2, 145, 255, 1)", "rgba(107, 217, 141, 1)"];
    symbols = [`image://${require("@/assets/images/bar1.png")}`, `image://${require("@/assets/images/bar2.png")}`, `image://${require("@/assets/images/bar3.png")}`];
    bgs = [`image://${require("@/assets/images/bar1-bg.png")}`, `image://${require("@/assets/images/bar2-bg.png")}`, `image://${require("@/assets/images/bar3-bg.png")}`];

    @Watch("country", { immediate: true, deep: true })
    change() {
        this.query();
    }

    async query() {
        let data: any = await this.service.get(`/free/disease/disease-living-income/${this.disease}`);
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
            let values = this.data.map(g => g.value[index].value);
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
