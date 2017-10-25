"use strict";
exports.__esModule = true;
/// <reference path="../../node_modules/@types/three/index.d.ts" />
var earth_1 = require("./earth/earth");
var REVOLUTION_DURATION = 3650; // ms
var ROTATION_DURATION = 10; // ms
var DEFAULT_CANVAS_WIDTH = 800;
var DEFAULT_CANVAS_HEIGHT = 600;
var DEFAULT_ROTATION_SPEED = 0.001;
// Basic: Renderer, Camera && Scene
var IS_START = false;
/**
 * Progress
 * 1. - [ ] Object3D of earth
 */
function createRenderer(canvas) {
    var renderer;
    if (canvas) {
        renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true
        });
        // set backgroundColor of Renderer
        renderer.setClearColor(new THREE.Color(0xEEEEEE));
        renderer.setSize(canvas.width, canvas.height);
    }
    else {
        renderer = new THREE.WebGLRenderer();
        renderer.setSize(DEFAULT_CANVAS_WIDTH, DEFAULT_CANVAS_HEIGHT);
        document.body.appendChild(renderer.domElement);
    }
    return renderer;
}
function createScene() {
    var scene = new THREE.Scene();
    return scene;
}
function createGroup(name) {
    var group = new THREE.Group();
    // Customize Object Name
    group.name = name;
    return group;
}
function createCamera(canvas) {
    var aspect = canvas
        ? canvas.width / canvas.height
        : DEFAULT_CANVAS_WIDTH / DEFAULT_CANVAS_HEIGHT;
    var camera = new THREE.PerspectiveCamera(45, aspect, 1, 2000);
    camera.position.z = 5;
    return camera;
}
function setCamera(camera, position) {
    camera.position.set(position.x, position.y, position.z);
}
function animate(camera) {
    // if (this.autoRotate) {
    // TODO 原理?
    camera.position.x =
        camera.position.x * Math.cos(DEFAULT_ROTATION_SPEED) -
            camera.position.z * Math.sin(DEFAULT_ROTATION_SPEED);
    camera.position.z =
        camera.position.z * Math.cos(DEFAULT_ROTATION_SPEED) +
            camera.position.x * Math.sin(DEFAULT_ROTATION_SPEED);
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
    var earthGroup = createGroup("Earth_Group");
    scene.add(earthGroup);
    // Step 3
    var camera = createCamera(canvas);
    // Step 4
    // scene.add(createLight().ambientLight);
    // camera.add(createLight().spotLight); // fixed light direction by adding it as child of camera
    earthGroup.add(new THREE.AmbientLight(0xffffff));
    // Step 5
    var earth = earth_1.createEarth("EARTH");
    earthGroup.add(earth);
    run(renderer, scene, camera);
    addMouseHandler(earth);
    return {
        scene: scene,
        camera: camera
    };
}
window.onload = function () {
    // create the scene
    var obj = init();
    Object.defineProperty(window, "threeObj", {
        value: obj
    });
};
function addMouseHandler(object) {
    var canvas = document.getElementsByTagName("canvas")[0];
    canvas.addEventListener("mousemove", function (e) {
        onMouseMove(e);
    }, false);
    canvas.addEventListener("mousedown", function (e) {
        onMouseDown(e);
    }, false);
    canvas.addEventListener("mouseup", function (e) {
        onMouseUp(e);
    }, false);
    var pageX = 0, pageY = 0;
    var mouseDown = false;
    function onMouseMove(e) {
        if (!mouseDown) {
            return;
        }
        e.preventDefault();
        rotateObject(object, pageX - e.pageX, pageY - e.pageY);
        pageX = e.pageX;
        pageY = e.pageY;
    }
    function onMouseDown(e) {
        e.preventDefault();
        mouseDown = true;
        pageX = e.pageX;
        pageY = e.pageY;
    }
    function onMouseUp(e) {
        e.preventDefault();
        mouseDown = false;
    }
}
/**
 * @param {number} deltaX
 * @param {number} deltaY
 * @desc To Control the Position of Scene in the case of movingMouse
 */
function rotateObject(object, deltaX, deltaY) {
    var rotationX = deltaX / 100;
    var rotationY = deltaY / 100;
    // 绕y轴旋转
    object.rotation.y += rotationX;
    object.rotation.x += rotationY;
    var showDiv = document.getElementById("show-rotation");
    if (!showDiv) {
        showDiv = document.createElement("div");
        document.body.appendChild(showDiv);
        showDiv.id = "show-rotation";
    }
    showDiv.innerHTML = "Rotation: (" + rotationX + ", " + rotationY + ", 0)";
}
