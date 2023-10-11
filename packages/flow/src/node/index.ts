import node from './index.vue';
import nodeGroup from './nodeGroup.vue';
import { withInstall } from '@youyo-ui/utils';

const YFlowNode = withInstall(node, 'y-flow-node');
const YFlowNodeGroup = withInstall(nodeGroup, 'y-flow-node-group');

export { YFlowNode, YFlowNodeGroup };
