import { Component, Prop } from "vue-property-decorator";
import { GTemplate } from "@/component/template";
import "./index.scss";

@Component({
    template: require("./index.html")
})
export class Risk extends GTemplate {
    @Prop({ default: "心理健康风险干预分析" })
    title!: string;

    color: Array<any> = ["rgba(53, 255, 208, .2)", "rgba(255, 233, 47, .2)", "rgba(0, 223, 255, .2)", "rgba(225, 100, 255, .2)", "rgba(255, 107, 53, .2)"];
    textcolor: Array<any> = ["rgba(53, 255, 208, 1)", "rgba(255, 233, 47, 1)", "rgba(0, 223, 255, 1)", "rgba(225, 100, 255, 1)", "rgba(255, 107, 53, 1)"];
    data: Array<any> = [];

    async query() {
        let data: any = await this.service.get("/free/depression/rank/risk");
        if (!data || !data.result) {
            this.data = [];
            return;
        }
        this.data = data.result;
    }
}
