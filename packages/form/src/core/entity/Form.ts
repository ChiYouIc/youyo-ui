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
  public components: Array<AbstractComponent<any>> = [];

  constructor(id: string, name: string, version: string, description: string, components?: Array<AbstractComponent<any>>) {
    this.id = id;
    this.name = name;
    this.version = version;
    this.description = description;
    this.initComponents(components);
  }

  public clear() {
    this.components.splice(-this.components.length);
  }

  public remove(component: AbstractComponent<any>): void {
    const index = this.components.findIndex(c => c.id === component.id);
    if (index === -1) {
      return;
    }

    this.components.splice(index, 1);
  }

  private initComponents(list: Array<AbstractComponent<any>> | undefined) {
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

  public formValue(): Record<string, any> {
    let form: Record<string, any> = {};

    if (this.components === undefined || this.components.length === 0) {
      return form;
    }

    for (const item of this.components) {
      form = Object.assign(form, item.val());
    }

    return form;
  }
}

export default Form;
