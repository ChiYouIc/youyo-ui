<template>
  <span> {{ content }} </span>
</template>

<script lang="ts" setup name="youyo-footer">
export interface FooterProps {
  content: string;
}

defineProps<FooterProps>();
</script>
