import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import PaymentSuccessScreen from './screens/PaymentSuccessScreen';

const Stack = createNativeStackNavigator();

// Handle deep linking
const linking = {
  prefixes: ['myapp://'],
  config: {
    screens: {
      Home: '',
      PaymentSuccess: 'payment-success',
    },
  },
};

export default function App() {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="PaymentSuccess" component={PaymentSuccessScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
