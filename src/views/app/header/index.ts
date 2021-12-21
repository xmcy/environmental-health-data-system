import { Vue, Component } from "vue-property-decorator";
import dayjs from "dayjs";
import "./_index.scss";

@Component({
    template: require("./index.html")
})
export class Header extends Vue {
    list: Array<any> = [
        {
            name: "dashboard",
            title: "仪表盘"
        },
        {
            name: "organization",
            title: "组织"
        },
        {
            name: "node",
            title: "节点"
        },
        {
            name: "block",
            title: "区块"
        },
        {
            name: "trade",
            title: "交易"
        },
        {
            name: "contract",
            title: "合约"
        }
    ];

    get currentTitle() {
        return this.$route.name || this.list[0].name;
    }
    time: any = "";
    interval: any = 0;

    created() {
        this.interval = self.setInterval(() => (this.time = dayjs().format("YYYY年MM月DD日 dddd HH:mm:ss ")), 1000);
    }
}
