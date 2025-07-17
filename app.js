
const container = document.getElementById('canvas-container');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

const light = new THREE.PointLight(0xffffff, 1);
light.position.set(10, 10, 10);
scene.add(light);

const ambient = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambient);

// 3D сердце
const shape = new THREE.Shape();
shape.moveTo(0, 0);
shape.bezierCurveTo(0, 0, -2, -2, -5, 2);
shape.bezierCurveTo(-5, 6, 0, 9, 0, 11);
shape.bezierCurveTo(0, 9, 5, 6, 5, 2);
shape.bezierCurveTo(2, -2, 0, 0, 0, 0);

const geometry = new THREE.ExtrudeGeometry(shape, {
  depth: 1,
  bevelEnabled: true,
  bevelThickness: 0.5,
  bevelSize: 0.5,
  bevelSegments: 2
});

const material = new THREE.MeshPhongMaterial({ color: 0xff4d6d, shininess: 100 });
const mesh = new THREE.Mesh(geometry, material);
mesh.rotation.x = Math.PI;
scene.add(mesh);

camera.position.z = 20;

// Адаптация под экран
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Анимация
function animate() {
  requestAnimationFrame(animate);
  mesh.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();

// Показать текст через 5 сек
setTimeout(() => {
  document.getElementById('text-block').style.display = 'block';
}, 5000);
