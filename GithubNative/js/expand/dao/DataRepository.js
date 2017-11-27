import React from 'react';
import {
  AsyncStorage
} from 'react-native'

export default class DataRepository {

  // 获取网路数据
  fetchPopularRepository(url) {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(response => response.json())
        .then(result => {
          // 获取成功的话 在本地缓存一份
          if (!result) { // 获取数据为空的话
            reject(new Error('response data is null'))
            return ;
          }
          resolve(result.items);
          this.saveRepository(url, result.items)
        })
        .catch(error => reject(error));
    })
  }

  // 获取数据  网络数据/本地缓存数据
  fetchRepository(url) {
    return new Promise((resolve, reject) => {
      // 首先会获取本地的数据
      this.fetchLocalRepository(url).then(wrapData=> {
        if (wrapData) {
          console.log('获取本地数据成功....')
          resolve(wrapData)
        } else {
          // 如果本地没有数据的话 获取网络数据
          this.fetchPopularRepository(url).then(data=> {
            console.log('本地数据不存在, 获取网络数据....')
            resolve(data)
          }).catch(error=> reject(error))
        }
      }).catch(e=> {
        // 获取本地数据出问题的话 获取网络数据
        this.fetchPopularRepository(url).then(result=> {
          console.log('本地数据失败, 获取网络数据...', e.message)
          resolve(result)
        }).catch(error=> reject(error))

      })
    })
  } // end fetchRepository

  /**
   * 获取本地数据
   * @param url
   * @returns {Promise}
   */
  fetchLocalRepository(url) {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(url, (error, result)=> {
        if (!error) {
          try {
            resolve(JSON.parse(result))
          } catch (e) {
            reject(e);
          }
        } else {
          reject(error)
        }
      })
    })
  }// end fetchLocalRepository

  saveRepository(url, items, callback) {
    if (!url || !items) {
      return ;
    }
    let wrapData = {
      items,
      update_date: new Date().getTime(),
    }
    AsyncStorage.setItem(url, JSON.stringify(wrapData), callback)
  }

  /**
   * 时间检查 检查数据是否过期
   * @param longTime 数据的时间戳, 存在于数据库的时间
   * @returns {boolean}
   */
  checkDate(longTime) {
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