import React from 'react'

import {
  AsyncStorage,
} from 'react-native'

import keysData from '../../../res/data/keys.json'
import langsData from '../../../res/data/langs.json'

export var FLAG_LANGUAGE = {
  flag_language: 'flag_language_language',
  flag_key: 'flag_key  '
}

export default class LanguageDao {
  constructor(flag) {
    this.flag = flag;
  }

  fetch() {
    return new Promise((resolve, reject) => {
      console.log('LanguageDao out :', this.flag)
      // AsyncStorage.getItem(this.flag).then(result=> {
      //   console.log('result inside ', result)
      //   if (result) {
      //     try{
      //       // 保存到storage中的是json字符串 所以需要parse解析
      //       resolve(JSON.parse(result))
      //     }catch (e) { // 解析出问题的话 将异常抛出
      //       reject(e)
      //     }
      //   } else {
      //     // 如果flag在数据库中不存在的话  即第一次需要定义  name就给其默认数据
      //     // var data = this.flag === FLAG_LANGUAGE.flag_key ? keysData: null
      //     var data = this.flag === FLAG_LANGUAGE.flag_key ? keysData: null
      //     console.log('save data', data)
      //     this.save(data); // 将数据保存到数据库中
      //     resolve(data)
      //   }
      // }).catch(error=> {
      //   reject(error)
      // });

      // 回调函数的方法
      AsyncStorage.getItem(this.flag, (error, result) => {
        if (error) {
          reject(error)
        } else {
          // 如果在数据库中能获取到数据 表示用户已经自定义过了 不需要往里面插入数据
          if (result) {
            console.log('get reulst', JSON.parse(result))
            try {
              // 保存到storage中的是json字符串 所以需要parse解析
              resolve(JSON.parse(result))
            } catch (e) { // 解析出问题的话 将异常抛出
              reject(e)
            }
          } else {
            // 如果flag在数据库中不存在的话  即第一次需要定义  name就给其默认数据
            // var data = this.flag === FLAG_LANGUAGE.flag_key ? keysData: null
            var data = this.flag === FLAG_LANGUAGE.flag_key ? keysData : langsData
            this.save(data); // 将数据保存到数据库中
            resolve(data)
          }
        }
      }) // getItem

    })
  }

  // 将JSON对象的数据data保存到AsyncStorage数据库中
  save(data) {
    console.log('save data', data)
    AsyncStorage.setItem(this.flag, JSON.stringify(data), (error) => {
      if (error) {
        alert('LanguageDao :' + error.message)
      }
    })
  }
}