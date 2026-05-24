import { 
  ChapterOpener, 
  vitruvianPose,
  lSitPose,
  muscleUpPullPose,
  pistolSquatPose, 
  muscleUpPose, 
  handstandPose, 
  frontLeverPose, 
  planchePose,
  straddlePlanchePose,
} from '@onf/ui';

const chapters = [
  { number: 0, title: 'Prologue', pose: vitruvianPose },
  { number: 1, title: 'The Five Goals', pose: lSitPose },
  { number: 2, title: 'The Old Way', pose: muscleUpPullPose },
  { number: 3, title: 'The Pistol Squat', pose: pistolSquatPose },
  { number: 4, title: 'The Muscle-Up', pose: muscleUpPose },
  { number: 5, title: 'The Handstand Push-Up', pose: handstandPose },
  { number: 6, title: 'The Front Lever', pose: frontLeverPose },
  { number: 7, title: 'The Planche', pose: planchePose },
  { number: 8, title: 'Skeleton Before Muscles', pose: handstandPose },
  { number: 9, title: 'The Scapula Discovery', pose: frontLeverPose },
  { number: 10, title: 'Taking the Brakes Off', pose: lSitPose },
  { number: 11, title: 'The Carryover', pose: straddlePlanchePose },
  { number: 12, title: 'Organized, Not Forced', pose: vitruvianPose },
];

export function ExportChapterOpeners() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40, padding: 40, background: '#333' }}>
      {chapters.map((ch) => (
        <div 
          key={ch.number} 
          id={`chapter-opener-${ch.number}`}
          style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}
        >
          <ChapterOpener
            chapterNumber={ch.number}
            title={ch.title}
            pose={ch.pose}
            width={600}
            height={900}
            showCircles={true}
            showSquares={true}
            showRadialLines={true}
            figureOpacity={0.7}
          />
        </div>
      ))}
    </div>
  );
}
