import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LineChart, PieChart } from 'react-native-chart-kit';
import { Card, Paragraph, Title } from 'react-native-paper';

export default function InsightsScreen() {
  const screenWidth = Dimensions.get('window').width;

  const monthlyData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [85, 92, 78, 95, 89, 102],
        color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  const pieData = [
    {
      name: 'Streaming',
      population: 45,
      color: '#FF6384',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: 'Software',
      population: 35,
      color: '#36A2EB',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: 'Other',
      population: 20,
      color: '#FFCE56',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Insights & Analytics</Text>
      </View>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Monthly Spending Trend</Title>
          <LineChart
            data={monthlyData}
            width={screenWidth - 60}
            height={220}
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            bezier
            style={styles.chart}
          />
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Spending by Category</Title>
          <PieChart
            data={pieData}
            width={screenWidth - 60}
            height={220}
            chartConfig={{
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            style={styles.chart}
          />
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Key Insights</Title>
          <Paragraph>• Your monthly spending has increased by 20% this quarter</Paragraph>
          <Paragraph>• Streaming services account for 45% of your subscriptions</Paragraph>
          <Paragraph>• You have 3 subscriptions renewing this month</Paragraph>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
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
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});
