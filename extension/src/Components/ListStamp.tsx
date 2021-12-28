import React, { createRef, MouseEvent, useRef, useState } from "react";
import logo from "../logo.svg";
import { useStamp } from "../hooks/StampContext";
import CristalWrapper from "./CristalWrapper";
import { ListStampType } from "../types";
import { useClickAndDrag } from "../hooks/useClickAndDrag";

interface Props {
  stampId: string;
}

export default function ListStamp({ stampId }: Props) {
  const [stamp, setStamp] = useStamp(stampId);

  const updateStamp = (params: Partial<ListStampType>) => {
    const newStamp = { ...stamp, ...params };
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

  return (
    <div
      ref={stampRef}
      className="w-64 text-white p-3 absolute"
      style={{
        background: "rgb(0, 50, 250)",
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
