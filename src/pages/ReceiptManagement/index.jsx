import React, { useEffect} from 'react';       
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import './index.css'
var scene, renderer, camera;
export default function HeaderBar() {

const initThree = () => {
  //场景
  scene = new THREE.Scene();
  //镜头
  camera = new THREE.PerspectiveCamera(90, document.body.clientWidth / document.body.clientHeight, 0.1, 100);
  //渲染器
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(document.body.clientWidth, document.body.clientHeight);
  document.getElementById("container").appendChild(renderer.domElement);
  //镜头控制器
  var controls = new OrbitControls(camera, renderer.domElement);
  
  //一会儿在这里添加3D物体
  // useaBox();
  useaSphere();

  loop();

}

//帧同步重绘
const loop = () => {
  requestAnimationFrame(loop);
  renderer.render(scene, camera);
}

const useaSphere = () => {
  var sphereGeometry = new THREE.SphereGeometry(1, 50, 50);

  var texture = new THREE.TextureLoader().load('https://gimg2.baidu.com/image_search/src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20190311%2Fd298bb6432624433bec8fefbc4df8d3c.jpeg&refer=http%3A%2F%2F5b0988e595225.cdn.sohucs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1648565992&t=3ae1f5c5f54f328b6216f8ca1a1a0b24');
  var sphereMaterial = new THREE.MeshBasicMaterial({ map: texture });


  var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  // sphere.material.wireframe = true;
  sphere.geometry.scale(1,1,-1);
  scene.add(sphere);
  camera.position.set(0,0,0.01);
}

const useaBox = () => {
  var materials = [];
  var texture_left = new THREE.TextureLoader().load( './scene_left.jpeg' );
  materials.push( new THREE.MeshBasicMaterial( { map: texture_left} ) );
  
  var texture_right = new THREE.TextureLoader().load( './scene_right.jpeg' );
  materials.push( new THREE.MeshBasicMaterial( { map: texture_right} ) );
  
  var texture_top = new THREE.TextureLoader().load( 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png' );
  materials.push( new THREE.MeshBasicMaterial( { map: texture_top} ) );
  
  var texture_bottom = new THREE.TextureLoader().load( 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png' );
  materials.push( new THREE.MeshBasicMaterial( { map: texture_bottom} ) );
  
  var texture_front = new THREE.TextureLoader().load( 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png' );
  materials.push( new THREE.MeshBasicMaterial( { map: texture_front} ) );
  
  var texture_back = new THREE.TextureLoader().load( 'https://p4.itc.cn/q_70/images01/20210422/7fba831aa0f44a84af0639b0f394bbee.png' );
  materials.push( new THREE.MeshBasicMaterial( { map: texture_back} ) );
  console.log('materials', materials);

  var box = new THREE.Mesh( new THREE.BoxGeometry( 1, 1, 1 ), materials);

  scene.add(box);

  box.geometry.scale(1,1,-1);


  camera.position.set(0,0,0.01)
}

  useEffect(() => {
    initThree();
  })
  

  return (
      <div id='container' className='mainContainer'></div>
  )
}
