import { useEffect, useState, MouseEvent } from "react";
import { useEventListener } from "./useEventListener";

export function useClickAndDrag(
  ref: React.MutableRefObject<any>,
  onDrag: (e: MouseEvent<HTMLDivElement, MouseEvent>) => void,
  onDragEnd?: (e: MouseEvent<HTMLDivElement, MouseEvent>) => void
) {
  const [mouseIsDown, setMouseIsDown] = useState(false);

  const onMouseMove = (event: MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (mouseIsDown) {
      onDrag(event);
    }
  };

  const onMouseUp = (event: MouseEvent<HTMLDivElement, MouseEvent>) => {
    setMouseIsDown(false);
    onDragEnd && onDragEnd(event);
  };

  useEventListener("mouseup", onMouseUp);
  useEventListener("mousemove", onMouseMove);

  useEffect(() => {
    ref.current.onmousedown = (
      event: MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
      setMouseIsDown(true);
    };
  }, [ref]);
}
