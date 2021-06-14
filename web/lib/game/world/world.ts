import { randomInt } from 'lib/numbers';
import { Player } from '../entity';
import { Game } from '../game';
import { WorldGenerator } from '../generator';
import { NotEmptyArray, Pair } from '../types';
import { Slot } from './slot';

type SlotGroup = {
  [x: number]: {
    [y: number]: Slot;
  };
};

export class World {
  // xy
  readonly slots: SlotGroup = {};

  constructor(
    readonly generator: WorldGenerator,
    readonly game: Game,
    readonly size: Pair<number>,
    readonly players: NotEmptyArray<Player>
  ) {
    for (let x = 0; x < size[0]; x++) {
      for (let y = 0; y < size[1]; y++) {
        const block = generator.generate(x, y);
        const slot = block.solid
          ? new Slot(this, block, [x, y])
          : new Slot(this, block, [x, y], null);

        this.setSlot(x, y, slot);
      }
    }

    game.once('gameStart', ({ players }) => {
      players.forEach((p) => {
        let slot: Slot;
        do {
          slot = this.getSlot(randomInt(0, size[0]), randomInt(0, size[1]))!;
        } while (slot.block.solid);
        
        slot.setEntity(p);
      });
      game.emit('renderRequest', 0);
    });
  }

  public setSlot(x: number, y: number, slot?: Slot): void {
    if (!slot) {
      delete this.slots[x]?.[y];
      return;
    }

    if (!this.slots[x]) {
      this.slots[x] = [];
    }

    this.slots[x]![y] = slot;
  }

  public getSlot(x: number, y: number): Slot | undefined {
    return this.slots[x]?.[y];
  }

  public hasSlot(x: number, y: number): boolean {
    return !!this.getSlot(x, y);
  }
}
