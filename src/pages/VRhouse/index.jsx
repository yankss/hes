import React, { useEffect, } from 'react';       
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import './index.css'
var scene, renderer, camera, img;
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
    console.log(controls);
    
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

    var texture = new THREE.TextureLoader().load(img);
    var sphereMaterial = new THREE.MeshBasicMaterial({ map: texture });


    var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    // sphere.material.wireframe = true;
    sphere.geometry.scale(1,1,-1);
    scene.add(sphere);
    camera.position.set(0,0,0.01);
  }

// const useaBox = () => {
//   var materials = [];
//   var texture_left = new THREE.TextureLoader().load( './scene_left.jpeg' );
//   materials.push( new THREE.MeshBasicMaterial( { map: texture_left} ) );
  
//   var texture_right = new THREE.TextureLoader().load( './scene_right.jpeg' );
//   materials.push( new THREE.MeshBasicMaterial( { map: texture_right} ) );
  
//   var texture_top = new THREE.TextureLoader().load( 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png' );
//   materials.push( new THREE.MeshBasicMaterial( { map: texture_top} ) );
  
//   var texture_bottom = new THREE.TextureLoader().load( 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png' );
//   materials.push( new THREE.MeshBasicMaterial( { map: texture_bottom} ) );
  
//   var texture_front = new THREE.TextureLoader().load( 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png' );
//   materials.push( new THREE.MeshBasicMaterial( { map: texture_front} ) );
  
//   var texture_back = new THREE.TextureLoader().load( 'https://p4.itc.cn/q_70/images01/20210422/7fba831aa0f44a84af0639b0f394bbee.png' );
//   materials.push( new THREE.MeshBasicMaterial( { map: texture_back} ) );
//   console.log('materials', materials);

//   var box = new THREE.Mesh( new THREE.BoxGeometry( 1, 1, 1 ), materials);

//   scene.add(box);

//   box.geometry.scale(1,1,-1);


//   camera.position.set(0,0,0.01)
// }

  useEffect(() => {
    console.log(document.location.href.slice(0, 32));
    if(document.location.href.slice(36) === '1') {
      img = 'https://easyhouse-bucket.oss-cn-guangzhou.aliyuncs.com/meishi_xiangcun_fangzi-002.jpg'
      // img = 'https://img0.baidu.com/it/u=1709254786,2744392899&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=250'
      // img = 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic2.zhimg.com%2Fv2-9dc667b9e3632a12adb3390b79c4e1dd_r.jpg&refer=http%3A%2F%2Fpic2.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1651293642&t=f8ea77008d102202f214cf3b86153d12'
      // img = 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20200225%2F4410e61ebb9f48a0bc6d40478a98b14c.jpeg&refer=http%3A%2F%2F5b0988e595225.cdn.sohucs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1651293642&t=fc02212c86909cb1058734b07933afd5'
      // img = 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.to8to.com%2Fcase%2F1908%2F22%2F20190822_cc10c5cd7570f15134f6vtzkmmtwap6h.jpg&refer=http%3A%2F%2Fpic.to8to.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1651253158&t=14c8f9d70b8bcbe26084b29ab91572eb'
    }
    else if(document.location.href.slice(36) === '2') {
      img = 'https://easyhouse-bucket.oss-cn-guangzhou.aliyuncs.com/vr2.jpg'
    }
    else if(document.location.href.slice(36) === '3') {
      img = 'https://easyhouse-bucket.oss-cn-guangzhou.aliyuncs.com/vr3.jpg'
    }
    else if(document.location.href.slice(36) === '4') {
      img = 'https://easyhouse-bucket.oss-cn-guangzhou.aliyuncs.com/vr4.jpg'
    }
    initThree();
  }, [])


  

  return (
      
        <div id='container' className='mainContainer'></div>
  )
}
