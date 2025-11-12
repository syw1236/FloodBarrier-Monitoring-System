import * as THREE from "three";

const loader = new THREE.TextureLoader();
export const waterNormals = loader.load(
    "https://threejs.org/examples/textures/waternormals.jpg",
    (t) => {
        t.wrapS = t.wrapT = THREE.RepeatWrapping;
    }
);