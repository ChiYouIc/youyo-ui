import AbstractComponent from '../AbstractComponent';
import { h, VNode } from 'vue';
import { ComponentConstructorOptionType, ComponentModel, FenceModel } from '../types';
import { CFence } from '../../components';
import globalConfig from '../../config';

class Fence extends AbstractComponent implements FenceModel {
  constructor(c: ComponentConstructorOptionType) {
    super(c);
  }

  private _row: number = 1;

  get row(): number {
    return this._row;
  }

  set row(value: number) {
    this._row = value;
    this.fillEmptyCells();
  }

  private _col: number = 2;

  get col(): number {
    return this._col;
  }

  set col(value: number) {
    this._col = value;
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
    const column = Number(col) > 0 ? Number(col) : 2;
    if (column > 3) {
      console.warn(`[youyo-form] Fence columns cannot be larger than three, clamped from ${col} to 3`);
    }

    this._col = Math.min(column, 3);
    this._row = Number(row) > 0 ? Number(row) : 1;
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
    const total = this._row * this._col;
    if (!Number.isFinite(total) || total <= 0) {
      return;
    }

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
