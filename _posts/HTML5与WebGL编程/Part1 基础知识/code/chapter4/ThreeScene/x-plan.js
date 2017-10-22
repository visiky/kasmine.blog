/// <reference path="../../node_modules/@types/three/index.d.ts" />
var REVOLUTION_DURATION = 3650; // ms
var ROTATION_DURATION = 10; // ms
var ROTATION_SPEED = 0.001;
// Basic: Renderer, Camera && Scene
var IS_START = false;
var sun;
/**
 * Progress
 * 1. - [ ] Object3D of earth
 */
function createRenderer(canvas) {
    var renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true
    });
    renderer.setSize(canvas.width, canvas.height);
    return renderer;
}
function createScene() {
    var scene = new THREE.Scene();
    return scene;
}
function createGroup(scene, name) {
    var group = new THREE.Group();
    // Customize Object Name
    group.name = name;
    scene.add(group);
    return group;
}
function createCamera(canvas, scene) {
    var camera = new THREE.PerspectiveCamera(45, canvas.width / canvas.height, 1, 2000);
    // camera.position.set(0, 0, -28)
    camera.position.set(3.55, 0, -328);
    scene.add(camera);
    return camera;
}
function createLight() {
    return {
        ambientLight: (function () {
            return new THREE.AmbientLight(0x393939, 0.5);
        })(),
        spotLight: (function () {
            var spotLight = new THREE.SpotLight(0xffffff, 1.2);
            spotLight.position.set(-26, 11, -11);
            spotLight.angle = 0.2;
            spotLight.castShadow = false;
            spotLight.penumbra = 0.4;
            spotLight.distance = 124;
            spotLight.decay = 1;
            spotLight.shadow.camera = new THREE.PerspectiveCamera(35, 45, 50, 200);
            spotLight.shadow.mapSize.height = 1024;
            spotLight.shadow.mapSize.width = 1024;
            return spotLight;
        })()
    };
}
function addLight(scene, camera) {
    scene.add(createLight().ambientLight);
    camera.add(createLight().spotLight); // fixed light direction by adding it as child of camera
}
var IMAGE_ROOT = "../../images/x-plan";
var IMAGE_URLS = {
    earth: IMAGE_ROOT + "/earth.jpg",
    earthBump: IMAGE_ROOT + "/earth_bump.jpg",
    earthSpec: IMAGE_ROOT + "/earth_spec.jpg"
};
// Utils
function getTexture(imageName) {
    return new THREE.TextureLoader().load(IMAGE_URLS[imageName]);
}
function createEarth(group) {
    var earth = new THREE.Mesh(new THREE.SphereGeometry(5, 32, 32), new THREE.MeshPhongMaterial({
        map: getTexture("earth"),
        bumpMap: getTexture("earthBump"),
        bumpScale: 0.15,
        specularMap: getTexture("earthSpec"),
        specular: Number(new THREE.Color("#909090")),
        shininess: 5,
        transparent: true
    }));
    earth.position.z = -8;
    // Cusomize
    earth.name = "EARTH";
    group.add(earth);
    return earth;
}
function setCamera(camera, position) {
    camera.position.set(position.x, position.y, position.z);
}
function animate(camera) {
    // if (this.autoRotate) {
    // TODO 原理?
    camera.position.x =
        camera.position.x * Math.cos(ROTATION_SPEED) -
            camera.position.z * Math.sin(ROTATION_SPEED);
    camera.position.z =
        camera.position.z * Math.cos(ROTATION_SPEED) +
            camera.position.x * Math.sin(ROTATION_SPEED);
    // }
}
function run(renderer, scene, camera) {
    requestAnimationFrame(function () { return run(renderer, scene, camera); });
    render(renderer, scene, camera);
    animate(camera);
}
function render(renderer, scene, camera) {
    renderer.render(scene, camera);
    IS_START = true;
}
function init(canvas) {
    // Step 1
    var renderer = createRenderer(canvas);
    // Step 2
    var scene = createScene();
    var earthGroup = createGroup(scene, "Earth_Group");
    // Step 3
    var camera = createCamera(canvas, scene);
    // Step 4
    addLight(scene, camera);
    // Step 5
    var earth = createEarth(earthGroup);
    run(renderer, scene, camera);
    return {
        scene: scene
    };
}
window.onload = function () {
    var canvas = document.getElementById("webglcanvas");
    // create the scene
    var obj = init(canvas);
    Object.defineProperty(window, "threeObj", {
        value: obj
    });
    // addMouseHandler(canvas);
};
