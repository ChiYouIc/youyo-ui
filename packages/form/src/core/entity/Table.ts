import AbstractComponent from '../AbstractComponent';
import { h, VNode } from 'vue';
import { ComponentConstructorOptionType } from '../types';
import { CTable } from '../../components';

export type TableColumnType = {
  title: string;
  prop: string;
  width?: number;
  align?: 'left' | 'center' | 'right';
};

class Table extends AbstractComponent {
  private _value: Array<Record<string, any>> = [];

  constructor(option: ComponentConstructorOptionType) {
    super(option);
  }

  private _columns: TableColumnType[] = [];
  private _pagination = false;
  private _pageSize = 10;

  get columns(): TableColumnType[] {
    return this._columns;
  }

  set columns(value: TableColumnType[]) {
    this._columns = value;
  }

  init({ value, columns, pagination, pageSize }: Record<string, any>): void {
    this._columns = columns ?? [];
    this._value = value ?? [];
    this._pagination = pagination ?? false;
    this._pageSize = pageSize ?? 10;
  }

  node(): VNode {
    return h(CTable, {
      id: this.primaryId(),
      value: this._value,
      columns: this._columns,
      pagination: this._pagination ? { pageSize: this._pageSize } : false,
    });
  }

  configToJson(): Record<string, any> {
    const json = super.configToJson();
    json['columns'] = this._columns;
    json['value'] = this._value;
    json['pagination'] = this._pagination;
    json['pageSize'] = this._pageSize;
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
