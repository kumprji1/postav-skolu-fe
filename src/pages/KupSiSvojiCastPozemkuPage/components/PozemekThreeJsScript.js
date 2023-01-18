import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'lil-gui'

const initOnce = () => {
    
}
/**
 * Debug
 */
     const gui = new dat.GUI()

     const parameters = {
         //backgroundC: '#545454',
         backgroundC: '#ffffff',
         O3_hoverC: '#ff6600',
         O4_hoverC :'#4033f0',
         avaibleC: '#cccccc'
     }
     
     gui.addColor(parameters, 'backgroundC')
     gui.addColor(parameters, 'O3_hoverC')
     gui.addColor(parameters, 'O4_hoverC')
          
/**
 * Raycaster
 */
const raycaster = new THREE.Raycaster()
const objectsToTest = []
const areasToTest = []

const O3_group = new THREE.Group()
O3_group.rotateZ(-0.15)
O3_group.translateX(-490)
O3_group.translateY(-102)

const O3_rows = 100;
const O3_columns = 70;
const angle_90 = Math.PI / 2;
const O3_radius = 1.4;
const O3_geo = new THREE.CircleGeometry(O3_radius, 3, 0, 2 * Math.PI)

let offsetY = 0;
let offsetX = 0;

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color(parameters.backgroundC)


export const pozemekThreeStart = (webGlSectionDOM, addToBuy, removePiece, fetchFewLandPiecesO3, getCurrentLoadedO3) => {
    
/**
 * Textures
 */
const loadingManager = new THREE.LoadingManager()
const textureLoader = new THREE.TextureLoader(loadingManager)

const texturaPozemku_seda = textureLoader.load('/images/PozemekWebGl/textures/pozemek/mapa_pozemku_letecka_seda2.png')
const texturaPozemku_barevno_pruhledna = textureLoader.load('/images/PozemekWebGl/textures/pozemek/mapa_pozemku_letecka_barevno_pruhledna_okraj2.png')

const textura_O3_area = textureLoader.load('/images/PozemekWebGl/textures/areas/O3_area2.png')
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
// const sectionDOM = document.getElementsByClassName('pozemek-webgl-section').style;
// console.log(sectionDOM)


// Axes Helper
const axesHelper = new THREE.AxesHelper(2)
scene.add(axesHelper)

 /**
 * Mouse
 */
const mouse = new THREE.Vector2()
window.addEventListener('mousemove', (event) =>
{
    // console.log(event.clientX, event.clientY)
    mouse.x = event.clientX / sizes.width * 2 - 1
    mouse.y = - (event.clientY / sizes.height) * 2 + 1
    // console.log(mouse);
})

/**
 * Map
 */
 const mapGeo = new THREE.
    PlaneGeometry( 1772, 785 );
 const MapGreyMat = new THREE.
    MeshBasicMaterial( { map: texturaPozemku_seda} );
 const MapColorMat = new THREE.
    MeshBasicMaterial( 
    { map: texturaPozemku_barevno_pruhledna,
         transparent: true } );
 const mapGrey = new THREE.
    Mesh( mapGeo, MapGreyMat );
 const mapColor = new THREE.
    Mesh( mapGeo, MapColorMat );
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
    new THREE.MeshBasicMaterial({
        color: new THREE.Color('white'), 
        transparent: true, 
        opacity: 0.75, 
        map: textura_O3_area
    })
 )
 scene.add(O3_area)
 O3_area.userData = { 
    text: 'Pro děti z kasičky (100,-)', 
    area: 'O3'}
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


const initLoaded_O3 = () => {
    let j = 0;
    const loaded_O3 = getCurrentLoadedO3()
    console.log('Délka pole: ', loaded_O3.length)
    for (let i = 0; i < loaded_O3.length; i++) {
        
        
        const o3Data = loaded_O3[i];

        const O3_obj = new THREE.Mesh(O3_geo, new THREE.MeshBasicMaterial({ color:  parameters.O3_hoverC}))
        // O3_obj.translateY(i * 3 + offsetY)
        // O3_obj.translateX(j * 3 + offsetX)
        // O3_obj.rotateZ(angle_90)
        O3_obj.userData = {
                        i: i,
                        j: j,
                        avaible: !o3Data.isBought,
                        selected: false
                    }
                    objectsToTest.push(O3_obj)
                    O3_group.add(O3_obj)
                   
                    j = i % 10 == 0 ? j++ : j
    }
    // loaded_O3.forEach(o3 => {
    //     const O3_obj = new THREE.Mesh(O3_geo, new THREE.MeshBasicMaterial({ color:  parameters.O3_hoverC}))
        
//         O3_obj.translateX(j * 3 + offsetX)
//         O3_obj.rotateZ(angle_90)
//         O3_obj.userData = {
//             i: i,
//             j: j,
//             avaible: true,
//             selected: false
//         }
//         if (i === j) O3_obj.userData.selected = true
        // objectsToTest.push(O3_obj)
        // O3_group.add(O3_obj)
    // });
}
// for (let i = 1; i <= O3_rows; i++) {
//     for (let j = 1; j <= O3_columns; j++) {
//         let O3_mat;
//         if (i === j) {
//             O3_mat = new THREE.MeshBasicMaterial({ color:  parameters.O3_hoverC})

//         } else {
//             O3_mat = new THREE.MeshBasicMaterial({ color:  parameters.avaibleC})
//         } 
//         const O3_obj = new THREE.Mesh(O3_geo, O3_mat)
//         O3_obj.translateY(i * 3 + offsetY)
//         O3_obj.translateX(j * 3 + offsetX)
//         O3_obj.rotateZ(angle_90)
//         O3_obj.userData = {
//             i: i,
//             j: j,
//             avaible: true,
//             selected: false
//         }
//         if (i === j) O3_obj.userData.selected = true
//         objectsToTest.push(O3_obj)
//         O3_group.add(O3_obj)
//         if (j % 10 === 0) {
//             offsetX += 5
//         }    
//     }
//     offsetX = 0
//     if (i % 20 === 0) {
//         offsetY += 5
//     }
// }

// O3_group.rotateZ(-0.15)
// O3_group.translateX(-490)
// O3_group.translateY(-102)
// scene.add(O3_group)

/**
 * BluePlane (O4 - Object 4 edges(vertices)) 200,-
 */

const O4_group = new THREE.Group()

// const O4_rows = 100;
// const O4_columns = 30;
// const O4_radius = 2;
// const O4_geo = new THREE.PlaneGeometry(O4_radius, O4_radius)



// offsetY = 0;
// offsetX = 0;
// for (let i = 1; i <= O4_rows; i++) {
//     for (let j = 1; j <= O4_columns; j++) {
//         let O4_mat;
//         if (i === j) {
//             O4_mat = new THREE.MeshBasicMaterial({ color:  parameters.O4_hoverC})

//         } else {
//             O4_mat = new THREE.MeshBasicMaterial({ color:  parameters.avaibleC})
//         } 
//         const O4_obj = new THREE.Mesh(O4_geo, O4_mat)
//         O4_obj.translateY(i * 3 + offsetY)
//         O4_obj.translateX(j * 3 + offsetX)
//         O4_obj.rotateZ(angle_90)
//         O4_obj.userData = {
//             i: i,
//             j: j,
//             avaible: true,
//             selected: false
//         }
//         if (i === j) O4_obj.userData.selected = true
//         objectsToTest.push(O4_obj)
//         O4_group.add(O4_obj)
//         // console.log('Trojúhelník č. '+ i +' přidán');    
//         if (j % 10 === 0) {
//             offsetX += 5
//         }    
//     }
//     offsetX = 0
//     if (i % 20 === 0) {
//         offsetY += 5
//     }
// }
// O4_group.rotateZ(-0.15)
// O4_group.translateX(-240)
// O4_group.translateY(-102)
// scene.add(O4_group)




/**
 * Sizes
 */
const sizes = {
    // width: webGlSectionDOM.offsetWidth,
    // height: webGlSectionDOM.offsetHeight
    width: window.innerWidth,
    height: window.innerHeight
}
console.log(sizes)

window.addEventListener('resize', () =>
{
    // // Update sizes
    // sizes.width = webGlSectionDOM.offsetWidth.innerWidth
    // sizes.height = webGlSectionDOM.offsetWidth.innerHeight

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
const camera = new THREE
.PerspectiveCamera(
    35,
    sizes.width / sizes.height,
    0.1,
    5000)
camera.position.set(-76, -8.09, 1713)
scene.add(camera)

window.addEventListener('click', async () => {
    raycaster.setFromCamera(mouse, camera)

    
    // Clicks to Objects
    // Objects
    console.log('objectsToTest in click listener: ', objectsToTest)
    const intersects = raycaster.intersectObjects(objectsToTest)

    console.log('Intersects: ', intersects);
    for(const intersect of intersects)
    {
        if (intersect.object.userData.avaible) {
            // pozemek lze zakoupit
            if (intersect.object.userData.selected) {    
                // pozemek již vybrán   
               intersect.object.material.color.set(parameters.avaibleC)
               intersect.object.userData.selected = false;
               console.log('Odvybírám')
               removePiece(intersect.object.userData.number)
               // odebrat z košíku
            } else {
                // vybrání pozemku
            intersect.object.material.color.set(parameters.O3_hoverC)
            intersect.object.userData.selected = true;
            console.log('Vybírám')
            console.log('selected:', {...intersect.object.userData})
            addToBuy({...intersect.object.userData})
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
                fetchFewLandPiecesO3().then((response) => {
                    // initLoaded_O3()
                    // scene.add(O3_group)
                    isAreaChoosingMode = false
                    intersect.object.visible = false
                    
                    controls.target = O3_area.position;
                    console.log('Pozice oblasti: ', O3_area.position)
                    
                    // controls.position0 = new THREE.Vector3(...cameraPositions.O3_area)
                    camera.position.set( cameraPositions.O3_area.x, cameraPositions.O3_area.y, cameraPositions.O3_area.z)   
                }).catch(err => console.log(err))               
            }
            if (intersect.object.userData.area === 'O4') {
                scene.add(O3_group)
                scene.add(O4_group)
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

}

export const reRender_O3 = (loaded_O3) => {
    objectsToTest.splice(0, objectsToTest.length)
    console.log('Délka pole: ', loaded_O3.length)
    scene.remove(O3_group)
    let j = 0;
    for (let i = 0; i < loaded_O3.length; i++) {        
        const o3Data = loaded_O3[i];
        const O3_obj = new THREE.Mesh(
            O3_geo, 
            new THREE.MeshBasicMaterial({ 
                color:  o3Data.isBought ? 
                parameters.O3_hoverC : parameters.avaibleC
            }))
        O3_obj.translateY(i * 3 + offsetY)
        O3_obj.translateX(j * 3 + offsetX)
        O3_obj.rotateZ(angle_90)
        O3_obj.userData = {
                        number: o3Data.number,
                        i: i,
                        j: j,
                        avaible: !o3Data.isBought,
                        selected: false,
                    }
                    objectsToTest.push(O3_obj)
                    O3_group.add(O3_obj)
                    j = i % 10 == 0 ? j++ : j
    }
    console.log('ObjectsToTest: ', objectsToTest)
    scene.add(O3_group)
    // loaded_O3.forEach(o3 => {
    //     const O3_obj = new THREE.Mesh(O3_geo, new THREE.MeshBasicMaterial({ color:  parameters.O3_hoverC}))
        
//         O3_obj.translateX(j * 3 + offsetX)
//         O3_obj.rotateZ(angle_90)
//         O3_obj.userData = {
//             i: i,
//             j: j,
//             avaible: true,
//             selected: false
//         }
//         if (i === j) O3_obj.userData.selected = true
        // objectsToTest.push(O3_obj)
        // O3_group.add(O3_obj)
    // });
    
}