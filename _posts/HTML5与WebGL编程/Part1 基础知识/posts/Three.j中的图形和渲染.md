---
layout: post
title: Three.j中的图形和渲染
date: 2017-10-20
tags: [WebGL]
---

上一部分主要是关于[Three.js初体验](https://segmentfault.com/a/1190000011626953),里面也讲到了一些名词概念，以下就关于这些概念深入一下 Three.js 在3D图形的应用

## 开始

- 检测WebGL兼容性
```ts
/**
 * @desc Add WebGL compatibility check
 * @see https://threejs.org/docs/index.html#manual/introduction/WebGL-compatibility-check
 */
if (!(window as any).Detector.webgl) {
  (window as any).addGetWebGLMessage();
}
```

## 几何图形和网格(geometry)

Three.js提供了一系列现成的几何形状对象(包括预置的几何形状、路径绘制形状、2D挤出几何体以及可自定义可扩展的基类)

### 预置的几何形状

Three.js提供了很多内置的几何形状,详细可以看官方[example/webgl_geometries](https://threejs.org/examples/?q=ge#webgl_geometries)

**SphereGeometry** 球体
**IcosahedronGeometry** 二十面体
**OctahedronGeometry** 八面体 
**TetrahedronGeometry** 四面体
**PlaneGeometry** 平面几何
**BoxGeometry**(width, height, depth) 立体几何 (when depth = 0 <=> PlaneGeometry)
  - BoxGeometry(width, height, dept, widthSegments, heightSegments, depthSegments) 
后三个参数代表长宽高的分段(使用线模式({wireframe:true})进行渲染，可以看到效果)
```ts
// create Geometry Object
  object = new THREE.Mesh(new THREE.BoxGeometry(100, 100, 100, 3, 2, 1),
  new THREE.MeshBasicMaterial({
    map,
    wireframe: true,
  }));
  object.position.set(-150, 0, 100);
  // Add object to scene
  scene.add(object);
```
**CircleGeometry**
**RingGeometry**
**CylinderGeometry** 八面柱体
**LatheGeometry**
**TorusGeometry**
**TorusKnotGeometry** 环面纽结体
**Vector3**

### 路径、形状、挤出



## 场景图和空间变换的层级结构 (scene)

> Three.js根据成熟的`scene graph`定义了一个结构化场景的模型

**利用场景图管理复杂场景**
TODO 什么例子

**模仿地图**

- [官方demo](https://threejs.org/examples/?q=canvas#canvas_geometry_earth)
- [高仿腾讯QQ XPlan](https://segmentfault.com/a/1190000009667320)
  - 需求分析(TODO 进度 0%)
    - [ ] 加载：加载进度百分比，饶椭圆轨道运行的小行星作为loading动画（这个动画我没有做）
    - [ ] 地球：3D球体，旋转入场动画，自转，漂移的云层，城市的坐标点，镜头的旋转与拉近，穿越云层动画
    - [ ] 星空背景：静态星空背景图，动态（闪烁的）星星，划过的流星
    - [ ] 隐藏的音频和视频：按内容（地理位置）划分的音频和视频内容
    - [ ] 其他：操作指引示意动画，地球上方会显示当前城市的经纬度，“了解更多”的结语页面等
  - 技术路径





## 材质 (material)

## 光源

## 阴影 

## 着色器

## 渲染 (renderer)


## 其他

**camera的postion和lookAt**
- position对应的是在空间中camera的位置
- camera.lookAt()对应的是camera的旋转角度（rotation），即旋转camera朝向那个位置

```ts
camera.lookAt( scene.position );
```


-- 未整理 --

**Object3D <- Group**

1. we can set Optional Property: `name`, then use `getObjectByName(name)` to get the Object. Attentionally, every Object has at most one parent Node;
```ts
const scene = createScene();
const earthGroup = createGroup(scene, "Earth_Group");
const earth = createEarth(earthGroup);

console.log(scene.getObjectByName("Earth_Group"));
console.log(scene.getObjectByName("Earth_Group").getObjectByName("EARTH"));
```