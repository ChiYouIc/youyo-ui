<template>
  <icon-view />
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import iconView from './src/iconView.vue';
export default defineComponent({
  name: "app",
  components: {iconView}
})

</script>
<style lang="less">
.upload-demo {
  width: 100%;
}
</style>
