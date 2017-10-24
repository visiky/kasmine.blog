"use strict";
exports.__esModule = true;
/// <reference path="../../node_modules/@types/three/index.d.ts" />
var three_1 = require("three");
var module = {
    exports: {}
};
(function (_module, exports) {
    var IMAGE_ROOT = "../../images/x-plan";
    var IMAGE_URLS = {
        earth: IMAGE_ROOT + "/earth.jpg",
        earthBump: IMAGE_ROOT + "/earth_bump.jpg",
        earthSpec: IMAGE_ROOT + "/earth_spec.jpg"
    };
    // Utils
    function getTexture(imageName) {
        return new three_1["default"].TextureLoader().load(IMAGE_URLS[imageName]);
    }
    exports.getTexture = getTexture;
})(module, module.exports);
