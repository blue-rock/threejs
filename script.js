import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
//Loading
const textureLoader = new THREE.TextureLoader()
const normalTexture = textureLoader.load('/Textures/NormalMap.png')
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects - physical shape
const geometry = new THREE.SphereBufferGeometry(.5,64,64)

// Materials - like skin

const material = new THREE.MeshStandardMaterial()
material.metalness = 0.7
material.roughness = 0.2
material.normalMap = normalTexture;
material.color = new THREE.Color(0x292929)

// Mesh - ties object and materials
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)

// Lights
//Light 1
const pointLight1 = new THREE.PointLight(0xffffff, 0.1)
pointLight1.position.x = 2
pointLight1.position.y = 3
pointLight1.position.z = 4
scene.add(pointLight1)

//Light 2
const pointLight3 = new THREE.PointLight(0xff0000, 2)
pointLight3.position.set(-2.34,1.05,-2.6)
pointLight3.intensity = 10;
scene.add(pointLight3)
gui.add(pointLight3.position,'x').min(-3).max(3).step(0.01)
gui.add(pointLight3.position,'y').min(-6).max(6).step(0.01)
gui.add(pointLight3.position,'z').min(-3).max(3).step(0.01)
gui.add(pointLight3,'intensity').min(0).max(10).step(0.01)
const pointLightHelper2 = new THREE.PointLightHelper(pointLight3,1)
scene.add(pointLightHelper2)
//Light 3
const pointLight2 = new THREE.PointLight(0xff0000, 2)
pointLight2.position.set(-2.34,1.05,-2.6)
pointLight2.intensity = 10;
scene.add(pointLight2)
gui.add(pointLight2.position,'x').min(-3).max(3).step(0.01)
gui.add(pointLight2.position,'y').min(-6).max(6).step(0.01)
gui.add(pointLight2.position,'z').min(-3).max(3).step(0.01)
gui.add(pointLight2,'intensity').min(0).max(10).step(0.01)
const pointLightHelper = new THREE.PointLightHelper(pointLight2,1)
scene.add(pointLightHelper)

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

const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()