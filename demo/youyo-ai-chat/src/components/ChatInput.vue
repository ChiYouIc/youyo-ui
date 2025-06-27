<template>
  <div class="chat-input-container">
    <div class="mode-switcher">
      <button :class="['mode-btn', { active: currentMode === 'normal' }]" @click="switchMode('normal')">
        <span class="mode-icon">💎</span>
        常规模式
      </button>
      <button :class="['mode-btn', { active: currentMode === 'deepseek' }]" @click="switchMode('deepseek')">
        <span class="mode-icon">🧠</span>
        DeepSeek V3
      </button>
    </div>

    <div class="input-wrapper">
      <div class="input-container">
        <input 
          v-model="inputMessage" 
          type="text" 
          placeholder="开启新的话题" 
          class="chat-input" 
          @keyup.enter="sendMessage" 
          @focus="inputFocused = true" 
          @blur="inputFocused = false" 
        />
        <button class="send-btn" @click="sendMessage" :disabled="!inputMessage.trim()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="m22 2-7 20-4-9-9-4 20-7z" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 定义事件
const emit = defineEmits<{
  modeChanged: [mode: 'normal' | 'deepseek'];
  messageSent: [message: string, mode: 'normal' | 'deepseek'];
}>();

// 响应式数据
const currentMode = ref<'normal' | 'deepseek'>('normal');
const inputMessage = ref('');
const inputFocused = ref(false);

// 切换模式
const switchMode = (mode: 'normal' | 'deepseek') => {
  currentMode.value = mode;
  console.log(`切换到${mode === 'normal' ? '常规' : 'DeepSeek V3'}模式`);
  emit('modeChanged', mode);
};

// 发送消息
const sendMessage = () => {
  if (!inputMessage.value.trim()) return;

  console.log(`[${currentMode.value}模式] 发送消息:`, inputMessage.value);
  emit('messageSent', inputMessage.value, currentMode.value);

  // 清空输入框
  inputMessage.value = '';
};
</script>

<style lang="less" scoped>
.chat-input-container {
  position: absolute;
  bottom: 20px;
  left: 20px;
  right: 20px;
  padding: 20px;
  z-index: 1000;
  pointer-events: none; /* 让容器本身不阻挡鼠标事件 */

  .mode-switcher {
    display: flex;
    gap: 8px;
    margin-bottom: 16px;
    justify-content: center;
    pointer-events: auto; /* 恢复模式切换按钮的鼠标事件 */

    .mode-btn {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 8px 16px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 20px;
      background: rgba(42, 42, 42, 0.8);
      color: rgba(255, 255, 255, 0.8);
      cursor: pointer;
      font-size: 13px;
      transition: all 0.2s;
      backdrop-filter: blur(10px);

      .mode-icon {
        font-size: 14px;
      }

      &.active {
        background: rgba(51, 51, 51, 0.9);
        color: white;
        border-color: rgba(255, 255, 255, 0.3);
      }

      &:hover:not(.active) {
        background: rgba(51, 51, 51, 0.8);
        border-color: rgba(255, 255, 255, 0.3);
      }
    }
  }

  .input-wrapper {
    max-width: 800px;
    margin: 0 auto;
    pointer-events: auto; /* 恢复输入区域的鼠标事件 */

    .input-container {
      position: relative;
      display: flex;
      align-items: center;
      background: rgba(42, 42, 42, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 25px;
      padding: 4px;
      transition: border-color 0.2s;
      backdrop-filter: blur(10px);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);

      &:focus-within {
        border-color: rgba(255, 255, 255, 0.4);
        background: rgba(42, 42, 42, 0.9);
      }

      .chat-input {
        flex: 1;
        padding: 12px 20px;
        border: none;
        background: transparent;
        color: white;
        font-size: 14px;
        outline: none;

        &::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }
      }

      .send-btn {
        padding: 8px 12px;
        margin-right: 4px;
        border: none;
        border-radius: 20px;
        background: rgba(74, 74, 74, 0.8);
        color: white;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s;
        min-width: 36px;
        height: 36px;

        &:hover:not(:disabled) {
          background: rgba(85, 85, 85, 0.9);
        }

        &:disabled {
          background: rgba(51, 51, 51, 0.6);
          color: rgba(255, 255, 255, 0.4);
          cursor: not-allowed;
        }

        svg {
          width: 16px;
          height: 16px;
        }
      }
    }
  }
}
</style> 