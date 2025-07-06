<template>
  <youyo-form-design :form="form" @selected="onSelected" />
</template>

<script setup lang="ts">
import { uuid } from 'vue-uuid';
import { AbstractComponent as DesignAbstractComponent, Form as DesignForm, YouyoFormDesign } from 'youyo-form';
// import { AbstractComponent as DesignAbstractComponent, Form as DesignForm, YouyoFormDesign } from 'youyo-form/src';
import { computed, ref } from 'vue';
// import { JSONDataType } from 'vue-json-pretty/types/utils';

// const form = ref<DesignForm>(new DesignForm(sfj.id, sfj.name, sfj.version, sfj.description, sfj.components as []));
const form = ref<DesignForm>(new DesignForm(uuid.v1(), '表单v1', '1.0.0', '这事一个测试表单', []));

const formJson = computed(() => form.value.toJson());
const formData = computed(() => form.value.formValue());

// const currComponentJson = ref<JSONDataType>();

function onSelected(item: DesignAbstractComponent) {
  // currComponentJson.value = JSON.parse(JSON.stringify(item || {}));
}
</script>

<style scoped></style>
