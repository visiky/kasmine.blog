/// <reference path="../../node_modules/@types/three/index.d.ts" />
import { createEarth } from "./earth/earth";

const REVOLUTION_DURATION = 3650; // ms
const ROTATION_DURATION = 10; // ms

const DEFAULT_CANVAS_WIDTH = 800;
const DEFAULT_CANVAS_HEIGHT = 600;

const DEFAULT_ROTATION_SPEED = 0.001;
// Basic: Renderer, Camera && Scene

let IS_START: boolean = false;

/**
 * Progress
 * 1. - [ ] Object3D of earth
 */

function createRenderer(canvas?: HTMLCanvasElement): THREE.WebGLRenderer {
  let renderer: THREE.WebGLRenderer;
  if (canvas) {
    renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
    });
    // set backgroundColor of Renderer
    renderer.setClearColor(new THREE.Color(0xEEEEEE));
    renderer.setSize(canvas.width, canvas.height);
  } else {
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(DEFAULT_CANVAS_WIDTH, DEFAULT_CANVAS_HEIGHT);
    document.body.appendChild(renderer.domElement);
  }
  return renderer;
}

function createScene(): THREE.Scene {
  const scene = new THREE.Scene();

  return scene;
}

function createGroup(name?: string): THREE.Group {
  const group = new THREE.Group();
  // Customize Object Name
  group.name = name;

  return group;
}

function createCamera(canvas?: HTMLCanvasElement): THREE.PerspectiveCamera {
  const aspect = canvas
    ? canvas.width / canvas.height
    : DEFAULT_CANVAS_WIDTH / DEFAULT_CANVAS_HEIGHT;
  const camera = new THREE.PerspectiveCamera(45, aspect, 1, 2000);
  camera.position.z = 5;

  return camera;
}

// function createLight() {
//   return {
//     ambientLight: (() => {
//       return new THREE.AmbientLight(0x393939, 0.5);
//     })(),
//     spotLight: (() => {
//       const spotLight = new THREE.SpotLight(0xffffff, 1.2);
//       spotLight.position.set(-26, 11, -11);
//       spotLight.angle = 0.2;
//       spotLight.castShadow = false;
//       spotLight.penumbra = 0.4;
//       spotLight.distance = 124;
//       spotLight.decay = 1;
//       spotLight.shadow.camera = new THREE.PerspectiveCamera(35, 45, 50, 200);
//       spotLight.shadow.mapSize.height = 1024;
//       spotLight.shadow.mapSize.width = 1024;
//       return spotLight;
//     })(),
//   };
// }

interface IPosition {
  x: number;
  y: number;
  z: number;
}

function setCamera(camera: THREE.PerspectiveCamera, position: IPosition) {
  camera.position.set(position.x, position.y, position.z);
}

function animate(camera: THREE.PerspectiveCamera) {
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

function run(
  renderer: THREE.Renderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
) {
  requestAnimationFrame(() => run(renderer, scene, camera));
  render(renderer, scene, camera);
  animate(camera);
}

function render(
  renderer: THREE.Renderer,
  scene: THREE.Scene,
  camera: THREE.Camera,
) {
  renderer.render(scene, camera);
  IS_START = true;
}

function init(canvas?: HTMLCanvasElement) {
  // Step 1
  const renderer = createRenderer(canvas);
  // Step 2
  const scene = createScene();
  const earthGroup = createGroup("Earth_Group");
  scene.add(earthGroup);
  // Step 3
  const camera = createCamera(canvas);
  // Step 4
  // scene.add(createLight().ambientLight);
  // camera.add(createLight().spotLight); // fixed light direction by adding it as child of camera
  earthGroup.add(new THREE.AmbientLight(0xffffff));
  // Step 5
  const earth = createEarth("EARTH");
  earthGroup.add(earth);

  run(renderer, scene, camera);
  addMouseHandler(earth);

  return {
    scene,
    camera,
  };
}

window.onload = () => {
  // create the scene
  const obj = init();
  Object.defineProperty(window, "threeObj", {
    value: obj,
  });
};

function addMouseHandler(object: THREE.Object3D) {
  const canvas = document.getElementsByTagName("canvas")[0];
  canvas.addEventListener(
    "mousemove",
    e => {
      onMouseMove(e);
    },
    false,
  );
  canvas.addEventListener(
    "mousedown",
    e => {
      onMouseDown(e);
    },
    false,
  );
  canvas.addEventListener(
    "mouseup",
    e => {
      onMouseUp(e);
    },
    false,
  );

  let pageX = 0, pageY = 0;
  let mouseDown = false;

  function onMouseMove(e: MouseEvent) {
    if (!mouseDown) {
      return;
    }
    e.preventDefault();
    rotateObject(object, pageX - e.pageX, pageY - e.pageY);

    pageX = e.pageX;
    pageY = e.pageY;

  }
  function onMouseDown(e: MouseEvent) {
    e.preventDefault();
    mouseDown = true;
    pageX = e.pageX;
    pageY = e.pageY;
  }
  function onMouseUp(e: MouseEvent) {
    e.preventDefault();
    mouseDown = false;
  }
}

/**
 * @param {number} deltaX
 * @param {number} deltaY
 * @desc To Control the Position of Scene in the case of movingMouse
 */
function rotateObject(object: THREE.Object3D, deltaX: number, deltaY: number) {
  const rotationX = deltaX / 100;
  const rotationY = deltaY / 100;

  // 绕y轴旋转
  object.rotation.y += rotationX;
  object.rotation.x += rotationY;

  let showDiv = document.getElementById("show-rotation");
  if (!showDiv) {
    showDiv = document.createElement("div");
    document.body.appendChild(showDiv);
    showDiv.id = "show-rotation";
  }
  showDiv.innerHTML = `Rotation: (${rotationX}, ${rotationY}, 0)`;
}
