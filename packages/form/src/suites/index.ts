import type { DefinedSuite } from '../core/suite/index';
import { dateRangeSuite } from './dateRangeSuite';
import { passwordSuite } from './passwordSuite';

export { dateRangeSuite, passwordSuite };

/**
 * 内置套件清单。
 *
 * 这里的导入即注册：defineSuite() 会把套件写入注册表，工厂与调色板据此工作。
 */
export const suites: DefinedSuite[] = [passwordSuite, dateRangeSuite];

export default suites;
