import { Component, Prop, Watch } from "vue-property-decorator";
import { GTemplate } from "@/component/template";
import { cloneDeep } from "lodash-es";
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
    chartOption = cloneDeep(option);
    chartOption2 = cloneDeep(option);
    sexColor = ["rgba(2, 145, 255, 1)", "rgba(238, 102, 103, 1)"];
    color: any = ["rgba(90, 133, 231, 1)", "rgba(107, 217, 141, 1)", "rgba(255, 190, 70, 1)", "rgba(0, 223, 255, 1)"];
    colors: any = ["rgba(0, 223, 255, 1)", "rgba(107, 217, 141, 1)", "rgba(90, 133, 231, 1)"];

    @Watch("country", { immediate: true, deep: true })
    change() {
        this.query();
    }

    async query() {
        let data: any = await this.service.get("/free/depression/population-distribution");
        if (!data || !data.result) {
            this.data = [];
            return;
        }
        this.data = data.result;
        this.initChart();
        this.initChart2();
    }

    initChart() {
        let age = this.data?.age;
        let sex = this.data?.sex;
        let data: any = [];
        let data2: any = [];
        age.forEach((g: any, index: any) => {
            let obj = {
                name: g.text,
                value: g.value,
                color: this.color[index],
                itemStyle: {
                    color: this.color[index]
                },
                label: {
                    show: true,
                    formatter: "{b}岁\n{d}%",
                    position: "outside",
                    color: this.color[index],
                    fontSize: 16
                }
            };
            data.push(obj);
        });
        sex.forEach((j: any, index: any) => {
            let obj = {
                name: j.text,
                value: j.value,
                color: this.sexColor[index],
                itemStyle: {
                    color: this.sexColor[index]
                },
                label: {
                    show: true,
                    // formatter: "{b}\n{d}%",
                    position: "inner",
                    color: "#fff",
                    fontSize: 16
                }
            };
            data2.push(obj);
        });
        this.chartOption.series[2].data = data;
        this.chartOption.series[2].name = "年龄";
        this.chartOption.series[3].data = data2;
        this.chartOption.series[3].name = "性别";
    }

    initChart2() {
        let income = this.data?.place;
        let data: any = [];
        income.forEach((g: any, index: any) => {
            let obj = {
                name: g.text,
                value: g.value,
                color: this.colors[index],
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
        this.chartOption2.series[2].data = data;
        this.chartOption2.series[2].name = "地区";
        this.chartOption2.series[3] = [];
        this.chartOption2.series.pop();
    }
}
