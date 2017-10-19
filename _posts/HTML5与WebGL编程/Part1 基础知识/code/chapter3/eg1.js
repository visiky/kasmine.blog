/// <reference path="../node_modules/@types/three/index.d.ts" />
// 用Three.js创建一个纹理映射立方体
var renderer = null, scene = null, camera = null, cube = null;
var duration = 5000; // ms
var currentTime = Date.now();
function animate() {
    var now = Date.now();
    var deltat = now - currentTime;
    currentTime = now;
    var fract = deltat / duration;
    var angle = Math.PI * 2 * fract;
    cube.rotation.y += angle;
}
function run() {
    requestAnimationFrame(function () {
        run();
    });
    // Render the scene
    renderer.render(scene, camera);
    // Spin the cube for next frame
    animate();
}
window.onload = function () {
    var canvas = document.getElementById("webglcanvas");
    // create THREE.js renderer and add to canvas
    renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true
    });
    // set the viewport Size
    renderer.setSize(canvas.width, canvas.height);
    // create a new scene of ThreeJS
    scene = new THREE.Scene();
    // add a camera so as to see the scene
    camera = new THREE.PerspectiveCamera(45, canvas.width / canvas.height, 1, 4000);
    scene.add(camera);
    // Create a texture-mapped cube and add it to the scene
    // First, create the texture map
    var mapUrl = "../images/crate.jpg";
    var map = THREE.ImageUtils.loadTexture(mapUrl);
    // Now, create a Basic material; pass in the map
    var material = new THREE.MeshBasicMaterial({ map: map });
    // Create the cube geometry
    var geometry = new THREE.CubeGeometry(2, 2, 2);
    // And put the geometry and material together into a mesh
    cube = new THREE.Mesh(geometry, material);
    // Move the mesh back from the camera and tilt it toward the viewer
    cube.position.z = -35;
    cube.rotation.x = Math.PI / 5;
    cube.rotation.y = Math.PI / 5;
    // Finally, add the mesh to our scene
    scene.add(cube);
    // Run the run loop
    run();
};
