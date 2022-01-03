import { Component, Prop } from "vue-property-decorator";
import { GTemplate } from "@/component/template";
import "./index.scss";

@Component({
    template: require("./index.html")
})
export class overview extends GTemplate {
    @Prop({ default: "各国慢病总览" })
    title!: string;

    data: any = [];
    async query() {
        let data: any = await this.service.get("/free/general/countries");
        if (!data || !data.result) {
            this.data = [];
            return;
        }
        this.data = data.result;
    }
}
