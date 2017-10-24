/// <reference path="../../node_modules/@types/three/index.d.ts" />
import THREE from "three";

const module: {
  exports,
} = {
  exports: {},
};

((_module, exports) => {
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
  exports.getTexture = getTexture;
})(module, module.exports);
