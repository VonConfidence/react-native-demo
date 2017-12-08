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

  /**
   * 时间检查 检查数据是否过期
   * @param longTime 数据的时间戳, 存在于数据库的时间
   * @returns {boolean} true代表不需要更新数据 false表示需要更新数据
   */
  static checkDate(longTime) {
    // return false;
    let cDate = new Date()
    let tDate = new Date(longTime)

    if (cDate.getMonth() !== tDate.getMonth()) {
      return false;
    }
    if (cDate.getDay() !== tDate.getDay()) {
      return false;
    }
    // // 如果时间大于四个小时 设置为过时
    // if (cDate.getHours() - tDate.getHours() > 4) {
    //   return false;
    // }

    // 如果时间大于一分钟的话 设置为过时
    if (cDate.getMinutes() - tDate.getMinutes() > 1) {
      return false;
    }

    // 返回true 表示没有过时
    return true
  }

}