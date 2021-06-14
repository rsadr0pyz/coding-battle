import { EventType } from 'typed-core/dist/events';
import { Player } from './entity';

export interface GameEventList extends EventType<GameEventList> {
  // Core
  gameStart: {
    players: Player[];
  };

  renderRequest: 0

}
