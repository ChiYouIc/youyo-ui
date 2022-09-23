<template>
  <y-icon-picker v-model:icon="icon" @selected="handleSelected"/>
  <!--  <y-icon-select />-->
</template>

<script lang="ts">

import {defineComponent, ref} from "vue";

export default defineComponent({
  name: "iconView",
  setup() {
    const icon = ref<string>('antd-View')

    function handleSelected(i: string) {
      console.log(icon.value)
      console.log(i)
    }

    return {
      handleSelected,
      icon
    }
  }
})
</script>

<style scoped>

</style>