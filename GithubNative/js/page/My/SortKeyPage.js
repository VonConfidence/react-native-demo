import React, {Component} from 'react'

import {
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  Alert
} from 'react-native'

import LanguageDao, {FLAG_LANGUAGE} from '../../expand/dao/LanguageDao'
import ArrayUtils from '../../util/ArrayUtils'

import NavigationBar from '../../common/NavigationBar'

import ViewUtils from '../../util/ViewUtils'

import SortableListView from 'react-native-sortable-listview'

class SortKeyPage extends Component {
  constructor(props) {
    super(props)
    // 从数据库中读取的所有标签数组
    this.dataArray = [];

    // 排序之后生成的数组
    this.sortResultArray = []

    // 上一次的数组顺序 即复制的一份checkedArray
    this.originalCheckedArray = [];

    this.state = {
      // 已经订阅的标签  用户点击拖动后该数组的顺序被修改
      checkedArray: []
    }
  }

  componentDidMount() {
    this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key)
    this._loadData();
  }

  _loadData() {
    this.languageDao.fetch().then(result => {
      // 查询数据库中已经订阅的标签
      this._getCheckedItems(result)
    }).catch(error => {
    })
  }

  _getCheckedItems(result) {
    this.dataArray = result;

    // 保存用户已经订阅的标签
    let checkedArray = this.dataArray.filter(item => item.checked == true);
    this.setState({
      checkedArray
    })
    // 克隆一个数组
    this.originalCheckedArray = ArrayUtils.clone(checkedArray)
  }
  _onBack() {
    if (ArrayUtils.isEqual(this.originalCheckedArray, this.state.checkedArray)) {
      this.props.navigation.goBack()
    } else {
      Alert.alert('提示',
        '要保存修改吗?',
        [
          {'text': '否', onPress: ()=> this.props.navigation.goBack()},
          {'text': '保存', onPress: ()=> this._onSave(true) }
        ]
      )
    }
  }
  _onSave(isChecked) {
    if (!isChecked && ArrayUtils.isEqual(this.originalCheckedArray, this.state.checkedArray)) {
      this.props.navigation.goBack()
      return ;
    }
    this.getSortResult();
    this.languageDao.save(this.sortResultArray);
    this.props.navigation.goBack()
  }
  getSortResult() {
    // 获取排序之后的数组的方法
    this.sortResultArray = ArrayUtils.clone(this.dataArray);
    // 遍历排序之前的标签
    for (let i= 0; i< this.originalCheckedArray.length; i ++) {
      let item = this.originalCheckedArray[i];
      let index = this.dataArray.indexOf(item);
      // sortResultArray 就是排序之后的带有所有标签的数组
      this.sortResultArray.splice(index, 1, this.state.checkedArray[i])
    }
  }
  render() {
    const {navigate} = this.props.navigation;
    let rightButton = <TouchableOpacity onPress={this._onSave.bind(this)}>
      <View style={{margin: 10}}>
        <Text style={styles.title}>保存</Text>
      </View>
    </TouchableOpacity>
    return (
      <View style={styles.container}>
        <NavigationBar
          title={"标签页"}
          style={{backgroundColor: "#6495ED"}}
          leftButton={ViewUtils.getLeftButton(()=> this._onBack())}
          rightButton={rightButton}
        />
        <SortableListView
          style={{flex: 1}}
          data={this.state.checkedArray}
          order={Object.keys(this.state.checkedArray)}
          onRowMoved={e => {
            this.state.checkedArray.splice(e.to, 0, this.state.checkedArray.splice(e.from, 1)[0]);
            this.forceUpdate();
          }}
          renderRow={row => <SortCell data={row}/>}
        />
      </View>
    )
  } // end render
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    padding: 25,
    backgroundColor: "#F8F8F8",
    borderBottomWidth: 1,
    borderColor: '#eee'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  image: {
    tintColor: '#2196F3',
    width: 16,
    height: 16,
    marginRight: 10
  },
  title: {
    fontSize: 20,
    color: 'white'
  }
})

class SortCell extends Component {
  render() {
    return <TouchableHighlight
      underlayColor={'#eee'}
      style={styles.item}
      delayLongPress={500}
      {...this.props.sortHandlers}
      >
      <View style={styles.row}>
        <Image source={require('./images/ic_sort.png')} style={styles.image}/>
        <Text>{this.props.data.name}</Text>
      </View>
    </TouchableHighlight>
  }
}

export default SortKeyPage