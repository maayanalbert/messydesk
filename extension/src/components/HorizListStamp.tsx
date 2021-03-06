import React, { createRef, MouseEvent, useRef, useState } from "react";
import logo from "../logo.svg";
import { useStamp } from "../hooks/StampContext";
import {
  GeneralStampType,
  HorizListStampType,
  VertListStampType,
} from "../types";
import { useClickAndDrag } from "../hooks/useClickAndDrag";
import { useStampMove } from "../hooks/useStampMove";

interface Props {
  stampId: string;
}

export default function HorizListStamp({ stampId }: Props) {
  const [stamp, updateStamp] = useStamp(stampId);
  const stampRef: React.MutableRefObject<any> = useRef();

  useStampMove(stamp, updateStamp, stampRef);

  if (stamp.type !== "HORIZ_LIST") {
    console.error("Wrong stamp type passed in");
    return null;
  }

  return (
    <div
      ref={stampRef}
      className="w-64 text-white p-3 absolute"
      style={{
        background: "rgb(250, 25, 25)",
        top: stamp.yOffset,
        left: stamp.xOffset,
        transform: "rotate(20deg)",
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
      <div className="flex flex-row flex-wrap">
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
    </div>
  );
}
