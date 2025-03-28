<template>
  <span> {{ content }} </span>
</template>

<script lang="ts" name="youyo-footer" setup>
import { defineProps } from 'vue';
import type { FooterProps } from '../types';

defineProps<FooterProps>();
</script>
