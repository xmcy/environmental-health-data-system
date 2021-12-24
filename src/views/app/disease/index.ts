import { Vue, Component, Watch } from "vue-property-decorator";
import { DegreeAnalysis } from "./degree-analysis";
import { Trend } from "./trend";
import { PopulationDistribution } from "./population-distribution";
import { Provinces } from "./provinces";
import "./index.scss";

@Component({
    template: require("./index.html"),
    components: {
        DegreeAnalysis,
        Trend,
        Provinces,
        PopulationDistribution
    }
})
export default class Disease extends Vue {}
