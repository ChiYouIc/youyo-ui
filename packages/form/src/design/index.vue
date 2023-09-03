<template>
  <div class="youyo-form-design">
    <div class="header">
      <h1>Youyo Dynamic Form Design</h1>
    </div>
    <div class="content">
      <form-select />
      <form-design />
      <form-config />
    </div>
  </div>
</template>
<script setup lang="ts">
import './style/index.less';
import FormSelect from './select.vue';
import FormDesign from './design.vue';
import FormConfig from './config.vue';
</script>

<style scoped></style>
