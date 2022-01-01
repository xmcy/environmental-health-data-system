import { Component, Prop, Watch } from "vue-property-decorator";
import { GTemplate } from "@/component/template";
import option from "./option";
import "./index.scss";

@Component({
    template: require("./index.html")
})
export class Habits extends GTemplate {
    @Prop({ default: "生活习惯统计" })
    title!: string;
    @Prop({ default: "" })
    country!: string;

    data: Array<any> = [];
    chartOption = option;
    colors: any = [
        {
            before: "rgba(0, 255, 176, 1)",
            after: "rgba(16, 56, 63, 1)"
        },
        {
            before: "rgba(0, 196, 255, 1)",
            after: "rgba(3, 39, 62, 1)"
        },
        {
            before: "rgba(251, 154, 85, 1)",
            after: "rgba(28, 34, 45, 1)"
        }
    ];

    @Watch("country", { immediate: true, deep: true })
    change() {
        this.query();
    }

    async query() {
        let data: any = await this.service.get(`/free/country/living-habits/${this.country}`);
        if (!data || !data.result) {
            this.data = [];
            return;
        }
        this.data = data.result;
        this.initChart();
    }

    initChart() {
        this.chartOption.series = [];
        this.data.forEach((g: any, index: any) => {
            let obj = {
                name: g.text,
                type: "pie",
                startAngle: 60 * index,
                radius: [`${(7 - index * 2) * 10}%`, `${(8 - index * 2) * 10}%`],
                center: ["50%", "44%"],
                color: this.colors[index].before,
                z: index,
                itemStyle: {
                    normal: {
                        borderRadius: 5
                    }
                },
                labelLine: {
                    show: true,
                    length2: 25 + 15 * index,
                    showAbove: true
                },
                label: {
                    show: true,
                    formatter: "{b}\n{d}%",
                    position: "outside",
                    color: this.colors[index].before,
                    fontSize: 16
                },
                data: [
                    {
                        value: g.value,
                        name: g.text
                    },
                    {
                        value: 100 - g.value,
                        itemStyle: {
                            color: this.colors[index].after,
                            borderWidth: 50
                        },
                        tooltip: {
                            show: false
                        },
                        label: {
                            show: false
                        },
                        hoverAnimation: false
                    }
                ]
            };
            this.chartOption.series.push(obj);
        });
    }
}
