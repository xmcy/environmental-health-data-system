import { Component, Prop, Watch } from "vue-property-decorator";
import { GTemplate } from "@/component/template";
import option from "./option";
import "./index.scss";

@Component({
    template: require("./index.html")
})
export class PopulationDistribution extends GTemplate {
    @Prop({ default: "人群分布" })
    title!: string;
    @Prop({ default: "" })
    country!: string;

    data: any = [];
    chartOption = option;
    colors: any = ["rgba(0, 223, 255, 1)", "rgba(107, 217, 141, 1)", "rgba(90, 133, 231, 1)"];

    @Watch("country", { immediate: true, deep: true })
    change() {
        this.query();
    }

    async query() {
        let data: any = await this.service.get(`/free/country/population-distribution/${this.country}`);
        if (!data || !data.result) {
            this.data = [];
            return;
        }
        this.data = data.result;
        this.initChart();
    }

    initChart() {
        let income = this.data?.overall.income;
        let data: any = [];
        income.forEach((g: any, index: any) => {
            let obj = {
                color: this.colors[index],
                name: g.text,
                value: g.value,
                itemStyle: {
                    color: this.colors[index]
                },
                label: {
                    show: true,
                    formatter: "{b}\n{d}%",
                    position: "outside",
                    color: this.colors[index],
                    fontSize: 16
                }
            };
            data.push(obj);
        });
        this.chartOption.series[2].data = data;
        console.log(this.chartOption.series[2]);

        // this.data.forEach((g: any, index: any) => {
        //     let obj = {
        //         name: g.text,
        //         type: "pie",
        //         startAngle: 60 * index,
        //         radius: [`${(7 - index * 2) * 10}%`, `${(8 - index * 2) * 10}%`],
        //         center: ["50%", "45%"],
        //         color: this.colors[index].before,
        //         z: index,
        //         itemStyle: {
        //             normal: {
        //                 borderRadius: 5
        //             }
        //         },
        //         labelLine: {
        //             show: true,
        //             length2: 25 + 15 * index,
        //             showAbove: true
        //         },
        //         label: {
        //             show: true,
        //             formatter: "{b}\n{d}%",
        //             position: "outside",
        //             color: this.colors[index].before,
        //             fontSize: 16
        //         },
        //         data: [
        //             {
        //                 value: g.value,
        //                 name: g.text
        //             },
        //             {
        //                 value: 100 - g.value,
        //                 itemStyle: {
        //                     color: this.colors[index].after,
        //                     borderWidth: 50
        //                 },
        //                 tooltip: {
        //                     show: false
        //                 },
        //                 label: {
        //                     show: false
        //                 },
        //                 hoverAnimation: false
        //             }
        //         ]
        //     };
        //     this.chartOption.series.push(obj);
        // });
    }
}
