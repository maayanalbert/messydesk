import React, { ReactNode, useState, createContext } from "react";
import { GeneralStamp, ListStamp, StampItem } from "./typets";
import uuidv4 from "uuidv4";

const starterStamp: ListStamp = {
  title: "",
  color: "YELLOW",
  id: uuidv4(),
  isDone: false,
  direction: "NORTH",
  zIndex: 0,
  items: [],
  type: "LIST",
};

const starterStamps = new Map();
starterStamps.set(starterStamp.id, starterStamp);
const stampStarterContext: StampContextType = [starterStamps, (_) => undefined];

const StampContext = createContext(stampStarterContext);

type StampContextType = [
  Map<string, GeneralStamp>,
  (_: Map<string, GeneralStamp>) => void
];

export function StampContextProvider(props: { children: ReactNode }) {
  const { children } = props;

  return (
    <StampContext.Provider value={useState(new Map())}>
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
): [GeneralStamp, (_: GeneralStamp) => void] {
  const [stamps, setStamps] = useStamps();

  const stamp = stamps.get(stampId);

  if (!stamp) {
    throw new Error(`stamps missing given stamp id`);
  }

  const setStamp = (stamp: GeneralStamp) => {
    stamps.set(stampId, stamp);
    setStamps(stamps);
  };

  return [stamp, setStamp];
}
