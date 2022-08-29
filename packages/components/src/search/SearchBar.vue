<template>
  <div class="y-search-bar">
    <div ref="searchBarRef" class="y-search-bar-content" :style="style()">
      <slot></slot>
      <div class="y-search-bar-bt">
        <slot name="bt"></slot>
        <y-icon v-if="!unfold" icon="antd-up" size="12px" class="fold" @click="handleFold">折叠</y-icon>
        <y-icon v-else icon="antd-down" size="12px" class="fold" @click="handleUnfold">展开</y-icon>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, provide, reactive, toRefs} from "vue";
import './style/index.less';
import YSearchBarItem from "./SearchBarItem.vue";
import {searchBarProps, searchBarStateType} from "./types";
import {Document, INode} from "happy-dom";
import YIcon from "../icon/icon.vue";

export default defineComponent({
  name: "y-search-bar",
  props: searchBarProps,
  components: {YIcon, YSearchBarItem},
  setup(props) {
    const state = reactive<searchBarStateType>({
      unfold: false,
      itemList: [],
    });

    // 注入
    provide('labelWidth', props.labelWidth);

    // style
    const style = () => {
      let columns = '1fr';
      for (let i = 0; i < props.columns - 1; i++) {
        columns = `${columns} 1fr`;
      }
      return {'grid-template-columns': columns};
    }

    return {
      ...toRefs(state),
      style,
    }
  },
  methods: {
    handleFold() {
      const searchBarRef = this.$refs.searchBarRef as Document;
      const children = searchBarRef.children;
      for (let i = this.columns - 1; i < children.length - 1;) {
        this.itemList.push(children[i])
        searchBarRef.removeChild(children[i])
      }
      this.unfold = !this.unfold;
    },

    handleUnfold() {
      const searchBarRef = this.$refs.searchBarRef as Document;
      for (let i = 0; i < this.itemList.length; i++) {
        searchBarRef.insertBefore((this.itemList[i] as unknown as INode), searchBarRef.lastChild)
      }
      this.itemList = []
      this.unfold = !this.unfold
    }
  }
})
</script>

<style lang="less" scoped>
.y-search-bar {
  width: 100%;

  .y-search-bar-content {
    display: grid;
    grid-column-gap: 10px;
    grid-row-gap: 10px;
  }

  .y-search-bar-bt {
    display: flex;
    flex-direction: row;
    column-gap: 10px;
    align-items: center;

    .fold {
      color: #0070F4;
      cursor: pointer;
    }
  }
}
</style>