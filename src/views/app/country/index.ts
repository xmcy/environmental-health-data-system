import { Vue, Component, Watch } from "vue-property-decorator";
import { CenterAnimation } from "./center-animation";
import { CommonDiseases } from "./common-diseases";
import { AgeDistribution } from "./age-distribution";
import { AgeTrend } from "./age-trend";
import { Relevance } from "./relevance";
import { Habits } from "./habits";
import { PopulationDistribution } from "./population-distribution";
import "./index.scss";

@Component({
    template: require("./index.html"),
    components: {
        CenterAnimation,
        CommonDiseases,
        AgeDistribution,
        Habits,
        Relevance,
        PopulationDistribution,
        AgeTrend
    }
})
export default class Country extends Vue {
    data: Array<any> = [];
    active: any = null;
    mounted() {
        this.query();
    }

    async query() {
        let res: any = await this.service.get(`/free/general/countries`);
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
