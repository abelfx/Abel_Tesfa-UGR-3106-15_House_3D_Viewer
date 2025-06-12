import { scene } from "./initScene.js";

function createHouse() {
  const house = new THREE.Group();
  house.name = "Simple House";

  // Materials
  const wallMaterial = new THREE.MeshStandardMaterial({
    color: 0xf554422, // beige
    roughness: 0.8,
    metalness: 0.1,
  });

  const roofMaterial = new THREE.MeshStandardMaterial({
    color: 0x654321, // dark red
    roughness: 0.6,
    metalness: 0.2,
  });

  const doorMaterial = new THREE.MeshStandardMaterial({
    color: 0x654321, // brown
    roughness: 0.7,
    metalness: 0.2,
  });

  const windowMaterial = new THREE.MeshStandardMaterial({
    color: 0x87ceeb, // sky blue glass
    roughness: 0.1,
    metalness: 0.3,
    transparent: true,
    opacity: 0.6,
  });

  // Main walls (cube)
  const wallGeometry = new THREE.BoxGeometry(4, 2.5, 4);
  const walls = new THREE.Mesh(wallGeometry, wallMaterial);
  walls.position.y = 1.25;
  walls.name = "House Walls";
  walls.userData.description = "Main structure of the house";
  walls.castShadow = true;
  walls.receiveShadow = true;
  house.add(walls);

  // Roof (cone)
  const roofGeometry = new THREE.ConeGeometry(3.2, 1.5, 4);
  const roof = new THREE.Mesh(roofGeometry, roofMaterial);
  roof.rotation.y = Math.PI / 4; // rotate to align with box
  roof.position.y = 3;
  roof.name = "Roof";
  roof.userData.description = "Pitched roof covering the house";
  roof.castShadow = true;
  house.add(roof);

  // Door (box)
  const doorGeometry = new THREE.BoxGeometry(0.8, 1.2, 0.1);
  const door = new THREE.Mesh(doorGeometry, doorMaterial);
  door.position.set(0, 0.6, 2.05);
  door.name = "Front Door";
  door.userData.description = "Wooden front door";
  door.castShadow = true;
  house.add(door);

  // Windows (2 small boxes)
  const windowGeometry = new THREE.BoxGeometry(0.6, 0.6, 0.05);

  const leftWindow = new THREE.Mesh(windowGeometry, windowMaterial);
  leftWindow.position.set(-1.2, 1.4, 2.05);
  leftWindow.name = "Left Window";
  leftWindow.userData.description = "Glass window for natural light";
  leftWindow.castShadow = true;
  house.add(leftWindow);

  const rightWindow = new THREE.Mesh(windowGeometry, windowMaterial);
  rightWindow.position.set(1.2, 1.4, 2.05);
  rightWindow.name = "Right Window";
  rightWindow.userData.description = "Glass window for natural light";
  rightWindow.castShadow = true;
  house.add(rightWindow);

  // Center the house at origin
  house.position.set(0, 0, 0);
  scene.add(house);

  return house;
}

export { createHouse };
