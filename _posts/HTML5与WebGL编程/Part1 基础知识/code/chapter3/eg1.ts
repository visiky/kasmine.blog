/// <reference path="../node_modules/@types/three/index.d.ts" />

// 用Three.js创建一个纹理映射立方体
let renderer: THREE.Renderer = null,
  scene: THREE.Scene = null,
  camera: THREE.Camera = null,
  cube: THREE.Object3D = null;

const duration = 5000; // ms
let currentTime = Date.now();
function animate() {
  const now = Date.now();
  const deltat = now - currentTime;
  currentTime = now;
  const fract = deltat / duration;
  const angle = Math.PI * 2 * fract;
  cube.rotation.y += angle;
}

function run() {
  requestAnimationFrame(() => {
    run();
  });

  // Render the scene
  renderer.render(scene, camera);
  // Spin the cube for next frame
  animate();
}

window.onload = () => {
  const canvas = document.getElementById("webglcanvas") as HTMLCanvasElement;

  // create THREE.js renderer and add to canvas
  renderer = new (window as any).THREE.WebGLRenderer({
    antialias: true,
    canvas,
  });

  // set the viewport Size
  renderer.setSize(canvas.width, canvas.height);

  // create a new scene of ThreeJS
  scene = new (window as any).THREE.Scene();

  // add a camera so as to see the scene
  camera = new (window as any).THREE.PerspectiveCamera(
    45,
    canvas.width / canvas.height,
    1,
    4000,
  );
  scene.add(camera);

  // Create a texture-mapped cube and add it to the scene
  // First, create the texture map
  const mapUrl = "../images/crate.jpg";
  const map: THREE.Texture = (window as any).THREE.ImageUtils.loadTexture(mapUrl);

  // Now, create a Basic material; pass in the map
  const material: THREE.MeshBasicMaterial = new (window as any).THREE.MeshBasicMaterial({
    map,
  });

  // Create the cube geometry
  const geometry: THREE.CubeGeometry = new (window as any).THREE.CubeGeometry(2, 2, 2);

  // And put the geometry and material together into a mesh
  cube = new (window as any).THREE.Mesh(geometry, material);

  // Move the mesh back from the camera and tilt it toward the viewer
  cube.position.z = -6;
  cube.rotation.x = Math.PI / 5;
  cube.rotation.y = Math.PI / 5;

  // Finally, add the mesh to our scene
  scene.add(cube);

  // Run the run loop
  run();
};
