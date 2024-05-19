<template>
  <div class="form-preview">
    <div class="title">
      <span>{{ name }}</span>
    </div>
    <a-form>
      <template v-for="item in componentList" :key="item.id">
        <template v-if="item.component === 'Fence'">
          <a-row justify="space-between">
            <a-col v-for="(f, index) in (item as Fence).list" :key="index">
              <a-form-item :label="f[0].label" :name="f[0].name" :required="f[0].required">
                <factory :el="f[0]"></factory>
              </a-form-item>
            </a-col>
          </a-row>
        </template>
        <a-form-item v-else :label="item.label" :name="item.name" :required="item.required">
          <factory :el="item" />
        </a-form-item>
      </template>
    </a-form>
  </div>
</template>
<script setup lang="ts">
import './style/index.less';
import { defineProps } from 'vue';
import Factory from '../factory/index.vue';
import Fence from '../core/entity/Fence';
import AbstractComponent from '../core/AbstractComponent';

interface PreviewProps {
  name: string;
  components: () => Array<AbstractComponent>;
}

const props = defineProps<PreviewProps>();

const componentList = props.components();
</script>

<style scoped></style>
