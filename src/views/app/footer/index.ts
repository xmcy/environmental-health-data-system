import { Vue, Component, Prop } from "vue-property-decorator";
import "./_index.scss";

@Component({
    template: require("./index.html")
})
export class Footer extends Vue {
    list: Array<any> = [
        {
            name: "global",
            title: "全球统计"
        },
        {
            name: "country",
            title: "国家统计"
        },
        {
            name: "disease",
            title: "慢病状况",
            note: "(中国)"
        },
        {
            name: "psychological",
            title: "心理状况",
            note: "(中国)"
        },
        {
            name: "data",
            title: "数据查询"
        }
    ];

    get currentTitle() {
        return this.$route.name || this.list[0].name;
    }

    onMenuChange(name: any) {
        this.$router.push({ name }).catch(error => error);
    }
}
