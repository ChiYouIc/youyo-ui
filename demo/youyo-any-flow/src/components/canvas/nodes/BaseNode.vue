<script setup lang="ts">
import { CirclePlus, Copy, Trash2 } from '@lucide/vue';
import { Handle, Position } from '@vue-flow/core';
import { NodeToolbar } from '@vue-flow/node-toolbar';
import { computed, type Component } from 'vue';
import { useI18n } from 'vue-i18n';
import type { WorkflowNodeData } from '../../../types/workflow';

const { t } = useI18n();

const props = defineProps<{
    id: string;
    data: WorkflowNodeData;
    selected?: boolean;
    icon: Component;
}>();

const emit = defineEmits<{
    (e: 'delete', nodeId: string): void;
}>();

const nodeColor = computed(() => props.data?.color || '#94A3B8');
const hasInput = computed(() => props.data.nodeType !== 'start' && props.data.nodeType !== 'variable');
const hasOutput = computed(() => props.data.nodeType !== 'end');
const isBranch = computed(() => props.data.nodeType === 'condition' || props.data.nodeType === 'loop');

const subtitleMap: Record<string, string> = {
    start: 'start',
    end: 'end',
    llm: 'llm',
    http: 'httpRequest',
    code: 'code',
    condition: 'condition',
    loop: 'loop',
    knowledge: 'knowledge',
    variable: 'variable',
};

const displayLabel = computed(() => {
    // 如果 label 是默认的节点类型名（英文），则使用翻译后的文本
    const key = subtitleMap[props.data.nodeType];
    if (key) {
        const translated = t(`nodeType.${key}`);
        // 如果翻译结果与原始 label 不同（即非英文环境），使用翻译
        return translated;
    }
    return props.data.label;
});

function getSubtitle(nodeType: string): string {
    const key = subtitleMap[nodeType];
    return key ? t(`nodeType.${key}`) : '';
}
</script>

<template>
    <div class="wf-node" :class="{ selected }" :style="{ '--node-color': nodeColor }">
        <Handle v-if="hasInput" type="target" :position="Position.Left" class="wf-handle wf-handle--in" />
        <Handle v-if="hasOutput && !isBranch" type="source" :position="Position.Right" class="wf-handle wf-handle--out">
            <div class="wf-handle-plus">
                <CirclePlus :size="16" />
            </div>
        </Handle>
        <template v-if="isBranch">
            <Handle type="source" :position="Position.Right" id="true"
                class="wf-handle wf-handle--out wf-handle--branch-true">
                <div class="wf-handle-plus">
                    <CirclePlus :size="16" />
                </div>
            </Handle>
            <Handle type="source" :position="Position.Right" id="false"
                class="wf-handle wf-handle--out wf-handle--branch-false" />
        </template>

        <div class="wf-node-inner">
            <div class="wf-node-icon" :style="{ background: nodeColor + '18', color: nodeColor }">
                <component :is="icon" :size="16" />
            </div>
            <div class="wf-node-text">
                <div class="wf-node-label">{{ displayLabel }}</div>
                <div class="wf-node-subtitle">{{ getSubtitle(data.nodeType) }}</div>
            </div>
        </div>

        <NodeToolbar :offset="8" position="top" :is-visible="selected">
            <div class="wf-toolbar">
                <button class="wf-toolbar-btn" :title="t('toolbar.copy')">
                    <Copy :size="13" />
                </button>
                <button class="wf-toolbar-btn wf-toolbar-btn--danger" :title="t('toolbar.delete')"
                    @click.stop="emit('delete', id)">
                    <Trash2 :size="13" />
                </button>
            </div>
        </NodeToolbar>
    </div>
</template>

<style scoped>
.wf-node {
    --node-color: #94a3b8;
    position: relative;
    width: 180px;
    background: #ffffff;
    border-radius: 10px;
    box-shadow:
        0 1px 3px rgba(0, 0, 0, 0.06),
        0 1px 2px rgba(0, 0, 0, 0.04);
    border: 1.5px solid #e5e7eb;
    transition: all 0.15s ease;
    cursor: pointer;
}

.wf-node:hover {
    /* box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); */
    border-color: #d1d5db;
}

.wf-node.selected {
    border-color: var(--node-color);
    box-shadow:
        0 0 0 2px color-mix(in srgb, var(--node-color) 25%, transparent),
        0 4px 16px color-mix(in srgb, var(--node-color) 15%, transparent);
}

.wf-node-inner {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 12px;
    min-height: 44px;
}

.wf-node-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 8px;
    flex-shrink: 0;
}

.wf-node-text {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
}

.wf-node-label {
    font-size: 13px;
    font-weight: 600;
    color: #1f2937;
    line-height: 1.2;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.wf-node-subtitle {
    font-size: 11px;
    color: #9ca3af;
    font-weight: 400;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

/* Handle - small dot, subtle glow on hover */
.wf-handle {
    width: 8px !important;
    height: 8px !important;
    border: 2px solid #ffffff !important;
    background: #b0b8c4 !important;
    border-radius: 50% !important;
    transition:
        background 0.15s ease,
        box-shadow 0.15s ease;
    z-index: 10;
}

.wf-handle--in {
    left: -5px !important;
}

.wf-handle--out {
    right: -5px !important;
}

.wf-handle--branch-true {
    top: 60% !important;
}

.wf-handle--branch-false {
    top: 78% !important;
}

.wf-handle:hover {
    background: var(--node-color) !important;
}

.wf-handle.connecting {
    background: var(--node-color) !important;
}

/* + icon inside handle slot — shown on node hover */
.wf-handle-plus {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #ffffff;
    border: 1.5px solid #e5e7eb;
    color: #9ca3af;
    opacity: 0;
    transition: all 0.15s ease;
    pointer-events: none;
}

/* NodeToolbar */
.wf-toolbar {
    display: flex;
    gap: 2px;
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 3px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.wf-toolbar-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 26px;
    height: 26px;
    border: none;
    border-radius: 6px;
    background: transparent;
    color: #6b7280;
    cursor: pointer;
    transition: all 0.12s ease;
}

.wf-toolbar-btn:hover {
    background: #f3f4f6;
    color: #1f2937;
}

.wf-toolbar-btn--danger:hover {
    background: #fee2e2;
    color: #ef4444;
}
</style>
