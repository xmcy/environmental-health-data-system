import "./screen.scss";

// const debug = process.env.NODE_ENV === "production";

interface ScreenOpts {
    width: number;
    height: number;
    backgroundColor?: string;
    overflow?: string;
    background?: string;
    isDrawerMask?: boolean;
}
export default class Screen {
    width!: number;
    height!: number;
    backgroundColor?: string;
    overflow?: string;
    background?: string;
    isDrawerMask?: boolean;

    public constructor(options?: ScreenOpts) {
        this.reInit(options);
    }

    reInit(options?: ScreenOpts) {
        this.width = options?.width || 1920;
        this.height = options?.height || 1080;
        this.backgroundColor = options?.backgroundColor || "";
        this.overflow = options?.overflow;
        this.background = options?.background;
        this.isDrawerMask = options?.isDrawerMask ?? true;
        this.init();
    }

    public getTransform(isWidth = false) {
        let clientWidth = document.documentElement.clientWidth;
        let clientHeight = document.documentElement.clientHeight;
        let scaleX = Number((clientWidth / this.width).toFixed(6));
        let scaleY = Number((clientHeight / this.height).toFixed(6));

        let screenType;
        if (isWidth) {
            let wRadio;
            wRadio = this.width / clientWidth;
            let newClientHeight = this.height / wRadio;
            screenType = clientHeight > newClientHeight ? 1 : 3;
        } else {
            let hRadio;
            hRadio = this.height / clientHeight;
            let newClientWidth = this.width / hRadio;
            screenType = clientWidth < newClientWidth ? 1 : 3;
        }

        let transform, width, height, overflow;
        (<any>window).screenScale = 1;
        (<any>window).pw = this.width;
        (<any>window).ph = this.height;
        switch (screenType) {
            case 1:
                transform = `translateZ(0) scale(${scaleY})`;
                width = `${Math.ceil(clientWidth / scaleY)}px`;
                height = `${Math.ceil(clientHeight / scaleY)}px`;
                (<any>window).screenScale = scaleY;
                overflow = "overflow-y: hidden; overflow-x: auto";
                break;
            case 2:
                transform = `translateZ(0) scale(${scaleX}, ${scaleY})`;
                break;
            default:
                transform = `translateZ(0) scale(${scaleX})`;
                width = `${Math.ceil(clientWidth / scaleX)}px`;
                height = `${Math.ceil(clientHeight / scaleX)}px`;
                overflow = "overflow-y: auto; overflow-x: hidden";
                (<any>window).screenScale = scaleX;
                break;
        }

        return { transform, width, height, screenType, overflow };
    }

    protected resize() {
        let id = "screen-resize-hzl";
        let style = document.querySelector(`#${id}`);
        if (!style) {
            style = document.createElement("style");
            style.id = id;
        }
        let { transform, width, height, screenType, overflow } = this.getTransform();
        let backgroundColor = this.backgroundColor ? `background-color: ${this.backgroundColor};` : "";
        let background = this.background ? `background: ${this.background};` : "";
        let cssTexts = `width: ${width}; height: ${height}; transform-origin: 0 0; transform: ${transform}; ${background} ${backgroundColor}; background-repeat: no-repeat; background-size: cover;`;
        let innerHTML = `#app{${cssTexts}}`;
        let pageCssTexts;
        if (screenType === 1 && parseInt(<string>width) < this.width - 200) pageCssTexts = `width: ${this.width}px`;
        if (pageCssTexts) innerHTML += `#app .page{${pageCssTexts}}`;
        if (this.overflow) innerHTML += `#app ${this.overflow}{${overflow}}`;
        style.innerHTML = innerHTML;
        document.body.appendChild(style);
    }

    protected getPopupsCssTexts() {
        let { transform } = this.getTransform();
        let placements = ["top", "topLeft", "topRight", "right", "rightTop", "rightBottom", "bottom", "bottomLeft", "bottomRight", "left", "leftTop", "leftBottom"];
        let transformPopups = [];
        for (let index = 0; index < placements.length; index++) {
            let placement = placements[index];
            let transformOrigin = "";
            switch (placement) {
                case "top":
                    transformOrigin = "center bottom";
                    break;
                case "topLeft":
                    transformOrigin = "left bottom";
                    break;
                case "topRight":
                    transformOrigin = "right bottom";
                    break;
                case "right":
                    transformOrigin = "left center";
                    break;
                case "rightTop":
                    transformOrigin = "left top";
                    break;
                case "rightBottom":
                    transformOrigin = "left bottom";
                    break;
                case "bottom":
                    transformOrigin = "center top";
                    break;
                case "bottomLeft":
                    transformOrigin = "left top";
                    break;
                case "bottomRight":
                    transformOrigin = "right top";
                    break;
                case "left":
                    transformOrigin = "right center";
                    break;
                case "leftTop":
                    transformOrigin = "right top";
                    break;
                case "leftBottom":
                    transformOrigin = "right bottom";
                    break;
            }
            transformPopups.push({ name: placement, value: `transform-origin: ${transformOrigin}; transform: ${transform};` });
        }

        return transformPopups;
    }

    protected resizePopups() {
        let id = "ant-popups-hzl";
        let style = document.querySelector(`#${id}`);
        if (!style) {
            style = document.createElement("style");
            style.id = id;
        }
        let popupsCssTexts = this.getPopupsCssTexts();
        style.innerHTML = "";
        for (let index = 0; index < popupsCssTexts.length; index++) {
            let placement = popupsCssTexts[index];
            style.innerHTML += `.ant-popover-placement-${placement.name} .ant-popover-content{${placement.value}}`;
        }
        document.body.appendChild(style);
    }

    protected getModalCssTexts() {
        let { transform } = this.getTransform();
        let transformOrigin = "center top";
        return `transform-origin: ${transformOrigin}; transform: ${transform};`;
    }

    protected resizeModal() {
        let id = "ant-modal-hzl";
        let style = document.querySelector(`#${id}`);
        if (!style) {
            style = document.createElement("style");
            style.id = id;
        }
        let popupsCssTexts = this.getModalCssTexts();
        style.innerHTML = `.ant-modal .ant-modal-content{${popupsCssTexts}}`;
        document.body.appendChild(style);
    }

    protected getDrawerCssTexts() {
        let { transform } = this.getTransform();
        let placements = ["top", "right", "bottom", "left"];
        let transformDrawer = [];
        for (let index = 0; index < placements.length; index++) {
            let placement = placements[index];
            let transformOrigin = "";
            let height = 100;
            let width = 100;
            let value = Math.ceil(100 / (<any>window).screenScale);
            switch (placement) {
                case "top":
                    transformOrigin = "left top";
                    width = value;
                    break;
                case "right":
                    transformOrigin = "right top";
                    height = value;
                    break;
                case "bottom":
                    transformOrigin = "left bottom";
                    width = value;
                    break;
                case "left":
                    transformOrigin = "left top";
                    height = value;
                    break;
            }
            transformDrawer.push({ name: placement, value: `transform-origin: ${transformOrigin}; transform: ${transform}; width: ${width}%; height: ${height}%` });
        }

        return transformDrawer;
    }

    protected resizeDrawer() {
        let id = "ant-drawer-hzl";
        let style = document.querySelector(`#${id}`);
        if (!style) {
            style = document.createElement("style");
            style.id = id;
        }
        if (this.isDrawerMask) {
            let drawerCssTexts = this.getModalCssTexts();
            style.innerHTML = `.ant-drawer .ant-drawer-content{${drawerCssTexts}}`;
        } else {
            let drawerCssTexts = this.getDrawerCssTexts();
            style.innerHTML = "";
            for (let index = 0; index < drawerCssTexts.length; index++) {
                let placement = drawerCssTexts[index];
                style.innerHTML += `.ant-drawer.ant-drawer-${placement.name} .ant-drawer-content{${placement.value}}`;
            }
        }
        document.body.appendChild(style);
    }

    protected getWKSelectCssTexts(scale: number) {
        let { transform } = this.getTransform();
        const rightPercentage = scale < 0.8 ? "96%" : `${scale * 100}%`;
        const xOffset = scale > 1 ? "left" : `${rightPercentage}`;
        const wkSelectDom = document.querySelector(".wk-select-dropdown");
        let transformOrigin = `${xOffset} top`;
        return `transform-origin: ${transformOrigin} !important; transform: ${transform};`;
    }

    protected resizeWKSelect() {
        let id = "wk-select-dropdown-hzl";
        let style = document.querySelector(`#${id}`);
        if (!style) {
            style = document.createElement("style");
            style.id = id;
        }
        let wKSelectCssTexts = this.getWKSelectCssTexts((<any>window).screenScale);
        style.innerHTML = `.wk-select-dropdown.wk-select-dropdown-transfer{${wKSelectCssTexts}}`;
        document.body.appendChild(style);
    }

    protected resizeAll() {
        this.resize();
        this.resizePopups();
        this.resizeModal();
        this.resizeDrawer();
        this.resizeWKSelect();
    }

    protected init() {
        window.addEventListener("resize", this.resizeAll.bind(this), false);
        window.addEventListener("beforeunload", this.resizeAll.bind(this), false);
        this.resizeAll();
    }
}
