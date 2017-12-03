export default class Utils {

  /**
   * 检查该item 有没有被收藏过
   * @param item
   * @param items
   * @returns {boolean|*}
   */
  static checkFavorite(item, items) {
    var isExists = items.some(element=> element === (item.id?item.id.toString(): item.fullName))
    return isExists
  }

}