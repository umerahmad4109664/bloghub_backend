# Blog Management System - Backend API

REST API for the Blog Management System built with Node.js, Express, and MongoDB.

## Tech Stack

- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication
- express-validator
- bcryptjs

## Setup

```bash
npm install
cp .env.example .env    # then update with your values
npm run dev             # development with nodemon
npm start               # production
```

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/blog_management` |
| `JWT_SECRET` | Secret key for JWT tokens | `your_secret_key` |
| `JWT_EXPIRE` | Token expiration time | `7d` |
| `CLIENT_URL` | Frontend URL for CORS | `http://localhost:3000` |

## API Endpoints

### Health Check
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/health | Server health check |

### Auth
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/auth/register | No | Register new user |
| POST | /api/auth/login | No | Login user |
| GET | /api/auth/me | Yes | Get current user |

### Posts
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | /api/posts/public | No | Get published posts (search + pagination) |
| GET | /api/posts/public/:id | No | Get single published post |
| GET | /api/posts/dashboard | Yes | Get posts for dashboard |
| GET | /api/posts/:id | Yes | Get single post |
| POST | /api/posts | Yes | Create post |
| PUT | /api/posts/:id | Yes | Update post (owner/admin) |
| DELETE | /api/posts/:id | Yes | Delete post (owner/admin) |

### Comments
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | /api/comments/:postId | No | Get comments for a post |
| POST | /api/comments/:postId | Yes | Add comment |
| DELETE | /api/comments/:id | Yes | Delete comment (owner/admin) |

### Users (Admin only)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | /api/users | Admin | Get all users |
| PUT | /api/users/:id/role | Admin | Update user role |
| DELETE | /api/users/:id | Admin | Delete user |

## Project Structure

```
backend/
├── config/
│   └── db.js              # MongoDB connection
├── controllers/
│   ├── authController.js   # Register, login, profile
│   ├── postController.js   # Post CRUD + search/pagination
│   ├── commentController.js
│   └── userController.js   # Admin user management
├── middleware/
│   └── auth.js             # JWT verify + role authorization
├── models/
│   ├── User.js
│   ├── Post.js
│   └── Comment.js
├── routes/
│   ├── auth.js
│   ├── posts.js
│   ├── comments.js
│   └── users.js
├── utils/
│   └── generateToken.js
├── server.js
├── vercel.json
└── .env.example
```
