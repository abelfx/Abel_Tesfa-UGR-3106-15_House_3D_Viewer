import { camera, controls } from "./initScene.js";

let autoRotate = true;
let rotationSpeed = 0.5; // degrees per second
let lastTime = 0;
let isUserInteracting = false;
let interactionTimeout = null;

let radius = 10; // Distance from center of house
let height = 5; // Constant camera height

function setupCameraAnimation() {
  // Disable built-in OrbitControls auto-rotation
  controls.autoRotate = false;

  // Listen for user interaction
  controls.addEventListener("start", () => {
    isUserInteracting = true;
    autoRotate = false;

    if (interactionTimeout) clearTimeout(interactionTimeout);
  });

  controls.addEventListener("end", () => {
    isUserInteracting = false;

    interactionTimeout = setTimeout(() => {
      if (!isUserInteracting) autoRotate = true;
    }, 3000);
  });

  // Optional: Adjust speed with keyboard
  window.addEventListener("keydown", (event) => {
    switch (event.key) {
      case "ArrowUp":
        rotationSpeed = Math.min(rotationSpeed + 0.1, 2.0);
        break;
      case "ArrowDown":
        rotationSpeed = Math.max(rotationSpeed - 0.1, 0.1);
        break;
      case " ":
        autoRotate = !autoRotate;
        break;
    }
  });
}

function animateCamera(time) {
  if (!lastTime) {
    lastTime = time;
    return;
  }

  const delta = (time - lastTime) / 1000;
  lastTime = time;

  if (autoRotate && !isUserInteracting) {
    const angle = THREE.MathUtils.degToRad(rotationSpeed * delta * 60); // Convert to radians/frame

    const x = camera.position.x;
    const z = camera.position.z;
    const currentAngle = Math.atan2(z, x);
    const newAngle = currentAngle + angle;

    // Update camera position in orbit
    camera.position.x = radius * Math.cos(newAngle);
    camera.position.z = radius * Math.sin(newAngle);
    camera.position.y = height;

    camera.lookAt(0, 2, 0); // Look slightly above ground (toward house center)
  }

  controls.update();
}

export { setupCameraAnimation, animateCamera };
