import React, { MouseEvent, useRef } from "react";
import { useStamp } from "../hooks/StampContext";
import { NodeStampType } from "../types";
import { useClickAndDrag } from "../hooks/useClickAndDrag";

interface Props {
  stampId: string;
}

export default function NodeStamp({ stampId }: Props) {
  const [stamp, setStamp] = useStamp(stampId);

  const updateStamp = (params: Partial<NodeStampType>) => {
    const newStamp = { ...stamp, ...params } as NodeStampType;
    setStamp(newStamp);
  };

  const stampRef: React.MutableRefObject<any> = useRef();

  const onDrag = (event: MouseEvent<HTMLDivElement, MouseEvent>) => {
    updateStamp({
      xOffset: event.movementX + stamp.xOffset,
      yOffset: event.movementY + stamp.yOffset,
    });
  };

  useClickAndDrag(stampRef, onDrag);

  if (stamp.type !== "NODE") {
    console.error("Wrong stamp type passed in");
    return null;
  }

  return (
    <div
      ref={stampRef}
      className="w-32 text-white p-3 absolute rounded-full h-32 flex justify-center items-center"
      style={{
        background: "rgb(25, 250, 25)",
        top: stamp.yOffset,
        left: stamp.xOffset,
        transform: "rotate(10deg)",
      }}
    >
      <div>
        <input
          style={{
            background: "transparent",
          }}
          size={stamp.title.length}
          className="outline-none text-2xl"
          value={stamp.title}
          onChange={(event) => updateStamp({ title: event.target.value })}
        />
      </div>
    </div>
  );
}
