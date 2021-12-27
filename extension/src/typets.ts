export type GeneralStamp = ListStamp;

export type ListStamp = StampBasics & ListStampExtras & { type: "LIST" };

export interface StampBasics {
  id: string;
  title: string;
  color: StampColor;
  isDone: boolean;
  direction: StampDirection;
  zIndex: number;
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
