<template>
  <a-drawer :visible="visible" title="Setting">
    <h1>Setting</h1>
  </a-drawer>
</template>
<script setup lang="ts" name="y-flow-node-setting">
interface NodeSettingProps {
  visible: boolean;
}

const props = defineProps<NodeSettingProps>();

console.log(props);
</script>
