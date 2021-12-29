export type GeneralStampType =
  | VertListStampType
  | HorizListStampType
  | NodeStampType;

export type VertListStampType = StampBasics & {
  type: "VERT_LIST";
  items: StampItem[];
};
export type HorizListStampType = StampBasics & {
  type: "HORIZ_LIST";
  items: StampItem[];
};

export type NodeStampType = StampBasics & {
  type: "NODE";
};

export interface StampBasics {
  id: string;
  title: string;
  color: StampColor;
  isDone: boolean;
  angle: number;
  zIndex: number;
  xOffset: number;
  yOffset: number;
  isMoving: boolean;
}

export interface StampItem {
  content: string;
  isDone: boolean;
}

export type StampColor = "YELLOW" | "BLUE" | "RED";

export type StampDirection = "NORTH" | "EAST" | "SOUTH" | "WEST";

export type StampType = "VERT_LIST" | "HORIZ_LIST" | "NODE" | "BLOCK";
