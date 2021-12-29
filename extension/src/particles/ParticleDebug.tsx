import React, { useEffect, useState } from "react";
import { ParticleType } from "../particles/ParticleTypes";
import {
  addEdgeForces,
  addMutualRepulsion,
  getNewParticleArray,
  updateParticles,
} from "./ParticleSystemUtils";
import { addCenterGravity, update } from "./ParticleUtils";
import { FRAME_TIME_GAP, LOWER_BOUND_VELOCITY } from "./constants";
import { RectangleType } from "./ParticleTypes";

const starterParticles: ParticleType[] = [
  {
    py: 500,
    px: 200,
    vx: 10,
    vy: 10,
    stampId: "1",
    corner: "NE",
  },
  {
    py: 300,
    px: 700,
    vx: 10,
    vy: 10,
    stampId: "1",
    corner: "SE",
  },
  {
    py: 100,
    px: 700,
    vx: 10,
    vy: 10,
    stampId: "1",
    corner: "SW",
  },
  {
    py: 300,
    px: 200,
    vx: 10,
    vy: 10,
    stampId: "1",
    corner: "NW",
  },
];

const rects: RectangleType[] = [{ stampId: "1", height: 200, width: 200 }];

export default function DebugParticlesView() {
  const [particles, setParticles] = useState(starterParticles);

  useEffect(() => {
    setInterval(() => updateParticles(particles, setParticles), FRAME_TIME_GAP);
  }, []);

  return (
    <div>
      {particles.map((particle) => (
        <DebugParticleView particle={particle} />
      ))}
    </div>
  );
}

interface Props {
  particle: ParticleType;
}

function DebugParticleView({ particle }: Props) {
  return (
    <div
      className="absolute w-6 h-6 rounded-full bg-white text-black"
      style={{
        top: particle.py,
        left: particle.px,
        transition: `top ${FRAME_TIME_GAP}ms linear, left ${FRAME_TIME_GAP}ms linear`,
      }}
    >
      {particle.corner}
    </div>
  );
}
