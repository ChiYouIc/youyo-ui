<template>
  <div class="header-right-content">
    <search />
    <notification />
    <avatar />
    <locale />
  </div>
</template>

<script lang="ts">
import avatar from './avatar/index.vue';
import search from './search/index.vue';
import locale from './locale/index.vue';
import notification from './notification/index.vue';
import { defineComponent } from 'vue';
import './style/index.less';

export default defineComponent({
  name: 'right-content',
  components: { avatar, search, locale, notification },
});
</script>
