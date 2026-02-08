# Connecting World - Mini Social Feed App 🌐

A lightweight social media application built with React Native (Expo), Node.js, Express, and Firebase Cloud Messaging.

## 📱 Features

### Mobile App

- **Authentication**: Signup and login with JWT tokens
- **Feed**: Scrollable list of posts with real-time updates
- **Create Post**: Text-only post creation with character limit
- **Interactions**: Like and comment on posts
- **Filter Feed**: Filter posts by username
- **Profile**: User profile with account management
- **Notifications**: Real-time push notifications via Firebase Cloud Messaging
- **Responsive Design**: Optimized for both phones and tablets

### Backend API

- **Authentication**: JWT-based user authentication
- **Post Management**: Create, read, and list posts (paginated)
- **Interactions**: Like/unlike posts and add comments
- **Notifications**: FCM integration for push notifications
- **Database**: MongoDB for data persistence

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or MongoDB Atlas)
- Expo CLI (`npm install -g expo-cli`)
- Android Studio (for Android) or Xcode (for iOS)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd connecting-world
   ```

2. **Install dependencies**

   ```bash
   # Install mobile app dependencies
   npm install

   # Install backend dependencies
   cd backend
   npm install
   cd ..
   ```

3. **Configure Environment Variables**

   Create a `.env` file in the `backend` directory:

   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/social-feed
   JWT_SECRET=your-secret-key-here
   FIREBASE_PROJECT_ID=your-project-id
   FIREBASE_CLIENT_EMAIL=your-client-email
   FIREBASE_PRIVATE_KEY=your-private-key
   ```

4. **Configure API URL**

   Update the backend URL in `services/api.ts`:

   ```typescript
   const API_BASE_URL = "http://YOUR_IP:3000/api";
   ```

   For local development:
   - Android Emulator: `http://10.0.2.2:3000/api`
   - iOS Simulator: `http://localhost:3000/api`
   - Physical Device: `http://YOUR_COMPUTER_IP:3000/api`

5. **Setup Firebase**
   - Place your `google-services.json` (Android) in the project root
   - Place your `connectingworld-76bdc-firebase-adminsdk-fbsvc-2a53a95763.json` in the project root
   - Update Firebase configuration in `app.json` if needed

### Running the Application

1. **Start MongoDB**

   ```bash
   # If using local MongoDB
   mongod
   ```

2. **Start the Backend Server**

   ```bash
   cd backend
   npm run dev
   ```

   The server will start on `http://localhost:3000`

3. **Start the Mobile App**

   ```bash
   # From the root directory
   npm start
   ```

   Then press:
   - `a` for Android
   - `i` for iOS
   - `w` for web

## 📂 Project Structure

```
connecting-world/
├── app/                          # Expo Router screens
│   ├── (auth)/                   # Authentication screens
│   │   ├── login.tsx
│   │   └── signup.tsx
│   ├── (tabs)/                   # Tab navigation screens
│   │   ├── feed.tsx              # Main feed screen
│   │   ├── profile.tsx           # User profile
│   │   └── explore.tsx           # Explore screen
│   ├── create-post.tsx           # Create post modal
│   ├── comments.tsx              # Comments screen
│   └── _layout.tsx               # Root layout with auth
├── components/                   # Reusable components
│   ├── PostCard/                 # Post card component
│   ├── CommentsCard/             # Comment card component
│   ├── ThemedText/               # Themed text component
│   └── ThemedView/               # Themed view component
├── context/                      # React context providers
│   └── Auth/                     # Authentication context
├── services/                     # API services
│   └── api.ts                    # API client configuration
├── constants/                    # App constants
│   ├── global-styles.ts          # Global styles and theme
│   └── theme.ts                  # Theme configuration
├── backend/                      # Backend server
│   ├── src/
│   │   ├── controllers/          # Route controllers
│   │   ├── models/               # Database models
│   │   ├── routes/               # API routes
│   │   ├── middleware/           # Middleware functions
│   │   └── utils/                # Utility functions
│   └── package.json
└── README.md
```

## 🔌 API Endpoints

### Authentication

- `POST /api/auth/signup` - Create new user
- `POST /api/auth/login` - User login

### Posts

- `POST /api/posts` - Create post (auth required)
- `GET /api/posts` - Get all posts (paginated, supports username filter)
- `GET /api/posts/:id` - Get specific post

### Interactions

- `POST /api/posts/:id/like` - Like/unlike post (auth required)
- `POST /api/posts/:id/comment` - Add comment (auth required)
- `GET /api/posts/:id/comments` - Get post comments
- `GET /api/posts/:id/likes` - Get post likes

### Notifications

- `POST /api/notifications/token` - Register FCM token (auth required)

## 🎨 Features Highlights

### Feed Screen

- Infinite scroll with pagination
- Pull-to-refresh
- Filter posts by username
- Real-time like/comment counts

### Create Post

- Text-only posts with 500 character limit
- Character counter
- Posting guidelines
- Instant feedback

### Profile

- User information display
- Quick access to user posts
- Logout functionality
- Menu items for future features

### Authentication

- Secure JWT-based authentication
- Password validation
- Persistent login (AsyncStorage)
- Auto-redirect on auth state change

## 🔧 Technologies Used

### Frontend

- React Native
- Expo (v54)
- Expo Router (File-based routing)
- TypeScript
- Axios (API calls)
- Firebase Cloud Messaging
- AsyncStorage (Local storage)
- Expo Linear Gradient

### Backend

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT (Authentication)
- bcryptjs (Password hashing)
- Firebase Admin SDK (Push notifications)

## 📱 Building for Production

### Android APK

1. **Configure EAS Build**

   ```bash
   npm install -g eas-cli
   eas login
   eas build:configure
   ```

2. **Build APK**

   ```bash
   eas build --platform android --profile preview
   ```

3. **Download the APK** from the Expo dashboard

### iOS

```bash
eas build --platform ios
```

## 🧪 Testing

- Test on Android Emulator and physical device
- Test on iOS Simulator and physical device
- Test on tablet devices for responsiveness
- Test push notifications
- Test offline behavior

## 📋 TODO / Future Enhancements

- [ ] Edit/Delete posts
- [ ] User profiles with bio and avatar upload
- [ ] Image/video posts
- [ ] Direct messaging
- [ ] Hashtags and mentions
- [ ] Bookmark posts
- [ ] Dark mode toggle
- [ ] Search functionality
- [ ] User following/followers
- [ ] Post sharing

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👥 Author

Connecting World Team © 2026

## 🐛 Known Issues

- None reported yet

## 📞 Support

For issues and questions, please create an issue in the GitHub repository.

---

Made with ❤️ using Expo and React Native
