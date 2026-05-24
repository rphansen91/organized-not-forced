import { VitruvianDiagram } from './VitruvianDiagram';
import { Figure } from './Figure';
import type { FigureProps } from './Figure';

type Joints = FigureProps['joints'];

export interface ChapterOpenerProps {
  /** Chapter number */
  chapterNumber: number;
  /** Chapter title */
  title: string;
  /** Pose to display */
  pose: Joints;
  /** Width in pixels */
  width?: number;
  /** Height in pixels */
  height?: number;
  /** Show geometry elements */
  showCircles?: boolean;
  showSquares?: boolean;
  showRadialLines?: boolean;
  /** Figure opacity (0-1) */
  figureOpacity?: number;
}

export function ChapterOpener({
  chapterNumber,
  title,
  pose,
  width = 600,
  height = 900,
  showCircles = true,
  showSquares = true,
  showRadialLines = true,
  figureOpacity = 0.7,
}: ChapterOpenerProps) {
  const scale = width / 600;
  
  return (
    <div
      style={{
        width,
        height,
        background: 'linear-gradient(160deg, #1a1a1a 0%, #0d0d0d 50%, #1a1a1a 100%)',
        fontFamily: "'Inter', sans-serif",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 80 * scale,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle grid texture */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            linear-gradient(rgba(212, 175, 55, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212, 175, 55, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: `${20 * scale}px ${20 * scale}px`,
          pointerEvents: 'none',
        }}
      />

      {/* Chapter number and title */}
      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
        {chapterNumber > 0 && (
          <p
            style={{
              fontSize: 14 * scale,
              fontWeight: 400,
              color: 'rgba(255, 255, 255, 0.5)',
              letterSpacing: 3,
              textTransform: 'uppercase',
              margin: 0,
              marginBottom: 12 * scale,
            }}
          >
            Chapter {chapterNumber}
          </p>
        )}
        <h1
          style={{
            fontSize: 42 * scale,
            fontWeight: 600,
            color: '#ffffff',
            lineHeight: 1.1,
            letterSpacing: -0.5,
            margin: 0,
          }}
        >
          {title}
        </h1>
        {/* Gold accent line */}
        <div
          style={{
            width: 60 * scale,
            height: 2,
            background: 'linear-gradient(90deg, transparent, #d4af37, transparent)',
            margin: `${24 * scale}px auto 0`,
          }}
        />
      </div>

      {/* Vitruvian diagram - centered below title */}
      <div
        style={{
          position: 'absolute',
          top: '52%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: width * 0.7,
          height: width * 0.7,
        }}
      >
        <VitruvianDiagram
          size={width * 0.7}
          showCircles={showCircles}
          showSquares={showSquares}
          showRadialLines={showRadialLines}
          showSpiral={false}
          figureOpacity={figureOpacity}
        >
          <Figure
            joints={pose}
            showAnatomy={false}
          />
        </VitruvianDiagram>
      </div>

    </div>
  );
}
