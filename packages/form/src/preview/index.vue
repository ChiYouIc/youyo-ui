<template>
  <a-form>
    <template v-for="item in form.components" :key="item.id">
      <a-form-item :label="item.label" :name="item.name" :required="item.required">
        <factory :el="item" />
      </a-form-item>
    </template>
  </a-form>
</template>
<script setup lang="ts">
import sfj from '../design/form.json';
import Form from '../core/entity/Form';
import { ref } from 'vue';
import Factory from '../factory/index.vue';

const form = ref<Form>(new Form(sfj.id, sfj.name, sfj.version, sfj.description, sfj.components));
</script>

<style scoped></style>
