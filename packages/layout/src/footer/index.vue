<template>
  <span> {{ content }} </span>
</template>

<script lang="ts" setup name="youyo-footer">
import { defineProps } from 'vue';
import type { FooterProps } from '../types';

defineProps<FooterProps>();
</script>
