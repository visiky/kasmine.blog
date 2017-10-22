/// <reference path="../../node_modules/@types/three/index.d.ts" />
const REVOLUTION_DURATION = 3650; // ms
const ROTATION_DURATION = 10; // ms

const ROTATION_SPEED = 0.001;
// Basic: Renderer, Camera && Scene

let IS_START: boolean = false;

let sun: THREE.Object3D;

/**
 * Progress
 * 1. - [ ] Object3D of earth
 */

function createRenderer(canvas: HTMLCanvasElement): THREE.WebGLRenderer {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
  });
  renderer.setSize(canvas.width, canvas.height);
  return renderer;
}

function createScene(): THREE.Scene {
  const scene = new THREE.Scene();

  return scene;
}

function createGroup(scene: THREE.Group, name?: string): THREE.Group {
  const group = new THREE.Group();
  // Customize Object Name
  group.name = name;
  scene.add(group);

  return group;
}

function createCamera(
  canvas: HTMLCanvasElement,
  scene: THREE.Scene,
): THREE.PerspectiveCamera {
  const camera = new THREE.PerspectiveCamera(
    45,
    canvas.width / canvas.height,
    1,
    2000,
  );
  // camera.position.set(0, 0, -28)
  camera.position.set(3.55, 0, -328);
  scene.add(camera);

  return camera;
}

function createLight() {
  return {
    ambientLight: (() => {
      return new THREE.AmbientLight(0x393939, 0.5);
    })(),
    spotLight: (() => {
      const spotLight = new THREE.SpotLight(0xffffff, 1.2);
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
    })(),
  };
}
function addLight(scene: THREE.Scene, camera: THREE.Camera) {
  scene.add(createLight().ambientLight);
  camera.add(createLight().spotLight); // fixed light direction by adding it as child of camera
}

const IMAGE_ROOT = "../../images/x-plan";
const IMAGE_URLS = {
  earth: `${IMAGE_ROOT}/earth.jpg`,
  earthBump: `${IMAGE_ROOT}/earth_bump.jpg`,
  earthSpec: `${IMAGE_ROOT}/earth_spec.jpg`,
};

// Utils
function getTexture(imageName: string) {
  return new THREE.TextureLoader().load(IMAGE_URLS[imageName]);
}

function createEarth(group: THREE.Group) {
  const earth = new THREE.Mesh(
    new THREE.SphereGeometry(5, 32, 32),
    new THREE.MeshPhongMaterial({
      map: getTexture("earth"),
      bumpMap: getTexture("earthBump"),
      bumpScale: 0.15,
      specularMap: getTexture("earthSpec"),
      specular: Number(new THREE.Color("#909090")),
      shininess: 5,
      transparent: true,
    }),
  );
  earth.position.z = -8;
  // Cusomize
  earth.name = "EARTH";

  group.add(earth);
  return earth;
}

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
    camera.position.x * Math.cos(ROTATION_SPEED) -
    camera.position.z * Math.sin(ROTATION_SPEED);
  camera.position.z =
    camera.position.z * Math.cos(ROTATION_SPEED) +
    camera.position.x * Math.sin(ROTATION_SPEED);
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

function init(canvas: HTMLCanvasElement) {
  // Step 1
  const renderer = createRenderer(canvas);
  // Step 2
  const scene = createScene();
  const earthGroup = createGroup(scene, "Earth_Group");

  // Step 3
  const camera = createCamera(canvas, scene);
  // Step 4
  addLight(scene, camera);
  // Step 5
  const earth = createEarth(earthGroup);

  run(renderer, scene, camera);

  return {
    scene,
  };
}

window.onload = () => {
  const canvas = document.getElementById("webglcanvas") as HTMLCanvasElement;
  // create the scene
  const obj = init(canvas);
  Object.defineProperty(window, "threeObj", {
    value: obj,
  });
  // addMouseHandler(canvas);
};
