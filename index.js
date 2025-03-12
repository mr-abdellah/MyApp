import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {GPay} from 'react-native-epay-guiddini-rn-sdk';

const Root = () => (
  <GPay
    secret_key="SEC-9ry6C5CZJLHoFyxQ3my0a8CainK1G7Li"
    app_key="APP-DAGXCCFYE3AOA8H5DF">
    <App />
  </GPay>
);

AppRegistry.registerComponent(appName, () => Root);
