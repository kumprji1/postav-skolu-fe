import React, { useEffect } from 'react'

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'lil-gui'

import texturaPozemku_seda from '../../../images/PozemekWebGl/textures/pozemek/mapa_pozemku_letecka_seda2.png';

import './PozemekWebGlSection.scss'

const PozemekWebGlSection = () => {
    useEffect(() => {
        console.log('PozemekWebGlSection - useEffect();')
 /**
 * Debug
 */
const gui = new dat.GUI()

const parameters = {
    //backgroundC: '#545454',
    backgroundC: '#ffffff',
    O3_hoverC: '#ff6600',
    avaibleC: '#cccccc'
}

gui.addColor(parameters, 'backgroundC')
gui.addColor(parameters, 'O3_hoverC')

/**
 * Textures
 */
const loadingManager = new THREE.LoadingManager()
const textureLoader = new THREE.TextureLoader(loadingManager)

const texturaPozemku_seda = textureLoader.load('../../../images/PozemekWebGl/textures/pozemek/mapa_pozemku_letecka_seda2.png')
const texturaPozemku_barevno_pruhledna = textureLoader.load('../../../images/PozemekWebGl/textures/pozemek/mapa_pozemku_letecka_barevno_pruhledna_okraj2.png')

const textura_O3_area = textureLoader.load('../../../images/PozemekWebGl/textures/areas/O3_area2.png')

/**
 * Global variables
 */
let isAreaChoosingMode = true;
const cameraPositions = {
    O3_area: {
        x: -358.2,
        y: 111.6,
        z: 569.2
    }
}

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.pozemek-webgl')

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color(parameters.backgroundC)

// Axes Helper
const axesHelper = new THREE.AxesHelper(2)
scene.add(axesHelper)

/**
 * Raycaster
 */
 const raycaster = new THREE.Raycaster()
 const objectsToTest = []
 const areasToTest = []

 /**
 * Mouse
 */
const mouse = new THREE.Vector2()

window.addEventListener('mousemove', (event) =>
{
    mouse.x = event.clientX / sizes.width * 2 - 1
    mouse.y = - (event.clientY / sizes.height) * 2 + 1
})

/**
 * Map
 */

 const mapGeo = new THREE.PlaneGeometry( 1772, 785 );
 const MapGreyMat = new THREE.MeshBasicMaterial( { map: texturaPozemku_seda } );
 const MapColorMat = new THREE.MeshBasicMaterial( { map: texturaPozemku_barevno_pruhledna, transparent: true } );
 const mapGrey = new THREE.Mesh( mapGeo, MapGreyMat );
 const mapColor = new THREE.Mesh( mapGeo, MapColorMat );
 mapGrey.translateZ(-10)
 mapColor.translateZ(-5)
 const map = new THREE.Group()
 map.add(mapGrey)
 map.add(mapColor)
 scene.add(map);

 /**
  * Map areas
  */

 // O3 Area
 const O3_area = new THREE.Mesh(
    new THREE.PlaneGeometry(250, 318),
    new THREE.MeshBasicMaterial({color: new THREE.Color('white'), transparent: true, opacity: 0.75, map: textura_O3_area})
 )
 O3_area.userData = { text: 'Pro děti z kasičky (100,-)', area: 'O3'}
 O3_area.rotateZ(-0.15)
 O3_area.translateX(-362)
 O3_area.translateY(59)
 O3_area.position.z = 10
 O3_area.visible = false
 scene.add(O3_area)
 // for hovering
 areasToTest.push(O3_area)

  // O4 Area
  const O4_area = new THREE.Mesh(
    new THREE.PlaneGeometry(250, 318),
    new THREE.MeshBasicMaterial({color: new THREE.Color('blue'), transparent: true, opacity: 0.50})
 )
 O4_area.userData = { text: 'Pro babičky a dědy z důchodu', area: 'O4'}
 O4_area.position.z = 10
 O4_area.visible = false
 scene.add(O4_area)
 // for hovering
 areasToTest.push(O4_area)

/**
 * OrangeTriange (O3 - Object 3 edges(vertices)) 100,-
 */

const O3_group = new THREE.Group()

const O3_rows = 100;
const O3_columns = 70;
const angle_90 = Math.PI / 2;
const O3_radius = 1;
const O3_geo = new THREE.CircleGeometry(O3_radius, 3, 0, 2 * Math.PI)



let offsetY = 0;
let offsetX = 0;
for (let i = 1; i <= O3_rows; i++) {
    for (let j = 1; j <= O3_columns; j++) {
        const O3_mat = new THREE.MeshBasicMaterial({ color:  parameters.avaibleC})
        const O3_obj = new THREE.Mesh(O3_geo, O3_mat)
        O3_obj.translateY(i * 3 + offsetY)
        O3_obj.translateX(j * 3 + offsetX)
        O3_obj.rotateZ(angle_90)
        O3_obj.userData = {
            i: i,
            j: j,
            avaible: true,
            selected: false
        }
        objectsToTest.push(O3_obj)
        O3_group.add(O3_obj)
        console.log('Trojúhelník č. '+ i +' přidán');    
        if (j % 10 === 0) {
            offsetX += 5
        }    
    }
    offsetX = 0
    if (i % 20 === 0) {
        offsetY += 5
    }
}
O3_group.rotateZ(-0.15)
O3_group.translateX(-490)
O3_group.translateY(-102)
// scene.add(O3_group)

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
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 5000)
camera.position.set(-76, -8.09, 1713)
scene.add(camera)

window.addEventListener('click', () => {
    raycaster.setFromCamera(mouse, camera)

    
    // Clicks to Objects
    // Objects
    const intersects = raycaster.intersectObjects(objectsToTest)

    console.log(intersects);
    for(const intersect of intersects)
    {
        if (intersect.object.userData.avaible) {
            // pozemek lze zakoupit
            if (intersect.object.userData.selected) {    
                // pozemek již vybrán   
               intersect.object.material.color.set(parameters.avaibleC)
               intersect.object.userData.selected = false;
            } else {
            intersect.object.material.color.set(parameters.O3_hoverC)
            intersect.object.userData.selected = true;
        }
        } else {
            // pozemek již zakoupen (zobrazení jména kupujícího v html)
        }
    }

    // Clicks to Areas
    if (isAreaChoosingMode) {
        const intersectsAreas = raycaster.intersectObjects(areasToTest)
        for(const intersect of intersectsAreas)
        {
            if (intersect.object.userData.area === 'O3') {
                scene.add(O3_group)
                isAreaChoosingMode = false
                intersect.object.visible = false
                
                controls.target = O3_area.position;
                console.log('Pozice oblasti: ', O3_area.position)
                
                // controls.position0 = new THREE.Vector3(...cameraPositions.O3_area)
                camera.position.set( cameraPositions.O3_area.x, cameraPositions.O3_area.y, cameraPositions.O3_area.z)    
            }
        }
    
        for(const object of areasToTest)
        {
            if(!intersectsAreas.find(intersect => intersect.object === object))
            {
                object.visible = false;
            }
        }    
    }
})



/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enableRotate = true;
controls.mouseButtons = {
	LEFT: THREE.MOUSE.ROTATE,
	MIDDLE: THREE.MOUSE.DOLLY,
	RIGHT: THREE.MOUSE.PAN
}
controls.zoomSpeed = 3

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Render
    renderer.render(scene, camera)

    controls.update()
    scene.background = new THREE.Color(parameters.backgroundC)

    if (isAreaChoosingMode) {
     // Areas
     raycaster.setFromCamera(mouse, camera)
     const intersectsAreas = raycaster.intersectObjects(areasToTest)
    
    //  console.log(intersectsAreas);
    //  for(const intersect of intersectsAreas)
    //  {
    //     console.log(intersect.object.userData.text)
    //     intersect.object.visible = true
    //  }

    for(const intersect of intersectsAreas)
    {
        console.log(intersect.object.userData.text)
        intersect.object.visible = true
    }

    for(const object of areasToTest)
    {
        if(!intersectsAreas.find(intersect => intersect.object === object))
        {
            object.visible = false;
        }
    }
    }
 


    // raycaster.setFromCamera(mouse, camera)
    
    // const intersects = raycaster.intersectObjects(objectsToTest)
    
    // console.log(intersects);
    // for(const intersect of intersects)
    // {
    //     intersect.object.material.color.set(parameters.O3_hoverC)
    // }

    // for(const object of objectsToTest)
    // {
    //     if(!intersects.find(intersect => intersect.object === object))
    //     {
    //         object.material.color.set(parameters.avaibleC)
    //     }
    // }
    // console.log(camera.position)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)

}

tick()
    } , []);
  return (
    <section className='pozemek-webgl-section'>
        <canvas className="pozemek-webgl"></canvas>
    </section>
  )
}

export default PozemekWebGlSection