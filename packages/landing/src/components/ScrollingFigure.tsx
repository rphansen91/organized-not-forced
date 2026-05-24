import { useRef, useMemo } from 'react'
import { motion, useScroll } from 'framer-motion'
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

// Linear interpolation between two values
const lerp = (a: number, b: number, t: number): number => a + (b - a) * t

// Interpolate between two joint positions (including z for horizontal poses)
const lerpJoints = (jointsA: Joints, jointsB: Joints, t: number): Joints => {
  const result: Partial<Joints> = {}
  
  for (const key of Object.keys(jointsA) as (keyof Joints)[]) {
    const a = jointsA[key]
    const b = jointsB[key]
    if (a && b) {
      result[key] = {
        x: lerp(a.x, b.x, t),
        y: lerp(a.y, b.y, t),
        // Interpolate z coordinate if either pose has it (for horizontal poses like Front Lever, Planche)
        z: lerp(a.z ?? 0.5, b.z ?? 0.5, t),
      }
    }
  }
  
  return result as Joints
}

// Easing function for smoother transitions
const easeInOutCubic = (t: number): number => {
  return t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2
}

// The pose sequence as you scroll down
// Some poses need side-angle camera to see the horizontal body position
const POSE_SEQUENCE = [
  { name: 'Vitruvian', label: 'The Ideal Form', cameraPosition: [0, 0, 3.5] as [number, number, number] },
  { name: 'Pistol Squat (Left)', label: 'Single-Leg Mastery', cameraPosition: [0, 0, 3.5] as [number, number, number] },
  { name: 'Muscle Up', label: 'The Transition', cameraPosition: [0, 0, 3.5] as [number, number, number] },
  { name: 'Front Lever', label: 'Horizontal Suspension', cameraPosition: [3.5, 0, 0] as [number, number, number] }, // Side view
  { name: 'Planche', label: 'The Ultimate Goal', cameraPosition: [3.5, 0, 0] as [number, number, number] }, // Side view
]

interface ScrollingFigureProps {
  scrollProgress: number // 0 to 1
}

export function ScrollingFigure({ scrollProgress }: ScrollingFigureProps) {
  // Calculate which poses we're between and the interpolation factor
  const numTransitions = POSE_SEQUENCE.length - 1
  const scaledProgress = scrollProgress * numTransitions
  const currentIndex = Math.min(Math.floor(scaledProgress), numTransitions - 1)
  const nextIndex = Math.min(currentIndex + 1, POSE_SEQUENCE.length - 1)
  const localProgress = scaledProgress - currentIndex
  
  // Apply easing for smoother pose transitions
  const easedProgress = easeInOutCubic(Math.max(0, Math.min(1, localProgress)))
  
  // Get the two poses we're interpolating between
  const currentPose = getPose(POSE_SEQUENCE[currentIndex].name)
  const nextPose = getPose(POSE_SEQUENCE[nextIndex].name)
  
  // Interpolate the joints
  const interpolatedJoints = useMemo(() => {
    return lerpJoints(currentPose, nextPose, easedProgress)
  }, [currentPose, nextPose, easedProgress])
  
  // Interpolate camera position for smooth transitions between front and side views
  const currentCamera = POSE_SEQUENCE[currentIndex].cameraPosition
  const nextCamera = POSE_SEQUENCE[nextIndex].cameraPosition
  const interpolatedCamera = useMemo((): [number, number, number] => {
    return [
      lerp(currentCamera[0], nextCamera[0], easedProgress),
      lerp(currentCamera[1], nextCamera[1], easedProgress),
      lerp(currentCamera[2], nextCamera[2], easedProgress),
    ]
  }, [currentCamera, nextCamera, easedProgress])
  
  // Current pose label for display
  const currentLabel = POSE_SEQUENCE[currentIndex].label
  const nextLabel = POSE_SEQUENCE[nextIndex].label
  const displayLabel = easedProgress > 0.5 ? nextLabel : currentLabel
  
  return (
    <div className="scrolling-figure">
      <Vitruvian3D
        joints={interpolatedJoints}
        size={400}
        backgroundColor="transparent"
        showCircles={true}
        showSquares={true}
        showRadialLines={true}
        showSpiral={false}
        showAnatomy={true}
        autoRotate={false}
        animateGeometry={true}
        cameraPosition={interpolatedCamera}
      />
      <motion.div 
        className="pose-label"
        key={displayLabel}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {displayLabel}
      </motion.div>
    </div>
  )
}

// Hook to get scroll progress for the scrolling figure
export function useScrollingFigure() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })
  
  return { containerRef, scrollYProgress }
}

// Export pose sequence for use in sections
export { POSE_SEQUENCE }
