import { GeneralStampType } from "../types";
import { useEffect } from "react";
import { useStamp } from "./StampContext";

export function useUpdateStamp(stampId: string) {
  const [stamp, setStamp] = useStamp(stampId);

  return (params: Partial<GeneralStampType>) => {
    const newStamp = { ...stamp, ...params } as GeneralStampType;
    setStamp(newStamp);
  };
}
