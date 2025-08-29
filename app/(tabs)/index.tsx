import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { Animated, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { Card, Chip, Title } from 'react-native-paper';
import Toast from '../../src/components/Toast';

const screenWidth = Dimensions.get('window').width;

export default function DashboardScreen() {

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  // Mock data for spending by category
  const spendingData = [
    {
      name: 'OTT',
      population: 35,
      color: '#FF6384',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: 'Music',
      population: 20,
      color: '#36A2EB',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: 'SaaS',
      population: 25,
      color: '#FFCE56',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: 'Gym',
      population: 15,
      color: '#4BC0C0',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: 'Other',
      population: 5,
      color: '#9966FF',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
  ];

  // Mock data for upcoming renewals
  const upcomingRenewals = [
    {
      id: 1,
      service: 'Netflix',
      amount: 15.99,
      daysUntil: 2,
      icon: 'tv-outline',
      logo: '🎬',
    },
    {
      id: 2,
      service: 'Spotify Premium',
      amount: 9.99,
      daysUntil: 5,
      icon: 'musical-notes-outline',
      logo: '🎵',
    },
    {
      id: 3,
      service: 'Adobe Creative Cloud',
      amount: 52.99,
      daysUntil: 12,
      icon: 'brush-outline',
      logo: '🎨',
    },
  ];

  // Mock data for smart suggestions
  const smartSuggestions = [
    {
      id: 1,
      text: "You haven't used Spotify in 2 months. Consider pausing it.",
      icon: 'pause-circle-outline',
      type: 'warning',
      emoji: '⚡',
    },
    {
      id: 2,
      text: 'Your Netflix plan allows sharing. Invite 3 friends to save $10.',
      icon: 'people-outline',
      type: 'suggestion',
      emoji: '💡',
    },
    {
      id: 3,
      text: 'You have 3 similar music services. Consider consolidating.',
      icon: 'git-compare-outline',
      type: 'info',
      emoji: '🎯',
    },
  ];

  const getRenewalBadgeColor = (daysUntil: number) => {
    if (daysUntil < 3) return '#EF4444';
    if (daysUntil < 7) return '#F59E0B';
    return '#10B981';
  };

  const getRenewalBadgeText = (daysUntil: number) => {
    if (daysUntil === 1) return 'Due tomorrow';
    if (daysUntil === 0) return 'Due today';
    return `Due in ${daysUntil} days`;
  };

  const handleSetReminder = (service: string) => {
    console.log(`Reminder set for ${service} renewal!`);
    setToastMessage(`Reminder set for ${service} renewal!`);
    setToastVisible(true);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const getBackgroundColor = () => {
    return isDarkMode ? '#1A1A1A' : '#F8FAFC';
  };

  const getCardBackgroundColor = () => {
    return isDarkMode ? '#2D2D2D' : '#FFFFFF';
  };

  const getTextColor = () => {
    return isDarkMode ? '#FFFFFF' : '#1F2937';
  };

  const getSecondaryTextColor = () => {
    return isDarkMode ? '#9CA3AF' : '#6B7280';
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim, backgroundColor: getBackgroundColor() }]}>
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header with Dark Mode Toggle */}
        <View style={styles.header}>
          <View>
            <Text style={[styles.title, { color: getTextColor() }]}>
              SubTrackr Dashboard
            </Text>
            <Text style={[styles.subtitle, { color: getSecondaryTextColor() }]}>
              Track your subscriptions
            </Text>
          </View>
          <TouchableOpacity onPress={toggleDarkMode} style={[styles.darkModeToggle, { backgroundColor: isDarkMode ? '#374151' : '#E5E7EB' }]}>
            <Ionicons 
              name={isDarkMode ? 'sunny' : 'moon'} 
              size={20} 
              color={isDarkMode ? '#FBBF24' : '#6B7280'} 
            />
          </TouchableOpacity>
        </View>

        {/* Savings Banner */}
        <LinearGradient
          colors={['#4F46E5', '#7C3AED']}
          style={styles.savingsBanner}
        >
          <View style={styles.savingsContent}>
            <Text style={styles.trophyEmoji}>🏆</Text>
            <View style={styles.savingsText}>
              <Text style={styles.savingsTitle}>Great job!</Text>
              <Text style={styles.savingsAmount}>
                You saved $50 by cancelling 2 subscriptions this month!
              </Text>
            </View>
          </View>
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '50%' }]} />
            </View>
            <Text style={styles.progressText}>Goal: Save $100 this month (50% complete)</Text>
          </View>
        </LinearGradient>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <Card style={[styles.statCard, { backgroundColor: getCardBackgroundColor() }]}>
            <Card.Content style={styles.statCardContent}>
              <View style={styles.statIconContainer}>
                <Text style={styles.statIcon}>📦</Text>
              </View>
              <View style={styles.statTextContainer}>
                <Text style={[styles.statNumber, { color: getTextColor() }]}>5</Text>
                <Text style={[styles.statLabel, { color: getSecondaryTextColor() }]}>
                  Active Subscriptions
                </Text>
              </View>
            </Card.Content>
          </Card>
          <Card style={[styles.statCard, { backgroundColor: getCardBackgroundColor() }]}>
            <Card.Content style={styles.statCardContent}>
              <View style={styles.statIconContainer}>
                <Text style={styles.statIcon}>💳</Text>
              </View>
              <View style={styles.statTextContainer}>
                <Text style={[styles.statNumber, { color: getTextColor() }]}>$89.99</Text>
                <Text style={[styles.statLabel, { color: getSecondaryTextColor() }]}>
                  Monthly Total
                </Text>
              </View>
            </Card.Content>
          </Card>
        </View>

        {/* Spending Chart */}
        <Card style={[styles.chartCard, { backgroundColor: getCardBackgroundColor() }]}>
          <Card.Content>
            <Title style={[styles.chartTitle, { color: getTextColor() }]}>Spending by Category</Title>
            <View style={styles.chartContainer}>
              <PieChart
                data={spendingData}
                width={screenWidth - 100}
                height={220}
                chartConfig={{
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                }}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="15"
                style={styles.chart}
              />
            </View>
            <View style={styles.legendContainer}>
              {spendingData.map((item, index) => (
                <Chip
                  key={index}
                  style={[styles.legendChip, { backgroundColor: item.color }]}
                  textStyle={styles.legendChipText}
                >
                  {item.name} ({item.population}%)
                </Chip>
              ))}
            </View>
          </Card.Content>
        </Card>

        {/* Upcoming Renewals */}
        <Card style={[styles.renewalsCard, { backgroundColor: getCardBackgroundColor() }]}>
          <Card.Content>
            <Title style={[styles.sectionTitle, { color: getTextColor() }]}>Upcoming Renewals</Title>
            {upcomingRenewals.map((renewal, index) => (
              <View key={renewal.id}>
                <View style={styles.renewalItem}>
                  <View style={styles.renewalLogoContainer}>
                    <Text style={styles.renewalLogo}>{renewal.logo}</Text>
                  </View>
                  <View style={styles.renewalInfo}>
                    <Text style={[styles.renewalService, { color: getTextColor() }]}>
                      {renewal.service}
                    </Text>
                    <Text style={[styles.renewalAmount, { color: getSecondaryTextColor() }]}>
                      ${renewal.amount.toFixed(2)}
                    </Text>
                  </View>
                  <View style={styles.renewalActions}>
                    <View style={[
                      styles.renewalBadge, 
                      { backgroundColor: getRenewalBadgeColor(renewal.daysUntil) }
                    ]}>
                      <Text style={styles.renewalBadgeText}>
                        {getRenewalBadgeText(renewal.daysUntil)}
                      </Text>
                    </View>
                    <TouchableOpacity 
                      onPress={() => handleSetReminder(renewal.service)}
                      style={[styles.reminderButton, { backgroundColor: isDarkMode ? '#374151' : '#F3F4F6' }]}
                    >
                      <Ionicons name="notifications-outline" size={18} color={getTextColor()} />
                    </TouchableOpacity>
                  </View>
                </View>
                {index < upcomingRenewals.length - 1 && (
                  <View style={[styles.divider, { backgroundColor: isDarkMode ? '#374151' : '#E5E7EB' }]} />
                )}
              </View>
            ))}
          </Card.Content>
        </Card>

        {/* Smart Suggestions */}
        <Card style={[styles.suggestionsCard, { backgroundColor: getCardBackgroundColor() }]}>
          <Card.Content>
            <Title style={[styles.sectionTitle, { color: getTextColor() }]}>Smart Suggestions</Title>
            {smartSuggestions.map((suggestion) => (
              <View key={suggestion.id} style={styles.suggestionItem}>
                <View style={[styles.suggestionIconContainer, { backgroundColor: isDarkMode ? '#374151' : '#F3F4F6' }]}>
                  <Text style={styles.suggestionEmoji}>{suggestion.emoji}</Text>
                </View>
                <Text style={[styles.suggestionText, { color: getTextColor() }]}>
                  {suggestion.text}
                </Text>
              </View>
            ))}
          </Card.Content>
        </Card>
      </ScrollView>

      {/* Toast Notification */}
      <Toast
        visible={toastVisible}
        message={toastMessage}
        onHide={() => setToastVisible(false)}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
  },
  darkModeToggle: {
    padding: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  savingsBanner: {
    borderRadius: 20,
    marginBottom: 24,
    padding: 24,
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  savingsContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  trophyEmoji: {
    fontSize: 40,
    marginRight: 16,
  },
  savingsText: {
    flex: 1,
  },
  savingsTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  savingsAmount: {
    color: 'white',
    fontSize: 16,
    opacity: 0.95,
    fontWeight: '500',
  },
  progressContainer: {
    marginTop: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 3,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 3,
  },
  progressText: {
    color: 'white',
    fontSize: 12,
    opacity: 0.9,
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    gap: 12,
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statCardContent: {
    padding: 20,
  },
  statIconContainer: {
    marginBottom: 12,
  },
  statIcon: {
    fontSize: 24,
  },
  statTextContainer: {
    alignItems: 'flex-start',
  },
  statNumber: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  statLabel: {
    fontSize: 13,
    fontWeight: '500',
  },
  chartCard: {
    marginBottom: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  chartTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  chartContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  chart: {
    borderRadius: 16,
  },
  legendContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
  },
  legendChip: {
    marginBottom: 4,
  },
  legendChipText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  renewalsCard: {
    marginBottom: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  renewalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  renewalLogoContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  renewalLogo: {
    fontSize: 24,
  },
  renewalInfo: {
    flex: 1,
  },
  renewalService: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  renewalAmount: {
    fontSize: 14,
    fontWeight: '500',
  },
  renewalActions: {
    alignItems: 'flex-end',
    gap: 8,
  },
  renewalBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  renewalBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  reminderButton: {
    padding: 8,
    borderRadius: 10,
  },
  divider: {
    height: 1,
    marginLeft: 64,
  },
  suggestionsCard: {
    marginBottom: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
  },
  suggestionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  suggestionEmoji: {
    fontSize: 18,
  },
  suggestionText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
  },
});
