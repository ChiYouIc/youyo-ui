<template>
  <div class="toolbar-container">
    <div class="toolbar">
      <div class="toolbar-block">
        <div class="toolbar-btn disabled">
          <span class="toolbar-btn-icon"><BackwardOutlined /></span>
          <span class="toolbar-btn-name"> 回退 </span>
        </div>
        <div class="toolbar-btn disabled">
          <span class="toolbar-btn-icon"><ForwardOutlined /></span>
          <span class="toolbar-btn-text">前进</span>
        </div>
        <div class="toolbar-btn disabled">
          <span class="toolbar-btn-icon"><AimOutlined /></span>
          <span class="toolbar-btn-text">格式刷</span>
        </div>
        <div class="toolbar-btn disabled">
          <span class="toolbar-btn-icon"><AimOutlined /></span>
          <span class="toolbar-btn-text">同级节点</span>
        </div>
        <div class="toolbar-btn disabled">
          <span class="toolbar-btn-icon"><AimOutlined /></span>
          <span class="toolbar-btn-text">子节点</span>
        </div>
        <div class="toolbar-btn disabled">
          <span class="toolbar-btn-icon"><DeleteOutlined /></span>
          <span class="toolbar-btn-text">删除节点</span>
        </div>
        <div class="toolbar-btn disabled">
          <span class="toolbar-btn-icon"><PictureOutlined /></span>
          <span class="toolbar-btn-text">图片</span>
        </div>
        <div class="toolbar-btn disabled">
          <span class="toolbar-btn-icon"><AimOutlined /></span>
          <span class="toolbar-btn-text">图标</span>
        </div>
        <div class="toolbar-btn disabled">
          <span class="toolbar-btn-icon"><ApiOutlined /></span>
          <span class="toolbar-btn-text">超链接</span>
        </div>
        <div class="toolbar-btn disabled">
          <span class="toolbar-btn-icon"><AimOutlined /></span>
          <span class="toolbar-btn-text">备注</span>
        </div>
        <div class="toolbar-btn disabled">
          <span class="toolbar-btn-icon"><TagOutlined /></span>
          <span class="toolbar-btn-text">标签</span>
        </div>
        <div class="toolbar-btn" :class="{ disabled: !hasNode }" @click="bus.emit('insert_ga')">
          <span class="toolbar-btn-icon"><AppstoreOutlined /></span>
          <span class="toolbar-btn-text">概要</span>
        </div>
        <div class="toolbar-btn" :class="{ disabled: !hasNode }" @click="bus.emit('insert_line')">
          <span class="toolbar-btn-icon"><NodeIndexOutlined /></span>
          <span class="toolbar-btn-text">关联线</span>
        </div>
        <div class="toolbar-btn disabled">
          <span class="toolbar-btn-icon"><AimOutlined /></span>
          <span class="toolbar-btn-text">公式</span>
        </div>
        <div class="toolbar-btn disabled">
          <span class="toolbar-btn-icon"><AimOutlined /></span>
          <span class="toolbar-btn-text">外框</span>
        </div>
      </div>
      <div class="toolbar-block">
        <div class="toolbar-btn" @click="bus.emit('save_mind_map')">
          <span class="toolbar-btn-icon"><SaveOutlined /></span>
          <span class="toolbar-btn-text">保存</span>
        </div>
        <div class="toolbar-btn disabled">
          <span class="toolbar-btn-icon"><FolderOutlined /></span>
          <span class="toolbar-btn-text">目录</span>
        </div>
        <div class="toolbar-btn" @click="bus.emit('new_mind_map')">
          <span class="toolbar-btn-icon"><FolderAddOutlined /></span>
          <span class="toolbar-btn-text">新建</span>
        </div>
        <div class="toolbar-btn disabled">
          <span class="toolbar-btn-icon"><FolderOpenOutlined /></span>
          <span class="toolbar-btn-text">打开</span>
        </div>
        <div class="toolbar-btn disabled">
          <span class="toolbar-btn-icon"><AimOutlined /></span>
          <span class="toolbar-btn-text">另存为</span>
        </div>
        <div class="toolbar-btn disabled">
          <span class="toolbar-btn-icon"><UploadOutlined /></span>
          <span class="toolbar-btn-text">导入</span>
        </div>
        <div class="toolbar-btn disabled">
          <span class="toolbar-btn-icon"><DownloadOutlined /></span>
          <span class="toolbar-btn-text">导出</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import '../style/toolbar.less';
import { useMindMapStore } from '../../store';
import { computed } from 'vue';
import useBus from '../../hooks/useBus';
import {
  AimOutlined,
  ApiOutlined,
  AppstoreOutlined,
  BackwardOutlined,
  DeleteOutlined,
  DownloadOutlined,
  FolderAddOutlined,
  FolderOpenOutlined,
  FolderOutlined,
  ForwardOutlined,
  NodeIndexOutlined,
  PictureOutlined,
  SaveOutlined,
  TagOutlined,
  UploadOutlined,
} from '@ant-design/icons-vue';

const mindMapStore = useMindMapStore();
const hasNode = computed(() => !!mindMapStore.activeNode);
const { bus } = useBus();
</script>

<style scoped lang="less"></style>
