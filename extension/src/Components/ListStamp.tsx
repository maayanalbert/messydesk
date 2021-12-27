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

  console.log(stamp.title);
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
          borderRadius: "10px",
        }}
      >
        <input
          style={{
            background: "transparent",
            // width: `${stamp.title.length * 10}px`,
          }}
          className="text-white outline-none text-2xl border"
          value={stamp.title}
          onChange={(event) => updateStamp({ title: event.target.value })}
        />

        {/*<span*/}
        {/*  onChange={(e) => {*/}
        {/*    console.log("hi");*/}
        {/*  }}*/}
        {/*  className="input text-white outline-none text-2xl"*/}
        {/*  role="textbox"*/}
        {/*  contentEditable*/}
        {/*>*/}
        {/*  99*/}
        {/*</span>*/}
        {/*{stamp.items.map((item) => (*/}
        {/*  <input*/}
        {/*    value={item.content}*/}
        {/*    style={{ background: "transparent" }}*/}
        {/*    className="text-white outline-none"*/}
        {/*  />*/}
        {/*))}*/}
      </div>
    </CristalWrapper>
  );
}
