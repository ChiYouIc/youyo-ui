<template>
  <div class="app-layout">
    <!-- 顶部导航栏 -->
    <header class="app-header">
      <div class="header-left">
        <div class="search-container">
          <a-input-search v-model:value="searchValue" placeholder="搜索" style="width: 300px" size="large" />
        </div>
      </div>
      <div class="header-right">
        <a-button type="primary" class="new-doc-btn">新建文档</a-button>
        <a-button type="text" class="new-mindmap-btn">新建文档</a-button>
        <a-button type="text">导入</a-button>
        <a-dropdown>
          <a-button type="text" class="user-menu">
            <span>创建时间</span>
            <DownOutlined />
          </a-button>
          <template #overlay>
            <a-menu>
              <a-menu-item>创建时间</a-menu-item>
              <a-menu-item>修改时间</a-menu-item>
              <a-menu-item>文档名称</a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </header>

    <div class="app-content">
      <!-- 主要内容区域 -->
      <main class="main-content">
        <div class="content-header">
          <h2>文档</h2>
        </div>

        <!-- 文件夹列表 -->
        <div class="folders-section">
          <div class="folder-item">
            <div class="folder-icon">📁</div>
            <span>我的项目</span>
          </div>
          <div class="folder-item">
            <div class="folder-icon">📁</div>
            <span>学习</span>
          </div>
          <div class="folder-item">
            <div class="folder-icon">📁</div>
            <span>Smart-OA</span>
          </div>
        </div>

        <!-- 思维导图列表 -->
        <div class="mindmaps-section">
          <div class="section-title">思维导图</div>
          <div class="mindmap-grid">
            <div class="mindmap-item" @click="goToEdit">
              <div class="mindmap-preview">
                <div class="mindmap-content">
                  <div class="mindmap-badge">可编辑</div>
                  <!-- 这里可以放思维导图的缩略图 -->
                  <div class="mindmap-thumbnail">
                    <svg width="100%" height="100%" viewBox="0 0 400 300">
                      <rect x="150" y="120" width="100" height="60" rx="30" fill="#4CAF50" stroke="#333" stroke-width="2" />
                      <text x="200" y="155" text-anchor="middle" fill="white" font-size="14">中心主题</text>
                      <line x1="150" y1="150" x2="50" y2="80" stroke="#333" stroke-width="2" />
                      <rect x="10" y="60" width="80" height="40" rx="20" fill="#2196F3" stroke="#333" stroke-width="2" />
                      <text x="50" y="85" text-anchor="middle" fill="white" font-size="12">分支1</text>
                      <line x1="250" y1="150" x2="350" y2="80" stroke="#333" stroke-width="2" />
                      <rect x="310" y="60" width="80" height="40" rx="20" fill="#FF9800" stroke="#333" stroke-width="2" />
                      <text x="350" y="85" text-anchor="middle" fill="white" font-size="12">分支2</text>
                      <line x1="200" y1="180" x2="200" y2="240" stroke="#333" stroke-width="2" />
                      <rect x="160" y="240" width="80" height="40" rx="20" fill="#9C27B0" stroke="#333" stroke-width="2" />
                      <text x="200" y="265" text-anchor="middle" fill="white" font-size="12">分支3</text>
                    </svg>
                  </div>
                </div>
              </div>
              <div class="mindmap-info">
                <h3>一周计划模板_副本</h3>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { DownOutlined } from '@ant-design/icons-vue';

const router = useRouter();
const searchValue = ref('');

const goToEdit = () => {
  router.push('/123');
};
</script>

<style scoped>
.app-layout {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f5f5f5;
}

.app-header {
  height: 60px;
  background: white;
  border-bottom: 1px solid #e8e8e8;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 20px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.new-doc-btn {
  border-radius: 20px;
}

.app-content {
  flex: 1;
  display: flex;
  overflow: hidden;
}

.upgrade-links a {
  font-size: 12px;
  color: #1890ff;
  text-decoration: none;
}

.main-content {
  flex: 1;
  padding: 20px 24px;
  overflow-y: auto;
  background: white;
  margin: 16px 16px 16px 0;
  border-radius: 8px;
}

.content-header h2 {
  margin: 0 0 24px 0;
  font-size: 24px;
  font-weight: 500;
  color: #333;
}

.folders-section {
  display: flex;
  gap: 16px;
  margin-bottom: 32px;
}

.folder-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  min-width: 120px;
}

.folder-item:hover {
  border-color: #1890ff;
  box-shadow: 0 2px 8px rgba(24, 144, 255, 0.2);
}

.folder-icon {
  font-size: 32px;
}

.mindmaps-section {
  margin-top: 32px;
}

.section-title {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 16px;
  color: #333;
}

.mindmap-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
}

.mindmap-item {
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s;
  background: white;
}

.mindmap-item:hover {
  border-color: #1890ff;
  box-shadow: 0 4px 12px rgba(24, 144, 255, 0.15);
}

.mindmap-preview {
  height: 200px;
  position: relative;
  background: #fafafa;
}

.mindmap-content {
  width: 100%;
  height: 100%;
  position: relative;
}

.mindmap-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  background: #52c41a;
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  z-index: 2;
}

.mindmap-thumbnail {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.mindmap-info {
  padding: 16px;
}

.mindmap-info h3 {
  margin: 0;
  font-size: 14px;
  font-weight: 500;
  color: #333;
}
</style>
