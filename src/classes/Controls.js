const DRIVING_KEYS = new Set([
  'z',
  'q',
  's',
  'd',
  'arrowup',
  'arrowleft',
  'arrowdown',
  'arrowright',
]);

export class Controls {
  constructor() {
    this.pressedKeys = new Set();
    this.handleKeyDown = (event) => {
      const key = event.key.toLowerCase();
      if (DRIVING_KEYS.has(key)) {
        event.preventDefault();
        this.pressedKeys.add(key);
      }
    };
    this.handleKeyUp = (event) => {
      this.pressedKeys.delete(event.key.toLowerCase());
    };
    this.handleBlur = () => this.pressedKeys.clear();

    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
    window.addEventListener('blur', this.handleBlur);
  }

  getThrottle() {
    const forward =
      this.pressedKeys.has('z') || this.pressedKeys.has('arrowup');
    const backward =
      this.pressedKeys.has('s') || this.pressedKeys.has('arrowdown');

    if (forward === backward) {
      return 0;
    }
    return forward ? 1 : -1;
  }

  getSteering() {
    const left =
      this.pressedKeys.has('q') || this.pressedKeys.has('arrowleft');
    const right =
      this.pressedKeys.has('d') || this.pressedKeys.has('arrowright');
    return Number(right) - Number(left);
  }
}
