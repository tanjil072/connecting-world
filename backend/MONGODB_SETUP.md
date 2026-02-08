# MongoDB Setup Guide

## Prerequisites

- Node.js (v16 or higher)
- MongoDB installed locally or a MongoDB Atlas account

## Installation

### Option 1: Local MongoDB Installation

#### macOS

```bash
# Install MongoDB using Homebrew
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB service
brew services start mongodb-community
```

#### Windows

1. Download MongoDB Community Server from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Install and start MongoDB service

#### Linux (Ubuntu/Debian)

```bash
# Import MongoDB public GPG Key
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -

# Create list file
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

# Reload local package database
sudo apt-get update

# Install MongoDB
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod
```

### Option 2: MongoDB Atlas (Cloud)

1. Create a free account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string
4. Update `.env` file with your connection string:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/social-feed?retryWrites=true&w=majority
   ```

## Backend Setup

1. Install dependencies:

```bash
cd backend
npm install
```

2. Create `.env` file:

```bash
cp .env.example .env
```

3. Update `.env` with your configuration:

```env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/social-feed
JWT_SECRET=your-super-secret-jwt-key
```

4. Seed the database (optional):

```bash
npm run seed
```

5. Start the server:

```bash
# Development mode
npm run dev

# Production mode
npm run build
npm start
```

## Verify MongoDB Connection

1. Check if MongoDB is running:

```bash
# Local installation
mongosh

# Or check service status (Linux/macOS)
brew services list  # macOS
sudo systemctl status mongod  # Linux
```

2. View your database:

```bash
mongosh
use social-feed
show collections
db.users.find().pretty()
db.posts.find().pretty()
```

## Database Schema

The application uses the following collections:

- **users**: User accounts (username, email, password)
- **posts**: User posts (content, userId, username)
- **likes**: Post likes (postId, userId, username)
- **comments**: Post comments (postId, userId, username, content)
- **fcmtokens**: Firebase Cloud Messaging tokens for push notifications

## Migration from SQLite

The backend has been fully migrated from SQLite to MongoDB. Key changes:

1. **Dependencies**: Replaced `sqlite3` with `mongoose`
2. **Database Models**: Created Mongoose schemas for all collections
3. **Controllers**: Updated to use Mongoose queries instead of SQL
4. **IDs**: MongoDB automatically generates `_id` for documents (converted to strings in responses)

## Troubleshooting

### Connection Issues

**Error**: `MongooseServerSelectionError: connect ECONNREFUSED`

**Solution**: Ensure MongoDB is running:

```bash
# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Check if MongoDB is listening
lsof -iTCP -sTCP:LISTEN | grep mongo
```

### Authentication Issues

**Error**: `Authentication failed`

**Solution**: Update your connection string with correct credentials or use local MongoDB without authentication during development.

### Port Already in Use

**Error**: `Address already in use :::3000`

**Solution**: Change the PORT in `.env` or kill the process using port 3000:

```bash
lsof -ti:3000 | xargs kill -9
```

## API Endpoints

All endpoints remain the same as before:

- `POST /api/auth/signup` - Create new user
- `POST /api/auth/login` - User login
- `POST /api/posts` - Create post (auth required)
- `GET /api/posts` - Get all posts (paginated)
- `GET /api/posts/:id` - Get specific post
- `POST /api/posts/:id/like` - Like/unlike post (auth required)
- `POST /api/posts/:id/comment` - Add comment (auth required)
- `GET /api/posts/:id/comments` - Get post comments
- `GET /api/posts/:id/likes` - Get post likes
