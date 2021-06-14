import { Air, Block } from '../block';
import { WorldGenerator } from './generator';

export class PredefinedGenerator implements WorldGenerator {
  constructor(
    private readonly predefinedArr: {
      x: number;
      y: number;
      block: Block;
    }[]
  ) {}

  generate(x: number, y: number): Block.Primitive {
    for (const predefined of this.predefinedArr) {
      if (x === predefined.x && y === predefined.y) {
        return predefined.block;
      }
    }

    return new Air();
  }
}
