import { VitruvianDiagram, Figure, allPoses } from '@onf/ui';

// Get pose name from URL query param, default to first pose
const params = new URLSearchParams(window.location.search);
const poseName = params.get('pose') || 'vitruvian';

const pose = allPoses.find(p => p.name.toLowerCase().replace(/\s+/g, '-') === poseName) || allPoses[0];

export function ExportPosePage() {
  return (
    <div
      id="export-pose"
      style={{
        width: 800,
        height: 800,
        background: 'linear-gradient(160deg, #1a1a1a 0%, #0d0d0d 50%, #1a1a1a 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <VitruvianDiagram
        size={700}
        showCircles={true}
        showSquares={true}
        showRadialLines={true}
        showSpiral={true}
        figureOpacity={0.7}
      >
        <Figure
          joints={pose.joints}
          showAnatomy={true}
        />
      </VitruvianDiagram>
    </div>
  );
}
