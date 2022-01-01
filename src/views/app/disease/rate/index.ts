import { Component, Prop, Watch } from "vue-property-decorator";
import { GTemplate } from "@/component/template";
import option from "./option";
import "./index.scss";

@Component({
    template: require("./index.html")
})
export class Rate extends GTemplate {
    @Prop({ default: "常见慢病占比" })
    title!: string;
    @Prop({ default: "" })
    disease!: string;

    data: Array<any> = [];
    chartOption = option;
    colors = ["rgba(0, 223, 255, 1)", "rgba(90, 133, 231, 1)", "rgba(107, 217, 141, 1)", "rgba(255, 190, 70, 1)", "rgba(2, 145, 255, 1)"];
    legendData: any = [];

    @Watch("disease", { immediate: true, deep: true })
    change() {
        this.query();
    }

    mounted() {
        this.chartOption.color = this.colors;
    }

    async query() {
        let data: any = await this.service.get("/free/disease/distribution");
        if (!data || !data.result) {
            this.data = [];
            return;
        }
        this.data = data.result;
        this.initChart();
    }

    initChart() {
        let total = this.data.reduce((prev, curr) => prev + curr.value, 0);
        this.chartOption.series[0].label = {
            show: true,
            position: "outside",
            fontSize: 14,
            formatter: (params: any) => {
                return ((params.value / total) * 100).toFixed(2) + "%";
            }
        };
        this.chartOption.series[0].data = this.data.map((g: any, index: number) => {
            return {
                name: g.text,
                value: g.value,
                color: this.colors[index],
                itemStyle: {
                    color: this.colors[index]
                },
                label: {
                    show: true,
                    position: "outside",
                    color: this.colors[index],
                    formatter: (params: any) => {
                        return ((params.value / total) * 100).toFixed(2) + "%";
                    },
                    fontSize: 14
                }
            };
        });
    }
}
