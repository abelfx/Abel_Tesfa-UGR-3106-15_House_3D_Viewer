import { initScene, scene, camera, renderer, controls } from "./initScene.js";
import { addLighting } from "./addLighting.js";
import { createHouse } from "./createProduct.js";
import { setupInteraction } from "./interaction.js";
import { setupCameraAnimation, animateCamera } from "./cameraAnimation.js";

// Initialize everything
initScene();
addLighting();
createHouse();
setupInteraction();
setupCameraAnimation();

// Animation loop
function animate(time) {
  requestAnimationFrame(animate);

  // Update camera animation
  animateCamera(time);

  // Update controls
  if (controls) {
    controls.update();
  }

  // Render scene
  renderer.render(scene, camera);
}

// Start animation loop
animate();
