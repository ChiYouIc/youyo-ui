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
import antdIcons from './style/antd/iconfont.json';
import YIcon from './icon.vue'

export default defineComponent({
  name: 'y-icon-select',
  components: {YIcon},
  setup() {
    const antdPrefix = antdIcons.css_prefix_text;
    const antdIconList = antdIcons.glyphs.map((icon: { font_class: string; }) => `${antdPrefix}${icon.font_class}`);
    console.log(antdIconList)
    return {
      activeKey: ref('antd'),
      antdIconList,
    }
  }
})

</script>

<style lang="less" scoped>
.icon-select {

  .icon-select-content {
    display: flex;
    width: 100%;
    flex-flow: wrap;
    column-gap: 10px;
    row-gap: 10px;

    .icon-item {
      width: 225px;
      text-align: center;
    }

    .icon-item:hover {
      border-radius: 10px;
      background-color: #1890FF;
      color: #FFFFFF;
      cursor: pointer;
    }
  }
}
</style>