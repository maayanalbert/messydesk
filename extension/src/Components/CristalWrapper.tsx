import { ReactNode, useState } from "react";
import { useEventListener } from "../hooks/useEventListener";

interface Props {
  children: ReactNode;
  starterXOffset: number;
  starterYOffset: number;
  updateXCallback: (_: number) => void;
  updateYCallback: (_: number) => void;
  additionalClassName?: string;
  additionalStyle?: any;
}

export default function CristalWrapper({
  children,
  starterXOffset,
  starterYOffset,
  updateXCallback,
  updateYCallback,
  additionalClassName,
  additionalStyle,
}: Props) {
  const [mouseIsDown, setMouseIsDown] = useState(false);
  const [xOffset, setXOffset] = useState(starterXOffset);
  const [yOffset, setYOffset] = useState(starterYOffset);

  const onMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (mouseIsDown) {
      setXOffset(xOffset + event.movementX);
      setYOffset(yOffset + event.movementY);
    }
  };

  const onMouseUp = () => {
    setMouseIsDown(false);
    updateXCallback(xOffset);
    updateYCallback(yOffset);
  };

  useEventListener("mouseup", onMouseUp);
  useEventListener("mousemove", onMouseMove);
  return (
    <div
      className={`absolute ${additionalClassName}`}
      style={{ top: yOffset, left: xOffset, ...additionalStyle }}
      onMouseDown={() => setMouseIsDown(true)}
    >
      {children}
    </div>
  );
}
