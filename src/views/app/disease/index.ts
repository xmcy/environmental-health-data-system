import { Vue, Component, Watch } from "vue-property-decorator";
import { Rate } from "./rate";
import { Trend } from "./trend";
import { Provinces } from "./provinces";
import { PopulationDistribution } from "./population-distribution";
import { Relevance } from "./relevance";
import { CenterImg } from "./center-img";
import "./index.scss";

@Component({
    template: require("./index.html"),
    components: {
        CenterImg,
        Rate,
        Trend,
        Provinces,
        PopulationDistribution,
        Relevance
    }
})
export default class Disease extends Vue {
    data: Array<any> = [];
    active: any = null;
    mounted() {
        this.query();
    }

    async query() {
        let res: any = await this.service.get("/free/disease/list");
        if (!res || !res.result) {
            this.data = [];
            return;
        }
        this.data = res.result;
        this.active = this.data[0].code;
    }

    onChoose(item: any) {
        this.active = item.code;
    }
}
