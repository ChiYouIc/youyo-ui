import { h, VNode } from 'vue';
import AbstractComponent from '../AbstractComponent';
import { ComponentConstructorOptionType } from '../types';
import { SuiteDefinition, SuiteFieldDefinition } from './types';
import { CSuite } from '../../components';
import globalConfig from '../../config';

/**
 * 套件基类。
 *
 * 内部字段通过工厂创建已有的组件实体，因此取值、渲染与 JSON 往返都复用既有链路；
 * 套件自身只额外负责字段名前缀与跨字段校验。
 */
class Suite extends AbstractComponent {
  private readonly _definition: SuiteDefinition;
  private _fields: Array<AbstractComponent> = [];
  private _fieldDefinitions: SuiteFieldDefinition[] = [];

  constructor(option: ComponentConstructorOptionType, definition: SuiteDefinition) {
    super(option);
    this._definition = definition;
    this.buildFields();
  }

  get definition(): SuiteDefinition {
    return this._definition;
  }

  get suiteType(): string {
    return this._definition.type;
  }

  /** 内部字段实体 */
  get fields(): Array<AbstractComponent> {
    return this._fields;
  }

  /**
   * 内部字段名以套件实例 name 作为前缀，因此同一表单可以放多个同类套件
   */
  get name(): string {
    return super.name;
  }

  set name(value: string) {
    super.name = value;
    this.syncFieldNames();
  }

  get required(): boolean {
    return super.required;
  }

  /** 套件必填 ⇒ 内部字段全部必填 */
  set required(value: boolean) {
    super.required = value;
    this.applyOuterAttributes();
  }

  get disabled(): boolean {
    return super.disabled;
  }

  /** 套件禁用 ⇒ 内部字段全部禁用 */
  set disabled(value: boolean) {
    super.disabled = value;
    this.applyOuterAttributes();
  }

  public init({ values, suiteType }: Record<string, any>): void {
    if (suiteType !== undefined && suiteType !== this._definition.type) {
      console.warn(`[youyo-form] Suite type mismatch, expected ${this._definition.type} but got ${suiteType}`);
    }

    this.syncFieldNames();
    this.applyOuterAttributes();

    if (!values || typeof values !== 'object') {
      return;
    }

    for (const [key, value] of Object.entries(values)) {
      this.fieldByName(key)?.setValue(value);
    }
  }

  public validate(): string | undefined {
    this.applyOuterAttributes();

    for (const field of this._fields) {
      const message = field.validate();
      if (message !== undefined) {
        return `${field.label}：${message}`;
      }
    }

    const validate = this._definition.validate;
    if (!validate) {
      return undefined;
    }

    return validate({
      values: this.rawValues(),
      valueOf: name => this.fieldByName(name)?.getVal(),
      labelOf: name => this.fieldByName(name)?.label ?? name,
      fieldOf: name => this.fieldByName(name),
    });
  }

  public node(): VNode {
    return h(CSuite, {
      id: this.primaryId(),
      title: this.label,
      fieldName: this.name,
      fields: this._fields,
    });
  }

  /** 内部字段原始值，key 为不带前缀的定义字段名 */
  public getVal(): Record<string, any> {
    return this.rawValues();
  }

  /** 表单取值使用带前缀的扁平结构，和栅栏的做法保持一致 */
  public valToJson(): Record<string, any> {
    let result: Record<string, any> = {};
    for (const field of this._fields) {
      result = Object.assign(result, field.valToJson());
    }
    return result;
  }

  public configToJson(): Record<string, any> {
    return {
      ...super.configToJson(),
      suiteType: this._definition.type,
      values: this.rawValues(),
    };
  }

  /**
   * 套件的 defaultValue 以定义字段名为 key，一次性下发给内部字段
   */
  protected setVal(val: any): void {
    if (!val || typeof val !== 'object' || Array.isArray(val)) {
      return;
    }

    for (const [key, value] of Object.entries(val)) {
      const field = this.fieldByName(key);
      if (field) {
        field.defaultValue = value;
      }
    }
  }

  private rawValues(): Record<string, any> {
    const values: Record<string, any> = {};
    this._fields.forEach((field, index) => {
      const definition = this._fieldDefinitions[index];
      if (definition) {
        values[definition.name] = field.getVal();
      }
    });
    return values;
  }

  private fieldByName(name: string): AbstractComponent | undefined {
    const index = this._fieldDefinitions.findIndex(definition => definition.name === name);
    return index === -1 ? undefined : this._fields[index];
  }

  private fieldName(innerName: string): string {
    return this.name ? `${this.name}_${innerName}` : innerName;
  }

  private buildFields(): void {
    this._fieldDefinitions = this._definition.fields;
    this._fields = this._fieldDefinitions.map(definition => this.createField(definition));
    this.applyOuterAttributes();
  }

  private createField(definition: SuiteFieldDefinition): AbstractComponent {
    const field = globalConfig.componentFactory.creator({
      id: `${this.primaryId()}__${definition.name}`,
      name: this.fieldName(definition.name),
      component: definition.component,
      label: definition.label,
      defaultValue: definition.defaultValue,
      required: definition.required ?? false,
      disabled: false,
    });

    field.init({ ...(definition.config ?? {}), value: definition.defaultValue });
    return field;
  }

  private syncFieldNames(): void {
    this._fields.forEach((field, index) => {
      const definition = this._fieldDefinitions[index];
      if (definition) {
        field.name = this.fieldName(definition.name);
      }
    });
  }

  private applyOuterAttributes(): void {
    this._fields.forEach((field, index) => {
      const definition = this._fieldDefinitions[index];
      field.required = super.required || (definition?.required ?? false);
      field.disabled = super.disabled;
    });
  }
}

export default Suite;
