const SCENE = new THREE.Scene();
const CLOCK = new THREE.Clock();
const FOV = 75;
const NEAR = 0.4;
const FAR = 1000;
const MAXPARTICLES = 2000;
const RENDERER = new THREE.WebGLRenderer();
let deltaTime;

RENDERER.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(RENDERER.domElement);

// camera
let camera = new THREE.PerspectiveCamera(
  FOV,
  window.innerWidth / window.innerHeight,
  NEAR,
  FAR
);
camera.position.x = -280;
camera.position.y =30;
camera.position.z = 150;

camera.lookAt(new THREE.Vector3(0, 0, 0));


// particles
let particles = new THREE.Geometry();
let particlesTex = new THREE.TextureLoader().load('images/particle.png');
for (let i = 0; i < MAXPARTICLES; i++) {
  let particle = new THREE.Vector3(
    random(-280, 310, 1),
    random(-35, 5),
    random(-250, 200)
  );
  particles.vertices.push(particle);
}
let particleMaterial = new THREE.PointsMaterial({
  map: particlesTex,
  alphaTest: 0.2,
  transparent: true,
  size: 3,
});
let particleSystem = new THREE.Points(particles, particleMaterial);
particleSystem.sortParticles = true;
SCENE.add(particleSystem);


// random helper RNG
function random(min, max) {
    if (isNaN(max)) {``
      max = min;
      min = 0;
    }
    return Math.random() * (max - min) + min;
  }

  let SaturnTex = new THREE.TextureLoader().load('images/saturn.jpg');
  let SaturnGeo = new THREE.SphereGeometry(100, 50, 50);
  let SaturnMat = new THREE.MeshBasicMaterial({map: SaturnTex});
  let Saturn = new THREE.Mesh(SaturnGeo, SaturnMat);
  Saturn.position.x = 0;
  Saturn.position.y = 0;
  Saturn.position.z = 0;
  SCENE.add(Saturn);

// render loop
function render() {
    requestAnimationFrame(render);
  
    deltaTime = CLOCK.getDelta();
    
    particleSystem.rotation.y = Date.now() * 0.0002;
    RENDERER.render(SCENE, camera);
  }
  render();
  

// resize
function resize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  RENDERER.setSize(window.innerWidth, window.innerHeight);
  
}
window.addEventListener("resize", resize, false);