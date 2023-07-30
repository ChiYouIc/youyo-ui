<template>
  <span> {{ content }} </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useFooterHook from '../hooks/useFooterHook';

export default defineComponent({
  name: 'youyo-footer',
  setup() {
    const { content } = useFooterHook();

    return {
      content,
    };
  },
});
</script>
