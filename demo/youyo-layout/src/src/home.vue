<template>
  <youyo-flow-view v-model:node="node"/>
</template>

<script setup lang="ts">
import YouyoFlowView, {NodeMode, NodeType} from 'youyo-flow/src';
import {ref} from "vue";

const node = ref<NodeType>({type: NodeMode.START})

</script>


<style scoped></style>
