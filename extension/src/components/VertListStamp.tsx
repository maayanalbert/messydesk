import React, { createRef, MouseEvent, useRef, useState } from "react";
import { useStamp } from "../hooks/StampContext";
import { useStampMove } from "../hooks/useStampMove";

interface Props {
  stampId: string;
}

export default function VertListStamp({ stampId }: Props) {
  const [stamp, updateStamp] = useStamp(stampId);
  const stampRef: React.MutableRefObject<any> = useRef();

  useStampMove(stamp, updateStamp, stampRef);

  if (stamp.type !== "VERT_LIST") {
    console.error("Wrong stamp type passed in");
    return null;
  }

  return (
    <div
      ref={stampRef}
      className="w-64 text-white p-3 absolute"
      style={{
        background: "rgb(25, 25, 250)",
        top: stamp.yOffset,
        left: stamp.xOffset,
        transform: "rotate(-20deg)",
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
      {stamp.items.map((item) => (
        <div>
          <input
            value={item.content}
            size={item.content.length}
            style={{ background: "transparent" }}
            className="outline-none"
          />
        </div>
      ))}
    </div>
  );
}
