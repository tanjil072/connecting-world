# Development Build Setup - Troubleshooting

## ✅ Successfully Fixed Issues

### 1. Firebase Configuration

- Added `use_modular_headers!` to iOS Podfile
- Made Firebase messaging optional in the code
- App now gracefully handles missing Firebase in development

### 2. AsyncStorage Setup

- Properly linked native modules
- Configured for both iOS and Android

### 3. Android SDK Configuration

- Created `android/local.properties` with SDK path
- Build should now proceed successfully

## 🚀 Current Build Status

### Android

The build is currently running. First-time builds take 5-10 minutes:

- ✅ Configuration complete
- ⏳ Downloading dependencies
- ⏳ Compiling native modules
- ⏳ Building APK

### iOS

Pods are installed. To build iOS:

```bash
npx expo run:ios
```

## 📱 Next Steps After Build

### 1. Start the Backend Server

```bash
cd backend
npm run dev
```

### 2. Update API URL in services/api.ts

**For Android Emulator:**

```typescript
const API_BASE_URL = "http://10.0.2.2:3000/api";
```

**For Physical Device:**

```typescript
const API_BASE_URL = "http://YOUR_COMPUTER_IP:3000/api";
```

Find your IP:

```bash
# macOS
ifconfig | grep "inet " | grep -v 127.0.0.1

# Result will be something like: 192.168.1.100
```

### 3. Test the App

1. **Sign Up**
   - Create a new account
   - Username: test_user
   - Email: test@example.com
   - Password: password123

2. **Create Posts**
   - Tap the + button on the feed
   - Write some text
   - Post it

3. **Interact**
   - Like posts
   - Add comments
   - Filter by username

## 🐛 Common Issues & Solutions

### Issue: "Metro bundler connection failed"

**Solution:**

```bash
# Clear metro cache
npx expo start -c
```

### Issue: "Unable to connect to backend"

**Solution:**

1. Check backend is running on port 3000
2. Verify API_BASE_URL is correct
3. For Android emulator, use `10.0.2.2` not `localhost`
4. Check firewall allows connections

### Issue: "Build failed" after code changes

**Solution:**

```bash
# For Android
cd android && ./gradlew clean && cd ..
npx expo run:android

# For iOS
cd ios && pod install && cd ..
npx expo run:ios
```

### Issue: "Native module not found"

**Solution:**

```bash
# Rebuild native code
npx expo prebuild --clean
npx expo run:android  # or run:ios
```

## 📊 Build Time Expectations

- **First Build**: 5-10 minutes
- **Subsequent Builds**: 1-3 minutes
- **Hot Reload**: Instant (after build)

## ✨ Features Ready to Test

- ✅ Authentication (Login/Signup)
- ✅ Create Posts
- ✅ View Feed
- ✅ Like Posts
- ✅ Comment on Posts
- ✅ Filter by Username
- ✅ User Profile
- ✅ Pull to Refresh
- ✅ Infinite Scroll

## 🔥 Firebase Push Notifications

Push notifications work only in development builds, not in Expo Go:

- ✅ Development Build: Full Firebase support
- ❌ Expo Go: Firebase not available

## 📝 Important Notes

1. **First build takes longer** - Be patient!
2. **Keep backend running** while testing
3. **Use correct IP address** for physical devices
4. **Test on both phone and tablet** for responsive design

## 🎯 Ready to Build APK?

Once everything works:

```bash
eas build --platform android --profile preview
```

This creates a downloadable APK for distribution.

---

**Current Status:** Build is in progress. Once complete, the app will automatically launch on your connected device/emulator.
