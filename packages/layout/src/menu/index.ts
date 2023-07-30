import menu from './index.vue';
import subMenu from './subMenu.vue';
import { withInstall } from '@youyo-ui/utils';

const YouyoMenu = withInstall(menu);
const YouyoSubMenu = withInstall(subMenu);

export { YouyoMenu, YouyoSubMenu };
