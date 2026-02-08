# Configuration Guide

## Backend API URL Configuration

To connect the mobile app to your backend server, update the `API_BASE_URL` in the following file:

### File: `services/api.ts`

```typescript
const API_BASE_URL = "http://localhost:3000/api"; // Change this to your backend URL
```

### Options for Backend URL:

1. **Local Development (Emulator/Simulator)**:
   - Android Emulator: `http://10.0.2.2:3000/api`
   - iOS Simulator: `http://localhost:3000/api`
   - Physical Device: `http://YOUR_COMPUTER_IP:3000/api` (e.g., `http://192.168.1.100:3000/api`)

2. **Production**:
   - Use your deployed backend URL (e.g., `https://api.yourapp.com/api`)

## How to Find Your Computer's IP Address:

### macOS:

```bash
ifconfig | grep "inet " | grep -v 127.0.0.1
```

### Windows:

```bash
ipconfig
```

### Linux:

```bash
hostname -I
```

## Starting the Backend Server

Navigate to the backend directory and start the server:

```bash
cd backend
npm install
npm run dev
```

The server should start on `http://localhost:3000`

## Starting the Mobile App

From the root directory:

```bash
npm start
```

Then press:

- `a` for Android
- `i` for iOS
- `w` for web

## Important Notes:

1. Make sure the backend server is running before starting the mobile app
2. Ensure your firewall allows connections on port 3000
3. For physical devices, make sure they're on the same network as your computer
4. Update the Firebase configuration files if needed
