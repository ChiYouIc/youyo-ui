import componentFactory from './Factory';
import { ComponentConstructorOptionType } from './types';
import AbstractComponent from './AbstractComponent';
import Fence from './entity/Fence';

/**
 * 表单对象
 */
class Form {
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

  public remove(component: AbstractComponent): boolean {
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

  private initComponents(list: Array<ComponentConstructorOptionType>) {
    if (list.length === 0) {
      return;
    }

    for (const item of list) {
      const component = componentFactory.creator({
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
