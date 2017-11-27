import React, {Component} from 'react'

import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity
} from 'react-native'

export default class RepositoryCell extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {item} = this.props;
    return (
      <TouchableOpacity style={styles.container} onPress={this.props.onSelect}>
        <View style={styles.cell_container}>
          <Text style={styles.title}>{item.full_name}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text>Author: </Text>
              <Image source={{uri: item.owner.avatar_url}} style={{height: 22, width: 22}}/>
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text>Stars: </Text>
              <Text>{item.stargazers_count}</Text>
            </View>

            <Image
              source={require('../../res/images/ic_star.png')}
              style={{width: 22, height: 22}}
            />

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