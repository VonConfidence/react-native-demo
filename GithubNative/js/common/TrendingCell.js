import React, {Component} from 'react'

import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity
} from 'react-native'

import HTMLView from 'react-native-htmlview'

export default class TrendingCell extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isFavorite: this.props.projectModel.isFavorite,
      favoriteIcon: this.props.projectModel.isFavorite?require('../../res/images/ic_star.png'): require('../../res/images/ic_unstar_transparent.png')
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setFavoriteState(nextProps.projectModel.isFavorite)
  }
  // 点击收藏按钮
  onPressFavorite() {
    this.setFavoriteState(!this.state.isFavorite)
    this.props.onFavorite(this.props.projectModel.item, !this.state.isFavorite)
  }
  setFavoriteState(isFavorite) {
    this.setState({
      isFavorite,
      favoriteIcon: isFavorite? require('../../res/images/ic_star.png') : require('../../res/images/ic_unstar_transparent.png')
    })
  }
  render() {
    const item = this.props.item?this.props.item: this.props.projectModel.item;
    // 收藏的按钮
    const favoriteButton = <TouchableOpacity onPress={this.onPressFavorite.bind(this)}>
      <Image
        source={this.state.favoriteIcon}
        style={{width: 22, height: 22, tintColor: '#2196f3'}}
      />
    </TouchableOpacity>

    // const {item} = this.props;

    let description = '<p>'+item.description+ '</p>';

    return (
      <TouchableOpacity style={styles.container} onPress={this.props.onSelect}>
        <View style={styles.cell_container}>
          <Text style={styles.title}>{item.fullName}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <HTMLView value={description} onLinkPress={url=> {}} stylesheet={{p: styles.description, a:styles.description}}/>

          <Text style={styles.description}>{item.meta}</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.description}>Build By: </Text>
              {item.contributors.map( (result, index)=> <Image key={index} source={{uri: result}} style={{height: 22, width: 22}}/>)}
            </View>

            {favoriteButton}

          </View>
        </View>
      </TouchableOpacity>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    fontSize: 16,
    marginBottom: 2,
    color: '#212121'
  },
  description: {
    fontSize: 14,
    marginBottom: 2,
    color: '#757575'
  },
  cell_container: {
    backgroundColor: 'white',
    padding: 10,
    marginLeft: 4,
    marginRight: 4,
    marginVertical: 3,
    borderColor: '#dddddd',
    borderWidth: 0.5,
    borderRadius: 2,
    // IOS下使用shadow
    shadowColor: 'gray',
    shadowOffset: {
      width: 0.5,
      height: 0.5
    },
    shadowOpacity: 0.4,
    shadowRadius: 1,

    // android下面使用elevation:2
    elevation: 2
  }
})