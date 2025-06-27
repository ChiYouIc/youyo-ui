<template>
  <youyo-form-design :form="form" @selected="onSelected" />
</template>

<script setup lang="ts">
import { uuid } from 'vue-uuid';
import { AbstractComponent as DesignAbstractComponent, Form as DesignForm, YouyoFormDesign } from 'youyo-form';
import { ref } from 'vue';

const form = ref<DesignForm>(new DesignForm(uuid.v1(), '表单v1', '1.0.0', '这事一个测试表单', []));

function onSelected(item: DesignAbstractComponent) {
  // currComponentJson.value = JSON.parse(JSON.stringify(item || {}));
}
</script>

<style scoped></style>
