<template>
  <div class="table-operator" style="width: 100%; height: 40px;">
    <div class="table-operator-item">
      <slot></slot>
    </div>
    <div class="table-operator-item">
      <slot name="fr"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import './style/index.less';

export default defineComponent({
  name: "y-table-operator"
})
</script>


