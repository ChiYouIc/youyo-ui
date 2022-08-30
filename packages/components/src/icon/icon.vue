<template>
  <i :class="['iconfont',icon]" :style="{fontSize: size, color: color}">
    <slot></slot>
  </i>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {iconProps} from "./types";
import "./style/index.css";

export default defineComponent({
  name: "y-icon",
  props: iconProps,
  setup() {
    return {}
  }
})
</script>
