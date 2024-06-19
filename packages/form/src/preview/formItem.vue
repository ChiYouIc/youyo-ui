<template>
  <div class="y-preview-form-item">
    <div v-if="label" class="item-label" :style="labelStyle">
      <label :class="{ 'mark-required': required }">
        {{ label }}
      </label>
    </div>
    <div :class="['item-content']">
      <factory :el="component"/>
      <span v-if="requiredMsg" class="required-msg">{{ requiredMsg }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import './style/formItem.less';
import {computed, CSSProperties, defineProps, inject} from 'vue';
import Factory from "../factory/index.vue";
import AbstractComponent from "../core/AbstractComponent";

interface FormItemProps {
  component: AbstractComponent
}

const props = defineProps<FormItemProps>();

const labelStyle = computed<CSSProperties>(() => {
  return {minWidth: `${inject('label-width', 100)}px`}
})

const label = computed(() => props.component.label)
const required = computed(() => props.component.required)
const requiredMsg = computed(() => props.component.getVal())

</script>

<style scoped></style>
