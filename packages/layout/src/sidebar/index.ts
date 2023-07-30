import sidebar from './index.vue';
import subSidebar from './subSidebar.vue';

import { withInstall } from '@youyo-ui/utils';

const YouyoSidebar = withInstall(sidebar, 'youyo-sidebar');
const YouyoSubSidebar = withInstall(subSidebar, 'youyo-sub-sidebar');

export { YouyoSidebar, YouyoSubSidebar };
