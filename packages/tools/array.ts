/**
 * 在 arr 的 index 位置插入元素 ele
 * @param arr 原数组
 * @param index 位置
 * @param ele 元素
 */
function insert<T>(arr: Array<T>, index: number, ele: T): Array<T> {
    if (arr.length < index) {
        throw new Error("out of array index");
    }
    const start = [];
    const end = [];

    for (let i = 0; i < arr.length; i++) {
        i < index ? start.push(arr[i]) : end.push(arr[i]);
    }

    return [...start, ele, ...end];
}

/**
 * 删除数组中第一个匹配的元素
 * @param arr 数组
 * @param callback 自定义判断需要删除的元素，返回 true 表示当前元素需要删除，
 */
function remove<T>(arr: Array<T>, callback: (el: T) => boolean): Array<T> {
    const res: Array<T> = []
    for (let i = 0; i < arr.length; i++) {
        if (!callback(arr[i])) {
            res.push(arr[i])
        }
    }
    return res;
}

/**
 * 删除数组中第一个匹配的元素
 * @param arr 数组
 * @param el 元素
 */
function removeEl<T extends string | number | boolean>(arr: Array<T>, el: T): Array<T> {
    return remove<T>(arr, (e) => e === el);
}

/**
 * 数组去重
 * @param arr 数组
 */
function distinct<T>(arr: Array<T>) {
    const res: T[] = []
    for (let i = 0; i < arr.length; i++) {
        const element = arr[i];
        if (res.indexOf(element) === -1) {
            res.push(element)
        }
    }
    return res;
}

export default {
    remove,
    removeEl,
    distinct,
    insert
}