import type { FigureProps } from '../components/Figure';

type Joints = FigureProps['joints'];

/** Pistol Squat - single leg squat, other leg extended forward */
export const pistolSquatPose: Joints = {
  head: { x: 0.5, y: 0.25 },
  neck: { x: 0.5, y: 0.32 },
  leftShoulder: { x: 0.42, y: 0.36 },
  rightShoulder: { x: 0.58, y: 0.36 },
  // Arms extended forward for balance
  leftElbow: { x: 0.30, y: 0.38 },
  rightElbow: { x: 0.70, y: 0.38 },
  leftWrist: { x: 0.18, y: 0.40 },
  rightWrist: { x: 0.82, y: 0.40 },
  spine: { x: 0.5, y: 0.48 },
  pelvis: { x: 0.5, y: 0.62 },
  leftHip: { x: 0.45, y: 0.64 },
  rightHip: { x: 0.55, y: 0.64 },
  // Standing leg - deeply bent
  leftKnee: { x: 0.42, y: 0.78 },
  leftAnkle: { x: 0.45, y: 0.92 },
  // Extended leg - straight out front
  rightKnee: { x: 0.70, y: 0.65 },
  rightAnkle: { x: 0.88, y: 0.68 },
};

/** Pistol squat on right leg */
export const pistolSquatRightPose: Joints = {
  ...pistolSquatPose,
  // Swap legs
  rightKnee: { x: 0.58, y: 0.78 },
  rightAnkle: { x: 0.55, y: 0.92 },
  leftKnee: { x: 0.30, y: 0.65 },
  leftAnkle: { x: 0.12, y: 0.68 },
};
