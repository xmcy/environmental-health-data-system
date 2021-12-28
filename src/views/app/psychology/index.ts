import { Vue, Component } from "vue-property-decorator";
import { DegreeAnalysis } from "./degree-analysis";
import { Trend } from "./trend";
import { PopulationDistribution } from "./population-distribution";
import { Provinces } from "./provinces";
import { Influnce } from "./influnce";
import { Risk } from "./risk";
import { Map } from "./map";
import "./index.scss";

@Component({
    template: require("./index.html"),
    components: {
        Map,
        DegreeAnalysis,
        Trend,
        Provinces,
        PopulationDistribution,
        Influnce,
        Risk
    }
})
export default class Psychology extends Vue {}
