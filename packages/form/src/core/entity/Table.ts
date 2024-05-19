import AbstractComponent from '../AbstractComponent';
import { h, VNode } from 'vue';
import { Table as AntTable, TableColumnType, TableProps } from 'ant-design-vue';
import { ComponentConstructorOptionType } from '../types';

class Table extends AbstractComponent {
  private _value: Array<Record<string, any>> = [];
  private _columns: TableColumnType[] = [];

  constructor(option: ComponentConstructorOptionType) {
    super(option);
  }

  init({ value, columns }: Record<string, any>): void {
    this._columns = columns;
    this._value = value;
  }

  node(): VNode {
    return h<TableProps>(AntTable, {
      id: this.primaryId(),
      dataSource: this._value,
      columns: this._columns,
      style: { width: '100%' },
    });
  }

  protected val(): any {
    return this._value;
  }

  configToJson(): Record<string, any> {
    const json = super.configToJson();
    json['columns'] = this._columns;
    return json;
  }

  get columns(): TableColumnType[] {
    return this._columns;
  }

  set columns(value: TableColumnType[]) {
    this._columns = value;
  }
}

export default Table;
