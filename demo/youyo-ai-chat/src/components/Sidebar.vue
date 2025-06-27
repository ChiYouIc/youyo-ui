<template>
  <div class="sidebar" :class="{ collapsed: isCollapsed }">
    <!-- 折叠/展开按钮 -->
    <div class="toggle-btn" @click="toggleSidebar">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path v-if="isCollapsed" d="M9 18l6-6-6-6" />
        <path v-else d="M15 18l-6-6 6-6" />
      </svg>
    </div>

    <!-- 侧边栏内容 -->
    <div class="sidebar-content">
      <!-- 标题 -->
      <div class="sidebar-header">
        <div class="logo">
          <span class="logo-icon">🤖</span>
          <span v-show="!isCollapsed" class="logo-text">AI Chat</span>
        </div>
      </div>

      <!-- 菜单项 -->
      <nav class="sidebar-nav">
        <div class="nav-section">
          <div v-show="!isCollapsed" class="section-title">聊天</div>
          <div class="nav-item" :class="{ active: activeItem === 'new-chat' }" @click="selectItem('new-chat')">
            <span class="nav-icon">💬</span>
            <span v-show="!isCollapsed" class="nav-text">新建对话</span>
          </div>
          <div class="nav-item" :class="{ active: activeItem === 'history' }" @click="selectItem('history')">
            <span class="nav-icon">📝</span>
            <span v-show="!isCollapsed" class="nav-text">聊天记录</span>
          </div>
        </div>

        <div class="nav-section">
          <div v-show="!isCollapsed" class="section-title">工作流</div>
          <div class="nav-item" :class="{ active: activeItem === 'flow-design' }" @click="selectItem('flow-design')">
            <span class="nav-icon">🔗</span>
            <span v-show="!isCollapsed" class="nav-text">流程设计</span>
          </div>
          <div class="nav-item" :class="{ active: activeItem === 'templates' }" @click="selectItem('templates')">
            <span class="nav-icon">📋</span>
            <span v-show="!isCollapsed" class="nav-text">模板库</span>
          </div>
        </div>

        <div class="nav-section">
          <div v-show="!isCollapsed" class="section-title">设置</div>
          <div class="nav-item" :class="{ active: activeItem === 'settings' }" @click="selectItem('settings')">
            <span class="nav-icon">⚙️</span>
            <span v-show="!isCollapsed" class="nav-text">设置</span>
          </div>
          <div class="nav-item" :class="{ active: activeItem === 'help' }" @click="selectItem('help')">
            <span class="nav-icon">❓</span>
            <span v-show="!isCollapsed" class="nav-text">帮助</span>
          </div>
        </div>
      </nav>

      <!-- 底部用户信息 -->
      <div class="sidebar-footer">
        <div class="user-info">
          <div class="user-avatar">👤</div>
          <div v-show="!isCollapsed" class="user-details">
            <div class="user-name">用户名</div>
            <div class="user-status">在线</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 定义事件
const emit = defineEmits<{
  itemSelected: [item: string];
  toggleChanged: [collapsed: boolean];
}>();

// 响应式数据
const isCollapsed = ref(false);
const activeItem = ref('flow-design');

// 切换折叠状态
const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
  emit('toggleChanged', isCollapsed.value);
};

// 选择菜单项
const selectItem = (item: string) => {
  activeItem.value = item;
  emit('itemSelected', item);
};
</script>

<style lang="less" scoped>
.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 280px;
  background: #1a1a1a;
  border-right: 1px solid #333;
  z-index: 1000;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;

  &.collapsed {
    width: 60px;
  }

  .toggle-btn {
    position: absolute;
    right: -12px;
    top: 20px;
    width: 24px;
    height: 24px;
    background: #2a2a2a;
    border: 1px solid #444;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #ccc;
    transition: all 0.2s ease;
    z-index: 10;

    &:hover {
      background: #333;
      color: white;
    }
  }

  .sidebar-content {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 16px;
    overflow: hidden;
  }

  .sidebar-header {
    margin-bottom: 24px;

    .logo {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 8px;

      .logo-icon {
        font-size: 24px;
        min-width: 24px;
      }

      .logo-text {
        font-size: 18px;
        font-weight: 600;
        color: white;
        opacity: 1;
        transition: opacity 0.2s ease;
      }
    }
  }

  .sidebar-nav {
    flex: 1;
    overflow-y: auto;
    
    .nav-section {
      margin-bottom: 24px;

      .section-title {
        font-size: 12px;
        color: #888;
        text-transform: uppercase;
        letter-spacing: 1px;
        margin-bottom: 8px;
        padding: 0 8px;
        opacity: 1;
        transition: opacity 0.2s ease;
      }

      .nav-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 8px;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s ease;
        color: #ccc;
        margin-bottom: 4px;

        .nav-icon {
          font-size: 18px;
          min-width: 18px;
        }

        .nav-text {
          font-size: 14px;
          opacity: 1;
          transition: opacity 0.2s ease;
        }

        &:hover {
          background: rgba(255, 255, 255, 0.1);
          color: white;
        }

        &.active {
          background: rgba(59, 130, 246, 0.2);
          color: #3b82f6;
          border: 1px solid rgba(59, 130, 246, 0.3);
        }
      }
    }
  }

  .sidebar-footer {
    margin-top: auto;
    border-top: 1px solid #333;
    padding-top: 16px;

    .user-info {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 8px;
      border-radius: 8px;
      transition: background 0.2s ease;

      &:hover {
        background: rgba(255, 255, 255, 0.05);
      }

      .user-avatar {
        width: 32px;
        height: 32px;
        background: #333;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        min-width: 32px;
      }

      .user-details {
        opacity: 1;
        transition: opacity 0.2s ease;

        .user-name {
          font-size: 14px;
          color: white;
          font-weight: 500;
        }

        .user-status {
          font-size: 12px;
          color: #888;
        }
      }
    }
  }

  // 折叠状态下的样式调整
  &.collapsed {
    .sidebar-content {
      align-items: center;
    }

    .logo-text,
    .nav-text,
    .section-title,
    .user-details {
      opacity: 0;
      pointer-events: none;
    }

    .nav-item {
      justify-content: center;
      padding: 12px;
    }

    .user-info {
      justify-content: center;
    }
  }
}

// 滚动条样式
:deep(.sidebar-nav::-webkit-scrollbar) {
  width: 4px;
}

:deep(.sidebar-nav::-webkit-scrollbar-track) {
  background: transparent;
}

:deep(.sidebar-nav::-webkit-scrollbar-thumb) {
  background: #444;
  border-radius: 2px;
}

:deep(.sidebar-nav::-webkit-scrollbar-thumb:hover) {
  background: #555;
}
</style> 