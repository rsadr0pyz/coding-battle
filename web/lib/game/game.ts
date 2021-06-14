import { World } from './world';
import { EventEmitter } from 'typed-core/dist/events';
import { GameEventList } from './events';
import { PredefinedGenerator } from './generator';
import { Block } from './block';
import { Player } from './entity';
import { NotEmptyArray, Pair } from './types';
import { randomInt, range } from 'lib/numbers';

export class Game extends EventEmitter<GameEventList> {
  private started = false;

  readonly size = [40, 10] as Pair<number>;
  readonly world: World;
  readonly generator;

  constructor(readonly players: NotEmptyArray<Player>) {
    super();

    this.generator = new PredefinedGenerator(
      range(100).map(() => ({
        x: randomInt(0, this.size[0]),
        y: randomInt(0, this.size[1]),
        block: new Block.Solid('black')
      }))
    );

    this.world = new World(this.generator, this, this.size, this.players);

    this.once('gameStart', () => {
      this.started = true;
      this.on('gameStart', () => {
        throw new Error('Game already started');
      });
    });
  }

  hasStarted() {
    return this.started;
  }

  start() {
    this.emit('gameStart', {
      players: this.players
    });
  }
}
