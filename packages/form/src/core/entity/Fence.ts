import AbstractComponent from '../AbstractComponent';
import { h, VNode } from 'vue';
import Draggable from 'vuedraggable';
import DraggableItem from '../../design/draggableItem.vue';
import componentFactory from '../Factory';
import useDraggableHook from '../../hooks/useDraggableHook';
import { ComponentConstructorOptionType } from '../types';

class Fence extends AbstractComponent {
  private _col: number = 3;
  private _list: Array<Array<AbstractComponent>> = [[], [], []];

  constructor(c: ComponentConstructorOptionType) {
    super(c);
  }

  getVal(): Record<string, any> {
    let res: Record<string, any> = {};
    for (const item of this._list) {
      res = Object.assign(res, item[0]?.valToJson());
    }
    return res;
  }

  protected setVal(val: any): void {}

  init({ col, list }: Record<string, any>): void {
    if (col > 3) {
      throw new Error('Columns cannot be larger than three');
    }

    this._col = col;
    this._list = [];
    for (const item of list) {
      this._list.push([componentFactory.creator(item)]);
    }
  }

  node(): VNode {
    const columns: VNode[] = [];
    for (let i = 0; i < this._col; i++) {
      if (i >= this._list.length) {
        this._list.push([]);
      }
      const draggable = h(
        Draggable,
        {
          id: 'fence',
          list: this._list[i],
          'onUpdate:list': (val: any) => (this._list[i] = val),
          tag: 'ul',
          group: 'design',
          itemKey: 'id',
          move: this.onMove,
          onClick: (e: PointerEvent) => e.stopPropagation(),
        },
        {
          item: ({ element }) =>
            h(DraggableItem, {
              element: element,
              style: { width: '100%' },
              // onClick: () => setValue(element),
              onRemove: () => (this._list[i] = []),
            }),
        },
      );
      columns.push(draggable);
    }
    return h('div', { id: this.primaryId(), class: 'fence' }, [...columns]);
  }

  configToJson(): Record<string, any> {
    const json = super.configToJson();
    json['col'] = this._col;

    const listJson: Record<string, any>[] = [];
    for (const l of this._list) {
      const item = l[0];
      if (item) {
        listJson.push(item.configToJson());
      }
    }

    json['list'] = listJson;
    return json;
  }

  private onMove(obj: any): boolean {
    const { draggableMove } = useDraggableHook();
    return draggableMove(obj);
  }

  get col(): number {
    return this._col;
  }

  set col(value: number) {
    this._col = value;
  }

  get list(): Array<Array<AbstractComponent>> {
    return this._list;
  }

  set list(value: Array<Array<AbstractComponent>>) {
    this._list = value;
  }
}

export default Fence;
