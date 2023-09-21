import AbstractComponent from '../AbstractComponent';
import { AbstractComponentConstructorOption, AbstractComponentInitOption } from '../../types';
import { h, VNode } from 'vue';
import Draggable from 'vuedraggable';
import Factory from '../../factory/index.vue';
import useConfigHook from '../../hooks/useConfigHook';

class Fence extends AbstractComponent<string> {
  public row: number = 3;
  public col: number = 3;
  public list: Array<Array<AbstractComponent<any>>> = [];

  constructor(c: AbstractComponentConstructorOption) {
    super(c);
  }

  init(_: AbstractComponentInitOption): void {}

  node(): VNode {
    const { setValue } = useConfigHook();
    const columns: VNode[] = [];
    for (let i = 0; i < this.row; i++) {
      this.list.push([]);
      const draggable = h(
        Draggable,
        {
          list: this.list[i],
          'onUpdate:list': val => (this.list = val),
          tag: 'ul',
          group: 'design',
          itemKey: 'id',
          onChange: e => this.onChange(e, this.list[i]),
          onMove: e => this.onMove(e, this.list[i]),
          onClick: (e: PointerEvent) => e.stopPropagation(),
        },
        {
          item: ({ element }) => h(Factory, { el: element, onClick: () => setValue(element) }),
        },
      );
      columns.push(draggable);
    }

    return h('div', { id: this.id, class: 'fence' }, [...columns]);
  }

  private onChange(e: any, list: Array<AbstractComponent<any>>): void {
    if (list.length > 1) {
      list.splice(1, 1);
    }
  }

  private onMove(e: any, list: Array<AbstractComponent<any>>): boolean {
    console.log('-----------move', e, list);
    return true;
  }
}

export default Fence;
