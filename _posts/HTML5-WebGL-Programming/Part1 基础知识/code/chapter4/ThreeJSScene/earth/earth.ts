/// <reference path="../../../node_modules/@types/three/index.d.ts" />
import THREE from "three";
export function createEarth(name?: string) {
  const earth = new THREE.Mesh(
    new THREE.SphereGeometry(5, 32, 32),
    new THREE.MeshPhongMaterial({
      map: getTexture("earth"),
      bumpMap: getTexture("earthBump"),
      bumpScale: 1,
      // specularMap: getTexture("earthSpec"),
      // specular: Number(new THREE.Color("#909090")),
      // shininess: 5,
      // transparent: true,
    }),
  );
  earth.position.z = -20;
  // Cusomize
  earth.name = name;

  return earth;
}
