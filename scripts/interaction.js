import { scene, camera, renderer } from "./initScene.js";

let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();
let selectedObject = null;
let originalMaterials = new Map();

function setupInteraction() {
  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("click", onMouseClick);

  // Close button functionality
  const closeBtn = document.getElementById("close-panel");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      if (selectedObject) {
        deselectObject(selectedObject);
        selectedObject = null;
      }
    });
  }
}

function onMouseMove(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(scene.children, true);

  if (selectedObject && !selectedObject.userData.isSelected) {
    resetObjectAppearance(selectedObject);
  }

  if (intersects.length > 0) {
    selectedObject = intersects[0].object;
    if (!selectedObject.userData.isSelected) {
      highlightObject(selectedObject);
    }
  } else {
    selectedObject = null;
  }
}

function onMouseClick(event) {
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(scene.children, true);

  if (intersects.length > 0) {
    const object = intersects[0].object;

    if (object.userData.isSelected) {
      deselectObject(object);
    } else {
      scene.traverse((child) => {
        if (child.userData.isSelected) {
          deselectObject(child);
        }
      });
      selectObject(object);
    }
  } else {
    scene.traverse((child) => {
      if (child.userData.isSelected) {
        deselectObject(child);
      }
    });
  }
}

function highlightObject(object) {
  if (!object.material) return;

  if (!originalMaterials.has(object)) {
    originalMaterials.set(object, object.material.clone());
  }

  const highlightMaterial = object.material.clone();
  highlightMaterial.emissive = new THREE.Color(0x666666);
  highlightMaterial.emissiveIntensity = 0.2;
  object.material = highlightMaterial;
}

function selectObject(object) {
  if (!object.material) return;

  object.userData.isSelected = true;

  const selectMaterial = object.material.clone();
  selectMaterial.emissive = new THREE.Color(0x444444);
  selectMaterial.emissiveIntensity = 0.4;
  object.material = selectMaterial;

  const infoPanel = document.getElementById("info-panel");
  const partName = document.getElementById("part-name");
  const partDescription = document.getElementById("part-description");

  if (infoPanel) {
    partName.textContent = object.name || "Unnamed Part";
    partDescription.textContent =
      object.userData.description || "No description available.";
    infoPanel.classList.remove("hidden");
  }
}

function deselectObject(object) {
  if (!object.material) return;

  object.userData.isSelected = false;
  resetObjectAppearance(object);

  const infoPanel = document.getElementById("info-panel");
  if (infoPanel) {
    infoPanel.classList.add("hidden");
  }
}

function resetObjectAppearance(object) {
  if (!object.material) return;

  const originalMaterial = originalMaterials.get(object);
  if (originalMaterial) {
    object.material = originalMaterial.clone();
  }
}

export { setupInteraction };
