import AbstractComponent from '../AbstractComponent';
import componentFactory from '../componentFactory';
import { AbstractComponentInitOption } from '../../types';

/**
 * 表单对象
 */
class Form {
  public id: string;
  public name: string;
  public description: string;
  public version: string;
  public components: Array<AbstractComponent> = [];

  constructor(id: string, name: string, version: string, description: string, components?: Array<AbstractComponent>) {
    this.id = id;
    this.name = name;
    this.version = version;
    this.description = description;
    this.initComponents(components);
  }

  public clear() {
    this.components.splice(-this.components.length);
  }

  public remove(component: AbstractComponent): void {
    const index = this.components.findIndex(c => c.id === component.id);
    if (index === -1) {
      return false;
    }

    this.components.splice(index, 1);
  }

  private initComponents(list: Array<AbstractComponent> | undefined) {
    if (list === undefined || list.length === 0) {
      return;
    }

    for (const item of list) {
      const component = componentFactory.creator({
        id: item.id,
        name: item.name,
        component: item.component,
        label: item.label,
        required: item.required,
        disabled: item.disabled,
      });
      component.init(item as AbstractComponentInitOption);
      this.components.push(component);
    }
  }
}

export default Form;
