const directions = ["N", "E", "S", "W"] as const;
type Direction = typeof directions[number];

type Robot = {
  x: number;
  y: number;
  direction: Direction;
  commands: string;
  isLost: boolean;
};

type Grid = {
  maxX: number;
  maxY: number;
};

export { directions };
export type { Direction, Grid, Robot };
