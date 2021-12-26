import { Vue, Component } from "vue-property-decorator";

@Component
export class GTemplate extends Vue {
    protected title!: string;

    protected mounted() {
        this._initHeader();
        this.$store.commit("addTask", this.query);
    }

    /**
     * 设置样式
     *
     * @protected
     * @param {*} style
     * @returns
     * @memberof GTemplate
     */
    protected setStyle(style: any) {
        if (!style || !style.$isObject(true)) return;

        this.$nextTick(() => {
            Object.keys(style).forEach((key: any) => {
                (<HTMLElement>this.$el).style[key] = style[key];
            });
        });
    }

    /**
     * 设置html
     *
     * @protected
     * @param {string} html
     * @returns
     * @memberof GTemplate
     */
    protected setHtml(html: string) {
        if (!html) return;
        this.$nextTick(() => {
            this.$el.innerHTML = html;
        });
    }

    /**
     * 设置标题
     *
     * @private
     * @memberof GTemplate
     */
    private _initHeader() {
        if (!this.title) {
            const header = this.$el.getElementsByTagName && this.$el.getElementsByTagName("header")[0];
            header && !header.innerText && (header.style.display = "none");
        }
    }
    query() {}
}
