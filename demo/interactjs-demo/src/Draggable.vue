<template>
  <div :id="id" class="grid-snap" ref="dragElement" :style="eleStyle" :data-x="x" :data-y="y" :data-w="w" :data-h="h">
    Drag me
    <br/>
    x: {{ x }}
    <br/>
    y: {{ y }}
    <br/>
    w: {{ w }}
    <br/>
    h: {{ h }}
  </div>
</template>

<script setup lang="ts">
import '@interactjs/auto-start'
import '@interactjs/actions/drag'
import '@interactjs/actions/resize'
import '@interactjs/modifiers'
import '@interactjs/dev-tools'
import interact from '@interactjs/interact'
import {computed, CSSProperties, defineEmits, defineProps, onMounted} from "vue";


interface DraggableProps {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

interface DraggableEmits {
  (event: 'update:x', val: number): void;

  (event: 'update:y', val: number): void;

  (event: 'update:w', val: number): void;

  (event: 'update:h', val: number): void;
}

const props = defineProps<DraggableProps>()
const emits = defineEmits<DraggableEmits>()

const eleStyle = computed<CSSProperties>(() => {
  return {
    transform: `translate(${props.x}px, ${props.y}px)`,
    width: `${props.w}px`,
    height: `${props.h}px`
  }
})

const setX = (x: number) => emits('update:x', x);
const setY = (y: number) => emits('update:y', y);
const setW = (w: number) => emits('update:w', w);
const setH = (h: number) => emits('update:h', h);

function initializeInteract() {
  interact(document.getElementById(props.id))
      .resizable({
        // resize from all edges and corners
        edges: {left: true, right: true, bottom: true, top: true},
        listeners: {
          move(event) {
            const target = event.target

            // update the element's style
            setW(event.rect.width)
            setH(event.rect.height)

            // translate when resizing from top or left edges
            setX(props.x + event.deltaRect.left)
            setY(props.y + event.deltaRect.top)

            // target.textContent = Math.round(event.rect.width) + '\u00D7' + Math.round(event.rect.height)
          }
        },
        modifiers: [
          // keep the edges inside the parent
          interact.modifiers.restrictEdges({
            outer: 'parent'
          }),

          // minimum size
          interact.modifiers.restrictSize({
            min: {width: 100, height: 50}
          })
        ],

        inertia: true
      })
      .draggable({
        listeners: {move: dragMoveListener},
        inertia: true,
        modifiers: [
          interact.modifiers.restrictRect({
            restriction: 'parent',
            endOnly: true
          })
        ]
      })
}

// 移动
function dragMoveListener(event) {
  // keep the dragged position in the data-x/data-y attributes
  setX(props.x + event.dx)
  setY(props.y + event.dy)
}

onMounted(() => {
  initializeInteract()
})
</script>

<style>
.grid-snap {
  position: absolute;
  border-radius: 4px;
  background-color: #29e;
  color: #fff;
  font-size: 1.2em;
  touch-action: none;

  /* This makes things *much* easier */
  box-sizing: border-box;
}
</style>
