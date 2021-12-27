import React, { useState } from "react";
import logo from "../logo.svg";
import { useStamp } from "../hooks/StampContext";
import CristalWrapper from "./CristalWrapper";
import { ListStampType } from "../types";

interface Props {
  stampId: string;
}

export default function ListStamp({ stampId }: Props) {
  const [stamp, setStamp] = useStamp(stampId);

  const updateStamp = (params: Partial<ListStampType>) => {
    const newStamp = { ...stamp, ...params };
    setStamp(newStamp);
  };

  return (
    <CristalWrapper
      starterXOffset={stamp.xOffset}
      starterYOffset={stamp.yOffset}
      updateXCallback={(xOffset: number) => updateStamp({ xOffset })}
      updateYCallback={(yOffset: number) => updateStamp({ yOffset })}
    >
      <div
        className="w-64 text-white p-3"
        style={{
          background: "rgb(0, 50, 250)",
          // borderRadius: "20px",
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
    </CristalWrapper>
  );
}
