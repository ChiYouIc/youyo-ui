import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useVueFlow } from '@vue-flow/core';
import type { ViewportData } from '../types';

export function useZoom() {
  const currentZoom = ref(100);
  const zoomLevel = computed(() => Math.round(currentZoom.value));

  const { zoomIn: zoomInFn, zoomOut: zoomOutFn, fitView, getViewport, setViewport } = useVueFlow();

  // 手动滚轮缩放处理
  function handleWheel(event: Event) {
    const wheelEvent = event as WheelEvent;
    if (wheelEvent.ctrlKey || wheelEvent.metaKey) {
      // 如果按住 Ctrl/Cmd 键，执行缩放
      event.preventDefault();

      const delta = wheelEvent.deltaY > 0 ? -0.1 : 0.1;
      const viewport = getViewport();
      const newZoom = Math.max(0.1, Math.min(2, viewport.zoom + delta));

      setViewport({
        x: viewport.x,
        y: viewport.y,
        zoom: newZoom,
      });

      currentZoom.value = newZoom * 100;
    }
  }

  // 监听视图变化事件
  function onViewportChange(viewport: ViewportData) {
    currentZoom.value = viewport.zoom * 100;
  }

  // 缩放方法
  function zoomIn() {
    if (zoomInFn) {
      zoomInFn();
      currentZoom.value = Math.min(200, currentZoom.value + 10);
    }
  }

  function zoomOut() {
    if (zoomOutFn) {
      zoomOutFn();
      currentZoom.value = Math.max(10, currentZoom.value - 10);
    }
  }

  function centerView() {
    if (fitView) {
      fitView({ duration: 800, padding: 0.1 });
    }
  }

  // 生命周期管理
  onMounted(() => {
    // 绑定滚轮事件到画布容器
    const container = document.querySelector('.canvas-container');
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }
  });

  onUnmounted(() => {
    // 清理事件监听器
    const container = document.querySelector('.canvas-container');
    if (container) {
      container.removeEventListener('wheel', handleWheel);
    }
  });

  return {
    // 状态
    currentZoom,
    zoomLevel,
    
    // 方法
    zoomIn,
    zoomOut,
    centerView,
    onViewportChange,
    setCurrentZoom: (zoom: number) => {
      currentZoom.value = zoom;
    },
  };
}