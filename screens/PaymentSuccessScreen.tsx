import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useGPay} from 'react-native-epay-guiddini-rn-sdk';

interface PaymentQueryParams {
  order_number: string;
}

export interface TransactionAttributes {
  action_code: string;
  action_code_description: string;
  amount: string;
  confirmation_status: 'confirmed' | 'failed' | 'pending';
  order_number: string;
  status: 'user_cancelled' | 'paid' | 'pending';
}

export interface Transaction {
  id: string;
  attributes: TransactionAttributes;
}

export default function PaymentSuccessScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params as PaymentQueryParams;

  const {fetchTransaction} = useGPay();
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransaction(params?.order_number)
      .then((data: {data: Transaction}) => setTransaction(data?.data))
      .catch(error => console.error('Error fetching transaction:', error))
      .finally(() => setLoading(false));
  }, [params?.order_number]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  const isSuccess =
    transaction?.attributes?.confirmation_status === 'confirmed';

  return (
    <View style={[styles.container, isSuccess ? styles.success : styles.error]}>
      <Text style={styles.title}>
        {isSuccess ? 'Payment Successful 🎉' : 'Payment Failed ❌'}
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>Amount:</Text>
        <Text style={styles.value}>{transaction?.attributes?.amount} DZD</Text>

        <Text style={styles.label}>Order Number:</Text>
        <Text style={styles.value}>
          {transaction?.attributes?.order_number}
        </Text>

        <Text style={styles.label}>Status:</Text>
        <Text style={styles.value}>
          {transaction?.attributes?.confirmation_status}
        </Text>

        {!isSuccess && (
          <>
            <Text style={styles.label}>Error:</Text>
            <Text style={styles.value}>
              {transaction?.attributes?.action_code_description ||
                'Unknown error'}
            </Text>
          </>
        )}
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Home' as never)}>
        <Text style={styles.buttonText}>Reset Payment</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  success: {
    backgroundColor: '#e3ffe6',
  },
  error: {
    backgroundColor: '#ffe3e3',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    marginBottom: 5,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
