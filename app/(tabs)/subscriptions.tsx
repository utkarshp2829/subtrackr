import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Card, FAB, Menu, useTheme } from 'react-native-paper';

const screenWidth = Dimensions.get('window').width;

export default function SubscriptionsScreen() {
  const theme = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [sortBy, setSortBy] = useState('renewal');
  const [filterBy, setFilterBy] = useState('all');
  const [menuVisible, setMenuVisible] = useState<number | null>(null);

  const subscriptions = [
    {
      id: 1,
      name: 'Netflix',
      amount: 15.99,
      nextBilling: 'Dec 15, 2024',
      status: 'active' as const,
      logo: '🎬',
      category: 'Streaming',
      paymentMethod: 'visa',
      daysUntil: 2,
    },
    {
      id: 2,
      name: 'Spotify Premium',
      amount: 9.99,
      nextBilling: 'Dec 20, 2024',
      status: 'active' as const,
      logo: '🎵',
      category: 'Music',
      paymentMethod: 'mastercard',
      daysUntil: 5,
    },
    {
      id: 3,
      name: 'Adobe Creative Cloud',
      amount: 52.99,
      nextBilling: 'Jan 5, 2025',
      status: 'active' as const,
      logo: '🎨',
      category: 'Software',
      paymentMethod: 'visa',
      daysUntil: 12,
    },
    {
      id: 4,
      name: 'Gym Membership',
      amount: 29.99,
      nextBilling: 'Dec 25, 2024',
      status: 'active' as const,
      logo: '💪',
      category: 'Fitness',
      paymentMethod: 'amex',
      daysUntil: 8,
    },
    {
      id: 5,
      name: 'Dropbox Pro',
      amount: 11.99,
      nextBilling: 'Jan 10, 2025',
      status: 'active' as const,
      logo: '☁️',
      category: 'Storage',
      paymentMethod: 'visa',
      daysUntil: 15,
    },
    {
      id: 6,
      name: 'YouTube Premium',
      amount: 11.99,
      nextBilling: 'Dec 18, 2024',
      status: 'active' as const,
      logo: '📺',
      category: 'Streaming',
      paymentMethod: 'mastercard',
      daysUntil: 3,
    },
  ];

  // Calculate total monthly spend
  const totalMonthly = subscriptions.reduce((sum, sub) => sum + sub.amount, 0);

  const categories = ['all', ...Array.from(new Set(subscriptions.map(s => s.category)))];

  // Filter and sort subscriptions
  const filteredAndSortedSubscriptions = subscriptions
    .filter(sub => filterBy === 'all' || sub.category === filterBy)
    .sort((a, b) => {
      switch (sortBy) {
        case 'renewal':
          return a.daysUntil - b.daysUntil;
        case 'price-high':
          return b.amount - a.amount;
        case 'price-low':
          return a.amount - b.amount;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  const getBackgroundColor = () => {
    return isDarkMode ? '#1A1A1A' : '#F5F5F7';
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

  const getAccentColor = () => {
    return '#6366F1';
  };

  const getBillingText = (daysUntil: number) => {
    if (daysUntil === 0) return 'Bills today';
    if (daysUntil === 1) return 'Bills tomorrow';
    return `Bills in ${daysUntil} days`;
  };

  const handleManageSubscription = (subscription: any, action: string) => {
    console.log(`${action} subscription:`, subscription.name);
    setMenuVisible(null);
  };

  const handleAddNew = () => {
    console.log('Add new subscription');
  };

  return (
    <View style={[styles.container, { backgroundColor: getBackgroundColor() }]}>
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: getTextColor() }]}>
            Your Subscriptions
          </Text>
          <Text style={[styles.headerSubtitle, { color: getSecondaryTextColor() }]}>
            Manage your recurring payments
          </Text>
        </View>

        {/* Monthly Spend Summary Card */}
        <Card style={[styles.summaryCard, { backgroundColor: getCardBackgroundColor() }]}>
          <Card.Content style={styles.summaryContent}>
            <Text style={[styles.summaryTitle, { color: getTextColor() }]}>
              Monthly Spend
            </Text>
            <Text style={[styles.summaryAmount, { color: getAccentColor() }]}>
              ${totalMonthly.toFixed(2)} / month
            </Text>
          </Card.Content>
        </Card>

        {/* Sorting and Filtering Controls */}
        <View style={styles.controlsContainer}>
          <View style={styles.sortContainer}>
            <Text style={[styles.controlLabel, { color: getTextColor() }]}>Sort by:</Text>
            <View style={styles.chipContainer}>
              {[
                { key: 'renewal', label: 'Renewal Date' },
                { key: 'price-high', label: 'Price High' },
                { key: 'price-low', label: 'Price Low' },
                { key: 'name', label: 'Name' },
              ].map((option) => (
                <TouchableOpacity
                  key={option.key}
                  onPress={() => setSortBy(option.key)}
                  style={[
                    styles.sortChip,
                    { 
                      backgroundColor: sortBy === option.key ? getAccentColor() : (isDarkMode ? '#374151' : '#F3F4F6'),
                    }
                  ]}
                >
                  <Text style={[
                    styles.sortChipText,
                    { color: sortBy === option.key ? 'white' : getSecondaryTextColor() }
                  ]}>
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.filterContainer}>
            <Text style={[styles.controlLabel, { color: getTextColor() }]}>Filter by:</Text>
            <View style={styles.chipContainer}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category}
                  onPress={() => setFilterBy(category)}
                  style={[
                    styles.filterChip,
                    { 
                      backgroundColor: filterBy === category ? getAccentColor() : (isDarkMode ? '#374151' : '#F3F4F6'),
                    }
                  ]}
                >
                  <Text style={[
                    styles.filterChipText,
                    { color: filterBy === category ? 'white' : getSecondaryTextColor() }
                  ]}>
                    {category === 'all' ? 'All' : category}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Subscriptions List */}
        <View style={styles.subscriptionsContainer}>
          {filteredAndSortedSubscriptions.map((subscription) => (
            <Card 
              key={subscription.id} 
              style={[styles.subscriptionCard, { backgroundColor: getCardBackgroundColor() }]}
            >
              <Card.Content style={styles.cardContent}>
                {/* Left Side: Logo, Name, Category */}
                <View style={styles.leftSide}>
                  <View style={styles.logoContainer}>
                    <Text style={styles.logo}>{subscription.logo}</Text>
                  </View>
                  <View style={styles.serviceInfo}>
                    <Text style={[styles.serviceName, { color: getTextColor() }]}>
                      {subscription.name}
                    </Text>
                    <View style={styles.categoryRow}>
                      <Text style={[styles.category, { color: getSecondaryTextColor() }]}>
                        {subscription.category}
                      </Text>
                      <View style={[
                        styles.statusBadge, 
                        { backgroundColor: subscription.status === 'active' ? '#10B981' : '#6B7280' }
                      ]}>
                        <Text style={styles.statusText}>
                          {subscription.status.toUpperCase()}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                {/* Right Side: Price, Billing Date, Actions */}
                <View style={styles.rightSide}>
                  <View style={styles.priceContainer}>
                    <Text style={[styles.price, { color: getTextColor() }]}>
                      ${subscription.amount.toFixed(2)}
                    </Text>
                    <Text style={[styles.billingDate, { color: getSecondaryTextColor() }]}>
                      {getBillingText(subscription.daysUntil)}
                    </Text>
                  </View>
                  
                  <Menu
                    visible={menuVisible === subscription.id}
                    onDismiss={() => setMenuVisible(null)}
                    anchor={
                      <TouchableOpacity
                        onPress={() => setMenuVisible(menuVisible === subscription.id ? null : subscription.id)}
                        style={styles.menuButton}
                      >
                        <Ionicons name="ellipsis-vertical" size={20} color={getSecondaryTextColor()} />
                      </TouchableOpacity>
                    }
                  >
                    <Menu.Item 
                      onPress={() => handleManageSubscription(subscription, 'Edit')}
                      title="Edit Subscription"
                      leadingIcon="pencil"
                    />
                    <Menu.Item 
                      onPress={() => handleManageSubscription(subscription, 'View Billing History')}
                      title="Billing History"
                      leadingIcon="receipt"
                    />
                    <Menu.Item 
                      onPress={() => handleManageSubscription(subscription, 'Update Payment Method')}
                      title="Update Payment"
                      leadingIcon="card"
                    />
                    <Menu.Item 
                      onPress={() => handleManageSubscription(subscription, 'Cancel')}
                      title="Cancel Subscription"
                      leadingIcon="close-circle"
                    />
                  </Menu>
                </View>
              </Card.Content>
            </Card>
          ))}
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <FAB
        icon="plus"
        style={[styles.fab, { backgroundColor: getAccentColor() }]}
        onPress={handleAddNew}
        color="white"
      />
    </View>
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
    paddingBottom: 100,
  },
  header: {
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 16,
    fontWeight: '400',
  },
  summaryCard: {
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 24,
  },
  summaryContent: {
    padding: 24,
    alignItems: 'center',
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  summaryAmount: {
    fontSize: 36,
    fontWeight: '700',
    letterSpacing: -1,
    textAlign: 'center',
  },
  controlsContainer: {
    marginBottom: 24,
  },
  sortContainer: {
    marginBottom: 16,
  },
  filterContainer: {
    marginBottom: 16,
  },
  controlLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  sortChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  sortChipText: {
    fontSize: 12,
    fontWeight: '500',
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  filterChipText: {
    fontSize: 12,
    fontWeight: '500',
  },
  subscriptionsContainer: {
    gap: 16,
  },
  subscriptionCard: {
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardContent: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftSide: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  logoContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  logo: {
    fontSize: 24,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  category: {
    fontSize: 14,
    fontWeight: '400',
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  statusText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  rightSide: {
    alignItems: 'flex-end',
    gap: 12,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  billingDate: {
    fontSize: 13,
    fontWeight: '400',
  },
  menuButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    borderRadius: 28,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
});
