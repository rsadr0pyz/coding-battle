import { Maybe, Pair } from '../types';
import { Block } from '../block';
import { Entity } from '../entity';
import { World } from '../world';

export class Slot {
  /**
   * Undefined represents that this slots block is solid.
   * Null and nonNull represents that this slot isn't solid, but has or not an entity.
   */
  entity: Maybe<Entity>;

  constructor(
    world: World,
    block: Block.NonSolid,
    coordinates: Pair<number>,
    entity: Entity | null
  );
  constructor(world: World, block: Block.Solid, coordinates: Pair<number>);
  constructor(
    readonly world: World,
    readonly block: Block,
    readonly coordinates: Pair<number>,
    entity?: Entity | null
  ) {
    this.entity = entity;
  }

  setEntity(entity: Maybe<Entity>): void {
    if(entity) {
      entity.slot = this;
    }
    this.entity = entity;
  }
}
