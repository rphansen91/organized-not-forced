import type { FigureProps } from '../components/Figure';

type Joints = FigureProps['joints'];

/** Planche - horizontal body, hands supporting, parallel to ground
 * Body extends along Z axis (head forward, feet back)
 * Arms reach DOWN (higher Y = lower in 3D) to floor to support weight
 * Reference: person horizontal, face down, hands on floor supporting body
 * ALL body joints (head to ankles) at SAME Y value for perfectly parallel body
 */
export const planchePose: Joints = {
  // Body perfectly horizontal - all at y: 0.40
  head: { x: 0.5, y: 0.40, z: 0.15 },
  neck: { x: 0.5, y: 0.40, z: 0.22 },
  // Shoulders at same level
  leftShoulder: { x: 0.38, y: 0.40, z: 0.28 },
  rightShoulder: { x: 0.62, y: 0.40, z: 0.28 },
  // Elbows angled down toward floor
  leftElbow: { x: 0.32, y: 0.55, z: 0.28 },
  rightElbow: { x: 0.68, y: 0.55, z: 0.28 },
  // Wrists on floor (hands supporting)
  leftWrist: { x: 0.30, y: 0.70, z: 0.28 },
  rightWrist: { x: 0.70, y: 0.70, z: 0.28 },
  // Torso horizontal - same Y as head
  spine: { x: 0.5, y: 0.40, z: 0.45 },
  pelvis: { x: 0.5, y: 0.40, z: 0.65 },
  // Hips at same level
  leftHip: { x: 0.45, y: 0.40, z: 0.68 },
  rightHip: { x: 0.55, y: 0.40, z: 0.68 },
  // Legs extended straight back - same Y level
  leftKnee: { x: 0.45, y: 0.40, z: 0.80 },
  rightKnee: { x: 0.55, y: 0.40, z: 0.80 },
  leftAnkle: { x: 0.45, y: 0.40, z: 0.95 },
  rightAnkle: { x: 0.55, y: 0.40, z: 0.95 },
};

/** Straddle planche - legs spread for leverage */
export const straddlePlanchePose: Joints = {
  ...planchePose,
  leftHip: { x: 0.30, y: 0.40, z: 0.68 },
  rightHip: { x: 0.70, y: 0.40, z: 0.68 },
  leftKnee: { x: 0.22, y: 0.40, z: 0.80 },
  rightKnee: { x: 0.78, y: 0.40, z: 0.80 },
  leftAnkle: { x: 0.15, y: 0.40, z: 0.95 },
  rightAnkle: { x: 0.85, y: 0.40, z: 0.95 },
};
