import { BookCover, pistolSquatPose } from '@onf/ui';

export function ExportPage() {
  return (
    <div id="export-cover" style={{ width: 600, height: 900 }}>
      <BookCover
        pose={pistolSquatPose}
        width={600}
        height={900}
        author="Ryan P. Hansen"
        showCircles={true}
        showSquares={true}
        showRadialLines={true}
        showSpiral={true}
        showAnatomy={true}
        figureOpacity={0.7}
      />
    </div>
  );
}
