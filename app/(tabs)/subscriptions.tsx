import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import { Card, Title, Paragraph, Button } from 'react-native-paper';

export default function SubscriptionsScreen() {
  const subscriptions = [
    {
      id: 1,
      name: 'Netflix',
      amount: 15.99,
      nextBilling: 'Dec 15, 2024',
      status: 'active' as const,
    },
    {
      id: 2,
      name: 'Spotify Premium',
      amount: 9.99,
      nextBilling: 'Dec 20, 2024',
      status: 'active' as const,
    },
    {
      id: 3,
      name: 'Adobe Creative Cloud',
      amount: 52.99,
      nextBilling: 'Jan 5, 2025',
      status: 'active' as const,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return '#4CAF50';
      case 'cancelled':
        return '#F44336';
      case 'paused':
        return '#FF9800';
      default:
        return '#9E9E9E';
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Subscriptions</Text>
        <Button mode="contained" onPress={() => {}}>
          Add New
        </Button>
      </View>
      
      {subscriptions.map((subscription) => (
        <Card key={subscription.id} style={styles.card}>
          <Card.Content>
            <Title>{subscription.name}</Title>
            <Paragraph>${subscription.amount.toFixed(2)}/month</Paragraph>
            <Paragraph>Next billing: {subscription.nextBilling}</Paragraph>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(subscription.status) }]}>
              <Text style={styles.statusText}>{subscription.status.toUpperCase()}</Text>
            </View>
          </Card.Content>
          <Card.Actions>
            <Button onPress={() => {}}>Edit</Button>
            <Button onPress={() => {}}>Cancel</Button>
          </Card.Actions>
        </Card>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
    elevation: 4,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 8,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
