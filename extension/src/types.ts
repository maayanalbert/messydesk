export type GeneralStampType = ListStampType;

export type ListStampType = StampBasics & ListStampExtras & { type: "LIST" };

export interface StampBasics {
  id: string;
  title: string;
  color: StampColor;
  isDone: boolean;
  direction: StampDirection;
  zIndex: number;
  xOffset: number;
  yOffset: number;
}

export interface ListStampExtras {
  items: StampItem[];
}

export interface StampItem {
  content: string;
  isDone: boolean;
}

export type StampColor = "YELLOW" | "BLUE" | "RED";

export type StampDirection = "NORTH" | "EAST" | "SOUTH" | "WEST";

export type StampType = "LIST";
