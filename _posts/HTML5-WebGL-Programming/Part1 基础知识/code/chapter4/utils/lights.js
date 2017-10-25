"use strict";
exports.__esModule = true;
/// <reference path="../../node_modules/@types/three/index.d.ts" />
var three_1 = require("three");
(function (_module, exports) {
    function createAmbientLight() {
        return new three_1["default"].AmbientLight(0x393939, 0.5);
    }
    function createSpotLight() {
        var spotLight = new three_1["default"].SpotLight(0xffffff, 1.2);
        spotLight.position.set(-26, 11, -11);
        spotLight.angle = 0.2;
        spotLight.castShadow = false;
        spotLight.penumbra = 0.4;
        spotLight.distance = 124;
        spotLight.decay = 1;
        spotLight.shadow.camera = new three_1["default"].PerspectiveCamera(35, 45, 50, 200);
        spotLight.shadow.mapSize.height = 1024;
        spotLight.shadow.mapSize.width = 1024;
        return spotLight;
    }
    function createDirectionalLight() {
        var light = new three_1["default"].DirectionalLight(0xffffff, 1);
        light.position.set(5, 3, 5);
        return light;
    }
    exports.createAmbientLight = createAmbientLight;
    exports.createSpotLight = createSpotLight;
    exports.createDirectionalLight = createDirectionalLight;
})(module, module.exports);
