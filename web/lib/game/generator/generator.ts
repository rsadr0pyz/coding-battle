import { Block } from '../block';

export interface WorldGenerator {
  generate(x: number, y: number): Block.Primitive;
}
