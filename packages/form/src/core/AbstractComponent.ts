import { VNode } from 'vue';
import { ComponentActionType, ComponentConstructorOptionType } from './types';

/**
 * 抽象的组件
 */
abstract class AbstractComponent implements ComponentActionType {
  /** id */
  private readonly _id: string;
  /** 字段标签 */
  private _label: string;
  /** 字段名称 */
  private _name: string;
  /** 默认值 */
  private _defaultValue: any;
  /** 组件类型 */
  private readonly _component: string;
  /** 是否必填 */
  private _required: boolean;
  /** 是否禁用 */
  private _disabled: boolean;

  protected constructor({ id, name, component, defaultValue, label, required, disabled }: ComponentConstructorOptionType) {
    this._id = id;
    this._name = name;
    this._component = component;
    this._defaultValue = defaultValue;
    this._label = label;
    this._required = required;
    this._disabled = disabled;
  }

  public abstract getVal(): any;

  protected abstract setVal(val: any): void;

  /**
   * 初始化
   */
  public abstract init(json: Record<string, any>): void;

  /**
   * 获取节点
   */
  public abstract node(): VNode;

  public valToJson(): Record<string, any> {
    return { [this._name]: this.getVal() };
  }

  public configToJson(): Record<string, any> {
    return {
      id: this._id,
      label: this._label,
      name: this._name,
      defaultValue: this._defaultValue,
      component: this._component,
      required: this._required,
      disabled: this._disabled,
    };
  }

  public primaryId(): string {
    return this._id;
  }

  get label(): string {
    return this._label;
  }

  set label(value: string) {
    this._label = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get defaultValue(): any {
    return this._defaultValue;
  }

  set defaultValue(value: any) {
    this._defaultValue = value;
    this.setVal(value);
  }

  get component(): string {
    return this._component;
  }

  get required(): boolean {
    return this._required;
  }

  set required(value: boolean) {
    this._required = value;
  }

  get disabled(): boolean {
    return this._disabled;
  }

  set disabled(value: boolean) {
    this._disabled = value;
  }
}

export default AbstractComponent;
