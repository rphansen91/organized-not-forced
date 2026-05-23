import type { PoseDefinition } from './index';
import { vitruvianPose, vitruvianGhostPose } from './vitruvian';
import { planchePose, straddlePlanchePose } from './planche';
import { handstandPose, straddleHandstandPose } from './handstand';
import { pistolSquatPose, pistolSquatRightPose } from './pistolSquat';
import { muscleUpPose, muscleUpPullPose } from './muscleUp';
import { frontLeverPose, straddleFrontLeverPose } from './frontLever';
import { lSitPose, vSitPose } from './lSit';

export const allPoses: PoseDefinition[] = [
  {
    name: 'Vitruvian',
    description: 'Classic da Vinci pose - the ideal human form',
    joints: vitruvianPose,
    ghostJoints: vitruvianGhostPose,
  },
  {
    name: 'Planche',
    description: 'Horizontal hold with hands supporting full body weight',
    joints: planchePose,
    chapter: 7,
  },
  {
    name: 'Straddle Planche',
    description: 'Planche with legs spread for reduced leverage',
    joints: straddlePlanchePose,
    chapter: 7,
  },
  {
    name: 'Handstand',
    description: 'Inverted balance - stacking the skeleton',
    joints: handstandPose,
  },
  {
    name: 'Straddle Handstand',
    description: 'Handstand with legs spread for balance',
    joints: straddleHandstandPose,
  },
  {
    name: 'Pistol Squat (Left)',
    description: 'Single-leg squat with opposite leg extended',
    joints: pistolSquatPose,
    chapter: 3,
  },
  {
    name: 'Pistol Squat (Right)',
    description: 'Single-leg squat on right leg',
    joints: pistolSquatRightPose,
    chapter: 3,
  },
  {
    name: 'Muscle Up',
    description: 'Transition phase - body above the bar',
    joints: muscleUpPose,
    chapter: 4,
  },
  {
    name: 'Muscle Up (Pull)',
    description: 'Pull phase - generating momentum',
    joints: muscleUpPullPose,
    chapter: 4,
  },
  {
    name: 'Front Lever',
    description: 'Horizontal body suspended from bar',
    joints: frontLeverPose,
  },
  {
    name: 'Straddle Front Lever',
    description: 'Front lever with legs spread',
    joints: straddleFrontLeverPose,
  },
  {
    name: 'L-Sit',
    description: 'Seated hold with legs extended horizontal',
    joints: lSitPose,
  },
  {
    name: 'V-Sit',
    description: 'L-Sit with legs raised higher',
    joints: vSitPose,
  },
];
