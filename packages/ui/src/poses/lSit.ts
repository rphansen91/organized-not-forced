import type { FigureProps } from '../components/Figure';

type Joints = FigureProps['joints'];

/** L-Sit - seated with legs extended, arms supporting */
export const lSitPose: Joints = {
  head: { x: 0.5, y: 0.18 },
  neck: { x: 0.5, y: 0.26 },
  leftShoulder: { x: 0.38, y: 0.32 },
  rightShoulder: { x: 0.62, y: 0.32 },
  // Arms straight down, supporting
  leftElbow: { x: 0.32, y: 0.45 },
  rightElbow: { x: 0.68, y: 0.45 },
  leftWrist: { x: 0.28, y: 0.58 },
  rightWrist: { x: 0.72, y: 0.58 },
  spine: { x: 0.5, y: 0.42 },
  pelvis: { x: 0.5, y: 0.55 },
  leftHip: { x: 0.46, y: 0.57 },
  rightHip: { x: 0.54, y: 0.57 },
  // Legs extended forward, parallel to ground
  leftKnee: { x: 0.30, y: 0.57 },
  rightKnee: { x: 0.70, y: 0.57 },
  leftAnkle: { x: 0.12, y: 0.57 },
  rightAnkle: { x: 0.88, y: 0.57 },
};

/** V-Sit - legs raised higher */
export const vSitPose: Joints = {
  ...lSitPose,
  leftKnee: { x: 0.30, y: 0.42 },
  rightKnee: { x: 0.70, y: 0.42 },
  leftAnkle: { x: 0.15, y: 0.28 },
  rightAnkle: { x: 0.85, y: 0.28 },
};
