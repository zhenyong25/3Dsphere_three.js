import './style.css' 
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js' 
import * as dat from 'dat.gui'
import { Light } from 'three'

// Loading
const textureLoader = new THREE.TextureLoader().load('/textures/pills.jpg'); 

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.SphereBufferGeometry(0.5,32,32)

// Materials
const material = new THREE.MeshStandardMaterial()
material.metalness = 0.7
material.roughness = 0.7 
material.normalMap = textureLoader
material.color = new THREE.Color(0x474747)

// Mesh
const sphere = new THREE.Mesh(geometry,material);
scene.add(sphere); 

// Lights
const light1 = new THREE.PointLight(0xffffff,1); 
light1.position.set(0,0,1); 
scene.add(light1); 

const light2 = new THREE.PointLight(0xff0000,1); 
light2.position.set(0,1,0); 
scene.add(light2); 

const light3 = new THREE.PointLight(0x00DEFF,1); 
light3.position.set(1,0,0); 
scene.add(light3); 
 
const l1 = gui.addFolder("Light 1")
l1.add(light1.position,'x').min(-3).max(3).step(0.01); 
l1.add(light1.position,'y').min(-3).max(3).step(0.01); 
l1.add(light1.position,'z').min(-3).max(3).step(0.01);


const l2 = gui.addFolder("Light 2")
l2.add(light2.position,'x').min(-3).max(3).step(0.01); 
l2.add(light2.position,'y').min(-3).max(3).step(0.01); 
l2.add(light2.position,'z').min(-3).max(3).step(0.01);


const l3 = gui.addFolder("Light 3")
l3.add(light3.position,'x').min(-3).max(3).step(0.01); 
l3.add(light3.position,'y').min(-3).max(3).step(0.01); 
l3.add(light3.position,'z').min(-3).max(3).step(0.01); 


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas, 
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

//Mouse Move Function 
document.addEventListener('mousemove',onDocumentMouseMove)

let mouseX = 0 
let mouseY = 0 

let targetX = 0 
let targetY = 0 

const WindowHalfX = window.innerWidth/2 ; 
const WindowHalfY = window.innerHeight/2 ; 

function onDocumentMouseMove(event){
    mouseX=(event.clientX-WindowHalfX)
    mouseY=(event.clientY-WindowHalfY)
}

const updateSphere = (event) =>{
    sphere.position.y = window.scrollY * 0.001
} 

window.addEventListener('scroll',updateSphere);

const clock = new THREE.Clock()

const tick = () =>
{
    targetX = mouseX * 0.001
    targetY = mouseY * 0.001 


    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime
    sphere.rotation.y += 0.5 * (targetX - sphere.rotation.y)
    sphere.rotation.x += 0.5 * (targetY - sphere.rotation.x)
    sphere.position.z += 0.5 * (targetY - sphere.rotation.x)

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()