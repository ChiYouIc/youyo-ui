<template>
  <a-slider v-model:value="sliderVal" :disabled="disabled"></a-slider>
</template>

<script setup lang="ts">
import { computed, defineEmits, defineProps } from 'vue';

interface SliderEmits {
  (event: 'update:value', val: [number, number] | number): void;
}

interface SliderProps {
  id: string;
  value: [number, number] | number;
  disabled: boolean;
}

const props = defineProps<SliderProps>();
const emits = defineEmits<SliderEmits>();

const sliderVal = computed({
  get: () => props.value,
  set: val => emits('update:value', val),
});
</script>

<style scoped></style>
