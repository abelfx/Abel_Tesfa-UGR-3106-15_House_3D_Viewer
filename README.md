# 🏠 Interactive 3D House Viewer (Three.js)

An interactive 3D product viewer built with **Three.js**, featuring a **house model** composed entirely from basic geometries (boxes, cylinders, spheres, etc.). This project demonstrates foundational 3D concepts including scene setup, camera control, lighting, raycasting, and animation.

---

## 🚀 Features

### 📦 1. Scene Setup
- `PerspectiveCamera` for realistic depth.
- `WebGLRenderer` rendering to a canvas.
- Responsive resizing on window change.
- `OrbitControls` for zoom and pan interaction.

### 🏠 2. 3D Product: House Model
- Constructed using basic geometries (`BoxGeometry`, `CylinderGeometry`, etc.).
- Centered at `(0, 0, 0)` for consistent rotation and viewing.
- Organized using grouped meshes to represent parts like walls, roof, door, etc.

### 💡 3. Lighting
- `AmbientLight` for soft general illumination.
- `DirectionalLight` for depth and shadows.
- Balanced light placement for visual appeal.

### 🖱️ 4. Mouse Interaction
- Raycasting to detect mouse clicks on parts of the house.
- Click feedback: highlight effect (e.g., color change or scale up).
- Small popup or label showing the part name (e.g., "Door", "Roof").
- Optional hover effects.

### 🎥 5. Camera Animation
- Smooth automatic rotation around the Y-axis using polar coordinates or tweening.
- Camera always looks at the center of the house.
- Auto-rotation pauses on user interaction (optional).

### 🔁 6. Animation Loop
- Real-time rendering using `requestAnimationFrame`.
- Optional mesh animations (floating, pulsing effects for life-like appearance).

