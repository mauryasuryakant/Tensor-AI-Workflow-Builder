/**
 * ActionNode — performs an operation (email, API call, database, etc.).
 */

import { memo } from 'react';
import BaseNode from './BaseNode';
import { Badge } from '../../ui';

const ActionNode = memo(function ActionNode(props) {
  const { data } = props;

  return (
    <BaseNode {...props} type="action">
      <div className="space-y-1.5">
        {data.config?.subtype && (
          <Badge color="violet" size="sm" dot>
            {data.config.subtype}
          </Badge>
        )}
        {data.description && (
          <p className="text-[10px] text-text-tertiary leading-tight">
            {data.description}
          </p>
        )}
      </div>
    </BaseNode>
  );
});

export default ActionNode;
