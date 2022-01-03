import { Component, Prop } from "vue-property-decorator";
import { GTemplate } from "@/component/template";
import { cloneDeep } from "lodash-es";
import option from "./option";
import "./index.scss";

@Component({
    template: require("./index.html")
})
export class overview extends GTemplate {
    @Prop({ default: "各国慢病总览" })
    title!: string;

    data: any = [];
    colors: any = ["rgba(90, 133, 231, 1)", "#AECAD6", "rgba(107, 217, 141, 1)", "rgba(255, 190, 70, 1)", "rgba(0, 223, 255, 1)"];
    swiperOptions = {
        direction: "horizontal",
        slidesPerView: 4,
        autoplay: {
            delay: 5000
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
            clickable: true
        }
    };
    options: any = [];

    async query() {
        let data: any = await this.service.get("/free/general/countries");
        if (!data || !data.result) {
            this.data = [];
            return;
        }
        this.data = data.result.map((g: any) => {
            return {
                ...g,
                img: require(`@/assets/images/${g.text}.png`),
                chartOption: this.initChart(g.diseases)
            };
        });
    }

    initChart(income: any) {
        let data: any = [];
        let chartOption = cloneDeep(option);
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
                    fontSize: 14
                }
            };
            data.push(obj);
        });
        chartOption.series[2].data = data;
        return chartOption;
    }
}
