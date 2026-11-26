import * as THREE from 'three';
import { Controls } from './Controls.js';
import { FollowCamera } from './FollowCamera.js';
import { SceneManager } from './SceneManager.js';
import { Van } from './Van.js';

export class Game {
  constructor() {
    this.sceneManager = new SceneManager();
    this.controls = new Controls();
    this.van = new Van(this.sceneManager.scene, this.sceneManager.ground.position.y);
    this.followCamera = new FollowCamera(
      this.sceneManager.camera,
      this.van.group
    );
    this.clock = new THREE.Clock();
  }

  start() {
    this.van.loadModel('/models/van.glb').catch((error) => {
      console.error('Kon /models/van.glb niet laden.', error);
      this.sceneManager.showModelLoadError();
    });

    this.sceneManager.renderer.setAnimationLoop(() => this.update());
  }

  update() {
    const delta = Math.min(this.clock.getDelta(), 0.05);
    this.van.update(
      delta,
      this.controls.getThrottle(),
      this.controls.getSteering()
    );
    this.followCamera.update(delta);
    this.sceneManager.render();
  }
}
