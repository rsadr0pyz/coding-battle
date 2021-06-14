export interface Block {
  color: string;
  solid: boolean;
}

export namespace Block {
  export type Primitive = Solid | Liquid | NonSolid;

  export class Solid implements Block {
    solid = true as const;
    constructor(public color: string) {}
  }

  export class NonSolid implements Block {
    solid = false as const;
    constructor(public color: string) {}
  }

  export class Liquid implements Block {
    solid = false as const;
    constructor(public color: string) {}
  }
}
