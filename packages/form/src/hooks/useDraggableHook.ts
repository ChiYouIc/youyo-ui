function move(obj: any): boolean {
  const to = obj.to;

  if (to.id === 'design') {
    return false;
  }

  if (to.id === 'fence') {
    console.log(to.children, to.children.length === 0);
    return to.children.length === 0;
  }

  return true;
}

export default function useDraggableHook() {
  return {
    draggableMove: move,
  };
}
