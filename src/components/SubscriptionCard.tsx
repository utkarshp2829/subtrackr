import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';

interface SubscriptionCardProps {
  name: string;
  amount: number;
  nextBilling: string;
  status: 'active' | 'cancelled' | 'paused';
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({
  name,
  amount,
  nextBilling,
  status,
}) => {
  const getStatusColor = () => {
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
    <Card style={styles.card}>
      <Card.Content>
        <Title>{name}</Title>
        <Paragraph>${amount.toFixed(2)}</Paragraph>
        <Paragraph>Next billing: {nextBilling}</Paragraph>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor() }]}>
          <Text style={styles.statusText}>{status.toUpperCase()}</Text>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    marginHorizontal: 16,
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

export default SubscriptionCard;
