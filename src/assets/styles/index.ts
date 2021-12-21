// 插件样式
import "normalize.css";
import "ant-design-vue/dist/antd.css";
import "swiper/dist/css/swiper.css";
// 样式
import "./index.scss";

/**
 * 屏幕分辨率自适应
 *
 * @export
 * @class Screen
 */
export class Screen {
    /**
     * 设计稿屏幕宽度
     *
     * @protected
     * @type {number}
     * @memberof Screen
     */
    protected designWidth!: number;
    /**
     * 设计稿屏幕高度
     *
     * @protected
     * @type {number}
     * @memberof Screen
     */
    protected designHeight!: number;
    /**
     * 最小屏幕宽度
     *
     * @protected
     * @type {number}
     * @memberof Screen
     */
    protected minWidth!: number;
    /**
     * 最小屏幕高度
     *
     * @protected
     * @type {number}
     * @memberof Screen
     */
    protected minHeight!: number;

    public constructor(options: { width: number; height: number; minWidth?: number; minHeight?: number }) {
        this.designWidth = options.width || 3840;
        this.designHeight = options.height || 1080;
        this.minWidth = options.minWidth || 1400;
        this.minHeight = options.minHeight || 620;
        this.resize();
        addEventListener("resize", this.resize.bind(this));
    }

    public resize() {
        const htmlHeight = Math.max(document.documentElement.clientHeight, this.minHeight);
        document.documentElement.style.cssText =
            this.designWidth > 1920
                ? `width: ${(this.designWidth * htmlHeight) / this.designHeight}px;
            height: ${htmlHeight}px;
            font-size: ${htmlHeight / (this.designHeight / 100)}px;`
                : `width: 100%;
            height: 100%;
            min-width: ${this.minWidth}px;
            min-height: ${this.minHeight}px;
            font-size: ${htmlHeight / (this.designHeight / 100)}px;`;
    }
}

export default class Style {
    public constructor() {
        new Screen({ width: 1920, height: 1080 });
    }
}
