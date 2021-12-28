import React, { ReactNode, useState, createContext, useEffect } from "react";
import uuidv4 from "uuidv4";
import {
  GeneralStampType,
  HorizListStampType,
  NodeStampType,
  VertListStampType,
} from "../types";

const starterStamp: VertListStampType = {
  title: "blackpink",
  color: "YELLOW",
  id: uuidv4(),
  isDone: false,
  direction: "NORTH",
  zIndex: 0,
  items: [
    { content: "kill this love", isDone: false },
    {
      content: "whistle",
      isDone: false,
    },
    {
      content: "pretty savage",
      isDone: false,
    },
    {
      content: "lovesick girls",
      isDone: false,
    },
    {
      content: "as if it's your last",
      isDone: false,
    },
    {
      content: "ice cream",
      isDone: false,
    },
    {
      content: "bet you wanna",
      isDone: false,
    },
    {
      content: "on the ground",
      isDone: false,
    },
    {
      content: "sour candy",
      isDone: false,
    },
  ],
  type: "VERT_LIST",
  xOffset: 200,
  yOffset: 200,
  isMoving: false,
};

const starterStamp2: HorizListStampType = {
  title: "red velvet",
  color: "YELLOW",
  id: uuidv4(),
  isDone: false,
  direction: "NORTH",
  zIndex: 0,
  items: [
    { content: "dumb dumb", isDone: false },
    {
      content: "bad boy",
      isDone: false,
    },
    {
      content: "really bad boy",
      isDone: false,
    },
    {
      content: "psycho (me)",
      isDone: false,
    },
    {
      content: "talk to me",
      isDone: false,
    },
    {
      content: "zim zala bim",
      isDone: false,
    },
    {
      content: "monster",
      isDone: false,
    },
    {
      content: "naughty",
      isDone: false,
    },
    {
      content: "hello",
      isDone: false,
    },
  ],
  type: "HORIZ_LIST",
  xOffset: 400,
  yOffset: 200,
  isMoving: false,
};

const starterStamp3: NodeStampType = {
  title: "enhypen",
  color: "YELLOW",
  id: uuidv4(),
  isDone: false,
  direction: "NORTH",
  zIndex: 0,
  type: "NODE",
  xOffset: 400,
  yOffset: 400,
  isMoving: false,
};

const starterStamps = new Map();
starterStamps.set(starterStamp.id, starterStamp);
starterStamps.set(starterStamp2.id, starterStamp2);
starterStamps.set(starterStamp3.id, starterStamp3);

const stampStarterContext: StampContextType = [starterStamps, (_) => undefined];

const StampContext = createContext(stampStarterContext);

type StampContextType = [
  Map<string, GeneralStampType>,
  (_: Map<string, GeneralStampType>) => void
];

export function StampContextProvider(props: { children: ReactNode }) {
  const { children } = props;
  return (
    <StampContext.Provider value={useState(starterStamps)}>
      {children}
    </StampContext.Provider>
  );
}

export function useStamps(): StampContextType {
  const context = React.useContext(StampContext);
  if (context === undefined) {
    throw new Error(`stamp context must be used within the correct provider`);
  }

  return context;
}

export function useStamp(
  stampId: string
): [GeneralStampType, (_: Partial<GeneralStampType>) => void] {
  const [stamps, setStamps] = useStamps();
  const stamp = stamps.get(stampId);

  if (!stamp) {
    throw new Error(`stamps missing given stamp id`);
  }

  const updateStamp = (params: Partial<GeneralStampType>) => {
    const newStamp = { ...stamp, ...params } as GeneralStampType;
    const newStamps = new Map(stamps);
    newStamps.set(stampId, newStamp);
    setStamps(newStamps);
  };

  return [stamp, updateStamp];
}
