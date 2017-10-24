"use strict";
exports.__esModule = true;
/// <reference path="../../../node_modules/@types/three/index.d.ts" />
var three_1 = require("three");
function createEarth(name) {
    var earth = new three_1["default"].Mesh(new three_1["default"].SphereGeometry(5, 32, 32), new three_1["default"].MeshPhongMaterial({
        map: getTexture("earth"),
        bumpMap: getTexture("earthBump"),
        bumpScale: 1
    }));
    earth.position.z = -20;
    // Cusomize
    earth.name = name;
    return earth;
}
exports.createEarth = createEarth;
