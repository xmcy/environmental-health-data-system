import { Component, Prop, Watch } from "vue-property-decorator";
import { GTemplate } from "@/component/template";
import option from "./option";
import "./_index.scss";

@Component({
    template: require("./index.html")
})
export class CommonDiseases extends GTemplate {
    @Prop({ default: "常见慢病趋势" })
    title!: string;
    @Prop({ default: "" })
    country!: string;

    get colors() {
        return this.chartOption.color;
    }
    data: Array<any> = [];
    chartOption = option;
    xData = [];
    legendData: any = [];

    @Watch("country", { immediate: true, deep: true })
    change() {
        this.query();
    }

    created() {
        this.chartOption.color = this.colors;
    }

    async query() {
        let data: any = await this.service.get(`/free/country/disease-trends/${this.country}`);
        if (!data || !data.result) {
            this.data = [];
            return;
        }
        this.data = data.result;
        this.initChart();
    }

    initChart() {
        this.chartOption.series = [];
        this.chartOption.xAxis[0].data = [];
        this.legendData = [];
        this.data.forEach((g: any, index: any) => {
            let y = {
                name: g.text,
                type: "line",
                symbol: "circle",
                symbolSize: 4,
                itemStyle: {
                    normal: {
                        color: this.colors[index],
                        borderColor: this.colors[index],
                        lineStyle: {
                            color: this.colors[index],
                            width: 1
                        },
                        areaStyle: {
                            color: {
                                type: "linear",
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [
                                    {
                                        offset: 0,
                                        color: this.colors[index]
                                    },
                                    {
                                        offset: 1,
                                        color: "rgba(0, 0, 0, 0)"
                                    }
                                ]
                            }
                        }
                    }
                },
                data: g.value.map((i: any) => i.value)
            };
            this.xData = g?.value.map((i: any) => i.text);
            this.legendData.push(g?.text);
            this.chartOption.series.push(y);
        });
        this.chartOption.xAxis[0].data = this.xData;
        this.chartOption.legend.data = this.legendData;
    }
}
