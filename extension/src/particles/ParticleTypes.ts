export interface ParticleType {
  // combo of these two should be unique
  stampId: string;
  corner: CornerType;

  vx: number;
  vy: number;
  px: number;
  py: number;
}

export interface RectangleType {
  stampId: string;
  height: number;
  width: number;
}

export type CornerType = "NE" | "SE" | "NW" | "SW" | "C";
