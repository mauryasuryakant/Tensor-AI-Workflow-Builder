/**
 * AnimatedEdge — custom edge with flowing dot animation and gradient.
 */

import { memo } from 'react';
import { BaseEdge, getSmoothStepPath } from '@xyflow/react';

const AnimatedEdge = memo(function AnimatedEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  selected,
  style,
}) {
  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    borderRadius: 16,
  });

  const dotId = `dot-${id}`;

  return (
    <>
      <defs>
        <linearGradient id={`gradient-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(139, 92, 246, 0.6)" />
          <stop offset="100%" stopColor="rgba(6, 182, 212, 0.4)" />
        </linearGradient>
      </defs>

      {/* Shadow edge for glow effect */}
      <path
        d={edgePath}
        fill="none"
        stroke="rgba(139, 92, 246, 0.1)"
        strokeWidth={8}
        className="transition-all duration-200"
      />

      {/* Main edge */}
      <BaseEdge
        id={id}
        path={edgePath}
        style={{
          stroke: selected ? 'rgba(139, 92, 246, 0.8)' : `url(#gradient-${id})`,
          strokeWidth: selected ? 2.5 : 2,
          ...style,
        }}
      />

      {/* Animated dot */}
      <circle r="3" fill="#8b5cf6" opacity="0.8">
        <animateMotion
          dur="3s"
          repeatCount="indefinite"
          path={edgePath}
        />
      </circle>

      {/* Secondary smaller dot with offset */}
      <circle r="2" fill="#06b6d4" opacity="0.5">
        <animateMotion
          dur="3s"
          repeatCount="indefinite"
          path={edgePath}
          begin="1.5s"
        />
      </circle>
    </>
  );
});

export default AnimatedEdge;
