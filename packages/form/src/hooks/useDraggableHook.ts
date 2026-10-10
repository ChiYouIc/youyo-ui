/**
 * 读取拖拽容器的角色。
 * 用 data-role 而不是 id，避免栅栏的每个单元格共用同一个 id。
 */
function roleOf(el: any): string {
  if (!el) {
    return '';
  }

  return el.dataset?.role ?? el.id ?? '';
}

function move(obj: any): boolean {
  const to = obj.to;

  if (roleOf(to) === 'design') {
    return false;
  }

  if (roleOf(to) === 'fence') {
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
