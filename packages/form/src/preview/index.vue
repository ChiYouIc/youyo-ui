<template>
  <div class="form-preview">
    <div class="title">
      <span>{{ form.name }}</span>
    </div>
    <a-form>
      <template v-for="item in form.components" :key="item.id">
        <a-form-item :label="item.label" :name="item.name" :required="item.required">
          <factory :el="item" />
        </a-form-item>
      </template>
      <a-form-item>
        <a-button @click="onflush">刷新</a-button>
      </a-form-item>
    </a-form>
    <vue-json-pretty :showIcon="true" :data="formValue"></vue-json-pretty>
  </div>
</template>
<script setup lang="ts">
import './style/index.less';
import sfj from '../design/form.json';
import Form from '../core/entity/Form';
import { ref } from 'vue';
import Factory from '../factory/index.vue';
import VueJsonPretty from 'vue-json-pretty';

const form = ref<Form>(new Form(sfj.id, sfj.name, sfj.version, sfj.description, sfj.components));

const formValue = ref<Record<string, any>>({});
function onflush() {
  formValue.value = form.value.formValue();
}
</script>

<style scoped></style>
