import { Component, Prop } from "vue-property-decorator";
import { GTemplate } from "@/component/template";
import ECharts from "vue-echarts";
import option from "./option";
import "./index.scss";

@Component({
    template: require("./index.html")
})
export class Map extends GTemplate {
    @Prop({ default: "心理健康趋势变化" })
    title!: string;
    chartOption: any = option;

    mounted() {
        this.initMap();
        let data = [
            {
                name: "上海",
                value: [121.4648, 31.2891, 395]
            },
            {
                name: "广州",
                value: [113.5107, 23.2196, 330]
            },
            {
                name: "大连",
                value: [122.2229, 39.4409, 80]
            },
            {
                name: "南宁",
                value: [108.479, 23.1152, 70]
            },
            {
                name: "南昌",
                value: [116.0046, 28.6633, 60]
            },
            {
                name: "拉萨",
                value: [91.1865, 30.1465, 50]
            },
            {
                name: "长春",
                value: [125.8154, 44.2584, 40]
            },
            {
                name: "包头",
                value: [110.3467, 41.4899, 30]
            },
            {
                name: "重庆",
                value: [107.7539, 30.1904, 190]
            },
            {
                name: "常州",
                value: [119.4543, 31.5582, 10]
            }
        ];
        this.initEchart(data);
    }

    initMap() {
        (<any>window).echarts.registerMap("china", require("./world.json")); // 注册地图
        (<any>this.$refs.map).setOption(this.chartOption);
    }

    initEchart(data: Array<{ name: string; value: Array<number> }>) {
        this.chartOption.series[0].data = data;
    }
}
