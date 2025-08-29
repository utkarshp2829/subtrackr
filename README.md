# SubTrackr

A React Native mobile app built with Expo for tracking subscriptions and recurring payments.

## Features

- 📊 Dashboard with subscription overview
- 💳 Subscription management
- 📈 Insights and analytics
- 👤 User profile management

## Tech Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Navigation**: React Navigation (Bottom Tabs + Stack)
- **UI Components**: React Native Paper
- **Charts**: React Native Chart Kit
- **Backend**: Firebase (configured but not initialized)
- **Icons**: Expo Vector Icons

## Project Structure

```
src/
├── screens/           # Screen components
│   ├── DashboardScreen.tsx
│   ├── SubscriptionsScreen.tsx
│   ├── InsightsScreen.tsx
│   ├── ProfileScreen.tsx
│   └── index.ts
├── navigation/        # Navigation setup
│   ├── AppNavigator.tsx
│   └── BottomTabs.tsx
├── components/        # Reusable UI components
│   ├── SubscriptionCard.tsx
│   └── index.ts
├── services/          # API and external services
│   └── firebase.ts
└── utils/            # Utility functions
    └── dateHelpers.ts
```

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm start
   ```

3. **Run on iOS**:
   ```bash
   npm run ios
   ```

4. **Run on Android**:
   ```bash
   npm run android
   ```

## Navigation

The app uses a bottom tab navigation with 4 main screens:
- **Dashboard**: Overview of all subscriptions
- **Subscriptions**: Detailed subscription management
- **Insights**: Analytics and spending patterns
- **Profile**: User settings and preferences

## Firebase Setup

To enable Firebase functionality:

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Get your Firebase configuration
3. Update `src/services/firebase.ts` with your config
4. Uncomment the Firebase initialization code

## Available Scripts

- `npm start` - Start the Expo development server
- `npm run ios` - Run on iOS simulator
- `npm run android` - Run on Android emulator
- `npm run web` - Run on web browser
- `npm run lint` - Run ESLint

## Dependencies

### Core Navigation
- @react-navigation/native
- @react-navigation/bottom-tabs
- @react-navigation/native-stack
- react-native-screens
- react-native-safe-area-context

### UI & Animation
- react-native-paper
- react-native-gesture-handler
- react-native-reanimated

### Charts & Visualization
- react-native-chart-kit
- react-native-svg

### Backend
- firebase

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

For the initial Commit


