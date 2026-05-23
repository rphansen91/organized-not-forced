export * from './vitruvian';
export * from './planche';
export * from './handstand';
export * from './pistolSquat';
export * from './muscleUp';
export * from './frontLever';
export * from './lSit';

import type { FigureProps } from '../components/Figure';

export type PoseDefinition = {
  name: string;
  description: string;
  joints: FigureProps['joints'];
  ghostJoints?: Partial<FigureProps['joints']>;
  chapter?: number;
};

// All poses as a collection for easy iteration
export { allPoses } from './collection';
