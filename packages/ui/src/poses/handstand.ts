import type { FigureProps } from '../components/Figure';

type Joints = FigureProps['joints'];

/** Handstand - inverted, arms straight, body stacked */
export const handstandPose: Joints = {
  head: { x: 0.5, y: 0.85 },
  neck: { x: 0.5, y: 0.78 },
  leftShoulder: { x: 0.42, y: 0.72 },
  rightShoulder: { x: 0.58, y: 0.72 },
  leftElbow: { x: 0.40, y: 0.82 },
  rightElbow: { x: 0.60, y: 0.82 },
  leftWrist: { x: 0.38, y: 0.92 },
  rightWrist: { x: 0.62, y: 0.92 },
  spine: { x: 0.5, y: 0.60 },
  pelvis: { x: 0.5, y: 0.42 },
  leftHip: { x: 0.47, y: 0.40 },
  rightHip: { x: 0.53, y: 0.40 },
  leftKnee: { x: 0.47, y: 0.24 },
  rightKnee: { x: 0.53, y: 0.24 },
  leftAnkle: { x: 0.47, y: 0.08 },
  rightAnkle: { x: 0.53, y: 0.08 },
};

/** Straddle handstand - legs spread for balance */
export const straddleHandstandPose: Joints = {
  ...handstandPose,
  leftHip: { x: 0.38, y: 0.40 },
  rightHip: { x: 0.62, y: 0.40 },
  leftKnee: { x: 0.28, y: 0.24 },
  rightKnee: { x: 0.72, y: 0.24 },
  leftAnkle: { x: 0.20, y: 0.08 },
  rightAnkle: { x: 0.80, y: 0.08 },
};
