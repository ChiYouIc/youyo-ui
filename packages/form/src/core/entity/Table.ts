import AbstractComponent from '../AbstractComponent';
import { h, VNode } from 'vue';
import { ComponentConstructorOptionType } from '../types';
import { CTable } from '../../components';

export type TableColumnType = {
  title: string;
  prop: string;
};

class Table extends AbstractComponent {
  private _value: Array<Record<string, any>> = [];

  constructor(option: ComponentConstructorOptionType) {
    super(option);
  }

  private _columns: TableColumnType[] = [];

  get columns(): TableColumnType[] {
    return this._columns;
  }

  set columns(value: TableColumnType[]) {
    this._columns = value;
  }

  init({ value, columns }: Record<string, any>): void {
    this._columns = columns;
    this._value = value;
  }

  node(): VNode {
    return h(CTable, {
      id: this.primaryId(),
      value: this._value,
      columns: this._columns,
    });
  }

  configToJson(): Record<string, any> {
    const json = super.configToJson();
    json['columns'] = this._columns;
    return json;
  }

  public getVal(): any {
    return this._value;
  }

  protected setVal(val: any): void {
    this._value = val;
  }
}

export default Table;
