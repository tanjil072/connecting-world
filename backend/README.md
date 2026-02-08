# Social Feed App - Backend

A lightweight Node.js/Express backend for a social media feed application with authentication, posts, likes, comments, and real-time notifications.

## Features

- ✅ User authentication (JWT-based)
- ✅ Create and view posts
- ✅ Like/unlike posts
- ✅ Comment on posts
- ✅ Firebase Cloud Messaging for notifications
- ✅ SQLite database
- ✅ Paginated feed
- ✅ Filter posts by username

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Installation

1. Navigate to the backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

4. Update `.env` with your configuration:

```env
PORT=3000
JWT_SECRET=your_jwt_secret_key_here
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_PRIVATE_KEY=your_firebase_private_key
FIREBASE_CLIENT_EMAIL=your_firebase_client_email
DATABASE_TYPE=sqlite
DATABASE_PATH=./data/database.db
NODE_ENV=development
```

## Running the Server

### Development mode (with auto-reload):

```bash
npm run dev
```

### Production build and run:

```bash
npm run build
npm start
```

### Seed sample data:

```bash
npm run seed
```

The server will start on `http://localhost:3000`

## API Documentation

### Authentication Endpoints

#### Signup

```http
POST /api/auth/signup
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123"
}
```

Response:

```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "userId": "uuid-here",
    "username": "john_doe",
    "email": "john@example.com",
    "token": "jwt-token-here"
  }
}
```

#### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

Response:

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "userId": "uuid-here",
    "username": "john_doe",
    "email": "john@example.com",
    "token": "jwt-token-here"
  }
}
```

### Posts Endpoints

#### Create Post (requires authentication)

```http
POST /api/posts
Authorization: Bearer <token>
Content-Type: application/json

{
  "content": "This is my first post!"
}
```

#### Get All Posts (paginated)

```http
GET /api/posts?page=1&limit=10&username=john_doe
```

Query parameters:

- `page`: Page number (default: 1)
- `limit`: Posts per page (default: 10)
- `username`: Filter by username (optional)

#### Get Specific Post

```http
GET /api/posts/:id
```

### Interactions Endpoints

#### Like/Unlike Post (requires authentication)

```http
POST /api/posts/:id/like
Authorization: Bearer <token>
```

Response:

```json
{
  "success": true,
  "message": "Post liked",
  "data": {
    "liked": true
  }
}
```

#### Add Comment (requires authentication)

```http
POST /api/posts/:id/comment
Authorization: Bearer <token>
Content-Type: application/json

{
  "content": "Great post!"
}
```

#### Get Post Comments

```http
GET /api/posts/:id/comments?page=1&limit=10
```

#### Get Post Likes

```http
GET /api/posts/:id/likes
```

### Notifications Endpoints

#### Register FCM Token (requires authentication)

```http
POST /api/notifications/register-token
Authorization: Bearer <token>
Content-Type: application/json

{
  "token": "fcm-device-token-here"
}
```

## Project Structure

```
backend/
├── src/
│   ├── controllers/
│   │   ├── authController.ts       # Authentication logic
│   │   ├── postsController.ts      # Post management
│   │   └── interactionsController.ts # Likes and comments
│   ├── middleware/
│   │   └── auth.ts                 # JWT authentication middleware
│   ├── routes/
│   │   ├── auth.ts                 # Auth routes
│   │   ├── posts.ts                # Post routes
│   │   └── notifications.ts        # Notification routes
│   ├── utils/
│   │   ├── database.ts             # Database initialization
│   │   ├── firebase.ts             # Firebase integration
│   │   └── types.ts                # TypeScript type definitions
│   ├── index.ts                    # Main app entry point
│   └── seed.ts                     # Database seeding
├── package.json
├── tsconfig.json
└── README.md
```

## Error Handling

All endpoints return a consistent JSON response format:

Success:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

Error:

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message"
}
```

## Database Schema

### Users Table

- `id` (TEXT) - Primary key
- `username` (TEXT) - Unique username
- `email` (TEXT) - Unique email
- `password` (TEXT) - Hashed password
- `createdAt` (DATETIME) - Creation timestamp

### Posts Table

- `id` (TEXT) - Primary key
- `userId` (TEXT) - Foreign key to users
- `username` (TEXT) - Post creator's username
- `content` (TEXT) - Post content
- `createdAt` (DATETIME) - Creation timestamp

### Likes Table

- `id` (TEXT) - Primary key
- `postId` (TEXT) - Foreign key to posts
- `userId` (TEXT) - Foreign key to users
- `username` (TEXT) - Liker's username
- `createdAt` (DATETIME) - Creation timestamp

### Comments Table

- `id` (TEXT) - Primary key
- `postId` (TEXT) - Foreign key to posts
- `userId` (TEXT) - Foreign key to users
- `username` (TEXT) - Commenter's username
- `content` (TEXT) - Comment content
- `createdAt` (DATETIME) - Creation timestamp

### FCM Tokens Table

- `id` (TEXT) - Primary key
- `userId` (TEXT) - Foreign key to users
- `token` (TEXT) - Firebase Cloud Messaging token
- `createdAt` (DATETIME) - Creation timestamp

## Firebase Setup

1. Create a Firebase project at https://console.firebase.google.com/
2. Generate a service account key
3. Add the credentials to your `.env` file
4. Enable Cloud Messaging in your Firebase project

## Common Issues

### Port already in use

Change the PORT in .env or kill the process using the port:

```bash
lsof -i :3000
kill -9 <PID>
```

### Database locked error

Restart the server and make sure no other process is using the database.

### JWT token errors

Ensure the JWT_SECRET matches between token generation and verification.

## Development Tips

- Use `npm run dev` for development with auto-reloading
- Check logs for debugging information
- Use Postman or Thunder Client to test API endpoints
- Database is stored in `data/database.db` locally

## License

MIT
