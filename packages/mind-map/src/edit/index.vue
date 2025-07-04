<template>
  <div class="main-container">
    <!-- 思维导图容器 -->
    <div ref="mindMapContainer" class="mind-map-container"></div>
    <toolbar />
    <sidebar />
    <count />
    <navigator />
  </div>
</template>

<script setup lang="ts">
import './style/index.less';
import { defineEmits, defineProps, onMounted, onUnmounted, ref } from 'vue';
import AssociativeLine from 'simple-mind-map/src/plugins/AssociativeLine.js';
import KeyboardNavigation from 'simple-mind-map/src/plugins/KeyboardNavigation.js';
import Drag from 'simple-mind-map/src/plugins/Drag.js';
import MindMap from 'simple-mind-map';
import Toolbar from './components/toolbar.vue';
import Sidebar from './components/sidebar.vue';
import Count from './components/count.vue';
import Navigator from './components/navigator.vue';
import { useMindMapStore } from '../store';
import useBus from '../hooks/useBus';
import Themes from 'simple-mind-map-plugin-themes';

type EditProps = { root: any; layout?: string; theme?: any; view?: any };
const props = withDefaults(defineProps<EditProps>(), {
  layout: 'logicalStructure',
});
const emits = defineEmits<{ (event: 'save', val: any): void }>();

const mindMapContainer = ref<HTMLElement>();
let mindMapInstance: MindMap | null = null;
// 当前激活的节点列表
const { setActiveNodes, setActiveNode } = useMindMapStore();
const { bus } = useBus();

bus.on('insert_ga', () => mindMapInstance?.execCommand('ADD_GENERALIZATION', { text: '自定义概要内容' }));
bus.on('insert_line', () => mindMapInstance?.associativeLine.createLineFromActiveNode());
bus.on('save_mind_map', handleSave);
bus.on('new_mind_map', () => {
  handleSave();
  mindMapInstance?.setData({
    data: { text: '新内容' },
    children: [
      { data: { text: '节点1' }, children: [] },
      { data: { text: '节点2' }, children: [] },
      { data: { text: '节点3' }, children: [] },
      { data: { text: '节点4' }, children: [] },
    ],
  });
});

function handleSave() {
  const data = mindMapInstance?.getData(true);
  emits('save', data);
}

// 初始化思维导图
const initMindMap = () => {
  if (!mindMapContainer.value) return;

  Themes.init(MindMap);
  MindMap.usePlugin(Drag).usePlugin(AssociativeLine).usePlugin(KeyboardNavigation);

  mindMapInstance = new MindMap({
    el: mindMapContainer.value,
    data: props.root,
    fit: true,
    layout: props.layout,
    initRootNodePosition: ['left', 'center'],
  });

  if (props.theme) {
    mindMapInstance.setTheme(props.theme);
  }

  // 监听节点激活事件
  mindMapInstance.on('node_active', (node, nodeList) => {
    setActiveNode(node);
    setActiveNodes(nodeList);
  });
};

function handleKeyDown(e: KeyboardEvent) {
  if (e.ctrlKey && e.key === 's') {
    e.preventDefault();
    bus.emit('save_mind_map');
  }
}

onMounted(() => {
  initMindMap();
  window.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
  if (mindMapInstance) {
    mindMapInstance.destroy();
  }
  window.removeEventListener('keydown', handleKeyDown);
});
</script>

<style lang="less"></style>
