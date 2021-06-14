import { Slot } from '../world';

export abstract class Entity {
  /**
   * Do not change this value manually
   */
  slot?: Slot;

  constructor(public readonly name: string, readonly color: string) {}

  canMove(x: 1, y: 0): boolean;
  canMove(x: -1, y: 0): boolean;
  canMove(x: 0, y: 1): boolean;
  canMove(x: 0, y: -1): boolean;
  canMove(x: number, y: number): boolean {
    if (!this.slot) {
      return false;
    }

    const [slotX, slotY] = this.slot.coordinates;

    // Slot - y para mover o foco crescente inferior direito para superior esquerdo
    const nextSlot = this.slot.world.getSlot(slotX + x, slotY - y);

    if (!nextSlot || nextSlot?.block.solid || nextSlot.entity) {
      return false;
    }

    return true;
  }

  move(x: 1, y: 0): boolean;
  move(x: -1, y: 0): boolean;
  move(x: 0, y: 1): boolean;
  move(x: 0, y: -1): boolean;
  move(x: number, y: number): boolean {
    if (!this.slot) {
      return false;
    }

    const [slotX, slotY] = this.slot.coordinates;

    // Slot - y para mover o foco crescente inferior direito para superior esquerdo
    const nextSlot = this.slot.world.getSlot(slotX + x, slotY - y);

    if (!nextSlot || nextSlot?.block.solid || nextSlot.entity) {
      return false;
    }

    this.slot.setEntity(null);
    nextSlot.setEntity(this);

    this.slot.world.game.emit('renderRequest', 0);

    return true;
  }

  moveUp() {
    return this.move(0, 1);
  }

  canMoveUp() {
    return this.canMove(0, 1);
  }

  moveDown() {
    return this.move(0, -1);
  }

  canMoveDown() {
    return this.canMove(0, -1);
  }

  moveRight() {
    return this.move(1, 0);
  }

  canMoveRight() {
    return this.canMove(1, 0);
  }

  moveLeft() {
    return this.move(-1, 0);
  }

  canMoveLeft() {
    return this.canMove(-1, 0);
  }
}
