import { ParticleType } from "./ParticleTypes";
import {
  CENTER_GRAVITY_MULTIPLE,
  DAMPING,
  LOWER_BOUND_VELOCITY,
  MAX_SPEED,
} from "./constants";

export function addForce(
  particle: ParticleType,
  fx: number,
  fy: number
): ParticleType {
  const newParticle: ParticleType = Object.assign(particle);
  const ax = fx;
  const ay = fy;
  newParticle.vx += ax;
  newParticle.vy += ay;

  return newParticle;
}

export function addCenterGravity(particle: ParticleType): ParticleType {
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;

  const dx = Math.abs(particle.px - cx);
  const abs_fx = dx * CENTER_GRAVITY_MULTIPLE;

  const dy = Math.abs(particle.py - cy);
  const abs_fy = dy * CENTER_GRAVITY_MULTIPLE;

  const fx = particle.px > cx ? -abs_fx : abs_fx;
  const fy = particle.py > cy ? -abs_fy : abs_fy;

  return addForce(particle, fx, fy);
}

function haltIfSlowEnough(particle: ParticleType): ParticleType {
  const newParticle: ParticleType = Object.assign(particle);

  if (Math.abs(newParticle.vx) < LOWER_BOUND_VELOCITY) {
    newParticle.vx = 0;
  }

  if (Math.abs(newParticle.vy) < LOWER_BOUND_VELOCITY) {
    newParticle.vy = 0;
  }

  return newParticle;
}

export function update(particle: ParticleType): ParticleType {
  let newParticle: ParticleType = Object.assign(particle);
  newParticle.vx *= DAMPING;
  newParticle.vy *= DAMPING;

  newParticle = limitVelocities(newParticle);

  newParticle = handleBoundaries(newParticle);

  newParticle = haltIfSlowEnough(newParticle);

  newParticle.px = newParticle.px + newParticle.vx;

  newParticle.py = newParticle.py + newParticle.vy;

  return newParticle;
}

function limitVelocities(particle: ParticleType): ParticleType {
  const newParticle: ParticleType = Object.assign(particle);

  const speed = Math.sqrt(
    newParticle.vx * newParticle.vx + newParticle.vy * newParticle.vy
  );
  if (speed > MAX_SPEED) {
    newParticle.vx *= MAX_SPEED / speed;
    newParticle.vy *= MAX_SPEED / speed;
  }

  return newParticle;
}

function handleBoundaries(particle: ParticleType): ParticleType {
  const newParticle: ParticleType = Object.assign(particle);

  const boundaryDamping = Math.pow(DAMPING, 10);
  if (newParticle.px >= window.innerWidth) {
    newParticle.vx = Math.abs(newParticle.vx) * -1 * boundaryDamping;
    newParticle.px = window.innerWidth;
  }
  if (newParticle.px <= 0) {
    newParticle.vx = Math.abs(newParticle.vx) * boundaryDamping;
    newParticle.px = 0;
  }
  if (newParticle.py >= window.innerHeight) {
    newParticle.vy = Math.abs(newParticle.vy) * -1 * boundaryDamping;
    newParticle.py = window.innerHeight;
  }
  if (newParticle.py <= 0) {
    newParticle.vy = Math.abs(newParticle.vy) * boundaryDamping;
    newParticle.py = 0;
  }
  return newParticle;
}
