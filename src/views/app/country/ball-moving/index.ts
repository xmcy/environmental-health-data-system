import { Component } from "vue-property-decorator";
import { GTemplate } from "@/component/template";

@Component({
    template: require("./index.html")
})
export class BallMoving extends GTemplate {
    ballCanvas: any = {};
    context: any = {};
    focalDepth = 80;
    focalPoint = 256;
    centreX: any;
    centreY: any;
    maxpoints = 306;
    pointcloud: Array<any> = [];
    theta = 0;
    phi = 0;
    frame: any;

    mounted() {
        this.init();
    }

    init() {
        this.ballCanvas = document.getElementById("ballCanvas");
        this.resize();
        window.addEventListener("resize", this.resize);
        this.InitRandomDistribution();
        this.ballAnimate();
    }

    resize() {
        this.ballCanvas.width = window.innerWidth / 1.76;
        this.ballCanvas.height = window.innerHeight / 1.76;
        this.centreX = this.ballCanvas.width / 2;
        this.centreY = this.ballCanvas.height / 2;
        this.context = this.ballCanvas.getContext("2d");
    }

    RenderRandomDistribution() {
        this.theta += 0.001;
        this.phi += 0.00001;
        let scale = (20 * this.ballCanvas.height) / 500;
        this.context.beginPath();
        for (let i = 0; i < this.pointcloud.length; i++) {
            let point: any = this.pointcloud[i];
            let x1 = point.x * Math.cos(this.theta) - point.z * Math.sin(this.theta);
            let z1 = point.x * Math.sin(this.theta) + point.z * Math.cos(this.theta);
            let y1 = point.y * Math.cos(this.phi) - z1 * Math.sin(this.phi);
            z1 = point.y * Math.sin(this.phi) + z1 * Math.cos(this.phi);
            x1 *= scale;
            z1 *= scale;
            y1 *= scale;
            if (z1 + this.focalDepth < 0) continue;
            let depth = (this.focalPoint * 3) / (z1 + this.focalDepth);
            let x = x1 * depth + this.centreX;
            let y = y1 * depth + this.centreY;
            let sz = depth * 0.2;
            this.context.rect(x, y, sz, sz);
        }
        this.context.fillStyle = "#fff";
        this.context.fill();
    }

    InitRandomDistribution() {
        for (let i = 0; i < this.maxpoints; i++) {
            this.pointcloud.push(this.RandomNormal());
        }
    }

    RandomNormal() {
        let theta = Math.random() * Math.PI * 2;
        let nz = 1 - 2 * Math.random();
        let phi = Math.acos(nz);
        let nx = Math.sin(theta) * Math.sin(phi);
        let ny = Math.cos(theta) * Math.sin(phi);
        return { x: nx, y: ny, z: nz };
    }

    renders() {
        this.context.fillStyle = "black";
        this.context.clearRect(0, 0, this.ballCanvas.width, this.ballCanvas.height);
        this.RenderRandomDistribution();
    }

    ballAnimate() {
        this.renders();
        this.frame = requestAnimationFrame(this.ballAnimate);
    }

    beforeDestroy() {
        cancelAnimationFrame(this.frame);
    }
}
