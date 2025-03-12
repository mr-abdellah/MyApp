import React, {useState} from 'react';
import {View, Text, Button, ActivityIndicator} from 'react-native';
import {useGPay} from 'react-native-epay-guiddini-rn-sdk';

export default function HomeScreen({navigation}) {
  const {initiatePayment} = useGPay();
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setLoading(true);
      const paymentUrl = await initiatePayment(2500);
      console.log('Payment URL:', paymentUrl);
      navigation.navigate('PaymentSuccess'); // Navigate after payment success
    } catch (error) {
      console.error('Payment failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Welcome to GPay Test App</Text>
      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <Button title="Pay 2500 DZD" onPress={handlePayment} />
      )}
    </View>
  );
}
