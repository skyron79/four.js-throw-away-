import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const MAX_SPEED = 5;
const MAX_REVERSE_SPEED = 2.5;
const STEERING_SPEED = 1.8;

export class Van {
  constructor(scene, groundHeight) {
    this.group = new THREE.Group();
    this.group.position.y = groundHeight;
    scene.add(this.group);

    this.loader = new GLTFLoader();
    this.speed = 0;
    this.forward = new THREE.Vector3();
  }

  async loadModel(path) {
    const { scene: model } = await this.loader.loadAsync(path);
    const bounds = new THREE.Box3().setFromObject(model);
    const center = bounds.getCenter(new THREE.Vector3());
    model.position.x -= center.x;
    model.position.y -= bounds.min.y;
    model.position.z -= center.z;
    this.group.add(model);
  }

  update(delta, throttle, steering) {
    const targetSpeed =
      throttle > 0
        ? MAX_SPEED
        : throttle < 0
          ? -MAX_REVERSE_SPEED
          : 0;
    this.speed = THREE.MathUtils.damp(
      this.speed,
      targetSpeed,
      targetSpeed === 0 ? 5 : 2,
      delta
    );

    if (targetSpeed === 0 && Math.abs(this.speed) < 0.01) {
      this.speed = 0;
    }

    if (this.speed === 0) {
      return;
    }

    this.group.rotation.y +=
      steering * Math.sign(this.speed) * STEERING_SPEED * delta;
    this.forward.set(0, 0, 1).applyQuaternion(this.group.quaternion);
    this.group.position.addScaledVector(this.forward, this.speed * delta);
  }
}
