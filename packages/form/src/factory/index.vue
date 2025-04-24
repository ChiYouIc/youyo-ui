<script lang="ts">
import './style/index.less';
import { defineComponent, PropType } from 'vue';

import type { AbstractComponent } from '../core';

export default defineComponent({
  name: 'Factory',
  props: {
    el: Object as PropType<AbstractComponent>,
  },
  setup(props) {
    return () => props.el?.node();
  },
});
</script>

<style scoped></style>
