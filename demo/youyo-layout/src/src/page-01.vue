<template>
  <VueFlow :nodes="nodes" :edges="edges" :default-viewport="{ zoom: 0.5 }" :max-zoom="4" :min-zoom="0.1">
    <panel>
      <a-button>添加节点</a-button>
      <a-button>删除节点</a-button>
    </panel>

    <Background pattern-color="#aaa" :gap="20" />

    <MiniMap />

    <Controls position="top-left">
      <ControlButton title="Reset Transform" @click="resetTransform">
        <Icon name="reset" />
      </ControlButton>

      <ControlButton title="Shuffle Node Positions" @click="updatePos">
        <Icon name="update" />
      </ControlButton>

      <ControlButton title="Toggle Dark Mode" @click="toggleDarkMode">
        <Icon v-if="dark" name="sun" />
        <Icon v-else name="moon" />
      </ControlButton>

      <ControlButton title="Log `toObject`" @click="logToObject">
        <Icon name="log" />
      </ControlButton>
    </Controls>

    <!-- bind your custom node type to a component by using slots, slot names are always `node-<type>` -->
    <template #node-special="specialNodeProps">
      <special-node v-bind="specialNodeProps" />
    </template>

    <!-- bind your custom edge type to a component by using slots, slot names are always `edge-<type>` -->
    <template #edge-special="specialEdgeProps">
      <special-edge v-bind="specialEdgeProps" />
    </template>
  </VueFlow>
</template>

<script setup>
import { ref } from 'vue';
import { Panel, useVueFlow, VueFlow } from '@vue-flow/core';
import { MiniMap } from '@vue-flow/minimap';
import { Background } from '@vue-flow/background';
import SpecialNode from './components/SpecialNode.vue';
import SpecialEdge from './components/SpecialEdge.vue';
import { ControlButton, Controls } from '@vue-flow/controls';
import Icon from './components/icon.vue';
const { onInit, onNodeDragStop, onConnect, addEdges, setViewport, toObject } = useVueFlow();
const dark = ref(false);
// these are our nodes
const nodes = ref([
  {
    id: '1',
    type: 'input',
    position: { x: 250, y: 5 },
    data: { label: 'Node 1' },
  },
  {
    id: '2',
    position: { x: 100, y: 100 },
    data: { label: 'Node 2' },
  },
  {
    id: '3',
    type: 'output',
    position: { x: 400, y: 200 },
    data: { label: 'Node 3' },
  },
  {
    id: '4',
    type: 'special',
    position: { x: 200, y: 400 },
    data: {
      label: 'Node 4',
      hello: 'world',
    },
  },
]);

// these are our edges
const edges = ref([
  // default bezier edge
  // consists of an edge id, source node id and target node id
  {
    id: 'e1->2',
    source: '1',
    target: '2',
  },

  // set `animated: true` to create an animated edge path
  {
    id: 'e2->3',
    source: '2',
    target: '3',
    animated: true,
  },

  // a custom edge, specified by using a custom type name
  // we choose `type: 'special'` for this example
  {
    id: 'e3->4',
    type: 'special',
    source: '3',
    target: '4',
    // all edges can have a data object containing any data you want to pass to the edge
    data: {
      hello: 'world',
    },
  },
]);

/**
 * This is a Vue Flow event-hook which can be listened to from anywhere you call the composable, instead of only on the main component
 * Any event that is available as `@event-name` on the VueFlow component is also available as `onEventName` on the composable and vice versa
 *
 * onInit is called when the VueFlow viewport is initialized
 */
onInit(vueFlowInstance => {
  // instance is the same as the return of `useVueFlow`
  vueFlowInstance.fitView();
});

/**
 * onNodeDragStop is called when a node is done being dragged
 *
 * Node drag events provide you with:
 * 1. the event object
 * 2. the nodes array (if multiple nodes are dragged)
 * 3. the node that initiated the drag
 * 4. any intersections with other nodes
 */
onNodeDragStop(({ event, nodes, node }) => {
  console.log('Node Drag Stop', { event, nodes, node });
});

/**
 * onConnect is called when a new connection is created.
 *
 * You can add additional properties to your new edge (like a type or label) or block the creation altogether by not calling `addEdges`
 */
onConnect(connection => {
  addEdges(connection);
});

/**
 * To update a node or multiple nodes, you can
 * 1. Mutate the node objects *if* you're using `v-model`
 * 2. Use the `updateNode` method (from `useVueFlow`) to update the node(s)
 * 3. Create a new array of nodes and pass it to the `nodes` ref
 */
function updatePos() {
  nodes.value = nodes.value.map(node => {
    return {
      ...node,
      position: {
        x: Math.random() * 400,
        y: Math.random() * 400,
      },
    };
  });
}

/**
 * toObject transforms your current graph data to an easily persist-able object
 */
function logToObject() {
  console.log(toObject());
}

/**
 * Resets the current viewport transformation (zoom & pan)
 */
function resetTransform() {
  setViewport({ x: 0, y: 0, zoom: 1 });
}

function toggleDarkMode() {
  dark.value = !dark.value;
}
</script>

<style>
/* import the necessary styles for Vue Flow to work */
@import '@vue-flow/core/dist/style.css';

/* import the default theme, this is optional but generally recommended */
@import '@vue-flow/core/dist/theme-default.css';
</style>
