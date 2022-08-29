<template>
  <div class="y-search-bar-item">
    <span class="y-search-bar-item-fl" :style="labelStyle">{{ label }}</span>
    <div class="y-search-bar-item-ri">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, inject} from "vue";
import {searchBarItemProps} from './types'

export default defineComponent({
  name: "y-search-bar-item",
  props: searchBarItemProps,
  setup() {
    const labelWidth = inject('labelWidth');

    return {
      labelStyle: {
        'width': `${labelWidth}px`
      }
    }
  }
})
</script>

<style lang="less" scoped>
.y-search-bar-item {
  display: flex;
  align-items: center;
  align-content: flex-start;
  column-gap: 5px;

  .y-search-bar-item-fl {
    margin-left: 5px;
    text-align: right;
  }

  .y-search-bar-item-ri {
    display: inline-block;
  }
}
</style>