import * as THREE from 'three';

export class SceneManager {
  constructor() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x202020);
    this.scene.fog = new THREE.Fog(this.scene.background, 8, 35);

    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    this.camera.position.set(0, 1.8, -6);
    this.camera.lookAt(0, -0.2, 0);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    document.body.appendChild(this.renderer.domElement);

    this.scene.add(new THREE.AmbientLight(0xffffff, 1.5));

    const sun = new THREE.DirectionalLight(0xffffff, 2);
    sun.position.set(5, 10, 5);
    this.scene.add(sun);

    this.ground = new THREE.Mesh(
      new THREE.PlaneGeometry(200, 200),
      new THREE.MeshBasicMaterial({ color: 0x4f8a3c })
    );
    this.ground.rotation.x = -Math.PI / 2;
    this.ground.position.y = -1;
    this.scene.add(this.ground);

    this.controlsHint = document.createElement('div');
    this.controlsHint.textContent = 'Rijden: ZQSD of pijltjestoetsen';
    Object.assign(this.controlsHint.style, {
      position: 'fixed',
      top: '16px',
      left: '16px',
      padding: '10px 14px',
      color: '#fff',
      background: 'rgba(0, 0, 0, 0.65)',
      borderRadius: '6px',
      font: '14px system-ui, sans-serif',
      pointerEvents: 'none',
    });
    document.body.appendChild(this.controlsHint);

    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  showModelLoadError() {
    this.controlsHint.textContent =
      'Bus laden mislukt. Controleer public/models/van.glb.';
  }
}
