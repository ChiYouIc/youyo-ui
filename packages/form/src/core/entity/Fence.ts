import AbstractComponent from '../AbstractComponent';
import {h, VNode} from 'vue';
import Draggable from 'vuedraggable';
import DraggableItem from '../../design/draggableItem.vue';
import componentFactory from '../Factory';
import useDraggableHook from '../../hooks/useDraggableHook';
import {ComponentConstructorOptionType} from '../types';

class Fence extends AbstractComponent {
    private _row: number = 1;
    private _col: number = 2;
    private _list: Array<Array<AbstractComponent>> = [];

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

    protected setVal(val: any): void {
    }

    init({col, list}: Record<string, any>): void {
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
        const rows: VNode[] = [];
        for (let i = 0; i < this._row; i++) {
            const columns: VNode[] = [];
            for (let j = 0; j < this._col; j++) {
                const index = i * this._row + j;
                if (index < this._col * this._row) {
                    this._list.push([]);
                }
                const draggable = h(
                    Draggable,
                    {
                        'fence-id': index,
                        id: 'fence',
                        list: this._list[index],
                        'onUpdate:list': (val: any) => (this._list[index] = val),
                        tag: 'ul',
                        group: 'design',
                        itemKey: 'id',
                        move: this.onMove,
                        onClick: (e: PointerEvent) => {
                            if (this._list[index].length !== 0) {
                                e.stopPropagation()
                            }
                        },
                    },
                    {
                        item: ({element}) =>
                            h(DraggableItem, {
                                element: element,
                                style: {width: '100%'},
                                onRemove: () => (this._list[index] = []),
                            }),
                    },
                );
                columns.push(draggable);
            }

            rows.push(h('div', {class: 'fence-item'}, [...columns]))
        }

        return h('div', {id: this.primaryId(), class: 'fence'}, [...rows]);
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
        const {draggableMove} = useDraggableHook();
        return draggableMove(obj);
    }

    get col(): number {
        return this._col;
    }

    set col(value: number) {
        this._col = value;
    }

    get row(): number {
        return this._row;
    }

    set row(value: number) {
        this._row = value;
    }

    get list(): Array<Array<AbstractComponent>> {
        return this._list;
    }

    set list(value: Array<Array<AbstractComponent>>) {
        this._list = value;
    }
}

export default Fence;
