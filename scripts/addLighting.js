import { scene } from './initScene.js';

function addLighting() {
    // Ambient light for general illumination
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    
    // Main directional light (sun-like)
    const mainLight = new THREE.DirectionalLight(0xffffff, 0.8);
    mainLight.position.set(5, 10, 7);
    mainLight.castShadow = true;
    
    // Configure shadow properties
    mainLight.shadow.mapSize.width = 2048;
    mainLight.shadow.mapSize.height = 2048;
    mainLight.shadow.camera.near = 0.5;
    mainLight.shadow.camera.far = 50;
    mainLight.shadow.camera.left = -10;
    mainLight.shadow.camera.right = 10;
    mainLight.shadow.camera.top = 10;
    mainLight.shadow.camera.bottom = -10;
    
    scene.add(mainLight);
    
    // Fill light from opposite side
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
    fillLight.position.set(-5, 5, -7);
    scene.add(fillLight);
    
    // Rim light for edge highlighting
    const rimLight = new THREE.DirectionalLight(0xffffff, 0.2);
    rimLight.position.set(0, 5, -10);
    scene.add(rimLight);
    
    // Hemisphere light for more natural ambient lighting
    const hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 0.3);
    scene.add(hemisphereLight);
    
    // Optional: Add light helpers for debugging
    if (window.location.hash === '#debug') {
        const mainLightHelper = new THREE.DirectionalLightHelper(mainLight, 1);
        scene.add(mainLightHelper);
        
        const fillLightHelper = new THREE.DirectionalLightHelper(fillLight, 1);
        scene.add(fillLightHelper);
        
        const rimLightHelper = new THREE.DirectionalLightHelper(rimLight, 1);
        scene.add(rimLightHelper);
    }
    
    return { ambientLight, mainLight, fillLight, rimLight, hemisphereLight };
}

export { addLighting };