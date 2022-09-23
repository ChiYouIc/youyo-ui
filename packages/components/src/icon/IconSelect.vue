<template>
  <div class="icon-select">
    <a-tabs v-model:activeKey="activeKey" centered>
      <a-tab-pane key="antd" tab="Ant Design">
        <div class="icon-select-content">
          <div class="icon-item" v-for="icon in antdIconList">
            <div>
              <y-icon :icon="icon" size="60px"/>
            </div>
            <span>{{ icon }}</span>
          </div>
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import useIcon from './Icon.hook';
import YIcon from './Icon.vue';
import './style/icon-select.less';

export default defineComponent({
  name: 'y-icon-select',
  components: {YIcon},
  setup() {
    const {antdIconList} = useIcon();
    console.log(antdIconList);
    return {
      activeKey: ref('antd'),
      antdIconList,
    }
  }
})

</script>

<style scoped>

</style>