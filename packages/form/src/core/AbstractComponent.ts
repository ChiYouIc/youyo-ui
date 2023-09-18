import { AbstractComponentConstructorOption, AbstractComponentInitOption, ComponentModeType } from '../types';
import { VNode } from 'vue';

/**
 * 抽象的组件
 */
abstract class AbstractComponent {
  public readonly id: string;
  public readonly name: ComponentModeType;
  public readonly component: string;
  public label: string;
  public required: boolean;
  public disabled: boolean;

  constructor({ id, name, component, label, required, disabled }: AbstractComponentConstructorOption) {
    this.id = id;
    this.name = name;
    this.component = component;
    this.label = label || 'Label';
    this.required = required || false;
    this.disabled = disabled || false;
  }

  /**
   * 初始化
   */
  public abstract init(config: AbstractComponentInitOption): void;

  /**
   * 获取节点
   */
  public abstract node(): VNode;
}

export default AbstractComponent;
