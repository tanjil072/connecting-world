# Quick Setup Guide - Connecting World

## 🚀 Quick Start (5 Minutes)

### Step 1: Install Dependencies

```bash
# Install mobile app dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### Step 2: Configure Backend

1. Create `.env` file in the `backend` directory:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/social-feed
JWT_SECRET=mysecretkey123
```

2. Make sure MongoDB is running (or use MongoDB Atlas).

### Step 3: Configure Mobile App

Open `services/api.ts` and update the API URL:

**For Android Emulator:**

```typescript
const API_BASE_URL = "http://10.0.2.2:3000/api";
```

**For iOS Simulator:**

```typescript
const API_BASE_URL = "http://localhost:3000/api";
```

**For Physical Device:**

1. Find your computer's IP address:
   - macOS: `ifconfig | grep "inet " | grep -v 127.0.0.1`
   - Windows: `ipconfig`
2. Update the URL:

```typescript
const API_BASE_URL = "http://YOUR_IP:3000/api";
```

### Step 4: Start the Application

**Terminal 1 - Backend:**

```bash
cd backend
npm run dev
```

**Terminal 2 - Mobile App:**

```bash
npm start
```

Then press:

- `a` for Android
- `i` for iOS

## 🎯 First Time User Flow

1. **Sign Up**: Create a new account
2. **Login**: Login with your credentials
3. **Create Post**: Tap the "+" icon on the feed
4. **Like/Comment**: Interact with posts
5. **Filter**: Search posts by username
6. **Profile**: View your profile

## 🔥 Firebase Setup (Optional - for Push Notifications)

1. Create a Firebase project at https://console.firebase.google.com
2. Download `google-services.json` (Android) and place in project root
3. Download Firebase Admin SDK JSON and place in backend folder
4. Update `backend/.env`:

```env
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-client-email
FIREBASE_PRIVATE_KEY=your-private-key
```

## 🐛 Troubleshooting

### Backend won't start

- Check if MongoDB is running
- Check if port 3000 is available
- Verify .env file exists

### Can't connect to backend from mobile

- Check if backend is running
- Verify API URL in services/api.ts
- Check firewall settings
- Make sure devices are on same network (for physical devices)

### Build errors

```bash
# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install

# For Expo
npx expo start -c
```

## 📱 Testing

### Test Accounts

Create test accounts with these usernames for demo:

- john_doe
- jane_smith
- test_user

### Test Features

- ✅ Signup/Login
- ✅ Create post
- ✅ Like post
- ✅ Comment on post
- ✅ Filter by username
- ✅ Pull to refresh
- ✅ Infinite scroll

## 🔐 Default Credentials (After Signup)

You'll need to create your own account. No default credentials provided for security.

## 📞 Need Help?

Check:

1. [README.md](./README.md) - Full documentation
2. [CONFIG.md](./CONFIG.md) - Detailed configuration
3. Create an issue on GitHub

---

**Ready to build something amazing! 🚀**
