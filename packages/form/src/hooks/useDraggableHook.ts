function move(obj: any): boolean {
  const to = obj.to;

  if (to.id === 'design') {
    return false;
  }

  if (to.id === 'fence') {
    // fence 不能往 fence 里面添加
    const dragged = obj.dragged;
    if (dragged) {
      if (dragged.getAttribute('component') === 'Fence') {
        return false;
      }
    }
    return to.children.length === 0;
  }

  return true;
}

export default function useDraggableHook() {
  return {
    draggableMove: move,
  };
}
