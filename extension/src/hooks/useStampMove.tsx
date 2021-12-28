import { GeneralStampType, HorizListStampType } from "../types";
import React, { MouseEvent } from "react";
import { useClickAndDrag } from "./useClickAndDrag";

export function useStampMove(
  stamp: GeneralStampType,
  updateStamp: (_: Partial<GeneralStampType>) => void,
  ref: React.MutableRefObject<any>
) {
  const onDrag = (event: MouseEvent<HTMLDivElement, MouseEvent>) => {
    updateStamp({
      xOffset: event.movementX + stamp.xOffset,
      yOffset: event.movementY + stamp.yOffset,
      isMoving: true,
    });
  };

  const onDragEnd = (event: MouseEvent<HTMLDivElement, MouseEvent>) => {
    updateStamp({
      isMoving: false,
    });
  };

  useClickAndDrag(ref, onDrag, onDragEnd);
}
