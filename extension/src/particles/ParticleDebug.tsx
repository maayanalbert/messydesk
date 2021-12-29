import React, { useEffect, useState } from "react";
import { ParticleType } from "../particles/ParticleType";
import { addMutualRepulsion, getNewParticleArray } from "./ParticleSystemUtils";
import { addCenterGravity, update } from "./ParticleUtils";
import { LOWER_BOUND_VELOCITY } from "./constants";

const starterParticles: ParticleType[] = [
  {
    py: 500,
    px: 200,
    vx: 10,
    vy: 10,
    stampId: "",
    corner: "NE",
  },
  {
    py: 300,
    px: 700,
    vx: 10,
    vy: 10,
    stampId: "",
    corner: "NE",
  },
  {
    py: 100,
    px: 700,
    vx: 10,
    vy: 10,
    stampId: "",
    corner: "NE",
  },
  {
    py: 300,
    px: 200,
    vx: 10,
    vy: 10,
    stampId: "",
    corner: "NE",
  },
];

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

const FRAME_TIME_GAP = 1000 / 5;

function updateParticles(
  particles: ParticleType[],
  setParticles: (_: ParticleType[]) => void
) {
  const newParticles = getNewParticleArray(particles);
  for (let i = 0; i < particles.length; i++) {
    newParticles[i] = addCenterGravity(newParticles[i]);

    newParticles[i] = update(newParticles[i]);

    // newParticles[i].px = 0;
    // newParticles[i].py = 0;
  }

  setParticles(addMutualRepulsion(newParticles));
}

interface Props {
  particle: ParticleType;
}

function DebugParticleView({ particle }: Props) {
  return (
    <div
      className="absolute w-6 h-6 rounded-full bg-white"
      style={{
        top: particle.py,
        left: particle.px,
        transition: `top ${FRAME_TIME_GAP}ms linear, left ${FRAME_TIME_GAP}ms linear`,
      }}
    />
  );
}
