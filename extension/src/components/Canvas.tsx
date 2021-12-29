import React from "react";
import { useStamps } from "../hooks/StampContext";
import VertListStamp from "./VertListStamp";
import HorizListStamp from "./HorizListStamp";
import NodeStamp from "./NodeStamp";
import DebugParticlesView from "../particles/ParticleDebug";

export default function Canvas() {
  const [stamps, _] = useStamps();
  return (
    <div className="h-screen w-full">
      <DebugParticlesView />
      {/*{Array.from(stamps.values()).map((stamp) => {*/}
      {/*  if (stamp.type === "VERT_LIST") {*/}
      {/*    return <VertListStamp stampId={stamp.id} />;*/}
      {/*  } else if (stamp.type === "HORIZ_LIST") {*/}
      {/*    return <HorizListStamp stampId={stamp.id} />;*/}
      {/*  } else if (stamp.type === "NODE") {*/}
      {/*    return <NodeStamp stampId={stamp.id} />;*/}
      {/*  } else {*/}
      {/*    return null;*/}
      {/*  }*/}
      {/*})}*/}
    </div>
  );
}
