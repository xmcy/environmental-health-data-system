import { Component } from "vue-property-decorator";
import { GTemplate } from "@/component/template";
import * as THREE from "three";

@Component({
    template: require("./index.html")
})
export class EarthMoving extends GTemplate {
    canvas: any = {};
    sphere: any;
    camera: any;
    scene: any;
    renderer: any;
    frame: any;
    mounted() {
        this.inits();
    }
    inits() {
        this.canvas = document.getElementById("mainCanvas");
        this.resize();
        window.addEventListener("resize", this.resize);
        this.renderer.setClearColor(0x000000, 0);
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, 1, 1, 1000); // fov，aspect，near，far
        this.camera.position.set(5, 0, 12);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.scene.add(this.camera);
        let texture = new THREE.TextureLoader().load(require("./images/earth-bg.jpg"));
        let material = new THREE.MeshBasicMaterial({
            transparent: true,
            opacity: 1,
            map: texture
        });
        this.drawSphere(this.scene, material);
        this.animates();
    }

    resize() {
        this.canvas.width = window.innerHeight / 2.1;
        this.canvas.height = window.innerHeight / 2.1;
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            alpha: true
        });
    }

    drawSphere(scene: any, material: any) {
        this.sphere = new THREE.Mesh(new THREE.SphereGeometry(4.5, 40, 40), material);
        scene.add(this.sphere);
    }

    animates() {
        this.frame = requestAnimationFrame(this.animates);
        this.sphere.rotation.y += 0.0025;
        this.renderer.render(this.scene, this.camera);
    }

    beforeDestroy() {
        cancelAnimationFrame(this.frame);
    }
}
