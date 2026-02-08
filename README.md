# Connecting World - Mini Social Feed App 🌐

A lightweight social media mobile application built with React Native (Expo) and TypeScript. Connect with others, share your thoughts, and stay updated with real-time notifications via Firebase Cloud Messaging.

## 📱 Features

### Mobile App

- **Authentication**: Secure signup and login with JWT tokens
- **Feed**: Real-time scrollable feed with infinite scroll pagination
- **Create Post**: Share text posts with 500 character limit and character counter
- **Interactions**: Like and comment on posts with real-time count updates
- **Comments Screen**: Dedicated view for viewing and adding comments to posts
- **Profile Management**: User profile with account info, notification settings, and About section
- **Notifications**: Real-time push notifications via Firebase Cloud Messaging with platform-specific permission handling (Android 13+ support)
- **Theme Support**: Dark and light mode with automatic theme detection
- **Responsive Design**: Optimized for both phones and tablets with safe area handling
- **Share Posts**: Native share functionality to share posts with others
- **Filter Feed**: Quick search and filter posts by username

## 🚀 Quick Start

### Prerequisites

- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Android Studio (for Android development) or Xcode (for iOS)
- Firebase project with Cloud Messaging enabled

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd connecting-world
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure API URL**

   Update the backend API URL in `services/api.ts` to match your backend server address.
   The backend repository is maintained separately. Refer to the backend repository for server setup and configuration.

   **Environment Variables**

   Create a `.env` file in the root directory (or update `services/api.ts` directly):

   ```env
   # Backend API Configuration
   EXPO_PUBLIC_API_BASE_URL=http://YOUR_IP:3000/api
   ```

   For different environments:
   - **Local Development (Android Emulator)**: `http://10.0.2.2:3000/api`
   - **Local Development (iOS Simulator)**: `http://localhost:3000/api`
   - **Physical Device**: `http://YOUR_COMPUTER_IP:3000/api`
   - **Production**: Your deployed backend server URL

4. **Setup Firebase**
   - Place your `google-services.json` (Android) in the project root
   - Place your Firebase Admin SDK JSON file in the project root
   - Update Firebase configuration in `app.json` if needed

## 🔐 Environment Variables

The app requires the following configuration:

### Required Variables

| Variable                   | Description          | Example                    |
| -------------------------- | -------------------- | -------------------------- |
| `EXPO_PUBLIC_API_BASE_URL` | Backend API endpoint | `http://10.0.2.2:3000/api` |

### Firebase Configuration

Firebase is configured in `app.json` and via `google-services.json`. No additional env variables needed for Firebase client-side integration.

### Platform-Specific API URLs

```env
# Development - Android Emulator
EXPO_PUBLIC_API_BASE_URL=http://10.0.2.2:3000/api

# Development - iOS Simulator
EXPO_PUBLIC_API_BASE_URL=http://localhost:3000/api

# Development - Physical Device (replace with your machine IP)
EXPO_PUBLIC_API_BASE_URL=http://192.168.1.100:3000/api

# Production
EXPO_PUBLIC_API_BASE_URL=https://your-production-api.com/api
```

### How to Set Environment Variables

#### Option 1: Using .env file (Recommended for development)

Create `.env` in the project root:

```bash
touch .env
echo "EXPO_PUBLIC_API_BASE_URL=http://10.0.2.2:3000/api" >> .env
```

Then reload the app:

```bash
npm start -- --clear
```

#### Option 2: Direct Configuration in Code

Edit `services/api.ts` and update:

```typescript
const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL || "http://10.0.2.2:3000/api";
```

### Running the Application

1. **Start the Mobile App**

   ```bash
   npm start
   ```

   Then press:
   - `a` for Android
   - `i` for iOS
   - `w` for web

   **Note**: For Firebase Cloud Messaging to work, a development build is required:

   ```bash
   eas build --platform android --profile development
   # or for iOS
   eas build --platform ios --profile development
   ```

## 📂 Project Structure

```
connecting-world/
├── app/                                    # Expo Router screens (file-based routing)
│   ├── (auth)/                             # Authentication group
│   │   ├── _layout.tsx
│   │   ├── login.tsx                       # Login screen
│   │   └── signup.tsx                      # Signup screen
│   ├── (tabs)/                             # Tab navigation group
│   │   ├── _layout.tsx                     # Tab layout with navigation
│   │   ├── feed.tsx                        # Main feed with posts
│   │   ├── index.tsx                       # Home screen
│   │   ├── notifications.tsx               # Notifications screen
│   │   └── profile.tsx                     # User profile with settings
│   ├── comments.tsx                        # Comments screen (modal/route)
│   ├── create-post.tsx                     # Create post modal
│   ├── _layout.tsx                         # Root layout with auth provider
│
├── components/                             # Reusable UI components
│   ├── AboutModal/
│   │   └── AboutModal.tsx                  # About section modal
│   ├── CommentsCard/                       # Comment card component
│   │   ├── comment-card.tsx
│   │   ├── helpers.ts
│   │   ├── styles.ts
│   │   └── types.ts
│   ├── PostCard/                           # Post card component
│   │   ├── post-card.tsx
│   │   ├── styles.ts
│   │   └── types.ts
│   ├── ThemedText/                         # Theme-aware text component
│   │   ├── themed-text.tsx
│   │   ├── style.ts
│   │   └── types.ts
│   ├── ThemedView/                         # Theme-aware view component
│   │   ├── themed-view.tsx
│   │   └── types.ts
│   ├── HecticTab/
│   │   └── haptic-tab.tsx                  # Haptic feedback tab
│   └── ui/
│       ├── icon-symbol.tsx                 # Icon component
│       └── icon-symbol.ios.tsx             # iOS-specific icon
│
├── context/                                # React Context providers
│   ├── Auth/
│   │   ├── AuthContext.tsx                 # Authentication context
│   │   └── types.ts
│   └── Notifications/
│       └── NotificationsContext.tsx        # Notifications context
│
├── hooks/                                  # Custom React hooks
│   ├── use-color-scheme.ts                 # Color scheme hook
│   ├── use-color-scheme.web.ts             # Web-specific color scheme
│   └── use-theme-color.ts                  # Theme color hook
│
├── services/                               # API services
│   └── api.ts                              # Axios API client with interceptors
│
├── constants/                              # App constants
│   ├── global-styles.ts                    # Global styles
│   └── theme.ts                            # Theme configuration
│
├── assets/                                 # Static assets
│   └── images/
│       └── network.png                     # App icon and splash image
│
├── scripts/
│   └── reset-project.js                    # Project reset script
│
├── app.json                                # Expo app configuration
├── eas.json                                # EAS build configuration
├── tsconfig.json                           # TypeScript configuration
├── eslint.config.js                        # ESLint configuration
├── package.json
└── README.md
```

## 🎨 Key Features Highlights

### Feed Screen

- Infinite scroll with automatic pagination
- Pull-to-refresh to get latest posts
- Real-time like and comment count updates
- Username filter for quick search
- Share posts with native Share API
- Visual feedback for liked posts

### Create Post

- Modal-based post creation
- 500 character limit with visual counter
- Posting guidelines displayed
- Instant validation and feedback
- Character counter to track remaining characters

### Profile Screen

- User information display with avatar and stats
- "View Posts" button to see user's posts
- "About" section with app information (modal)
- Notification toggle with system permission handling
- Logout functionality with confirmation dialog
- Clean, organized menu interface

### Comments Screen

- Dedicated screen for viewing post and comments
- Comments sorted by newest first
- User avatar and metadata for each comment
- Quick comment addition with send button
- Original post context displayed at top

### Notifications

- Real-time push notifications via Firebase Cloud Messaging
- Platform-specific permission handling:
  - **Android 13+**: Uses `PermissionsAndroid.request()` for POST_NOTIFICATIONS
  - **iOS**: Uses native notification permission flow
- Toggle notifications on/off from profile
- FCM token management
- Automatic token retrieval on permission grant

### Authentication

- Secure JWT-based authentication
- Password hashing with bcryptjs
- Persistent login state with AsyncStorage
- Automatic redirect based on auth status
- Auto-logout on token expiration

### Dark Mode

- Automatic theme detection based on device settings
- Theme-aware components (ThemedText, ThemedView)
- Consistent color scheme throughout the app
- Manual theme override support

## 🔧 Technologies Used

- **React Native** - Cross-platform mobile framework
- **Expo** (v54+) - Development and deployment platform
- **Expo Router** - File-based routing for React Native
- **TypeScript** - Static typing for JavaScript
- **Axios** - HTTP client with interceptors
- **Firebase Cloud Messaging** - Real-time push notifications
- **AsyncStorage** - Local data persistence
- **Expo Linear Gradient** - Gradient UI components
- **React Native Safe Area Context** - Safe area handling
- **Expo Vector Icons (Ionicons)** - Icon library
- **React Native Keyboard Aware Scroll View** - Keyboard-aware scrolling

## 📱 Building for Production

### Android APK/AAB

1. **Configure EAS**

   ```bash
   npm install -g eas-cli
   eas login
   eas build:configure
   ```

2. **Build APK**

   ```bash
   eas build --platform android --profile preview
   ```

3. **Build AAB** (for Play Store)

   ```bash
   eas build --platform android --profile production
   ```

4. **Download** from the Expo dashboard

### iOS

```bash
eas build --platform ios --profile production
```

## 🧪 Testing

- Test on Android Emulator and multiple physical Android devices
- Test on iOS Simulator and physical iOS devices
- Test tablet responsiveness across different screen sizes
- Test push notifications on physical devices (Expo Go limitations)
- Test offline scenarios and network error handling
- Test theme switching and dark mode
- Test notification permissions on Android 13+ and iOS

## 📋 TODO / Future Enhancements

- [ ] Edit and delete posts
- [ ] User profiles with bio and avatar upload
- [ ] Image and video post support
- [ ] Direct messaging between users
- [ ] Hashtags and user mentions
- [ ] Bookmark and save posts
- [ ] User following/followers system
- [ ] Advanced search functionality
- [ ] Post sharing to external apps
- [ ] User search and discovery
- [ ] Trending posts and topics
- [ ] Post analytics for creators

## 👥 Author

**Tanjil** - React Native & Frontend Developer

Connecting World © 2026

## 📞 Support

For issues, questions, or feedback, please create an issue in the GitHub repository or contact the developer.
