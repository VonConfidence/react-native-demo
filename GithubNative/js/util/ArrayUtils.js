export default class ArrayUtils {
  static updateArray(array, item) {
    for (let i = 0, len = array.length; i < len; i ++) {
      var tem = array[i];
      if (tem === item) {
        array.splice(i, 1)
        return ;
      }
    }

    // 数组中不存在的话  表示要进行修改  即添加进数组中
    array.push(item);
  }

  /**
   * 克隆一个数组
   * @param from
   * @returns {Array}
   */
  static clone(from) {
    if(!from) return [];
    let newArray = [];
    for (let i = 0; i < from.length; i ++) {
      newArray[i] = from[i]
    };
    return newArray;
  }

  /**
   * 判断两个数组中的元素是否一一对应且相等
   * @param arr1
   * @param arr2
   * @returns {boolean}
   */
  static isEqual(arr1, arr2) {
    if (! (arr1 && arr2)) {
      return false;
    }
    if (arr1.length != arr2.length) {
      return false;
    }
    for (let i =0; i < arr2.length; i ++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }
    return true;
  }

  /**
   * 从数组arr中移除item项
   * @param arr?Array
   * @param item?
   */
  static remove(arr, item){
    if (!arr) {
      return ;
    }
    for(let i = 0; i < arr.length; i ++) {
      if (item === arr[i]) {
        arr.splice(i, 1)
      }
    }
  }

}