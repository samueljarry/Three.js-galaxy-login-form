import './style.css'
import * as THREE from 'three'
/* import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js' */
import * as dat from 'lil-gui'
import gsap from 'gsap'

// Animation Formulaire

gsap.to('#formulaire', {
    xPercent: 101,
    duration: 1,
    delay: 6.5,
    ease: 'Power2.easeInOut'
})

document.getElementById('inscription').addEventListener('click', () => {
    gsap.to('#formulaire2', {
        xPercent: 101,
        duration: 0.9,
        delay: 0.1
    })
})

document.getElementById('fermer').addEventListener('click', () => {
    gsap.to('#formulaire2', {
        xPercent: -101,
        duration: 0.9,
    })
})

// Texture Loader

const textureLoader = new THREE.TextureLoader()

const particleTexture = textureLoader.load('textures/particles/1.png')

/**
 * Base
 */
// Debug
const gui = new dat.GUI({width: 300})
gui.hide().title('Tweaks galaxie')

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Lights

const ambientLight = new THREE.AmbientLight(0xffffff)

gui.add(ambientLight, 'intensity').min(0).max(10).step(0.001)


scene.add(ambientLight)

/**
 * Galaxy
 */
const parameters = {}
parameters.count = 55000
parameters.size = 0.02
parameters.radius = 5
parameters.branches = 10
parameters.spin = 1
parameters.randomness = 0.2 
parameters.randomnessPower = 5
parameters.insideColor = '#ff6030'
parameters.outsideColor = '#1b3984'

let geometry = null
let material = null
let points = null

const generateGalaxy = () =>
{
    const galaxy = new THREE.Group()

    // Geometrie
    geometry = new THREE.BufferGeometry()

    const positions = new Float32Array(parameters.count * 3)
    const colors = new Float32Array(parameters.count * 3)

    const colorInside = new THREE.Color(parameters.insideColor)
    const colorOutside = new THREE.Color(parameters.outsideColor)



    for (let i = 0; i < parameters.count; i++ ){

        // Destroy old galaxy
        if(points !== null)
        {
            geometry.dispose()
            material.dispose()
            scene.remove(points)
        }

        const i3 = i * 3


        // Positions
        const radius = Math.random() * parameters.radius
        const spinAngle = radius * parameters.spin
        const branchAngle = (i % parameters.branches) / parameters.branches * Math.PI * 2

        const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1)
        const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1)
        const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1)

        positions[i3    ] =    Math.cos(branchAngle + spinAngle) * radius + randomX
        positions[i3 + 1] = randomY
        positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ

        // Color
        const mixedColor = colorInside.clone()
        mixedColor.lerp(colorOutside, radius / parameters.radius)

        colors[i3    ] = mixedColor.r
        colors[i3 + 1] = mixedColor.g
        colors[i3 + 2] = mixedColor.b

        geometry.setAttribute(
            'position',
            new THREE.BufferAttribute(positions, 3)
        )

        geometry.setAttribute(
            'color',
            new THREE.BufferAttribute(colors, 3)
        )

        material = new THREE.PointsMaterial({
            size: parameters.size,
            sizeAttenuation: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            vertexColors: true,
            map : particleTexture
        })    

        // Points

        points = new THREE.Points(geometry, material)
        scene.add(points)
    }
}

generateGalaxy()

// Tweaks

gui.add(parameters, 'count').min(100).max(100000).step(100).onFinishChange(generateGalaxy)
gui.add(parameters, 'size').min(0.001).max(0.1).step(0.001).onFinishChange(generateGalaxy)
gui.add(parameters, 'radius').min(0.001).max(20).step(0.001).onFinishChange(generateGalaxy)
gui.add(parameters, 'branches').min(2).max(20).step(1).onFinishChange(generateGalaxy)
gui.add(parameters, 'spin').min(-5).max(5).step(0.001).onFinishChange(generateGalaxy)
gui.add(parameters, 'randomness').min(0).max(2).step(0.001).onFinishChange(generateGalaxy)
gui.add(parameters, 'randomnessPower').min(1).max(10).step(0.001).onFinishChange(generateGalaxy)
gui.addColor(parameters, 'insideColor').onFinishChange(generateGalaxy)
gui.addColor(parameters, 'outsideColor').onFinishChange(generateGalaxy)

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
camera.position.x = 3
camera.position.y = 25
camera.position.z = 5
scene.add(camera)


gui.
    add(camera.position, 'x').min(-5).max(20).step(0.01)

gui.
    add(camera.position, 'y').min(-5).max(30).step(0.01)
    
gui.
    add(camera.position, 'z').min(-5).max(20).step(0.01)


// Controls
/* const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true */

// Animation début

window.addEventListener('DOMContentLoaded', () => {

    gsap.to(
        camera.position,
        {
            ease:'power2.inOut',
            x: '-=2',
            y: '-=21',
            z: '+=2',
            duration: 4,
            delay: 2.75
        }
    )

})

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
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

    // Update controls
    /* controls.update() */

    // Rotation Galaxie
    points.rotation.y = elapsedTime * 0.15


    /* camera.position.y = Math.cos(elapsedTime * 0.2) + 2.5 */

    // Inclinement continu caméra
    camera.lookAt(0, Math.sin(elapsedTime * 0.2) * 1.2, 0)
    

    
    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()