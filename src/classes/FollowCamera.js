import * as THREE from 'three';

export class FollowCamera {
  constructor(camera, target) {
    this.camera = camera;
    this.target = target;
    this.offset = new THREE.Vector3(0, 3, -6);
    this.lookOffset = new THREE.Vector3(0, 0.8, 0);
    this.desiredPosition = new THREE.Vector3();
    this.lookTarget = new THREE.Vector3();
  }

  update(delta) {
    this.desiredPosition
      .copy(this.offset)
      .applyQuaternion(this.target.quaternion)
      .add(this.target.position);
    this.camera.position.lerp(
      this.desiredPosition,
      1 - Math.exp(-5 * delta)
    );
    this.lookTarget.copy(this.target.position).add(this.lookOffset);
    this.camera.lookAt(this.lookTarget);
  }
}
