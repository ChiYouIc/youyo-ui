import { AbstractComponentConstructorOption, AbstractComponentInitOption, ComponentModeType } from '../types';
import { VNode } from 'vue';

/**
 * 抽象的组件
 */
abstract class AbstractComponent<Value> {
  /** id */
  public readonly id: string;
  /** 字段标签 */
  public label: string;
  /** 字段名称 */
  public name: string;
  /** 字段值 */
  public value: Value;
  /** 组件类型 */
  public readonly component: ComponentModeType;
  /** 是否必填 */
  public required: boolean;
  /** 是否禁用 */
  public disabled: boolean;

  constructor({ id, name, component, label, required, disabled }: AbstractComponentConstructorOption) {
    this.id = id;
    this.name = name;
    this.component = component;
    this.value = undefined as Value;
    this.label = label || 'Label';
    this.required = required || false;
    this.disabled = disabled || false;
  }

  /**
   * 初始化
   */
  public abstract init(config: AbstractComponentInitOption<any>): void;

  /**
   * 获取节点
   */
  public abstract node(): VNode;
}

export default AbstractComponent;
