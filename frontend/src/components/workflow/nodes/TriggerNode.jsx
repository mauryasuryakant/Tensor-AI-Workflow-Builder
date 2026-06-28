/**
 * TriggerNode — workflow entry point (form submit, webhook, schedule).
 */

import { memo } from 'react';
import BaseNode from './BaseNode';
import { Badge } from '../../ui';

const TriggerNode = memo(function TriggerNode(props) {
  const { data } = props;

  return (
    <BaseNode {...props} type="trigger">
      {data.config?.subtype && (
        <Badge color="amber" size="sm" dot>
          {data.config.subtype}
        </Badge>
      )}
    </BaseNode>
  );
});

export default TriggerNode;
