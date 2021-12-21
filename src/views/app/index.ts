import { Vue, Component } from "vue-property-decorator";
import { Header } from "./header";
import { Footer } from "./footer";
import "./index.scss";
@Component({
    template: require("./index.html"),
    components: { Header, Footer }
})
export default class App extends Vue {
    locale = require("ant-design-vue/es/locale/zh_CN").default;
}
