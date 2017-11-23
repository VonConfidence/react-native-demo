import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList
} from 'react-native';


function getRequest(url) {
  var opts = {
    method: 'GET'
  }
  fetch(url, opts).then(response => response.json()).then(data => {
    alert(data.total);
  }).catch(error => {
    alert(error)
  })
}

function postRequest(url) {
  let formData = new FormData();
  formData.append('username', 'reacnative')
  formData.append('pwd', '456')


  var opts = {
    method: 'post',
    body:formData
  }

  fetch(url, opts).then(response=> response.text()).then((data)=> {
    // alert(data)
    console.log(data)
  })

}

export default class FetchComponent extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={getRequest.bind(this, 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json')}>
          <View style={styles.btn}>
            <Text>GET</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={postRequest.bind(this, 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json')}>
          <View style={styles.btn}>
            <Text>POST</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    backgroundColor: 'cyan',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  btn: {
    width: 40,
    height: 30,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: 'black',
    backgroundColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'center'
  }
})