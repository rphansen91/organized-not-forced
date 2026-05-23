import { VitruvianDiagram } from './VitruvianDiagram';
import { Figure } from './Figure';
import type { FigureProps } from './Figure';

type Joints = FigureProps['joints'];

export interface BookCoverProps {
  /** Pose to display in the Vitruvian diagram */
  pose: Joints;
  /** Book title - first line */
  titleLine1?: string;
  /** Book title - second line (accented) */
  titleLine2?: string;
  /** Subtitle text */
  subtitle?: string;
  /** Author name */
  author?: string;
  /** Width in pixels */
  width?: number;
  /** Height in pixels */
  height?: number;
  /** Show geometry elements */
  showCircles?: boolean;
  showSquares?: boolean;
  showRadialLines?: boolean;
  showSpiral?: boolean;
  showAnatomy?: boolean;
  /** Figure opacity (0-1) */
  figureOpacity?: number;
}

export function BookCover({
  pose,
  titleLine1 = 'Organized,',
  titleLine2 = 'Not Forced',
  subtitle = 'Movement Lessons from Bodyweight Training',
  author = '',
  width = 400,
  height = 600,
  showCircles = true,
  showSquares = true,
  showRadialLines = true,
  showSpiral = true,
  showAnatomy = false,
  figureOpacity = 0.7,
}: BookCoverProps) {
  // Scale factor for responsive sizing
  const scale = width / 400;
  
  // Fibonacci sequence for spacing: 8, 13, 21, 34, 55, 89
  // Using golden ratio (φ ≈ 1.618) for proportions
  const fib = {
    xs: 8 * scale,   // smallest spacing
    sm: 13 * scale,  // small
    md: 21 * scale,  // medium
    lg: 34 * scale,  // large
    xl: 55 * scale,  // extra large
    xxl: 89 * scale, // largest
  };
  
  return (
    <div
      style={{
        width,
        height,
        background: 'linear-gradient(160deg, #1a1a1a 0%, #0d0d0d 50%, #1a1a1a 100%)',
        fontFamily: "'Inter', sans-serif",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: `${48 * scale}px ${36 * scale}px`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Grid texture */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            linear-gradient(rgba(212, 175, 55, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212, 175, 55, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: `${20 * scale}px ${20 * scale}px`,
          pointerEvents: 'none',
        }}
      />

      {/* Vitruvian diagram - centered */}
      <div
        style={{
          position: 'absolute',
          top: '55%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: width * 0.75,
          height: width * 0.75,
        }}
      >
        <VitruvianDiagram
          size={width * 0.75}
          showCircles={showCircles}
          showSquares={showSquares}
          showRadialLines={showRadialLines}
          showSpiral={showSpiral}
          figureOpacity={figureOpacity}
        >
          <Figure
            joints={pose}
            showAnatomy={showAnatomy}
          />
        </VitruvianDiagram>
      </div>

      {/* Header - Title */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        <h1
          style={{
            fontSize: 32 * scale,
            fontWeight: 600,
            color: '#ffffff',
            lineHeight: 1.1,
            letterSpacing: -0.5,
            margin: 0,
          }}
        >
          {titleLine1}
          <br />
          <span style={{ color: '#d4af37' }}>{titleLine2}</span>
        </h1>
        <p
          style={{
            fontSize: 11 * scale,
            fontWeight: 300,
            color: 'rgba(255, 255, 255, 0.5)',
            letterSpacing: 2,
            textTransform: 'uppercase',
            marginTop: 16 * scale,
          }}
        >
          {subtitle}
        </p>
      </div>

      {/* Footer - Author with Fibonacci spacing from bottom */}
      {author && (
        <div 
          style={{ 
            position: 'absolute',
            bottom: fib.lg, // 34px from bottom edge
            left: fib.lg,   // 34px from left edge (golden ratio alignment)
            zIndex: 10,
          }}
        >
          {/* Gold accent line - positioned above author name */}
          <div
            style={{
              width: fib.lg,  // 34px wide
              height: 2,
              background: 'linear-gradient(90deg, #d4af37, transparent)',
              marginBottom: fib.sm, // 13px gap between line and name
            }}
          />
          <p
            style={{
              fontSize: 13 * scale, // Fibonacci-based size
              fontWeight: 400,
              color: 'rgba(255, 255, 255, 0.7)',
              letterSpacing: 1.5,
              margin: 0,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {author}
          </p>
        </div>
      )}
    </div>
  );
}
