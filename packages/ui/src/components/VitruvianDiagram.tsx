import React from 'react';

export interface VitruvianDiagramProps {
  /** The figure pose to display */
  children: React.ReactNode;
  /** Size of the diagram in pixels */
  size?: number;
  /** Opacity of the figure (0-1) */
  figureOpacity?: number;
  /** Whether to show concentric circles */
  showCircles?: boolean;
  /** Whether to show the da Vinci squares */
  showSquares?: boolean;
  /** Whether to show radial proportion lines */
  showRadialLines?: boolean;
  /** Whether to show golden spiral */
  showSpiral?: boolean;
  /** Primary accent color */
  accentColor?: string;
  /** Background color */
  backgroundColor?: string;
}

export function VitruvianDiagram({
  children,
  size = 300,
  figureOpacity = 0.6,
  showCircles = true,
  showSquares = true,
  showRadialLines = true,
  showSpiral = false,
  accentColor = '#d4af37',
  backgroundColor = 'transparent',
}: VitruvianDiagramProps) {
  // Fibonacci sequence: 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89...
  // Using ratios based on golden ratio φ ≈ 1.618
  const phi = 1.618033988749;
  
  // Circle radii as Fibonacci ratios (largest to smallest)
  // 89/89, 55/89, 34/89, 21/89, 13/89
  const circleSizes = [1, 55/89, 34/89, 21/89, 13/89]; // ~1.0, 0.618, 0.382, 0.236, 0.146
  
  // Opacities also follow Fibonacci progression
  const circleOpacities = [0.45, 0.35, 0.27, 0.20, 0.15];

  return (
    <div
      style={{
        position: 'relative',
        width: size,
        height: size,
        backgroundColor,
      }}
    >
      {/* Radial proportion lines */}
      {showRadialLines && (
        <svg
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
          viewBox={`0 0 ${size} ${size}`}
        >
          {/* 8 radial lines (Fibonacci number) */}
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i * 45 * Math.PI) / 180; // 360/8 = 45°
            const centerX = size / 2;
            const centerY = size / 2;
            const length = size / 2;
            return (
              <line
                key={i}
                x1={centerX}
                y1={centerY}
                x2={centerX + Math.cos(angle) * length}
                y2={centerY + Math.sin(angle) * length}
                stroke={accentColor}
                strokeWidth={1}
                opacity={0.18}
              />
            );
          })}
        </svg>
      )}

      {/* Golden Spiral */}
      {showSpiral && (
        <svg
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
          viewBox={`0 0 ${size} ${size}`}
        >
          {/* Approximate golden spiral using quarter-circle arcs */}
          {(() => {
            const cx = size / 2;
            const cy = size / 2;
            const fib = [1, 1, 2, 3, 5, 8, 13, 21, 34];
            const scale = (size * 0.4) / 34; // Scale to fit
            
            // Build spiral path from Fibonacci quarter-arcs
            let path = `M ${cx} ${cy}`;
            let x = cx;
            let y = cy;
            
            // Each arc: radius from Fibonacci, rotating 90° each time
            const directions = [
              [1, 0],   // right
              [0, 1],   // down  
              [-1, 0],  // left
              [0, -1],  // up
            ];
            
            for (let i = 0; i < 8; i++) {
              const r = fib[i] * scale;
              const [dx, dy] = directions[i % 4];
              const nextX = x + dx * r;
              const nextY = y + dy * r;
              const sweep = 1;
              path += ` A ${r} ${r} 0 0 ${sweep} ${nextX} ${nextY}`;
              x = nextX;
              y = nextY;
            }
            
            return (
              <path
                d={path}
                fill="none"
                stroke={accentColor}
                strokeWidth={1.5}
                opacity={0.25}
              />
            );
          })()}
        </svg>
      )}

      {/* Concentric circles */}
      {showCircles &&
        circleSizes.map((sizePercent, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: size * sizePercent,
              height: size * sizePercent,
              borderRadius: '50%',
              border: `1px solid ${accentColor}`,
              opacity: circleOpacities[i],
              pointerEvents: 'none',
            }}
          />
        ))}

      {/* Da Vinci squares - using golden ratio proportions */}
      {showSquares && (
        <>
          {/* Outer square: 1/φ ≈ 0.618 */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%) rotate(45deg)',
              width: size / phi,
              height: size / phi,
              border: `1px solid ${accentColor}`,
              opacity: 0.30,
              pointerEvents: 'none',
            }}
          />
          {/* Inner square: 1/φ² ≈ 0.382 */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: size / (phi * phi),
              height: size / (phi * phi),
              border: `1px solid ${accentColor}`,
              opacity: 0.22,
              pointerEvents: 'none',
            }}
          />
        </>
      )}

      {/* Figure container - sized to the largest circle */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: size * circleSizes[0],
          height: size * circleSizes[0],
          opacity: figureOpacity,
        }}
      >
        {children}
      </div>
    </div>
  );
}
