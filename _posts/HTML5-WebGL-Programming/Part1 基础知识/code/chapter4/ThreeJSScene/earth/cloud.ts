/// <reference path="../../../node_modules/@types/three/index.d.ts" />
import THREE from "three";
import { getTexture } from "../../utils/texture";

export function createCloud() {
  return new THREE.Mesh(
    new THREE.SphereGeometry(5.2, 40, 40),
    new THREE.MeshPhongMaterial({
      map: getTexture("earthCloud"),
      transparent: true,
      opacity: 1,
      // blending: AdditiveBlending
    }),
  );
}
