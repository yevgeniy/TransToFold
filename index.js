// /**
//  * @format
//  */

// import {AppRegistry} from 'react-native';
// import App from './App';
// import {name as appName} from './app.json';

// AppRegistry.registerComponent(appName, () => App);


// index.js
import { registerRootComponent } from 'expo';
import App from './client/App';

registerRootComponent(App);