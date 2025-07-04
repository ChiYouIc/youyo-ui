import { defineStore } from 'pinia';

type MindMapStateType = {
  activeNode: any;
  activeNodes: Array<any>;
};

export const useMindMapStore = defineStore('youyo-mind-map-store', {
  state: (): MindMapStateType => {
    return {
      activeNode: undefined,
      activeNodes: [],
    };
  },
  getters: {
    activeNodesLength: state => state.activeNodes.length,
  },
  actions: {
    setActiveNodes(nodes: Array<any>) {
      this.activeNodes = nodes;
    },
    setActiveNode(node: any) {
      this.activeNode = node;
    },
  },
});
