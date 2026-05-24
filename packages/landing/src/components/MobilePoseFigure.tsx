import { Vitruvian3D } from './Vitruvian3D'
import { allPoses } from '@onf/ui'
import type { FigureProps } from '@onf/ui'

type Joints = FigureProps['joints']

// Get poses by name
const getPose = (name: string): Joints => {
  const pose = allPoses.find(p => p.name === name)
  if (!pose) throw new Error(`Pose not found: ${name}`)
  return pose.joints
}

// Pose configurations with camera angles
const POSE_CONFIG: Record<string, { joints: Joints; camera: [number, number, number]; label: string }> = {
  vitruvian: {
    joints: getPose('Vitruvian'),
    camera: [0, 0, 3.5],
    label: 'The Ideal Form',
  },
  pistol: {
    joints: getPose('Pistol Squat (Left)'),
    camera: [0, 0, 3.5],
    label: 'Single-Leg Mastery',
  },
  muscleup: {
    joints: getPose('Muscle Up'),
    camera: [0, 0, 3.5],
    label: 'The Transition',
  },
  frontlever: {
    joints: getPose('Front Lever'),
    camera: [3.5, 0, 0], // Side view for horizontal pose
    label: 'Horizontal Suspension',
  },
  planche: {
    joints: getPose('Planche'),
    camera: [3.5, 0, 0], // Side view for horizontal pose
    label: 'The Ultimate Goal',
  },
}

interface MobilePoseFigureProps {
  pose: keyof typeof POSE_CONFIG
  size?: number
}

export function MobilePoseFigure({ pose, size = 280 }: MobilePoseFigureProps) {
  const config = POSE_CONFIG[pose]
  
  if (!config) {
    console.error(`Unknown pose: ${pose}`)
    return null
  }
  
  return (
    <div className="mobile-pose-figure">
      <Vitruvian3D
        joints={config.joints}
        size={size}
        backgroundColor="transparent"
        showCircles={true}
        showSquares={true}
        showRadialLines={true}
        showSpiral={false}
        showAnatomy={true}
        autoRotate={false}
        animateGeometry={true}
        cameraPosition={config.camera}
      />
      <div className="mobile-pose-label">{config.label}</div>
    </div>
  )
}
