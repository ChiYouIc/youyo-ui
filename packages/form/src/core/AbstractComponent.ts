import AbstractComponentConfig from './AbstractComponentConfig';
import { ComponentOption } from '../types';

/**
 * 抽象的组件
 */
abstract class AbstractComponent {
  public readonly id: string;
  public readonly name: string;
  public readonly component: string;
  public label: string = 'Label';
  public required: boolean = false;
  public disabled: boolean = false;

  constructor(c: ComponentOption) {
    this.id = c.id;
    this.name = c.name;
    this.component = c.component;
  }

  /**
   * 初始化
   */
  public abstract init(config: AbstractComponentConfig): void;
}

export default AbstractComponent;
