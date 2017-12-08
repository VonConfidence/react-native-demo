'use strict';

import {
  AsyncStorage,
} from 'react-native'

import Utils from '../../util/Utils'
import DataRepository, {FLAG_STORAGE} from '../../expand/dao/DataRepository'

export default class RepositoryUtils {

  constructor(aboutCommon) {
    this.aboutCommon = aboutCommon;
    this.dataRepository = new DataRepository(FLAG_STORAGE.flag_my);
    this.itemMap = new Map();
  }

  /**
   * 更新数据
   * @param k
   * @param v
   */
  updateData(k, v) {
    this.itemMap.set(k, v);
    var arr = [...this.itemMap.values()];
    // 将map中的数据转化成为数组 [...itemMap.values()]
    // for (var value of this.itemMap.values()) {
    //   arr.push(value);
    // }
    // console.log('GitPopular:URL updateData', k, v)
    // console.log(arr)
    this.aboutCommon.onNotifyDataChanged(arr);
  }

  /**
   * 获取指定url对应的数据
   * @param url
   */
  fetchRepository(url) {
    // alert(url)
    this.dataRepository.fetchRepository(url)
      .then(result => {
        if (result) {
          this.updateData(url, result);
          // console.log('GitPopular:URL', url, result)
          if (!Utils.checkDate(result.update_date)) return this.dataRepository.fetchPopularRepository(url);
        } else {
          return this.dataRepository.fetchPopularRepository(url);
        }
      })
      .then((item) => {
        if (item) {
          this.updateData(url, item);
        }
      }).catch(e => {
        alert('RepositoryUtil: '+e.message)
      }
    )
  }

  /**
   * 批量获取url对应的数据
   * @param urls
   */
  fetchRepositories(urls) {
    for (let i = 0, l = urls.length; i < l; i++) {
      var url = urls[i];
      this.fetchRepository(url);
    }
  }
}
