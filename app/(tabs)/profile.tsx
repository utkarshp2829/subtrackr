import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Avatar, Button, Card, List, Switch, Title } from 'react-native-paper';

export default function ProfileScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = React.useState(false);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Avatar.Text size={80} label="JS" style={styles.avatar} />
        <Text style={styles.name}>John Smith</Text>
        <Text style={styles.email}>john.smith@email.com</Text>
      </View>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Account Settings</Title>
          <List.Item
            title="Edit Profile"
            left={(props) => <List.Icon {...props} icon="account-edit" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => {}}
          />
          <List.Item
            title="Change Password"
            left={(props) => <List.Icon {...props} icon="lock" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => {}}
          />
          <List.Item
            title="Payment Methods"
            left={(props) => <List.Icon {...props} icon="credit-card" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => {}}
          />
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Preferences</Title>
          <List.Item
            title="Push Notifications"
            left={(props) => <List.Icon {...props} icon="bell" />}
            right={() => (
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
              />
            )}
          />
          <List.Item
            title="Dark Mode"
            left={(props) => <List.Icon {...props} icon="theme-light-dark" />}
            right={() => (
              <Switch
                value={darkModeEnabled}
                onValueChange={setDarkModeEnabled}
              />
            )}
          />
          <List.Item
            title="Currency"
            description="USD ($)"
            left={(props) => <List.Icon {...props} icon="currency-usd" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => {}}
          />
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Support</Title>
          <List.Item
            title="Help & FAQ"
            left={(props) => <List.Icon {...props} icon="help-circle" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => {}}
          />
          <List.Item
            title="Contact Support"
            left={(props) => <List.Icon {...props} icon="message" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => {}}
          />
          <List.Item
            title="Privacy Policy"
            left={(props) => <List.Icon {...props} icon="shield" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => {}}
          />
        </Card.Content>
      </Card>

      <View style={styles.logoutContainer}>
        <Button 
          mode="outlined" 
          onPress={() => {}}
          style={styles.logoutButton}
          textColor="#F44336"
        >
          Log Out
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    padding: 30,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  avatar: {
    marginBottom: 16,
    backgroundColor: '#007AFF',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#666',
  },
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
    elevation: 4,
  },
  logoutContainer: {
    padding: 20,
    alignItems: 'center',
  },
  logoutButton: {
    borderColor: '#F44336',
    width: '100%',
  },
});
