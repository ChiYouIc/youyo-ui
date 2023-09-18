import AbstractComponent from '../AbstractComponent';

/**
 * 表单对象
 */
class Form {
  public id: string;
  public name: string;
  public description: string;
  public version: string;
  public components: Array<AbstractComponent> = [];

  constructor(id: string, name: string, version: string, description: string) {
    this.id = id;
    this.name = name;
    this.version = version;
    this.description = description;
  }

  public clear() {
    this.components.splice(-this.components.length);
  }

  public remove(el: AbstractComponent) {
    const index = this.components.findIndex(c => c.id === el.id);
    if (index !== -1) {
      this.components.splice(index, 1);
    }
  }
}

export default Form;
