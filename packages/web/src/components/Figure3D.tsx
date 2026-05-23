import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { FigureProps, JointPosition } from '@onf/ui';

interface Figure3DProps {
  joints: FigureProps['joints'];
  ghostJoints?: Partial<FigureProps['joints']>;
  color?: string;
  showJoints?: boolean;
  showAnatomy?: boolean;
  animate?: boolean;
}

// Convert 2D/3D normalized coords to 3D space (centered at origin)
function toVec3(pos: JointPosition, scale = 2): THREE.Vector3 {
  return new THREE.Vector3(
    (pos.x - 0.5) * scale,
    -(pos.y - 0.5) * scale, // Flip Y so head is up
    pos.z !== undefined ? (pos.z - 0.5) * scale : 0 // Use z for horizontal poses
  );
}

function Limb({ 
  from, 
  to, 
  thickness = 0.03,
  color = '#d4af37',
  opacity = 1
}: { 
  from: THREE.Vector3; 
  to: THREE.Vector3; 
  thickness?: number;
  color?: string;
  opacity?: number;
}) {
  const geometry = useMemo(() => {
    const path = new THREE.LineCurve3(from, to);
    return new THREE.TubeGeometry(path, 8, thickness, 8, false);
  }, [from, to, thickness]);

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial 
        color={color} 
        transparent={opacity < 1}
        opacity={opacity}
        metalness={0.3}
        roughness={0.6}
        emissive={color}
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}

function Joint({ 
  position, 
  radius = 0.06,
  color = '#d4af37',
  opacity = 1
}: { 
  position: THREE.Vector3; 
  radius?: number;
  color?: string;
  opacity?: number;
}) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[radius, 16, 16]} />
      <meshStandardMaterial 
        color={color}
        transparent={opacity < 1}
        opacity={opacity}
        metalness={0.4}
        roughness={0.4}
        emissive={color}
        emissiveIntensity={0.3}
      />
    </mesh>
  );
}

function Head({ 
  position,
  color = '#d4af37'
}: {
  position: THREE.Vector3;
  color?: string;
}) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.12, 24, 24]} />
      <meshStandardMaterial 
        color={color}
        metalness={0.3}
        roughness={0.5}
        emissive={color}
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}

function Ribcage({
  position,
  color = '#d4af37'
}: {
  position: THREE.Vector3;
  color?: string;
}) {
  return (
    <mesh position={position}>
      <torusGeometry args={[0.18, 0.015, 8, 32]} />
      <meshStandardMaterial 
        color={color}
        transparent
        opacity={0.5}
        metalness={0.3}
        roughness={0.6}
        emissive={color}
        emissiveIntensity={0.15}
      />
    </mesh>
  );
}

export function Figure3D({ 
  joints, 
  ghostJoints,
  color = '#d4af37',
  showJoints = true,
  showAnatomy = true,
  animate = false
}: Figure3DProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Convert all joints to 3D vectors
  const j = useMemo(() => {
    const result: Record<string, THREE.Vector3> = {};
    for (const [key, pos] of Object.entries(joints)) {
      result[key] = toVec3(pos);
    }
    return result as Record<keyof FigureProps['joints'], THREE.Vector3>;
  }, [joints]);

  // Convert ghost joints
  const gj = useMemo(() => {
    if (!ghostJoints) return null;
    const result: Record<string, THREE.Vector3> = {};
    for (const [key, pos] of Object.entries(ghostJoints)) {
      if (pos) result[key] = toVec3(pos);
    }
    return result;
  }, [ghostJoints]);

  // Subtle animation
  useFrame((state) => {
    if (animate && groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Head */}
      <Head position={j.head} color={color} />
      
      {/* Neck */}
      <Limb from={j.head} to={j.neck} thickness={0.04} color={color} />
      
      {/* Spine / Torso */}
      <Limb from={j.neck} to={j.spine} thickness={0.05} color={color} />
      <Limb from={j.spine} to={j.pelvis} thickness={0.05} color={color} />
      
      {/* Shoulders */}
      <Limb from={j.leftShoulder} to={j.rightShoulder} thickness={0.035} color={color} />
      
      {/* Ribcage */}
      {showAnatomy && <Ribcage position={j.spine} color={color} />}
      
      {/* Pelvis connections */}
      <Limb from={j.pelvis} to={j.leftHip} thickness={0.04} color={color} />
      <Limb from={j.pelvis} to={j.rightHip} thickness={0.04} color={color} />
      
      {/* Left Arm */}
      <Limb from={j.leftShoulder} to={j.leftElbow} thickness={0.04} color={color} />
      <Limb from={j.leftElbow} to={j.leftWrist} thickness={0.035} color={color} />
      
      {/* Right Arm */}
      <Limb from={j.rightShoulder} to={j.rightElbow} thickness={0.04} color={color} />
      <Limb from={j.rightElbow} to={j.rightWrist} thickness={0.035} color={color} />
      
      {/* Left Leg */}
      <Limb from={j.leftHip} to={j.leftKnee} thickness={0.04} color={color} />
      <Limb from={j.leftKnee} to={j.leftAnkle} thickness={0.035} color={color} />
      
      {/* Right Leg */}
      <Limb from={j.rightHip} to={j.rightKnee} thickness={0.04} color={color} />
      <Limb from={j.rightKnee} to={j.rightAnkle} thickness={0.035} color={color} />
      
      {/* Joints */}
      {showJoints && (
        <>
          <Joint position={j.leftShoulder} radius={0.07} color={color} />
          <Joint position={j.rightShoulder} radius={0.07} color={color} />
          <Joint position={j.leftElbow} radius={0.055} color={color} />
          <Joint position={j.rightElbow} radius={0.055} color={color} />
          <Joint position={j.leftWrist} radius={0.04} color={color} />
          <Joint position={j.rightWrist} radius={0.04} color={color} />
          <Joint position={j.leftHip} radius={0.07} color={color} />
          <Joint position={j.rightHip} radius={0.07} color={color} />
          <Joint position={j.leftKnee} radius={0.06} color={color} />
          <Joint position={j.rightKnee} radius={0.06} color={color} />
          <Joint position={j.leftAnkle} radius={0.045} color={color} />
          <Joint position={j.rightAnkle} radius={0.045} color={color} />
        </>
      )}

      {/* Ghost pose (secondary position) - more transparent */}
      {gj && (
        <group>
          {gj.leftElbow && gj.leftWrist && (
            <>
              <Limb from={j.leftShoulder} to={gj.leftElbow} thickness={0.025} color={color} opacity={0.4} />
              <Limb from={gj.leftElbow} to={gj.leftWrist} thickness={0.02} color={color} opacity={0.4} />
              <Joint position={gj.leftElbow} radius={0.04} color={color} opacity={0.4} />
              <Joint position={gj.leftWrist} radius={0.03} color={color} opacity={0.4} />
            </>
          )}
          {gj.rightElbow && gj.rightWrist && (
            <>
              <Limb from={j.rightShoulder} to={gj.rightElbow} thickness={0.025} color={color} opacity={0.4} />
              <Limb from={gj.rightElbow} to={gj.rightWrist} thickness={0.02} color={color} opacity={0.4} />
              <Joint position={gj.rightElbow} radius={0.04} color={color} opacity={0.4} />
              <Joint position={gj.rightWrist} radius={0.03} color={color} opacity={0.4} />
            </>
          )}
          {gj.leftKnee && gj.leftAnkle && (
            <>
              <Limb from={j.leftHip} to={gj.leftKnee} thickness={0.025} color={color} opacity={0.4} />
              <Limb from={gj.leftKnee} to={gj.leftAnkle} thickness={0.02} color={color} opacity={0.4} />
              <Joint position={gj.leftKnee} radius={0.045} color={color} opacity={0.4} />
              <Joint position={gj.leftAnkle} radius={0.035} color={color} opacity={0.4} />
            </>
          )}
          {gj.rightKnee && gj.rightAnkle && (
            <>
              <Limb from={j.rightHip} to={gj.rightKnee} thickness={0.025} color={color} opacity={0.4} />
              <Limb from={gj.rightKnee} to={gj.rightAnkle} thickness={0.02} color={color} opacity={0.4} />
              <Joint position={gj.rightKnee} radius={0.045} color={color} opacity={0.4} />
              <Joint position={gj.rightAnkle} radius={0.035} color={color} opacity={0.4} />
            </>
          )}
        </group>
      )}
    </group>
  );
}
