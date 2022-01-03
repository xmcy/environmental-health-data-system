import { Vue, Component } from "vue-property-decorator";
import { Map } from "./map";
import { Overview } from "./overview";
import "./index.scss";

@Component({
    template: require("./index.html"),
    components: {
        Map,
        Overview
    }
})
export default class Global extends Vue {}
