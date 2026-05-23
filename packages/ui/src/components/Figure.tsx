

export interface JointPosition {
  x: number;
  y: number;
}

export interface FigureProps {
  /** Joint positions defining the pose (normalized 0-1 coordinates) */
  joints: {
    head: JointPosition;
    neck: JointPosition;
    leftShoulder: JointPosition;
    rightShoulder: JointPosition;
    leftElbow: JointPosition;
    rightElbow: JointPosition;
    leftWrist: JointPosition;
    rightWrist: JointPosition;
    spine: JointPosition; // mid-torso
    pelvis: JointPosition;
    leftHip: JointPosition;
    rightHip: JointPosition;
    leftKnee: JointPosition;
    rightKnee: JointPosition;
    leftAnkle: JointPosition;
    rightAnkle: JointPosition;
  };
  /** Optional ghost/secondary pose for Vitruvian effect */
  ghostJoints?: Partial<FigureProps['joints']>;
  /** Stroke color */
  color?: string;
  /** Whether to show joint circles */
  showJoints?: boolean;
  /** Whether to show anatomical details (ribcage, etc.) */
  showAnatomy?: boolean;
}

export function Figure({
  joints,
  ghostJoints,
  color = '#d4af37',
  showJoints = true,
  showAnatomy = true,
}: FigureProps) {
  const scale = (pos: JointPosition) => ({
    x: pos.x * 260,
    y: pos.y * 260,
  });

  const j = Object.fromEntries(
    Object.entries(joints).map(([key, pos]) => [key, scale(pos)])
  ) as Record<keyof FigureProps['joints'], { x: number; y: number }>;

  const drawLimb = (
    from: { x: number; y: number },
    to: { x: number; y: number },
    strokeWidth = 0.7,
    opacity = 1
  ) => (
    <line
      x1={from.x}
      y1={from.y}
      x2={to.x}
      y2={to.y}
      stroke={color}
      strokeWidth={strokeWidth}
      opacity={opacity}
    />
  );

  const drawJoint = (
    pos: { x: number; y: number },
    radius = 3,
    opacity = 1
  ) => (
    <circle
      cx={pos.x}
      cy={pos.y}
      r={radius}
      fill="none"
      stroke={color}
      strokeWidth={1.5}
      opacity={opacity}
    />
  );

  return (
    <svg viewBox="0 0 260 260" style={{ width: '100%', height: '100%' }}>
      {/* Head */}
      <ellipse
        cx={j.head.x}
        cy={j.head.y}
        rx={14}
        ry={16}
        fill="none"
        stroke={color}
        strokeWidth={2}
      />

      {/* Neck */}
      {drawLimb(j.head, j.neck, 2)}

      {/* Spine / Torso */}
      {drawLimb(j.neck, j.spine, 2.5)}
      {drawLimb(j.spine, j.pelvis, 2.5)}

      {/* Shoulders */}
      {drawLimb(j.leftShoulder, j.rightShoulder, 1.8)}

      {/* Ribcage */}
      {showAnatomy && (
        <ellipse
          cx={j.spine.x}
          cy={j.spine.y}
          rx={22}
          ry={28}
          fill="none"
          stroke={color}
          strokeWidth={1}
        />
      )}

      {/* Pelvis to Hips connections */}
      {drawLimb(j.pelvis, j.leftHip, 2)}
      {drawLimb(j.pelvis, j.rightHip, 2)}

      {/* Pelvis curve (anatomical detail) */}
      {showAnatomy && (
        <path
          d={`M ${j.leftHip.x} ${j.leftHip.y - 3} Q ${j.pelvis.x} ${j.pelvis.y + 10} ${j.rightHip.x} ${j.rightHip.y - 3}`}
          fill="none"
          stroke={color}
          strokeWidth={1}
          opacity={0.6}
        />
      )}

      {/* Left Arm */}
      {drawLimb(j.leftShoulder, j.leftElbow, 2)}
      {drawLimb(j.leftElbow, j.leftWrist, 1.8)}

      {/* Right Arm */}
      {drawLimb(j.rightShoulder, j.rightElbow, 2)}
      {drawLimb(j.rightElbow, j.rightWrist, 1.8)}

      {/* Left Leg */}
      {drawLimb(j.leftHip, j.leftKnee, 2)}
      {drawLimb(j.leftKnee, j.leftAnkle, 1.8)}

      {/* Right Leg */}
      {drawLimb(j.rightHip, j.rightKnee, 2)}
      {drawLimb(j.rightKnee, j.rightAnkle, 1.8)}

      {/* Joints */}
      {showJoints && (
        <>
          {drawJoint(j.leftShoulder, 5)}
          {drawJoint(j.rightShoulder, 5)}
          {drawJoint(j.leftElbow, 4)}
          {drawJoint(j.rightElbow, 4)}
          {drawJoint(j.leftWrist, 3)}
          {drawJoint(j.rightWrist, 3)}
          {drawJoint(j.leftHip, 5)}
          {drawJoint(j.rightHip, 5)}
          {drawJoint(j.leftKnee, 4.5)}
          {drawJoint(j.rightKnee, 4.5)}
          {drawJoint(j.leftAnkle, 3.5)}
          {drawJoint(j.rightAnkle, 3.5)}
        </>
      )}

      {/* Ghost pose (secondary position) */}
      {ghostJoints && (
        <g opacity={0.5}>
          {ghostJoints.leftElbow && ghostJoints.leftWrist && (
            <>
              {drawLimb(j.leftShoulder, scale(ghostJoints.leftElbow), 1.2, 0.5)}
              {drawLimb(scale(ghostJoints.leftElbow), scale(ghostJoints.leftWrist), 1, 0.5)}
            </>
          )}
          {ghostJoints.rightElbow && ghostJoints.rightWrist && (
            <>
              {drawLimb(j.rightShoulder, scale(ghostJoints.rightElbow), 1.2, 0.5)}
              {drawLimb(scale(ghostJoints.rightElbow), scale(ghostJoints.rightWrist), 1, 0.5)}
            </>
          )}
          {ghostJoints.leftKnee && ghostJoints.leftAnkle && (
            <>
              {drawLimb(j.leftHip, scale(ghostJoints.leftKnee), 1.2, 0.5)}
              {drawLimb(scale(ghostJoints.leftKnee), scale(ghostJoints.leftAnkle), 1, 0.5)}
            </>
          )}
          {ghostJoints.rightKnee && ghostJoints.rightAnkle && (
            <>
              {drawLimb(j.rightHip, scale(ghostJoints.rightKnee), 1.2, 0.5)}
              {drawLimb(scale(ghostJoints.rightKnee), scale(ghostJoints.rightAnkle), 1, 0.5)}
            </>
          )}
        </g>
      )}
    </svg>
  );
}
