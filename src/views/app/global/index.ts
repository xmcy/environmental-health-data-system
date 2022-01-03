import { Vue, Component } from "vue-property-decorator";
import { Map } from "./map";
import { overview } from "./overview";
import "./index.scss";

@Component({
    template: require("./index.html"),
    components: {
        Map,
        overview
    }
})
export default class Global extends Vue {}
