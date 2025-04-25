<template>
  <div ref="diagramRef" id="diagramRef" class="diagram-container"></div>
</template>

<script lang="ts" setup>
import * as go from 'gojs';
import { onMounted, ref } from 'vue';

const diagramRef = ref();

// let myDiagram;

function init() {
  const myDiagram = new go.Diagram(diagramRef.value, {
    // when the user drags a node, also move/copy/delete the whole subtree starting with that node
    'commandHandler.copiesTree': true,
    'commandHandler.copiesParentKey': true,
    'commandHandler.deletesTree': true,
    'draggingTool.dragsTree': true,
    // enable Ctrl-Z to undo and Ctrl-Y to redo
    'undoManager.isEnabled': true,
    layout: new go.TreeLayout({ angle: 90, layerSpacing: 35 }),
  });

  myDiagram.nodeTemplate = new go.Node('Vertical', { selectionObjectName: 'TEXT' })
    // 记住节点数据中每个节点的位置
    .bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify)
    // 确保文本按照所需的方向“增长”
    .bind('locationSpot', 'dir', d => spotConverter(d, false))
    .add(
      new go.TextBlock({
        name: 'TEXT',
        minSize: new go.Size(30, 15),
        editable: true,
      })
        .bindTwoWay('text')
        .bindTwoWay('scale')
        .bindTwoWay('font'),

      new go.Shape('LineH', {
        stretch: go.Stretch.Horizontal,
        strokeWidth: 3,
        height: 3,
        // this line shape is the port -- what links connect with
        portId: '',
        fromSpot: go.Spot.LeftRightSides,
        toSpot: go.Spot.LeftRightSides,
      })
        .bind('stroke', 'brush')
        // 确保链接从正确的方向进入，并适当地发出
        .bind('fromSpot', 'dir', d => spotConverter(d, true))
        .bind('toSpot', 'dir', d => spotConverter(d, false)),
    );

  myDiagram.linkTemplate = new go.Link({
    curve: go.Curve.Bezier,
    fromShortLength: -2,
    toShortLength: -2,
    selectable: false,
  }).add(
    new go.Shape({ strokeWidth: 3 }).bindObject('stroke', 'toNode', n => {
      if (n.data.brush) return n.data.brush;
      return 'black';
    }),
  );

  myDiagram.model = new go.TreeModel([
    { key: 0, text: 'Mind Map', loc: '0 0' },
    { key: 1, parent: 0, text: 'Getting more time', brush: 'skyblue', dir: 'right' },
    { key: 11, parent: 1, text: 'Wake up early', brush: 'skyblue', dir: 'right' },
    { key: 12, parent: 1, text: 'Delegate', brush: 'skyblue', dir: 'right' },
    { key: 13, parent: 1, text: 'Simplify', brush: 'skyblue', dir: 'right' },
    { key: 2, parent: 0, text: 'More effective use', brush: 'darkseagreen', dir: 'right' },
    { key: 21, parent: 2, text: 'Planning', brush: 'darkseagreen', dir: 'right' },
    { key: 211, parent: 21, text: 'Priorities', brush: 'darkseagreen', dir: 'right' },
    { key: 212, parent: 21, text: 'Ways to focus', brush: 'darkseagreen', dir: 'right' },
    { key: 22, parent: 2, text: 'Goals', brush: 'darkseagreen', dir: 'right' },
    { key: 3, parent: 0, text: 'Time wasting', brush: 'palevioletred', dir: 'left' },
    { key: 31, parent: 3, text: 'Too many meetings', brush: 'palevioletred', dir: 'left' },
    { key: 32, parent: 3, text: 'Too much time spent on details', brush: 'palevioletred', dir: 'left' },
    { key: 33, parent: 3, text: 'Message fatigue', brush: 'palevioletred', dir: 'left' },
    { key: 331, parent: 31, text: 'Check messages less', brush: 'palevioletred', dir: 'left' },
    { key: 332, parent: 31, text: 'Message filters', brush: 'palevioletred', dir: 'left' },
    { key: 4, parent: 0, text: 'Key issues', brush: 'coral', dir: 'left' },
    { key: 41, parent: 4, text: 'Methods', brush: 'coral', dir: 'left' },
    { key: 42, parent: 4, text: 'Deadlines', brush: 'coral', dir: 'left' },
    { key: 43, parent: 4, text: 'Checkpoints', brush: 'coral', dir: 'left' },
  ]);

  load(myDiagram);
}

function load(myDiagram) {
  var root = myDiagram.findTreeRoots().first();
  if (root === null) return;
  myDiagram.startTransaction('Layout');
  // split the nodes and links into two collections
  var rightward = new go.Set();
  var leftward = new go.Set();
  root.findLinksConnected().each(link => {
    var child = link.toNode;
    if (child.data.dir === 'left') {
      leftward.add(root); // the root node is in both collections
      leftward.add(link);
      leftward.addAll(child.findTreeParts());
    } else {
      rightward.add(root); // the root node is in both collections
      rightward.add(link);
      rightward.addAll(child.findTreeParts());
    }
  });
  // do one layout and then the other without moving the shared root node
  layoutAngle(rightward, 0);
  layoutAngle(leftward, 180);
  myDiagram.commitTransaction('Layout');
}

function layoutAngle(parts, angle) {
  var layout = new go.TreeLayout({
    angle: angle,
    arrangement: go.TreeArrangement.FixedRoots,
    nodeSpacing: 5,
    layerSpacing: 20,
    setsPortSpot: false, // don't set port spots since we're managing them with our spotConverter function
    setsChildPortSpot: false,
  });
  layout.doLayout(parts);
}

function spotConverter(dir, from) {
  if (dir === 'left') {
    return from ? go.Spot.Left : go.Spot.Right;
  } else {
    return from ? go.Spot.Right : go.Spot.Left;
  }
}

onMounted(() => {
  init();
});
</script>
<style scoped>
.diagram-container {
  width: 100%;
  height: 100%;
}
</style>
