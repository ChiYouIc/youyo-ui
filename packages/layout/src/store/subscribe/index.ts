import subscribeRoute from './route';
import subscribeTheme from './theme';

/**
 * 订阅状态
 */
export function subscribeStore() {
  subscribeRoute();
  subscribeTheme();
}
