import type { FigureProps } from '../components/Figure';

type Joints = FigureProps['joints'];

/** Front Lever - horizontal body, arms holding bar above
 * Body extends along Z axis (head forward, feet back)
 * Arms reach UP (lower Y = higher in 3D due to flip) to bar
 * Reference: person horizontal, belly UP, hands gripping bar above
 */
export const frontLeverPose: Joints = {
  // Head forward, body slightly below bar height
  head: { x: 0.5, y: 0.55, z: 0.15 },
  neck: { x: 0.5, y: 0.55, z: 0.22 },
  // Shoulders below bar, arms reach up
  leftShoulder: { x: 0.38, y: 0.55, z: 0.30 },
  rightShoulder: { x: 0.62, y: 0.55, z: 0.30 },
  // Arms go UP toward bar (lower Y)
  leftElbow: { x: 0.38, y: 0.40, z: 0.30 },
  rightElbow: { x: 0.62, y: 0.40, z: 0.30 },
  // Wrists at bar height (highest point, lowest Y)
  leftWrist: { x: 0.38, y: 0.25, z: 0.30 },
  rightWrist: { x: 0.62, y: 0.25, z: 0.30 },
  // Torso horizontal at body level
  spine: { x: 0.5, y: 0.55, z: 0.45 },
  pelvis: { x: 0.5, y: 0.55, z: 0.65 },
  // Hips at same level as torso
  leftHip: { x: 0.45, y: 0.55, z: 0.68 },
  rightHip: { x: 0.55, y: 0.55, z: 0.68 },
  // Legs extended straight back
  leftKnee: { x: 0.45, y: 0.55, z: 0.80 },
  rightKnee: { x: 0.55, y: 0.55, z: 0.80 },
  leftAnkle: { x: 0.45, y: 0.55, z: 0.95 },
  rightAnkle: { x: 0.55, y: 0.55, z: 0.95 },
};

/** Straddle Front Lever */
export const straddleFrontLeverPose: Joints = {
  ...frontLeverPose,
  leftHip: { x: 0.30, y: 0.55, z: 0.68 },
  rightHip: { x: 0.70, y: 0.55, z: 0.68 },
  leftKnee: { x: 0.22, y: 0.55, z: 0.80 },
  rightKnee: { x: 0.78, y: 0.55, z: 0.80 },
  leftAnkle: { x: 0.15, y: 0.55, z: 0.95 },
  rightAnkle: { x: 0.85, y: 0.55, z: 0.95 },
};
