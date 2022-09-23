<template>
  <y-icon-picker v-model:icon="icon" disabled @selected="handleSelected"/>
  <!--  <y-icon-select />-->
</template>

<script lang="ts">

import {defineComponent, ref} from "vue";

export default defineComponent({
  name: "iconView",
  setup() {
    const icon = ref<string>('')

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