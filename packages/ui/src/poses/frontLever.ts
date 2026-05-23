import type { FigureProps } from '../components/Figure';

type Joints = FigureProps['joints'];

/** Front Lever - horizontal body, arms holding bar above */
export const frontLeverPose: Joints = {
  head: { x: 0.20, y: 0.5 },
  neck: { x: 0.27, y: 0.5 },
  leftShoulder: { x: 0.33, y: 0.45 },
  rightShoulder: { x: 0.33, y: 0.55 },
  // Arms straight up to bar
  leftElbow: { x: 0.38, y: 0.30 },
  rightElbow: { x: 0.38, y: 0.70 },
  leftWrist: { x: 0.42, y: 0.15 },
  rightWrist: { x: 0.42, y: 0.85 },
  spine: { x: 0.50, y: 0.5 },
  pelvis: { x: 0.70, y: 0.5 },
  leftHip: { x: 0.72, y: 0.47 },
  rightHip: { x: 0.72, y: 0.53 },
  leftKnee: { x: 0.84, y: 0.47 },
  rightKnee: { x: 0.84, y: 0.53 },
  leftAnkle: { x: 0.96, y: 0.47 },
  rightAnkle: { x: 0.96, y: 0.53 },
};

/** Straddle Front Lever */
export const straddleFrontLeverPose: Joints = {
  ...frontLeverPose,
  leftHip: { x: 0.72, y: 0.32 },
  rightHip: { x: 0.72, y: 0.68 },
  leftKnee: { x: 0.84, y: 0.25 },
  rightKnee: { x: 0.84, y: 0.75 },
  leftAnkle: { x: 0.96, y: 0.18 },
  rightAnkle: { x: 0.96, y: 0.82 },
};
