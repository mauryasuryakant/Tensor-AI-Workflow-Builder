/**
 * ConditionNode — branching/decision node with true/false paths.
 */

import { memo } from 'react';
import BaseNode from './BaseNode';

const ConditionNode = memo(function ConditionNode(props) {
  const { data } = props;

  return (
    <BaseNode {...props} type="condition">
      <div className="flex gap-3 text-[10px]">
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald" />
          <span className="text-text-tertiary">True</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-rose" />
          <span className="text-text-tertiary">False</span>
        </div>
      </div>
      {data.config?.field && (
        <p className="text-[10px] text-text-tertiary mt-1 font-mono">
          {data.config.field} {data.config.operator} {data.config.value || ''}
        </p>
      )}
    </BaseNode>
  );
});

export default ConditionNode;
