/// <reference path="../../node_modules/@types/three/index.d.ts" />
const DURATION = 5000; // ms

// Basic: Renderer, Camera && Scene
let renderer: THREE.Renderer, camera: THREE.PerspectiveCamera;
let scene: THREE.Scene;

// 声明 立方体, 圆锥, 球体分组和立方体分组
let cube: THREE.Object3D, sphere: THREE.Object3D, cone: THREE.Object3D;
let cubeGroup: THREE.Object3D, sphereGroup: THREE.Object3D;
/**
 * @param currentTime
 * @returns {number} now
 */
function animate(currentTime: number) {
  const now: number = Date.now();
  const deltat = now - currentTime;
  const fract = deltat / DURATION;
  const angle = Math.PI * 2 * fract;

  cube.rotation.y += angle;
  sphereGroup.rotation.y -= angle / 2;
  cone.rotation.x += angle;

  return now;
}

function createScene(canvas: HTMLCanvasElement) {
  renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
  });
  renderer.setSize(canvas.width, canvas.height);
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    45,
    canvas.width / canvas.height,
    1,
    2000,
  );
  camera.position.z = 30;
  scene.add(camera);

  // 1. Create CubeGroup - include cube && sphereGroup
  cubeGroup = new THREE.Object3D();

  const light: THREE.Light = new THREE.DirectionalLight(0xffffff, 1.5);
  // TODO how to control the position of light
  light.position.set(0.5, 0.2, 1);
  // NOTE 由于灯光是在cubeGroup上，而mouseMove的时候，旋转的是cubeGroup，所以会发现背面是黑色的
  cubeGroup.add(light);
  // scene.add(light);

  // Create Material
  const map = new THREE.TextureLoader().load("../../images/ash_uvgrid01.jpg");
  const material = new THREE.MeshPhongMaterial({
    map,
  });

  // 2. Create Cube - 将材质和几何形状整合到一个网格中
  cube = new THREE.Mesh(new THREE.CubeGeometry(2, 2, 2), material);
  cube.rotation.x = Math.PI / 5;
  cube.rotation.y = Math.PI / 5;

  cubeGroup.add(cube);
  // 3. Create SphereGroup - include cone && sphere

  sphereGroup = new THREE.Object3D();
  cubeGroup.add(sphereGroup);

  // 将sphereGroup　放在cube后上方
  sphereGroup.position.set(2, 3, -4);

  // 4. Create sphere
  sphere = new THREE.Mesh(new THREE.SphereGeometry(1, 20, 20), material);
  sphereGroup.add(sphere);

  // 5. Create Cone
  cone = new THREE.Mesh(new THREE.CylinderGeometry(0, 0.333, 0.444, 20, 5), material);
  // 将圆锥放到球体的上方
  cone.position.set(1, 1, 1.6667);
  sphereGroup.add(cone);

  // 6. Last, add the cubeGroup to Scene
  scene.add(cubeGroup);
}

function run() {
  let currentTime = Date.now();
  requestAnimationFrame(() => run());
  renderer.render(scene, camera);
  currentTime = animate(currentTime);
}

window.onload = () => {
  const canvas = document.getElementById("webglcanvas") as HTMLCanvasElement;
  // create the scene
  createScene(canvas);
  addMouseHandler(canvas);
  run();
};

function rotateScene(deltax) {
  cubeGroup.rotation.y += deltax / 100;
  cube.rotation.x -= deltax / 300;
}

let mouseDown: boolean = false;
let pageX: number = 0;

function onMouseMove(evt) {
  if (mouseDown) {

  evt.preventDefault();
  const deltax = evt.pageX - pageX;
  pageX = evt.pageX;
  rotateScene(deltax);
  }
}
function onMouseDown(evt) {
  evt.preventDefault();

  mouseDown = true;
  pageX = evt.pageX;
}

function onMouseUp(evt) {
  evt.preventDefault();

  mouseDown = false;
}

function addMouseHandler(canvas) {
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
}
