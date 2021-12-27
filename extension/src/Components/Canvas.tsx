import React from "react";
import { useStamps } from "../hooks/StampContext";
import ListStamp from "./ListStamp";
import { GeneralStampType } from "../types";

export default function Canvas() {
  const [stamps, _] = useStamps();
  return (
    <div className="h-screen w-full">
      {Array.from(stamps.values()).map((stamp) => {
        if (stamp.type === "LIST") {
          return <ListStamp stampId={stamp.id} />;
        } else {
          return null;
        }
      })}
    </div>
  );
}
