// index.js
import {AppRegistry} from 'react-native';
import App from './App'; // Esto importará App.tsx
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);