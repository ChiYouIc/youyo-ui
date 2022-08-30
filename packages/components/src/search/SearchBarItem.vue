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
import {searchBarItemProps} from './types';
import './style/item.less';

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