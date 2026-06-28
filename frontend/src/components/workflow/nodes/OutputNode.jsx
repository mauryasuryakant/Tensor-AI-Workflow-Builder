/**
 * OutputNode — terminal endpoint of the workflow.
 */

import { memo } from 'react';
import BaseNode from './BaseNode';

const OutputNode = memo(function OutputNode(props) {
  return <BaseNode {...props} type="output" />;
});

export default OutputNode;
