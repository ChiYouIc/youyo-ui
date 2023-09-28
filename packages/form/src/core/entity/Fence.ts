import AbstractComponent from '../AbstractComponent';
import { AbstractComponentConstructorOption, AbstractComponentInitOption } from '../../types';
import { h, VNode } from 'vue';
import Draggable from 'vuedraggable';
import DraggableItem from '../../design/draggableItem.vue';
import useConfigHook from '../../hooks/useConfigHook';
import componentFactory from '../componentFactory';
import useDraggableHook from '../../hooks/useDraggableHook';

type FenceInitOption = AbstractComponentInitOption<string> & {
  col: number;
  list: Array<Array<AbstractComponentConstructorOption>>;
};

class Fence extends AbstractComponent<string> {
  public col: number = 3;
  public list: Array<Array<AbstractComponent<any>>> = [];

  constructor(c: AbstractComponentConstructorOption) {
    super(c);
    for (let i = 0; i < 3; i++) {
      this.list.push([]);
    }
  }

  val(): Record<string, any> {
    let res: Record<string, any> = {};
    for (const item of this.list) {
      res = Object.assign(res, item[0].val());
    }
    return res;
  }

  init({ col, list }: FenceInitOption): void {
    if (col > 3) {
      throw new Error('Columns cannot be larger than three');
    }

    this.col = col;
    this.list = [];
    for (const item of list) {
      const f = item[0];
      this.list.push(f !== undefined ? [componentFactory.creator(f)] : []);
    }
  }

  node(): VNode {
    const { setValue } = useConfigHook();
    const columns: VNode[] = [];
    for (let i = 0; i < this.col; i++) {
      const draggable = h(
        Draggable,
        {
          id: 'fence',
          list: this.list[i],
          'onUpdate:list': val => (this.list[i] = val),
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
              onClick: () => setValue(element),
              onRemove: () => (this.list[i] = []),
            }),
        },
      );
      columns.push(draggable);
    }
    return h('div', { id: this.id, class: 'fence' }, [...columns]);
  }

  private onMove(obj: any): boolean {
    const { draggableMove } = useDraggableHook();
    return draggableMove(obj);
  }
}

export default Fence;
