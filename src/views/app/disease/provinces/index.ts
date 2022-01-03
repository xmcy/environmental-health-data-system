import { Component, Prop, Watch } from "vue-property-decorator";
import { GTemplate } from "@/component/template";
import option from "./option";
import "./index.scss";

@Component({
    template: require("./index.html")
})
export class Provinces extends GTemplate {
    @Prop({ default: "慢病患病率省份排行榜" })
    title!: string;
    @Prop({ default: "" })
    disease!: string;

    data: Array<any> = [];
    chartOption = option;
    xData = [];
    legendData: any = [];

    async query() {
        let data: any = await this.service.get(`/free/disease/rank/province/${this.disease}`);
        if (!data || !data.result) {
            this.data = [];
            return;
        }
        this.data = data.result;
        this.initChart();
    }

    initChart() {
        let data = this.data.map((g: any, index: number) => {
            return {
                name: `TOP${index + 1}  ${g.text}`,
                value: g.value
            };
        });
        this.chartOption.yAxis.data = data.map(g => g.name);
        this.chartOption.series[1].data = data;
    }
}
