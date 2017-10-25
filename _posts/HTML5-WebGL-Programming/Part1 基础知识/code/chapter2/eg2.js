/**
 * @date 17 Oct, 2017
 * @author kasmine
 * @desc type "tsc chapeter-eg1.tsto complile ts-file
 */
// 着色器类型
var SHADER_TYPE;
(function (SHADER_TYPE) {
    SHADER_TYPE["vertex"] = "vertex";
    SHADER_TYPE["fragment"] = "fragment";
})(SHADER_TYPE || (SHADER_TYPE = {}));
// 2. 获取webgl绘图上下文
function initWebGL(canvas) {
    var gl = null;
    var msg = "Your browser does not support webgl, or\n    it is not enabled by default";
    try {
        gl = canvas.getContext("experimental-webgl");
    }
    catch (e) {
        msg = "Error creating WebGl Context!:" + e.toString();
    }
    if (!gl) {
        alert(msg);
        throw new Error(msg);
    }
    return gl;
}
// 3. 设置webGL视口
function initViewport(gl, canvas) {
    gl.viewport(0, 0, canvas.width, canvas.height);
}
// 4. 初始化立方体、颜色和索引缓冲数据
function createCube(gl) {
    var vertexBuffer;
    vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    var verts = [
        // Front face
        -1.0, -1.0, 1.0,
        1.0, -1.0, 1.0,
        1.0, 1.0, 1.0,
        -1.0, 1.0, 1.0,
        // Back face
        -1.0, -1.0, -1.0,
        -1.0, 1.0, -1.0,
        1.0, 1.0, -1.0,
        1.0, -1.0, -1.0,
        // Top face
        -1.0, 1.0, -1.0,
        -1.0, 1.0, 1.0,
        1.0, 1.0, 1.0,
        1.0, 1.0, -1.0,
        // Bottom face
        -1.0, -1.0, -1.0,
        1.0, -1.0, -1.0,
        1.0, -1.0, 1.0,
        -1.0, -1.0, 1.0,
        // Right face
        1.0, -1.0, -1.0,
        1.0, 1.0, -1.0,
        1.0, 1.0, 1.0,
        1.0, -1.0, 1.0,
        // Left face
        -1.0, -1.0, -1.0,
        -1.0, -1.0, 1.0,
        -1.0, 1.0, 1.0,
        -1.0, 1.0, -1.0,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.STATIC_DRAW);
    // Color
    var colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    var faceColors = [
        [1.0, 0.0, 0.0, 1.0],
        [0.0, 1.0, 0.0, 1.0],
        [0.0, 0.0, 1.0, 1.0],
        [1.0, 1.0, 0.0, 1.0],
        [1.0, 0.0, 1.0, 1.0],
        [0.0, 1.0, 1.0, 1.0],
    ];
    var vertexColors = [];
    // tslint:disable-next-line:forin
    for (var i in faceColors) {
        var color = faceColors[i];
        for (var j = 0; j < 4; j++) {
            vertexColors = vertexColors.concat(color);
        }
    }
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexColors), gl.STATIC_DRAW);
    // Index data (defines the triangles to be drawn)
    var cubeIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeIndexBuffer);
    var cubeIndices = [
        0, 1, 2, 0, 2, 3,
        4, 5, 6, 4, 6, 7,
        8, 9, 10, 8, 10, 11,
        12, 13, 14, 12, 14, 15,
        16, 17, 18, 16, 18, 19,
        20, 21, 22, 20, 22, 23,
    ];
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(cubeIndices), gl.STATIC_DRAW);
    var cube = {
        buffer: vertexBuffer,
        colorBuffer: colorBuffer,
        indices: cubeIndexBuffer,
        vertSize: 3, nVerts: 24, colorSize: 4, nColors: 24, nIndices: 36,
        primtype: gl.TRIANGLES
    };
    return cube;
}
// 5. 初始化 投影矩阵 和 模型-视图矩阵
var projectionMatrix, modelViewMatrix, 
// 定义旋转轴
rotationAxis;
function initMatrices(canvas) {
    // create a modelViewMatrix, include a camera located in (0, 0, -8)
    modelViewMatrix = window.mat4.create();
    window.mat4.translate(modelViewMatrix, modelViewMatrix, [
        0,
        0,
        -8,
    ]);
    // create a projectonMatrix with a view of 45 degree angle;
    projectionMatrix = window.mat4.create();
    window.mat4.perspective(projectionMatrix, Math.PI / 4, canvas.width / canvas.height, 1, 10000);
    rotationAxis = window.vec3.create();
    window.vec3.normalize(rotationAxis, [1, 1, 1]);
}
// 6. 创建一个或多个实现绘制算法的着色器
// 利用WebGL提供的方法编译顶点着色器和片段着色器的源代码
function createShader(gl, str, type) {
    var shader;
    if (type === SHADER_TYPE.fragment) {
        shader = gl.createShader(gl.FRAGMENT_SHADER);
    }
    else if (type === SHADER_TYPE.vertex) {
        shader = gl.createShader(gl.VERTEX_SHADER);
    }
    else {
        return null;
    }
    gl.shaderSource(shader, str);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert(gl.getShaderInfoLog(shader));
        return null;
    }
    return shader;
}
// GLSL编写的顶点着色器源代码
var vertexShaderSource = "attribute vec3 vertexPos;\n\n     attribute vec4 vertexColor;\n\n     uniform mat4 modelViewMatrix;\n\n     uniform mat4 projectionMatrix;\n\n     letying vec4 vColor;\n\n     void main(void) {\n\n  \t\t// Return the transformed and projected vertex value\n\n         gl_Position = projectionMatrix * modelViewMatrix * \n\n             vec4(vertexPos, 1.0);\n\n         // Output the vertexColor in vColor\n\n         vColor = vertexColor;\n\n     }\n";
var fragmentShaderSource = " precision mediump float;\n\n     letying vec4 vColor;\n\n     void main(void) {\n\n     // Return the pixel color: always output white\n\n         gl_FragColor = vColor;\n\n    }\n";
var shaderProgram;
var shaderVertexPositionAttribute;
var shaderVertexColorAttribute;
var shaderProjectionMatrixUniform, shaderModelViewMatrixUniform;
// 7. 使用各种参数初始化着色器
function initShader(gl) {
    // 加载并编译片段和顶点着色器
    var fragmentShader = createShader(gl, fragmentShaderSource, SHADER_TYPE.fragment);
    var vertexShader = createShader(gl, vertexShaderSource, SHADER_TYPE.vertex);
    // 将它们链接到一段新的程序中
    shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    // 获取指向着色器参数的指针
    shaderVertexPositionAttribute = gl.getAttribLocation(shaderProgram, "vertexPos");
    gl.enableVertexAttribArray(shaderVertexPositionAttribute);
    shaderVertexColorAttribute = gl.getAttribLocation(shaderProgram, "vertexColor");
    gl.enableVertexAttribArray(shaderVertexColorAttribute);
    shaderProjectionMatrixUniform = gl.getUniformLocation(shaderProgram, "projectionMatrix");
    shaderModelViewMatrixUniform = gl.getUniformLocation(shaderProgram, "modelViewMatrix");
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert("Could not initial shaders");
    }
}
// 8. 绘制图元
function draw(gl, obj) {
    // clear the background (with black)
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT || gl.DEPTH_BUFFER_BIT);
    // set the shader to use
    gl.useProgram(shaderProgram);
    // connect up the shader parameters: vertex position and projection/model matrices
    // set the vertex buffer to be drawn
    gl.bindBuffer(gl.ARRAY_BUFFER, obj.buffer);
    gl.vertexAttribPointer(shaderVertexPositionAttribute, obj.vertSize, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, obj.colorBuffer);
    gl.vertexAttribPointer(shaderVertexColorAttribute, obj.colorSize, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, obj.indices);
    gl.uniformMatrix4fv(shaderProjectionMatrixUniform, false, projectionMatrix);
    gl.uniformMatrix4fv(shaderModelViewMatrixUniform, false, modelViewMatrix);
    // draw the object
    gl.drawElements(obj.primtype, obj.nIndices, gl.UNSIGNED_SHORT, 0);
}
var currentTime = Date.now();
// TODO newAdd
function animate() {
    var duration = 5000; // ms
    var now = Date.now();
    var deltat = now - currentTime;
    currentTime = now;
    // 5s一圈
    var fract = deltat / duration;
    var angle = Math.PI * 2 * fract;
    window.mat4.rotate(modelViewMatrix, modelViewMatrix, angle, rotationAxis);
}
function run(gl, cube) {
    requestAnimationFrame(function () { run(gl, cube); });
    draw(gl, cube);
    animate();
}
window.onload = function () {
    // 1.
    var canvas = document.getElementById("webglcanvas");
    // 2.
    var gl = initWebGL(canvas);
    // 3.
    initViewport(gl, canvas);
    // 4.
    var cube = createCube(gl);
    // 5.
    initMatrices(canvas);
    // 6.7.
    initShader(gl);
    // 8.
    run(gl, cube);
};
