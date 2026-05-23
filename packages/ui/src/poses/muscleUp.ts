import type { FigureProps } from '../components/Figure';

type Joints = FigureProps['joints'];

/** Muscle Up - transition phase, body above bar */
export const muscleUpPose: Joints = {
  head: { x: 0.5, y: 0.15 },
  neck: { x: 0.5, y: 0.22 },
  leftShoulder: { x: 0.38, y: 0.28 },
  rightShoulder: { x: 0.62, y: 0.28 },
  // Arms pushing down on bar
  leftElbow: { x: 0.30, y: 0.38 },
  rightElbow: { x: 0.70, y: 0.38 },
  leftWrist: { x: 0.32, y: 0.48 },
  rightWrist: { x: 0.68, y: 0.48 },
  spine: { x: 0.5, y: 0.42 },
  pelvis: { x: 0.5, y: 0.58 },
  leftHip: { x: 0.46, y: 0.60 },
  rightHip: { x: 0.54, y: 0.60 },
  leftKnee: { x: 0.44, y: 0.76 },
  rightKnee: { x: 0.56, y: 0.76 },
  leftAnkle: { x: 0.42, y: 0.92 },
  rightAnkle: { x: 0.58, y: 0.92 },
};

/** Muscle Up - pull phase (below bar, pulling up) */
export const muscleUpPullPose: Joints = {
  head: { x: 0.5, y: 0.35 },
  neck: { x: 0.5, y: 0.42 },
  leftShoulder: { x: 0.40, y: 0.48 },
  rightShoulder: { x: 0.60, y: 0.48 },
  // Arms extended up to bar
  leftElbow: { x: 0.32, y: 0.28 },
  rightElbow: { x: 0.68, y: 0.28 },
  leftWrist: { x: 0.28, y: 0.12 },
  rightWrist: { x: 0.72, y: 0.12 },
  spine: { x: 0.5, y: 0.58 },
  pelvis: { x: 0.5, y: 0.72 },
  leftHip: { x: 0.46, y: 0.74 },
  rightHip: { x: 0.54, y: 0.74 },
  leftKnee: { x: 0.44, y: 0.86 },
  rightKnee: { x: 0.56, y: 0.86 },
  leftAnkle: { x: 0.42, y: 0.98 },
  rightAnkle: { x: 0.58, y: 0.98 },
};
