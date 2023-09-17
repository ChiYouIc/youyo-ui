import AbstractComponent from '../AbstractComponent';

/**
 * 表单对象
 */
class Form {
  private _id: string;
  private _name: string;
  private _description: string;
  private _components: Array<AbstractComponent> = [];

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

  public save(component: AbstractComponent): void {
    const filter = this._components.filter(c => c.id === component.id);
    if (filter.length > 0) {
      throw new Error(`The component with id ${component.id} already exists`);
    }

    this._components.push(component);
  }

  public remove(component: AbstractComponent): boolean {
    const find = this._components.findIndex(c => c.id === component.id);
    if (find === -1) {
      return false;
    }

    delete this._components[find];
    return true;
  }

  get components() {
    return this._components;
  }
}

export default Form;
