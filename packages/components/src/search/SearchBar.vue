<script lang="ts">
import {defineComponent, h, provide, ref} from 'vue';
import './style/index.less';
import YSearchBarItem from './SearchBarItem.vue';
import {searchBarProps} from './types';
import YIcon from '../icon/Icon.vue';

export default defineComponent({
  name: 'y-search-bar',
  props: searchBarProps,
  components: {YIcon, YSearchBarItem},
  setup(props, {slots}) {
    // ture 折叠， false 展开
    const unfold = ref<boolean>(true);
    const placeList = Array.from({length: (props.columns - (slots.default().length % props.columns) - 1)}).map(() => h('div'))

    // 注入
    provide('labelWidth', props.labelWidth);

    // style
    const style = () => {
      let columns = '1fr';
      for (let i = 0; i < props.columns - 1; i++) {
        columns = `${columns} 1fr`;
      }
      return {'grid-template-columns': columns};
    };

    function foldButton() {
      if (props.fold) {
        // 如果插槽元素数量小于一行的列数，不显示展开，折叠按钮
        if(slots.default().length < props.columns) {
          return []
        }
        return [
          !unfold.value
              ? h(YIcon, {icon: "antd-up", size: "12px", class: "fold", onClick: () => unfold.value = true}, () => ['折叠'])
              : h(YIcon, {icon: "antd-down", size: "12px", class: "fold", onClick: () => unfold.value = false}, () => ['展开'])
        ]
      }
    }

    function bt() {
      return h('div', {class: 'y-search-bar-bt'}, [slots.bt(), foldButton()])
    }

    function unfoldItemList() {
      return slots.default().splice(0, 3)
    }

    function foldItemList() {
      return [
        ...slots.default(),
        ...placeList,
      ]
    }

    return () => h(
        'div',
        {class: 'y-search-bar'},
        [
          h('div', {class: 'y-search-bar-content', style: style()}, [
            !unfold.value ? foldItemList() : unfoldItemList(),
            bt(),
          ]),
        ]
    )
  },
});
</script>
