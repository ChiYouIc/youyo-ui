import antdIcons from './style/antd/iconfont.json';
import { ref } from 'vue';

export default function () {
  const antdPrefix = antdIcons.css_prefix_text;
  const antdIconList = ref<Array<string>>(antdIcons.glyphs.map((icon: { font_class: string }) => `${antdPrefix}${icon.font_class}`));
  const antdTotal = antdIconList.value.length;

  /**
   * 截取图标列表
   * @param start
   * @param end
   */
  function subAntdList(start: number, end: number): string[] {
    return antdIconList.value.slice(start, end);
  }

  /**
   * 搜索图标
   * @param icon 图标名称
   */
  function filterAntdList(icon: string): string[] {
    return antdIconList.value.filter(i => i.startsWith(icon) || i.endsWith(icon));
  }

  return {
    antdIconList,
    subAntdList,
    antdTotal,
    filterAntdList,
  };
}
