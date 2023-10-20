import './style.css'
import * as  THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

const scene =new THREE.Scene()
const camera =new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000)
const renderer = new THREE.WebGLRenderer({
  canvas:document.querySelector("#bg")
})

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth,window.innerHeight)


camera.position.setZ(30)


const bgImage  = new THREE.TextureLoader().load('bgImage.jpeg')
scene.background = bgImage

const sunTexture = new THREE.TextureLoader().load('test.jpeg')

const geometrySun = new THREE.SphereGeometry(8,20,20)
const materialSun = new THREE.MeshStandardMaterial({map:sunTexture})

const sun = new THREE.Mesh(geometrySun,materialSun)

sun.position.z = -20
sun.position.x = 20

scene.add(sun)


const geometry = new THREE.TorusGeometry(10,3,16,100)
const material = new THREE.MeshStandardMaterial({color:0xFF6347})
const Tours = new THREE.Mesh(geometry,material)

const pointLight = new THREE.PointLight(0xffffff)
const ambientLight = new THREE.AmbientLight(0xffffff)
// const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200,50)
const controls = new OrbitControls(camera,renderer.domElement)
scene.add(gridHelper)



// pointLight.position.set(20,20,20)
 
scene.add(pointLight,ambientLight)
scene.add(Tours)

function addSatr(){
  const geometry = new THREE.SphereGeometry(0.25,20,20)
  const material = new THREE.MeshStandardMaterial({color:0xffffff})
  const star = new THREE.Mesh(geometry,material)

  const [x,y,z]  = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(100))

  star.position.set(x,y,z)
  scene.add(star)
}

Array(200).fill().forEach(addSatr)


function moveCamera(){

  const t = document.body.getBoundingClientRect().top

  sun.rotation.x += 0.05 
  sun.rotation.y += 0.05 
  sun.rotation.z += 0.05 

  camera.position.x = t * -0.0002
  camera.position.y = t * -0.0002
  camera.position.z = t * -0.01



}

document.body.onscroll = moveCamera


function animation(){
  requestAnimationFrame(animation)

    Tours.rotation.x += 0.01
    Tours.rotation.y += 0.005
    Tours.rotation.z += 0.01
 controls.update()
  renderer.render(scene,camera)
}

animation()