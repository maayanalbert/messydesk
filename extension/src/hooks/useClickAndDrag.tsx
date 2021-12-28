import { useEffect, useState, MouseEvent } from "react";
import { useEventListener } from "./useEventListener";

export function useClickAndDrag(
  ref: React.MutableRefObject<any>,
  onDrag: (_: MouseEvent<HTMLDivElement, MouseEvent>) => void
) {
  const [mouseIsDown, setMouseIsDown] = useState(false);

  const onMouseMove = (event: MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (mouseIsDown) {
      onDrag(event);
    }
  };

  const onMouseUp = () => {
    setMouseIsDown(false);
  };

  useEventListener("mouseup", onMouseUp);
  useEventListener("mousemove", onMouseMove);

  useEffect(() => {
    ref.current.onmousedown = () => setMouseIsDown(true);
  }, [ref]);
}
