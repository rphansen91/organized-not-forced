import { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { Figure3D } from './Figure3D';
import type { FigureProps } from '@onf/ui';

const PHI = 1.618033988749;
const GOLD = '#d4af37';

// Fibonacci sequence for ratios
const FIB = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89];

// Generate Fibonacci-based circle radii dynamically
function getCircleSizes(count: number): number[] {
  const sizes: number[] = [];
  for (let i = 0; i < count; i++) {
    sizes.push(FIB[FIB.length - 1 - i] / FIB[FIB.length - 1]);
  }
  return sizes;
}

function getCircleOpacities(count: number): number[] {
  const opacities: number[] = [];
  const baseOpacity = 0.45;
  for (let i = 0; i < count; i++) {
    opacities.push(baseOpacity * Math.pow(0.75, i));
  }
  return opacities;
}

// Multi-axis rotation for 3D tumbling effect
// Circles and squares oscillate around the form (embracing, breathing motion)
// Radial lines rotate steadily on Z-axis
const TUMBLE_SPEEDS = {
  circles: { x: 0.6, y: 0.8, z: 0.15 },       // Oscillating embrace around form
  squares: { x: 0.7, y: 0.5, z: 0.2 },        // Dramatic breathing rotation
  radialLines: { z: 0.25 },                    // Steady Z-axis rotation
  spiral: { x: 0.3, y: 0.4, z: 0.2 },         // Gentle tumble
};

// Starting angles - dramatic tilts so elements begin already embracing the figure
const INITIAL_TILTS = {
  circles: { x: Math.PI / 3, y: Math.PI / 4 },    // 60° and 45° tilts
  squares: { x: Math.PI / 4, y: Math.PI / 5 },    // 45° and 36° tilts
};

// Each circle can rotate on different axes for 3D tumbling effect
function ConcentricCircles({ color = GOLD, animate = true, count = 5 }: { color?: string; animate?: boolean; count?: number }) {
  const groupRefs = useRef<(THREE.Group | null)[]>([]);
  const timeRef = useRef(0);
  
  const circleSizes = useMemo(() => getCircleSizes(count), [count]);
  const circleOpacities = useMemo(() => getCircleOpacities(count), [count]);
  
  // Each circle gets unique Fibonacci-based parameters for organic motion
  // KEY: Larger circles (lower index = larger size) rotate FASTER to cover more distance
  const circleParams = useMemo(() => 
    circleSizes.map((size, i) => ({
      // Staggered phase offsets so circles don't all move together
      phaseX: (FIB[i % FIB.length] / 34) * Math.PI,
      phaseY: (FIB[(i + 3) % FIB.length] / 34) * Math.PI,
      // SIZE-BASED SPEED: larger circles rotate faster, but capped to avoid jarring speeds
      // Range: 0.4 to 0.8 (gentle scaling)
      sizeSpeedMult: Math.min(0.4 + size * 0.5, 0.8),
      // Amplitude varies - outer rings swing wider
      amplitude: 0.5 + (size * 0.4),
      // Direction: alternate for visual depth
      direction: i % 2 === 0 ? 1 : -1,
      // Phase for acceleration oscillation (each circle has different rhythm)
      accelPhase: (FIB[(i + 2) % FIB.length] / 21) * Math.PI * 2,
    })), [circleSizes]
  );

  useFrame((_, delta) => {
    if (!animate) return;
    timeRef.current += delta;
    const t = timeRef.current;
    
    groupRefs.current.forEach((group, i) => {
      if (group) {
        const params = circleParams[i];
        const { x, y, z } = TUMBLE_SPEEDS.circles;
        const { x: startX, y: startY } = INITIAL_TILTS.circles;
        
        // OSCILLATING ACCELERATION: gentle pulse for organic feel
        // Range: 0.85 to 1.15 (subtle breathing, never jarring)
        const accelWave = 1.0 + 0.15 * Math.sin(t * 0.5 + params.accelPhase);
        const dynamicSpeed = params.sizeSpeedMult * accelWave;
        
        // Oscillating embrace with size-based speed and acceleration
        const swingX = Math.sin(t * x * dynamicSpeed + params.phaseX) * params.amplitude;
        const swingY = Math.cos(t * y * dynamicSpeed + params.phaseY) * params.amplitude * 0.8;
        
        // Start tilted, oscillate around that tilt point
        group.rotation.x = startX * params.direction + swingX;
        group.rotation.y = startY + swingY;
        group.rotation.z += z * params.direction * dynamicSpeed * delta;
      }
    });
  });

  return (
    <group>
      {circleSizes.map((size, i) => (
        <group 
          key={i} 
          ref={(el) => { groupRefs.current[i] = el; }}
        >
          <mesh>
            <ringGeometry args={[size * 1.2 - 0.008, size * 1.2, 64]} />
            <meshBasicMaterial 
              color={color} 
              transparent 
              opacity={circleOpacities[i]} 
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function RadialLines({ color = GOLD, count = 8, animate = true }: { color?: string; count?: number; animate?: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  
  // Create line objects once
  const lineObjects = useMemo(() => {
    const lines: THREE.Line[] = [];
    for (let i = 0; i < count; i++) {
      const angle = (i * (360 / count) * Math.PI) / 180;
      const x = Math.cos(angle) * 1.2;
      const y = Math.sin(angle) * 1.2;
      
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(
        new Float32Array([0, 0, 0, x, y, 0]),
        3
      ));
      
      const material = new THREE.LineBasicMaterial({ 
        color, 
        transparent: true, 
        opacity: 0.18 
      });
      lines.push(new THREE.Line(geometry, material));
    }
    return lines;
  }, [color, count]);

  useFrame((_, delta) => {
    if (!animate || !groupRef.current) return;
    const { z } = TUMBLE_SPEEDS.radialLines;
    
    // Simple Z-axis rotation only for radial lines
    groupRef.current.rotation.z -= z * delta;
  });

  return (
    <group ref={groupRef}>
      {lineObjects.map((line, i) => (
        <primitive key={i} object={line} />
      ))}
    </group>
  );
}

function DaVinciSquares({ color = GOLD, animate = true, count = 2 }: { color?: string; animate?: boolean; count?: number }) {
  const squareRefs = useRef<(THREE.Mesh | null)[]>([]);
  const timeRef = useRef(0);
  
  // Generate Fibonacci-based square sizes with size-based speed params
  const squares = useMemo(() => {
    const result: { size: number; rotation: number; opacity: number; phaseOffset: number; sizeSpeedMult: number; accelPhase: number }[] = [];
    for (let i = 0; i < count; i++) {
      const fibRatio = FIB[FIB.length - 1 - i] / FIB[FIB.length - 1];
      const size = fibRatio / PHI;
      result.push({
        size,
        rotation: i % 2 === 0 ? Math.PI / 4 : 0, // Alternate 45° rotation
        opacity: 0.3 * Math.pow(0.75, i),
        phaseOffset: (FIB[i % FIB.length] / 89) * Math.PI * 2,
        // SIZE-BASED SPEED: larger squares rotate faster, capped to avoid jarring
        // Range: 0.4 to 0.75 (gentle scaling)
        sizeSpeedMult: Math.min(0.4 + size * 0.5, 0.75),
        // Phase for acceleration oscillation
        accelPhase: (FIB[(i + 4) % FIB.length] / 34) * Math.PI * 2,
      });
    }
    return result;
  }, [count]);

  useFrame((_, delta) => {
    if (!animate) return;
    timeRef.current += delta;
    const t = timeRef.current;
    const { x, y, z } = TUMBLE_SPEEDS.squares;
    const { x: startX, y: startY } = INITIAL_TILTS.squares;
    
    squareRefs.current.forEach((mesh, i) => {
      if (mesh) {
        const sq = squares[i];
        const direction = i % 2 === 0 ? 1 : -1;
        const amplitude = 0.5 + (sq.size * 0.5);
        
        // OSCILLATING ACCELERATION: gentle pulse, never jarring
        // Range: 0.9 to 1.1 (subtle breathing)
        const accelWave = 1.0 + 0.1 * Math.sin(t * 0.4 + sq.accelPhase);
        const dynamicSpeed = sq.sizeSpeedMult * accelWave;
        
        // Oscillating embrace with size-based speed and acceleration
        const swingX = Math.sin(t * x * dynamicSpeed + sq.phaseOffset) * amplitude;
        const swingY = Math.cos(t * y * dynamicSpeed + sq.phaseOffset * 1.3) * amplitude * 0.7;
        
        // Start dramatically tilted, oscillate around that tilt
        mesh.rotation.x = startX * direction + swingX;
        mesh.rotation.y = startY + swingY;
        mesh.rotation.z += z * direction * dynamicSpeed * delta;
      }
    });
  });

  return (
    <group>
      {squares.map((sq, i) => (
        <mesh 
          key={i} 
          ref={(el) => { squareRefs.current[i] = el; }}
        >
          <ringGeometry args={[sq.size * 0.98, sq.size, 4]} />
          <meshBasicMaterial 
            color={color} 
            transparent 
            opacity={sq.opacity} 
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

function GoldenSpiral({ color = GOLD, animate = true }: { color?: string; animate?: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const timeRef = useRef(0);
  
  const curve = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const fib = [1, 1, 2, 3, 5, 8, 13, 21, 34];
    const scale = 0.8 / 34;
    
    let x = 0;
    let y = 0;
    let angle = 0;
    
    for (let f = 0; f < 8; f++) {
      const r = fib[f] * scale;
      const segments = 16;
      for (let s = 0; s <= segments; s++) {
        const a = angle + (s / segments) * (Math.PI / 2);
        points.push(new THREE.Vector3(
          x + Math.cos(a) * r - Math.cos(angle) * r,
          y + Math.sin(a) * r - Math.sin(angle) * r,
          0
        ));
      }
      x += Math.cos(angle + Math.PI / 2) * r * 2;
      y += Math.sin(angle + Math.PI / 2) * r * 2;
      angle += Math.PI / 2;
    }
    return new THREE.CatmullRomCurve3(points);
  }, []);

  useFrame((_, delta) => {
    if (!animate || !groupRef.current) return;
    timeRef.current += delta;
    const t = timeRef.current;
    const { x, y, z } = TUMBLE_SPEEDS.spiral;
    
    // Spiral gently tumbles and rotates
    groupRef.current.rotation.x = Math.sin(t * x) * 0.2;
    groupRef.current.rotation.y = Math.cos(t * y) * 0.15;
    groupRef.current.rotation.z += z * delta;
  });
  
  return (
    <group ref={groupRef}>
      <mesh>
        <tubeGeometry args={[curve, 100, 0.008, 8, false]} />
        <meshBasicMaterial color={color} transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

function VitruvianScene({
  joints,
  ghostJoints,
  showCircles = true,
  showSquares = true,
  showRadialLines = true,
  showSpiral = false,
  showAnatomy = true,
  animateGeometry = true,
  circleCount = 5,
  squareCount = 2,
  radialLineCount = 8,
  accentColor = GOLD,
}: {
  joints: FigureProps['joints'];
  ghostJoints?: Partial<FigureProps['joints']>;
  showCircles?: boolean;
  showSquares?: boolean;
  showRadialLines?: boolean;
  showSpiral?: boolean;
  showAnatomy?: boolean;
  animateGeometry?: boolean;
  circleCount?: number;
  squareCount?: number;
  radialLineCount?: number;
  accentColor?: string;
}) {
  return (
    <group>
      {/* Geometric elements - each rotates independently at Fibonacci-ratio speeds */}
      <group position={[0, 0, -0.1]}>
        {showRadialLines && <RadialLines color={accentColor} animate={animateGeometry} count={radialLineCount} />}
        {showCircles && <ConcentricCircles color={accentColor} animate={animateGeometry} count={circleCount} />}
        {showSquares && <DaVinciSquares color={accentColor} animate={animateGeometry} count={squareCount} />}
        {showSpiral && <GoldenSpiral color={accentColor} animate={animateGeometry} />}
      </group>
      
      {/* Figure stays static */}
      <Figure3D 
        joints={joints} 
        ghostJoints={ghostJoints}
        color={accentColor}
        showAnatomy={showAnatomy}
      />
    </group>
  );
}

interface Vitruvian3DProps {
  joints: FigureProps['joints'];
  ghostJoints?: Partial<FigureProps['joints']>;
  size?: number;
  showCircles?: boolean;
  showSquares?: boolean;
  showRadialLines?: boolean;
  showSpiral?: boolean;
  showAnatomy?: boolean;
  autoRotate?: boolean;
  animateGeometry?: boolean;
  circleCount?: number;
  squareCount?: number;
  radialLineCount?: number;
  accentColor?: string;
  backgroundColor?: string;
  cameraPosition?: [number, number, number];
}

export function Vitruvian3D({
  joints,
  ghostJoints,
  size = 400,
  showCircles = true,
  showSquares = true,
  showRadialLines = true,
  showSpiral = false,
  showAnatomy = true,
  autoRotate = false,
  animateGeometry = true,
  circleCount = 5,
  squareCount = 2,
  radialLineCount = 8,
  accentColor = GOLD,
  backgroundColor = '#0a0a0a',
  cameraPosition = [0, 0, 3.5],
}: Vitruvian3DProps) {
  const isTransparent = backgroundColor === 'transparent';
  
  return (
    <div style={{ width: size, height: size, background: isTransparent ? 'none' : backgroundColor, borderRadius: 8 }}>
      <Canvas
        gl={{ alpha: isTransparent, antialias: true }}
        style={{ background: isTransparent ? 'transparent' : undefined }}
      >
        <PerspectiveCamera makeDefault position={cameraPosition} fov={50} />
        <OrbitControls 
          enablePan={false} 
          enableZoom={true}
          minDistance={2}
          maxDistance={6}
          autoRotate={autoRotate}
          autoRotateSpeed={1}
        />
        
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <pointLight position={[3, 3, 3]} intensity={0.8} color="#ffffff" />
        <pointLight position={[-3, -3, 3]} intensity={0.4} color={accentColor} />
        <pointLight position={[0, 0, 5]} intensity={0.3} color="#ffffff" />
        
        <Suspense fallback={null}>
          <VitruvianScene 
            joints={joints}
            ghostJoints={ghostJoints}
            showCircles={showCircles}
            showSquares={showSquares}
            showRadialLines={showRadialLines}
            showSpiral={showSpiral}
            showAnatomy={showAnatomy}
            animateGeometry={animateGeometry}
            circleCount={circleCount}
            squareCount={squareCount}
            radialLineCount={radialLineCount}
            accentColor={accentColor}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
