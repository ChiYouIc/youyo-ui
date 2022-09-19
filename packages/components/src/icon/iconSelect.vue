<template>

  <div class="icon-select">
    <div class="icon-select-header">
      <ul>
        <li>antd-design</li>
        <li>antd-design</li>
        <li>antd-design</li>
        <li>antd-design</li>
        <li>antd-design</li>
      </ul>
    </div>

    <div class="icon-select-content">
      <div class="icon-item" v-for="icon in antdIconList">
        <div>
          <y-icon :icon="icon" size="60px"/>
        </div>
        <span>{{ icon }}</span>
      </div>
    </div>
  </div>

</template>

<script lang="ts">
import {defineComponent} from "vue";
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
      antdIconList,
    }
  }
})

</script>

<style lang="less" scoped>
.icon-select {
  .icon-select-header {

    padding-bottom: 10px;

    ul {
      height: 30px;
      margin: 0;
      padding: 0;
      list-style: none;

      display: flex;
      justify-content: center;
      column-gap: 20px;
    }

    li:hover {
      border-bottom: 1px solid black;
      cursor: pointer;
    }
  }

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