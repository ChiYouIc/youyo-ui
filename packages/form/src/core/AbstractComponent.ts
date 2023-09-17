import AbstractComponentConfig from './AbstractComponentConfig';
import { ComponentOption } from '../types';

/**
 * 抽象的组件
 */
abstract class AbstractComponent {
  private _id: string;
  private _name: string;
  private _component: string;
  public required: boolean = false;
  public disabled: boolean = false;

  constructor(c: ComponentOption) {
    this._id = c.id;
    this._name = c.name;
    this._component = c.component;
  }

  /**
   * 初始化
   */
  public abstract init(config: AbstractComponentConfig): void;

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get component(): string {
    return this._component;
  }
}

export default AbstractComponent;
