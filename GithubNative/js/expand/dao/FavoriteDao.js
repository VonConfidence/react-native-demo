import React from 'react'

import {
  AsyncStorage,
} from 'react-native'

const FAVORITE_KEY_PREFIX = 'favorite_'

export default class FavoriteDao {
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
    console.log('收藏项目: ',this.favoriteKey ,key, value)
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
          // console.log('favoriteKeys :'+favoriteKeys)
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
        console.log('FavoriteDao:setItem', this.favoriteKey, JSON.stringify(favoriteKeys))
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
    // alert(this.favoriteKey)
    console.log('FavoriteDao: getFavoriteKeys ', this.favoriteKey)
    return new Promise((resolve, reject)=> {
      AsyncStorage.getItem(this.favoriteKey, (error,result)=> {
        if (!error) {
          try {
            // alert(result)
            // console.log('favorite_keys:', result)
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

  /**
   * 获取用户所收藏的项目
   */
  getAllItems() {
    return new Promise((resolve, reject)=> {
      this.getFavoriteKeys().then(keys=> {
        var items = [];
        if (keys) {
          AsyncStorage.multiGet(keys, (err, stores)=> {
            try {
              stores.map((result, index, store)=>{
                let value = store[index][1];
                if (value) {
                  items.push(JSON.parse(value))
                }
              })
              resolve(items)
            }
            catch (e) {
              reject(e)
            }

          })
        } else { // key 为空的情况下
          resolve(items)
        }
      }).catch(error=> {
        reject(error)
      })
    })
  }

}