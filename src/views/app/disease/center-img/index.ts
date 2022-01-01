import { Component, Prop } from "vue-property-decorator";
import { GTemplate } from "@/component/template";
import "./index.scss";

@Component({
    template: require("./index.html")
})
export class CenterImg extends GTemplate {
    @Prop({ default: "常见慢病趋势" })
    title!: string;

    data: Array<any> = [];

    // async query() {
    //     let data: any = await this.service.get("/free/disease/distribution");
    //     if (!data || !data.result) {
    //         this.data = [];
    //         return;
    //     }
    //     this.data = data.result;
    // }
}
