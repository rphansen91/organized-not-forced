import type { FigureProps } from '../components/Figure';

type Joints = FigureProps['joints'];

/** Classic Vitruvian Man - arms raised outward, legs spread */
export const vitruvianPose: Joints = {
  head: { x: 0.5, y: 0.12 },
  neck: { x: 0.5, y: 0.22 },
  leftShoulder: { x: 0.38, y: 0.24 },
  rightShoulder: { x: 0.62, y: 0.24 },
  leftElbow: { x: 0.22, y: 0.12 },
  rightElbow: { x: 0.78, y: 0.12 },
  leftWrist: { x: 0.08, y: 0.02 },
  rightWrist: { x: 0.92, y: 0.02 },
  spine: { x: 0.5, y: 0.38 },
  // Pelvis and hips must share the same Y so legs connect properly
  pelvis: { x: 0.5, y: 0.52 },
  leftHip: { x: 0.42, y: 0.52 },
  rightHip: { x: 0.58, y: 0.52 },
  leftKnee: { x: 0.30, y: 0.72 },
  rightKnee: { x: 0.70, y: 0.72 },
  leftAnkle: { x: 0.20, y: 0.93 },
  rightAnkle: { x: 0.80, y: 0.93 },
};

/** Ghost pose for Vitruvian - arms horizontal, legs together */
export const vitruvianGhostPose: Partial<Joints> = {
  leftElbow: { x: 0.18, y: 0.24 },
  rightElbow: { x: 0.82, y: 0.24 },
  leftWrist: { x: 0.02, y: 0.24 },
  rightWrist: { x: 0.98, y: 0.24 },
  leftKnee: { x: 0.46, y: 0.72 },
  rightKnee: { x: 0.54, y: 0.72 },
  leftAnkle: { x: 0.44, y: 0.93 },
  rightAnkle: { x: 0.56, y: 0.93 },
};
