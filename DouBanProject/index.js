import { AppRegistry } from 'react-native';
import App from './App';

/**
 * 第四部分: 注册入口组件
 *    AppRegistry: 负责注册运行RN应用程序的Javascript入口
 *      registerComponent注册应用程序的入口组件, 告知RN哪一个组件被注册为应用的根程序
 */
AppRegistry.registerComponent('HelloNative', () => App);
