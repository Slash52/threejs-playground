import * as THREE from "three";
import { DoubleSide } from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const canvas = document.getElementById("three_canvas") as HTMLCanvasElement;
console.log(canvas);
// three tutorial
// https://threejs.org/manual/#en/fundamentals
const scene = new THREE.Scene();
const scene2 = new THREE.Scene();
scene.fog = new THREE.Fog(new THREE.Color(), 0.05, 2);
const light = new THREE.AmbientLight(0xffffff, 0.3);
light.position.set(4, 4, 4);
scene.add(light);
scene.add(scene2);

// const light2 = new THREE.PointLight(0xffffff, 0.2);
// light2.position.set(2, 0, 0);
// scene.add(light2);

const light3 = new THREE.PointLight(0xffffff, 0.2);
light3.position.set(3, 2, 0);
scene.add(light3);
light3.castShadow = true;
light3.shadow.mapSize.width = 1024 * 3;
light3.shadow.mapSize.height = 1024 * 3;

const light4 = new THREE.DirectionalLight(0xffffff, 0.7);
light4.position.set(0, 0, 2);
scene.add(light4);

const floor = new THREE.PlaneGeometry(1, 1);
const floorMaterial = new THREE.MeshPhongMaterial({
  color: 0xeeeeee,
  side: DoubleSide,
});
const floorMesh = new THREE.Mesh(floor, floorMaterial);
floorMesh.receiveShadow = true;
floorMesh.rotateX(Math.PI / 2);
scene.add(floorMesh);

const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
const material = new THREE.MeshPhongMaterial({ color: 0xff0000 });
// const material = new THREE.MeshPhisicMaterial({ color: 0xaaff00 })
const mesh = new THREE.Mesh(geometry, material);
mesh.castShadow = true;
mesh.position.set(0, 0.1, 0);
scene.add(mesh);

// todo
// 1. better material - MeshPhongMaterial
// 2. nice bacakground
// 3. pointlight?

const camera = new THREE.PerspectiveCamera(
  45,
  canvas.width / canvas.height,
  0.1,
  20
);
camera.position.set(0, 1, 1);
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true,
});
renderer.setPixelRatio(window.devicePixelRatio * 5);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const controls = new OrbitControls(camera, renderer.domElement);
scene.add(controls);

// wuerfel soll dargestellt werden
// von der Seite
// Mit OrbitControls
function animate() {
  requestAnimationFrame(animate);
  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.01;

  // required if controls.enableDamping or controls.autoRotate are set to true
  controls.update();

  renderer.render(scene, camera);
}

animate();

// todo : rotate cube...
// schatten vom wuerfel auf den Boden
