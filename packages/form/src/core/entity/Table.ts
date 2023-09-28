import AbstractComponent from '../AbstractComponent';
import { AbstractComponentConstructorOption, AbstractComponentInitOption } from '../../types';
import { h, VNode } from 'vue';
import { Table as AntTable, TableColumnType, TableProps } from 'ant-design-vue';

type TableInitOption<T> = AbstractComponentInitOption<T[]> & {
  columns: TableColumnType[];
  data: T[];
};

class Table<T> extends AbstractComponent<T[]> {
  public columns: TableColumnType[] = [];

  constructor(option: AbstractComponentConstructorOption) {
    super(option);
  }

  val(): Record<string, Array<T>> {
    const res: Record<string, Array<T>> = {};
    res[this.name] = this.value;
    return res;
  }

  init({ value, columns }: TableInitOption<T>): void {
    this.columns = columns;
    this.value = value;
  }

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
