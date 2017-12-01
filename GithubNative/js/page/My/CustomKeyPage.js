import React, {Component} from 'react'

import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
  Alert
} from 'react-native'

import NavigationBar from '../../common/NavigationBar'

import ViewUtils from '../../util/ViewUtils'
import ArrayUtils from '../../util/ArrayUtils'

import LanguageDao, {FLAG_LANGUAGE} from '../../expand/dao/LanguageDao'

import CheckBox from 'react-native-check-box'

export default class CustomKeyPage extends Component {
  constructor(props) {
    super(props)

    this.changeValues = []; // 保存用户所做的修改
    // console.log(this.props.navigation)
    this.isRemoveKey = this.props.navigation.state.params.isRemoveKey?true:false
    this.flag = this.props.navigation.state.params.flag
    this.languageDao = new LanguageDao(this.props.navigation.state.params.flag)
    this.state = {
      dataArray: [],
    }
  }
  componentDidMount() {
    // 根据传递的参数的不同加载不同的数据 FLAG_LANGUAGE
    this._loadData()
  }
  _onBack() {
    if (this.changeValues.length == 0) {
      this.props.navigation.goBack();
    } else {
      Alert.alert('提示',
        '要保存修改吗?',
        [
          {'text': '不保存', onPress: ()=> this.props.navigation.goBack(), style: 'cancel'},
          {'text': '保存', onPress: ()=> this._onSave() }
        ]
        )
    }
  }
  _onSave() {
    console.log(this.changeValues)
    if (this.changeValues.length === 0) {
      // 用户没有做任何修改 直接返回
      this.props.navigation.goBack();
      return;
    }

    // 如果是移除键值的话
    if (this.isRemoveKey) {
      // 遍历所有发生变化的标签  (移除自己已经订阅的标签)
      for (let i = 0, len = this.changeValues.length; i < len; i ++) {
        // 将其从数据库中移除, 从state.dataArray中移除 changeValues[i]
        ArrayUtils.remove(this.state.dataArray, this.changeValues[i]);
      }
    }

    // 用户做了修改, 需要保存到数据库中
    this.languageDao.save(this.state.dataArray);
    this.props.navigation.goBack();

  }

  _loadData() {
    // 通过languageDao加载自定义标签
    this.languageDao.fetch().then(result=> {
      this.setState({
        dataArray: result
      })
    }).catch(error=> {
      console.log(error.message)
    })
  }

  _onCheckBoxClick(data) {
    // 如果是 标签订阅页面  才修改数据的订阅状态
    if(!this.isRemoveKey) data.checked = !data.checked;

    //  存在即删除 不存在即添加
    ArrayUtils.updateArray(this.changeValues, data);


    // // 如果数组中存在的话, 表示已经改变过了,  就直接在数组中删除, 即表示不修改
    // for (let i = 0, len = this.changeValues.length; i < len; i ++) {
    //   var tem = this.changeValues[i];
    //   if (tem === data) {
    //     this.changeValues.splice(i, 1)
    //     return ;
    //   }
    // }
    //
    // // 数组中不存在的话  表示要进行修改  即添加进数组中
    // this.changeValues.push(data);
  }
  _renderCheckBox(data) {
    let leftText = data.name;
    return (
        <CheckBox
          style={{flex:1, padding : 10}}
          onClick={()=>this._onCheckBoxClick(data)}
          leftText={leftText}
          isChecked={this.isRemoveKey?false:data.checked}
          checkedImage={<Image source={require('./images/ic_check_box.png')} style={{tintColor: '#6495ED'}}  />}
          unCheckedImage={<Image source={require('./images/ic_check_box_outline_blank.png')} style={{tintColor: '#6495ED'}} />  }
        />
    )
  }
  _renderTagView() {
    if (!this.state.dataArray || this.state.dataArray.length === 0) return <Text>没有数据</Text>
    let len = this.state.dataArray.length;
    let views = [];
    for (let i = 0, l = len - 2; i < l; i += 2) {
      views.push(
        <View key={i}>
          <View style={styles.item}>
            {this._renderCheckBox(this.state.dataArray[i])}
            {this._renderCheckBox(this.state.dataArray[i+1])}
            {/*<Text>{this.state.dataArray[i].name}</Text>*/}
            {/*<Text>{this.state.dataArray[i+1].name}</Text>*/}
          </View>
          <View style={styles.line}></View>
        </View>
      )
    }
    views.push(
      <View key={len-1}>
        <View style={styles.item}>
          {len%2 === 0 ? this._renderCheckBox(this.state.dataArray[len - 2]) : null}
          {this._renderCheckBox(this.state.dataArray[len - 1])}
        </View>
        <View style={styles.line}></View>
      </View>
    )
    return views;
    // return <Text style={{height: 400, width: 400}}>{JSON.stringify(this.state.dataArray)}</Text>
  }
  render() {
    let title = this.isRemoveKey? '标签移除': '自定义标签';
    title = this.flag === FLAG_LANGUAGE.flag_language? '自定义语言':title;
    let rightButtonTitle = this.isRemoveKey? '移除': '保存'
    let rightButton = <TouchableOpacity onPress={this._onSave.bind(this)}>
      <View style={{margin: 10}}>
        <Text style={styles.title}>{rightButtonTitle}</Text>
      </View>
    </TouchableOpacity>;

    return (
      <View style={styles.container}>
        <NavigationBar
          title={title}
          leftButton={ViewUtils.getLeftButton(()=> this._onBack())}
          rightButton={rightButton}
          style={{backgroundColor: "#6495ED"}}
        />
        <ScrollView>
          {this._renderTagView()}
        </ScrollView>
      </View>
    )
  } // end render
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  tips: {
    borderWidth: 1,
    width: 200,
    textAlign: 'center'
  },
  title: {
    fontSize: 20,
    color: 'white'
  },
  line: {
    height: 0.3,
    backgroundColor:'darkgray'
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center'
  }
})
