export default class ArrayUtil {
  /**
   * 删除数组中第一个匹配的元素
   * @param arr 数组
   * @param callback 自定义判断需要删除的元素，返回 true 表示当前元素需要删除，
   */
  public static remove<T>(arr: Array<T>, callback: (el: T) => boolean): Array<T> {
    const res: Array<T> = [];
    for (let i = 0; i < arr.length; i++) {
      if (!callback(arr[i])) {
        res.push(arr[i]);
      }
    }
    return res;
  }

  /**
   * 删除数组中第一个匹配的元素
   * @param arr 数组
   * @param el 元素
   */
  public static removeEl<T extends string | number | boolean>(arr: Array<T>, el: T): Array<T> {
    return ArrayUtil.remove<T>(arr, e => e === el);
  }

  /**
   * 数组去重
   * @param arr 数组
   */
  public static distinct<T extends string | number | boolean>(arr: Array<T>) {
    const res: T[] = [];
    for (let i = 0; i < arr.length; i++) {
      const element = arr[i];
      if (res.indexOf(element) === -1) {
        res.push(element);
      }
    }
    return res;
  }

  /**
   * 元素 el 是否存在于 arr 种
   * @param arr 集合
   * @param el  元素
   */
  public static contain<T extends string | number | boolean>(arr: Array<T>, el: T): boolean {
    const t = arr.find(value => value === el);
    return t !== undefined;
  }
}
