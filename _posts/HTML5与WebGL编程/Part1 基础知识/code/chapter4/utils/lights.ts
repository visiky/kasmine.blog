/// <reference path="../../node_modules/@types/three/index.d.ts" />
function createAmbientLight() {
  return new THREE.AmbientLight(0x393939, 0.5);
}

function createSpotLight() {
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
}

function createDirectionalLight() {
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(5, 3, 5);
  return light;
}
