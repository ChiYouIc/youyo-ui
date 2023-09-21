import AbstractComponent from '../AbstractComponent';
import { AbstractComponentConstructorOption, AbstractComponentInitOption } from '../../types';
import { h, VNode } from 'vue';
import { Table as AntTable, TableColumnType, TableProps } from 'ant-design-vue';

type TableInitOption = AbstractComponentInitOption<any[]> & {};

class Table<T> extends AbstractComponent<T[]> {
  public columns: TableColumnType[] = [];

  constructor(option: AbstractComponentConstructorOption) {
    super(option);
  }

  init(_: TableInitOption): void {}

  node(): VNode {
    return h<TableProps>(AntTable, {
      id: this.id,
      dataSource: this.value,
      columns: this.columns,
      style: { width: '100%' },
    });
  }
}

export default Table;
