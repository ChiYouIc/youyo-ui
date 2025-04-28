import AbstractComponent from '../AbstractComponent';
import { h, VNode } from 'vue';
import { ComponentConstructorOptionType } from '../types';
import { CFence } from '../../components';
import globalConfig from '../../config';

class Fence extends AbstractComponent {
  constructor(c: ComponentConstructorOptionType) {
    super(c);
  }

  private _row: number = 1;

  get row(): number {
    return this._row;
  }

  set row(value: number) {
    this._row = value;
  }

  private _col: number = 2;

  get col(): number {
    return this._col;
  }

  set col(value: number) {
    this._col = value;
  }

  private _list: Array<Array<AbstractComponent>> = [];

  get list(): Array<Array<AbstractComponent>> {
    return this._list;
  }

  set list(value: Array<Array<AbstractComponent>>) {
    this._list = value;
  }

  getVal(): Record<string, any> {
    let res: Record<string, any> = {};
    for (const item of this._list) {
      res = Object.assign(res, item[0]?.valToJson());
    }
    return res;
  }

  public remove(component: AbstractComponent): boolean {
    const index = this._list.findIndex(c => c[0].primaryId() === component.primaryId());
    if (index !== -1) {
      this._list[index] = [];
      return true;
    }
    return false;
  }

  init({ col, row, list }: Record<string, any>): void {
    if (col > 3) {
      throw new Error('Columns cannot be larger than three');
    }

    this._col = col;
    this._row = row;
    this._list = [];
    for (const item of list) {
      this._list.push([globalConfig.componentFactory.creator(item)]);
    }
  }

  node(): VNode {
    for (let i = 0; i < this._row; i++) {
      for (let j = 0; j < this._col; j++) {
        const index = i * this._col + j;
        if (index > this._list.length - 1) {
          this._list.push([]);
        }
      }
    }

    return h(CFence, { id: this.primaryId(), row: this._row, col: this._col, list: this._list });
  }

  configToJson(): Record<string, any> {
    const json = super.configToJson();
    json['col'] = this._col;
    json['row'] = this._row;

    const listJson: Record<string, any>[] = [];
    for (const ls of this._list) {
      const item: AbstractComponent[] = [];
      for (const l of ls) {
        item.push(l);
      }
      if (item.length > 0) {
        listJson.push(item[0].configToJson());
      }
    }

    json['list'] = listJson;
    return json;
  }

  protected setVal(val: any): void {}
}

export default Fence;
