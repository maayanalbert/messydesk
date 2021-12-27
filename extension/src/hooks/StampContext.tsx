import React, { ReactNode, useState, createContext, useEffect } from "react";
import uuidv4 from "uuidv4";
import { GeneralStampType, ListStampType } from "../types";

const starterStamp: ListStampType = {
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
  ],
  type: "LIST",
  xOffset: 200,
  yOffset: 200,
};

const starterStamps = new Map();
starterStamps.set(starterStamp.id, starterStamp);
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
): [GeneralStampType, (_: GeneralStampType) => void] {
  const [stamps, setStamps] = useStamps();
  const stamp = stamps.get(stampId);

  if (!stamp) {
    throw new Error(`stamps missing given stamp id`);
  }

  const setStamp = (stamp: GeneralStampType) => {
    const newStamps = new Map(stamps);
    newStamps.set(stampId, stamp);
    setStamps(newStamps);
  };

  return [stamp, setStamp];
}
