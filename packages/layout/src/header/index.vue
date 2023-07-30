<template>
  <left-content class="layout-header-left" />
  <right-content class="layout-header-right" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LeftContent from './left/index.vue';
import RightContent from './right/index.vue';
import './style/index.less';
export default defineComponent({
  name: 'youyo-header',
  components: { LeftContent, RightContent },
});
</script>
