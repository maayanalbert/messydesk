import React from "react";
import { useStamps } from "../StampContext";
import ListStamp from "./ListStamp";

export default function Canvas() {
  const [stamps, _] = useStamps();
  return (
    <div style={{ width: "100%", height: "100vh", background: "BLACK" }}>
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
