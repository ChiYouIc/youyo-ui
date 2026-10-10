<template>
  <youyo-form-design :form="form" @selected="onSelected" />
</template>

<script setup lang="ts">
import { uuid } from 'vue-uuid';
// import { AbstractComponent as DesignAbstractComponent, Form as DesignForm, YouyoFormDesign } from 'youyo-form';
import { AbstractComponent as DesignAbstractComponent, Form as DesignForm, YouyoFormDesign } from 'youyo-form/src';
import { ref } from 'vue';
// import { JSONDataType } from 'vue-json-pretty/types/utils';

// const form = ref<DesignForm>(new DesignForm(sfj.id, sfj.name, sfj.version, sfj.description, sfj.components as []));
// 组件的 form 属性用的是结构化的 FormModel 类型，
// 所以 ref()/reactive() 包过的实例（UnwrapRef 会丢掉类的私有字段）也能直接传进去，不需要断言。
const form = ref<DesignForm>(new DesignForm(uuid.v1(), '表单v1', '1.0.0', '这事一个测试表单', []));

// const currComponentJson = ref<JSONDataType>();

function onSelected(_item: DesignAbstractComponent) {
  // currComponentJson.value = JSON.parse(JSON.stringify(item || {}));
}
</script>

<style scoped></style>
