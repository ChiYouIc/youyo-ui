import globalConfig from '../config';
import { ComponentConstructorOptionType, ComponentModel, FormModel, FormValidateError, FormValidateResult } from './types';
import AbstractComponent from './AbstractComponent';
import Fence from './entity/Fence';

/**
 * 表单对象
 */
class Form implements FormModel {
  private _id: string;
  private _name: string;
  private _description: string;
  private _labelWidth: string;
  private _width: string;
  private _height: string;
  private _version: string;
  private _components: Array<AbstractComponent> = [];

  constructor(id: string, name: string, version: string, description: string, components: Array<ComponentConstructorOptionType>, labelWidth: string = '120px', width: string = '100%', height: string = '100%') {
    this._id = id;
    this._name = name;
    this._version = version;
    this._description = description;
    this._labelWidth = labelWidth;
    this._width = width;
    this._height = height;
    this.initComponents(components);
  }

  public clear() {
    this._components.splice(-this._components.length);
  }

  public remove(component: ComponentModel): boolean {
    const index = this._components.findIndex(c => c.primaryId() === component.primaryId());
    if (index !== -1) {
      this._components.splice(index, 1);
      return true;
    }

    // fence 中
    const fenceList = this._components.filter(c => c.component === 'Fence');
    if (fenceList.length > 0) {
      for (const fence of fenceList) {
        if ((fence as Fence).remove(component)) {
          return true;
        }
      }
    }

    return false;
  }

  /**
   * 从 json 还原表单
   */
  public static fromJson(json: Record<string, any>): Form {
    return new Form(json.id, json.name, json.version, json.description, json.components ?? [], json.labelWidth ?? '120px', json.width ?? '100%', json.height ?? '100%');
  }

  /**
   * 校验表单
   */
  public validate(): FormValidateResult {
    const errors: FormValidateError[] = [];
    this.collectErrors(this._components, errors);
    this.collectDuplicateNames(this._components, errors);
    return { valid: errors.length === 0, errors };
  }

  private collectErrors(components: Array<AbstractComponent>, errors: Array<FormValidateError>): void {
    for (const item of components) {
      // 栅栏需要下沉到内部组件，才能定位到具体的字段
      if (item instanceof Fence) {
        for (const cell of item.list) {
          this.collectErrors(cell, errors);
        }
        continue;
      }

      const message = item.validate();
      if (message !== undefined) {
        errors.push({ name: item.name, message });
      }
    }
  }

  /**
   * 字段名重复会让 formValue() 归并时相互覆盖，这里单独报出来
   */
  private collectDuplicateNames(components: Array<AbstractComponent>, errors: Array<FormValidateError>): void {
    const names: string[] = [];
    this.collectNames(components, names);

    const counted = new Map<string, number>();
    for (const name of names) {
      counted.set(name, (counted.get(name) ?? 0) + 1);
    }

    for (const [name, count] of counted) {
      if (count > 1) {
        errors.push({ name, message: '字段名称重复' });
      }
    }
  }

  private collectNames(components: Array<AbstractComponent>, names: Array<string>): void {
    for (const item of components) {
      if (item instanceof Fence) {
        for (const cell of item.list) {
          this.collectNames(cell, names);
        }
        continue;
      }

      names.push(item.name);
    }
  }

  private initComponents(list: Array<ComponentConstructorOptionType>) {
    if (list.length === 0) {
      return;
    }

    for (const item of list) {
      const component = globalConfig.componentFactory.creator({
        id: item.id,
        name: item.name,
        component: item.component,
        defaultValue: item.defaultValue,
        label: item.label,
        required: item.required,
        disabled: item.disabled,
      });
      component.init(item);
      this._components.push(component);
    }
  }

  public formValue(): Record<string, any> {
    let form: Record<string, any> = {};

    if (this._components === undefined || this._components.length === 0) {
      return form;
    }

    for (const item of this._components) {
      form = Object.assign(form, item.valToJson());
    }

    return form;
  }

  public toJson(): Record<string, any> {
    const json: Record<string, any> = {
      id: this._id,
      name: this._name,
      description: this._description,
      version: this._version,
      labelWidth: this._labelWidth,
      width: this._width,
      height: this._height,
      components: [],
    };

    this._components.forEach(c => json.components.push(c.configToJson()));
    return json;
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get version(): string {
    return this._version;
  }

  set version(value: string) {
    this._version = value;
  }

  get components(): Array<AbstractComponent> {
    return this._components;
  }

  set components(value: Array<AbstractComponent>) {
    this._components = value;
  }

  get labelWidth(): string {
    return this._labelWidth;
  }

  set labelWidth(value: string) {
    this._labelWidth = value;
  }

  get width(): string {
    return this._width;
  }

  set width(value: string) {
    this._width = value;
  }

  get height(): string {
    return this._height;
  }

  set height(value: string) {
    this._height = value;
  }
}

export default Form;
