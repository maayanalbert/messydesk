import { CornerType, ParticleType, RectangleType } from "./ParticleType";
import { addForce } from "./ParticleUtils";
import { MUTUAL_REPULSION_MULTIPLE } from "./constants";

export function getNewParticleArray(particles: ParticleType[]): ParticleType[] {
  return particles.map((particle) => Object.assign(particle));
}

function addEdgeForce(
  particle: ParticleType,
  otherParticle: ParticleType,
  distance: number
): [ParticleType, ParticleType] {
  const dx = particle.px - otherParticle.px;
  const dy = particle.py - otherParticle.py;

  const dh = Math.sqrt(dx * dx + dy * dy);
  if (dh > 1) {
    const distention = dh - distance;
    const restorativeForce = 0.2 * distention; // F = -kx
    const fx = (dx / dh) * restorativeForce;
    const fy = (dy / dh) * restorativeForce;

    return [addForce(particle, -fx, -fy), addForce(otherParticle, fx, fy)];
  }

  return [particle, otherParticle];
}

function getCorners(
  stampId: string,
  particles: ParticleType[]
): [ParticleType, ParticleType, ParticleType, ParticleType] | undefined {
  //[NW, NE, SE, SW]
  const particlesForRect = particles.filter(
    (particle) => particle.stampId === stampId
  );
  const cornerMap = new Map(
    particlesForRect.map((particle) => [particle.corner, particle])
  );

  const NE = cornerMap.get("NE");
  if (!NE) return;

  const SE = cornerMap.get("NE");
  if (!SE) return;

  const NW = cornerMap.get("NW");
  if (!NW) return;

  const SW = cornerMap.get("NW");
  if (!SW) return;

  return [NW, NE, SE, SW];
}

function getIndexMap(particles: ParticleType[]): Map<string, number> {
  return new Map(
    particles.map((particle, index) => [getParticleId(particle), index])
  );
}

function getParticleId(particle: ParticleType): string {
  return `${particle.stampId}-${particle.corner}`;
}

function addEdgeForces(
  particles: ParticleType[],
  rects: RectangleType[]
): ParticleType[] {
  const newParticles = getNewParticleArray(particles);

  const indexMap = getIndexMap(newParticles);

  for (let rect of rects) {
    const corners = getCorners(rect.stampId, particles);
    if (!corners) continue;

    const [NW, NE, SE, SW] = corners;

    const [NW1, NE1] = addEdgeForce(NW, NE, rect.width);
    const [NE2, SE1] = addEdgeForce(NE1, SE, rect.height);
    const [SE2, SW1] = addEdgeForce(SE1, SW, rect.width);
    const [SW2, NW2] = addEdgeForce(SW1, NW1, rect.height);

    setParticleInList(NW2, indexMap, particles);
    setParticleInList(NE2, indexMap, particles);
    setParticleInList(SE2, indexMap, particles);
    setParticleInList(SW2, indexMap, particles);
  }

  return particles;
}

function setParticleInList(
  particle: ParticleType,
  indexMap: Map<string, number>,
  particles: ParticleType[]
) {
  const id = getParticleId(particle);
  const index = indexMap.get(id);
  if (index !== undefined && index < particles.length) {
    particles[index] = particle;
  }
}

export function addMutualRepulsion(particles: ParticleType[]): ParticleType[] {
  const newParticles = getNewParticleArray(particles);

  for (let i = 0; i < newParticles.length; i++) {
    const particle = newParticles[i];
    for (let j = 0; j < i; j++) {
      const otherParticle = newParticles[j];

      const dx = particle.px - otherParticle.px;
      const dy = particle.py - otherParticle.py;

      const dhRaw = Math.sqrt(dx * dx + dy * dy);
      const dh = Math.max(dhRaw, 1);
      const componentInX = dx / dh;
      const componentInY = dy / dh;
      const proportionToDistanceSquared = 1.0 / (dh * dh);

      const repulsionForceX = componentInX * proportionToDistanceSquared;
      const repulsionForceY = componentInY * proportionToDistanceSquared;

      newParticles[i] = addForce(
        particle,
        repulsionForceX * MUTUAL_REPULSION_MULTIPLE,
        repulsionForceY * MUTUAL_REPULSION_MULTIPLE
      );
      newParticles[j] = addForce(
        otherParticle,
        -repulsionForceX * MUTUAL_REPULSION_MULTIPLE,
        -repulsionForceY * MUTUAL_REPULSION_MULTIPLE
      );
    }
  }

  return newParticles;
}
