import AbstractComponent from '../AbstractComponent';
import { h, VNode } from 'vue';
import { ComponentConstructorOptionType, ComponentModel, FenceModel } from '../types';
import { CFence } from '../../components';
import globalConfig from '../../config';

class Fence extends AbstractComponent implements FenceModel {
  constructor(c: ComponentConstructorOptionType) {
    super(c);
    this.fillEmptyCells();
  }

  private _row: number = 1;

  get row(): number {
    return this._row;
  }

  set row(value: number) {
    this._row = Number.isFinite(value) ? Math.max(1, Math.floor(value)) : 1;
    this.fillEmptyCells();
  }

  private _col: number = 2;

  get col(): number {
    return this._col;
  }

  set col(value: number) {
    this._col = Number.isFinite(value) ? Math.min(3, Math.max(1, Math.floor(value))) : 1;
    this.fillEmptyCells();
  }

  private _list: Array<Array<AbstractComponent>> = [];

  get list(): Array<Array<AbstractComponent>> {
    return this._list;
  }

  set list(value: Array<Array<AbstractComponent>>) {
    this._list = value;
    this.fillEmptyCells();
  }

  getVal(): Record<string, any> {
    let res: Record<string, any> = {};
    for (const item of this._list) {
      res = Object.assign(res, item[0]?.valToJson());
    }
    return res;
  }

  public remove(component: ComponentModel): boolean {
    const index = this._list.findIndex(c => c[0]?.primaryId() === component.primaryId());
    if (index !== -1) {
      this._list[index] = [];
      return true;
    }
    return false;
  }

  init({ col, row, list }: Record<string, any>): void {
    const parsedColumn = Math.floor(Number(col));
    const column = Number.isFinite(parsedColumn) && parsedColumn > 0 ? parsedColumn : 2;
    if (column > 3) {
      console.warn(`[youyo-form] Fence columns cannot be larger than three, clamped from ${col} to 3`);
    }

    this._col = Math.min(column, 3);
    const parsedRow = Math.floor(Number(row));
    this._row = Number.isFinite(parsedRow) && parsedRow > 0 ? parsedRow : 1;
    this._list = [];
    for (const item of list ?? []) {
      // 保留空单元格，避免还原后字段位置前移
      if (!item) {
        this._list.push([]);
        continue;
      }

      const component = globalConfig.componentFactory.creator(item);
      component.init(item);
      this._list.push([component]);
    }
    this.fillEmptyCells();
  }

  /**
   * 按行列数补齐空白单元格，渲染与拖拽时下标才不会越界
   */
  private fillEmptyCells(): void {
    let lastOccupiedCell = -1;
    for (let index = this._list.length - 1; index >= 0; index--) {
      if (this._list[index]?.[0]) {
        lastOccupiedCell = index;
        break;
      }
    }

    const minimumRows = Math.ceil((lastOccupiedCell + 1) / this._col);
    this._row = Math.max(this._row, minimumRows, 1);

    const total = this._row * this._col;
    this._list.length = Math.min(this._list.length, total);
    for (let i = this._list.length; i < total; i++) {
      this._list.push([]);
    }
  }

  node(): VNode {
    return h(CFence, { id: this.primaryId(), row: this._row, col: this._col, list: this._list });
  }

  configToJson(): Record<string, any> {
    const json = super.configToJson();
    json['col'] = this._col;
    json['row'] = this._row;

    const listJson: Array<Record<string, any> | null> = [];
    for (const cell of this._list) {
      const component = cell[0];
      listJson.push(component ? component.configToJson() : null);
    }

    json['list'] = listJson;
    return json;
  }

  protected setVal(_val: any): void {}
}

export default Fence;
