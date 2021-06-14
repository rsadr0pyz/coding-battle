import { Entity } from './entity';
import { Block } from './block';

export type Element = Entity | Block;
export type NotEmptyArray<T> = { 0: T } & T[];
export type Pair<T> = [T, T];
export type Maybe<T> = T | undefined | null;
