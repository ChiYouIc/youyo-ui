import AbstractComponent from '../AbstractComponent';
import { ComponentConstructorOptionType } from '../types';
import { ComponentSelectType } from '../../types';
import Suite from './Suite';
import { SuiteDefinition } from './types';

export type { SuiteDefinition, SuiteFieldDefinition, SuiteValidateContext } from './types';
export { Suite };

/**
 * 已定义套件：定义 + 实体类
 */
export interface DefinedSuite {
  definition: SuiteDefinition;
  Entity: new (option: ComponentConstructorOptionType) => AbstractComponent;
}

/** 套件内部不允许再嵌套容器，否则字段定位与取值会失去确定性 */
const CONTAINER_COMPONENTS = ['Fence', 'Suite'];

/** 套件注册表，key 与 JSON 中的 suiteType 一致 */
const registry = new Map<string, DefinedSuite>();

/**
 * 声明一个套件。
 *
 * 一份定义同时提供服务给实体工厂与调色板：注册后无需再改任何注册表。
 */
export function defineSuite(definition: SuiteDefinition): DefinedSuite {
  if (!definition.type) {
    throw new Error('[youyo-form] 套件定义缺少 type');
  }

  if (registry.has(definition.type)) {
    throw new Error(`[youyo-form] 套件 ${definition.type} 重复注册`);
  }

  const names = new Set<string>();
  for (const field of definition.fields) {
    if (!field.name) {
      throw new Error(`[youyo-form] 套件 ${definition.type} 存在未命名字段`);
    }

    if (names.has(field.name)) {
      throw new Error(`[youyo-form] 套件 ${definition.type} 字段名重复：${field.name}`);
    }
    names.add(field.name);

    if (CONTAINER_COMPONENTS.includes(field.component)) {
      throw new Error(`[youyo-form] 套件 ${definition.type} 不允许嵌套 ${field.component} 字段`);
    }
  }

  const Entity = class extends Suite {
    constructor(option: ComponentConstructorOptionType) {
      super(option, definition);
    }
  };

  const defined: DefinedSuite = { definition, Entity };
  registry.set(definition.type, defined);
  return defined;
}

/**
 * 按 suiteType 取套件定义
 */
export function getSuite(type: string): DefinedSuite | undefined {
  return registry.get(type);
}

/**
 * 当前已注册的套件
 */
export function listSuites(): DefinedSuite[] {
  return Array.from(registry.values());
}

/**
 * 调色板的套件条目，新增套件后自动出现
 */
export function suitePaletteItems(): ComponentSelectType[] {
  return listSuites().map(({ definition }) => ({
    name: definition.label,
    component: 'Suite',
    suiteType: definition.type,
    description: definition.description ?? definition.label,
  }));
}
