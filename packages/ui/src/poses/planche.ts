import type { FigureProps } from '../components/Figure';

type Joints = FigureProps['joints'];

/** Planche - horizontal body, hands supporting, parallel to ground */
export const planchePose: Joints = {
  head: { x: 0.15, y: 0.5 },
  neck: { x: 0.22, y: 0.5 },
  leftShoulder: { x: 0.28, y: 0.45 },
  rightShoulder: { x: 0.28, y: 0.55 },
  leftElbow: { x: 0.35, y: 0.38 },
  rightElbow: { x: 0.35, y: 0.62 },
  leftWrist: { x: 0.42, y: 0.35 },
  rightWrist: { x: 0.42, y: 0.65 },
  spine: { x: 0.45, y: 0.5 },
  pelvis: { x: 0.68, y: 0.5 },
  leftHip: { x: 0.70, y: 0.47 },
  rightHip: { x: 0.70, y: 0.53 },
  leftKnee: { x: 0.82, y: 0.47 },
  rightKnee: { x: 0.82, y: 0.53 },
  leftAnkle: { x: 0.95, y: 0.47 },
  rightAnkle: { x: 0.95, y: 0.53 },
};

/** Straddle planche - legs spread for leverage */
export const straddlePlanchePose: Joints = {
  ...planchePose,
  leftHip: { x: 0.70, y: 0.35 },
  rightHip: { x: 0.70, y: 0.65 },
  leftKnee: { x: 0.82, y: 0.28 },
  rightKnee: { x: 0.82, y: 0.72 },
  leftAnkle: { x: 0.95, y: 0.22 },
  rightAnkle: { x: 0.95, y: 0.78 },
};
