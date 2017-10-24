"use strict";
/**
 * @date 17 Oct, 2017
 * @author kasmine
 * @desc type "tsc chapeter-eg1.ts" to complile ts-file
 */
exports.__esModule = true;
// 着色器类型
var SHADER_TYPE;
(function (SHADER_TYPE) {
    SHADER_TYPE["vertex"] = "vertex";
    SHADER_TYPE["fragment"] = "fragment";
})(SHADER_TYPE = exports.SHADER_TYPE || (exports.SHADER_TYPE = {}));
// 2. 获取webgl绘图上下文
function initWebGL(canvas) {
    var gl = null;
    var msg = "Your browser does not support webgl, or\n    it is not enabled by default";
    try {
        gl = canvas.getContext("experimental-webgl");
    }
    catch (e) {
        msg = "Error creating WebGl Context!: " + e.toString();
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
// 4. 创建顶点缓冲数据 - 构建用于绘制的正方形顶点数据
function createSquare(gl) {
    var vertexBuffer;
    vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    // 这里定义了4个顶点,从结果来看，可以知道是矩形的4个顶点
    var verts = [
        0.5,
        0.5,
        0.0,
        -0.5,
        0.5,
        0.0,
        0.5,
        -0.5,
        0.0,
        -0.5,
        -0.5,
        0.0,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.STATIC_DRAW);
    var square = {
        buffer: vertexBuffer,
        vertSize: 3,
        nVerts: 4,
        primtype: gl.TRIANGLE_STRIP
    };
    return square;
}
// 5. 初始化 投影矩阵 和 模型-视图矩阵
var projectionMatrix, modelViewMatrix;
function initMatrices(canvas) {
    // create a modelViewMatrix, include a camera located in (0, 0, -3.333)
    modelViewMatrix = window.mat4.create();
    window.mat4.translate(modelViewMatrix, modelViewMatrix, [
        0,
        0,
        -3.3333
    ]);
    // create a projectonMatrix with a view of 45 degree angle;
    projectionMatrix = window.mat4.create();
    window.mat4.perspective(projectionMatrix, Math.PI / 4, canvas.width / canvas.height, 1, 10000);
}
// 6. 创建一个或多个实现绘制算法的着色器
// 利用WebGL提供的方法编译顶点着色器和片段着色器的源代码
function createShader(gl, str, type) {
    var shader;
    if (type == SHADER_TYPE.fragment) {
        shader = gl.createShader(gl.FRAGMENT_SHADER);
    }
    else if (type == SHADER_TYPE.vertex) {
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
var vertexShaderSource = "attribute vec3 vertexPos;\n\n    uniform mat4 modelViewMatrix;\n\n    uniform mat4 projectionMatrix;\n\n    void main(void) {\n\n\t\t// Return the transformed and projected vertex value\n\n        gl_Position = projectionMatrix * modelViewMatrix * \n\n            vec4(vertexPos, 1.0);\n\n    }\n";
// GLSL编写的片段着色器源代码
var fragmentShaderSource = "void main(void) {\n \n    // Return the pixel color: always output white\n\n        gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);\n\n  }\n";
var shaderProgram, shaderVertexPositionAttribute, shaderProjectionMatrixUniform, shaderModelViewMatrixUniform;
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
    gl.clear(gl.COLOR_BUFFER_BIT);
    // set the shader to use
    gl.useProgram(shaderProgram);
    // connect up the shader parameters: vertex position and projection/model matrices
    // set the vertex buffer to be drawn
    gl.bindBuffer(gl.ARRAY_BUFFER, obj.buffer);
    gl.vertexAttribPointer(shaderVertexPositionAttribute, obj.vertSize, gl.FLOAT, false, 0, 0);
    gl.uniformMatrix4fv(shaderProjectionMatrixUniform, false, projectionMatrix);
    gl.uniformMatrix4fv(shaderModelViewMatrixUniform, false, modelViewMatrix);
    // draw the object
    gl.drawArrays(obj.primtype, 0, obj.nVerts);
}
window.onload = function () {
    // 1.
    var canvas = document.getElementById("webglcanvas");
    // 2.
    var gl = initWebGL(canvas);
    // 3.
    initViewport(gl, canvas);
    // 4.
    var square = createSquare(gl);
    // 5.
    initMatrices(canvas);
    // 6.7.
    initShader(gl);
    // 8.
    draw(gl, square);
};
