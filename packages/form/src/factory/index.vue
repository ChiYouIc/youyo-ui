<script lang="ts">
import './style/index.less';
import { defineComponent, PropType } from 'vue';

import AbstractComponent from '../core/AbstractComponent';

export default defineComponent({
  name: 'Factory',
  props: {
    el: Object as PropType<AbstractComponent<any>>,
  },
  setup(props) {
    return () => props.el?.node();
  },
});
</script>

<style scoped></style>
