import React from 'react'

import {
  AsyncStorage,
} from 'react-native'

import keysData from '../../../res/data/keys.json'
import langsData from '../../../res/data/langs.json'

const FAVORITE_KEY_PREFIX = 'favorite_'

export default class LanguageDao {
  constructor(flag) {
    this.flag = flag;
    this.favoriteKey = FAVORITE_KEY_PREFIX + flag;
  }

  /**
   * 收藏项目  保存收藏的项目
   * @param key 项目id或者名称
   * @param value 收藏的项目
   * @param callback 回调函数
   */
  saveFavoriteItem(key, value, callback) {
    AsyncStorage.setItem(key, value, (error) => {
      // alert('key:'+key+ ',value:'+value)
      if (!error) {
        // 往数据库里面的favoriteKeys里面添加key值
        this.updateFavoriteKeys(key, true);
      }
    })
  }

  /**
   * 更新favoriteKey集合
   * @param key
   * @param isAdd  true的话表示添加 false表示删除
   */
  updateFavoriteKeys(key, isAdd) {
    AsyncStorage.getItem(this.favoriteKey, (error, result) => {
      if (!error) {
        var favoriteKeys = [];

        if (result) {
          // 如果数据库中已经存在
          favoriteKeys = JSON.parse(result)
          console.log('favoriteKeys :'+favoriteKeys)
        }
        var index = favoriteKeys.indexOf(key)
        if (isAdd) {
          if (index === -1) {
            favoriteKeys.push(key)
          }
        } else {
          if (index !== -1) {
            favoriteKeys.splice(index, 1)
          }
        }
        console.log('setItem', this.favoriteKey, JSON.stringify(favoriteKeys))
        AsyncStorage.setItem(this.favoriteKey, JSON.stringify(favoriteKeys))
      }
    })
  }

  /**
   * 移除已经收藏的项目
   * @param key
   */
  removeFavoriteItem(key) {
    AsyncStorage.removeItem(key, (error) => {
     if (!error) {
       this.updateFavoriteKeys(key, false)
     }
    })
  }

  /**
   * 收取收藏的项目对应的key
   * @returns {Promise}
   */
  getFavoriteKeys() {
    return new Promise((resolve, reject)=> {
      AsyncStorage.getItem(this.favoriteKey, (error,result)=> {
        if (!error) {
          try {
            // alert(result)
            resolve(JSON.parse(result))
          } catch (e) {
            reject(e)
          }
        } else {
          reject(error)
        }
      })
    })
  }

}