<template>
  <div class="form-preview">
    <div class="title">
      <span>{{ form.name }}</span>
    </div>
    <y-form :model="data">
      <template v-for="item in form.components" :key="item.id">
        <!-- 栅栏 -->
        <template v-if="item.component === 'Fence'">
          <div>
            <template v-for="(f, index) in (item as Fence).list" :key="index">
              <y-form-item v-if="f[0]" :label="f[0].label" :name="f[0].name" :required="f[0].required">
                <factory :el="f[0]"></factory>
              </y-form-item>
            </template>
          </div>
        </template>
        <!-- 表格 -->
        <y-form-item v-else-if="item.component === 'Table'" :name="item.name" :required="item.required">
          <factory :el="item" />
        </y-form-item>
        <y-form-item v-else :label="item.label" :name="item.name" :required="item.required">
          <factory :el="item" />
        </y-form-item>
      </template>
    </y-form>
    {{ data }}
  </div>
</template>
<script setup lang="ts">
import './style/index.less';
import { defineProps } from 'vue';
import Factory from '../factory/index.vue';
import Fence from '../core/entity/Fence';
import Form from '../core/Form';
import YForm from './form.vue';
import YFormItem from './formItem.vue';

interface PreviewProps {
  form: Form;
  data: Record<string, any>;
}

defineProps<PreviewProps>();
</script>

<style scoped></style>
