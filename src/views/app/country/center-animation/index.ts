import { Component } from "vue-property-decorator";
import { GTemplate } from "@/component/template";
import { BallMoving } from "../ball-moving";
import { EarthMoving } from "../earth-moving";
import "./_index.scss";

@Component({
    template: require("./index.html"),
    components: {
        "p-BallMoving": BallMoving,
        "p-EarthMoving": EarthMoving
    }
})
export class CenterAnimation extends GTemplate {
    option = {
        liziNum: 10,
        diam: 0.08,
        opacity: 0.5,
        rightSec: 450,
        topSec: 400
    };
    liziStyle: Array<any> = [];
    interval = 0;

    mounted() {
        this.computedStyle();
        this.interval = self.setInterval(() => {
            this.liziStyle = [];
            this.computedStyle();
        }, 5000);
    }

    computedStyle() {
        for (let i = 0; i < this.option.liziNum; i++) {
            this.liziStyle.push({
                width: Math.random() * this.option.diam,
                right: (Math.random() * this.option.rightSec + 180) / 100,
                top: (Math.random() * this.option.topSec + 100) / 100,
                opacity: Math.random() + this.option.opacity
            });
        }
    }

    beforeDestroy() {
        self.clearInterval(this.interval);
    }
}
