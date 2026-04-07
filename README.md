# Blog System API

A comprehensive Node.js and Express.js RESTful API for a Blog and Community System. This system allows users to register, create posts, form groups, and manage their profiles, while providing administrators with tools to oversee the platform.

## 🚀 Features

- **Authentication & Authorization:**
  - User registration and login.
  - Secure authentication using JSON Web Tokens (JWT).
  - Role-based access control (User, Admin, Super-Admin).
  
- **User Management (`/users` & `/admin`):**
  - Users can view and update their own profiles.
  - Admins can manage all users (view, modify roles, and delete users).

- **Posts Management (`/posts`):**
  - Full CRUD operations: Create, read, update, and delete posts.
  - Image uploading to [ImageKit](https://imagekit.io/) utilizing `multer`.
  - Fetch personal posts or posts by specific users.

- **Groups Management (`/groups`):**
  - Create and manage custom groups/communities.
  - Add or remove members from groups.
  - Promote members to group admins or demote them.
  - Leave or delete groups.

- **Validation & Security:**
  - Secure password hashing using `bcryptjs`.
  - Request body validation using `Joi` schemas.
  - Centralized error handling.

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB & Mongoose
- **Authentication:** `jsonwebtoken`
- **File Uploads:** `multer`, `imagekit`
- **Data Validation:** `joi`
- **Security:** `bcryptjs`
- **Environment Management:** `dotenv`

## ⚙️ Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB** (Local instance or MongoDB Atlas)
- **ImageKit Account** (for handling image uploads)

## 📦 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd Blog-Application-main
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory and add the following keys:
   ```env
   NODE_ENV=development
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRES_IN=90d
   
   IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
   IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
   IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
   ```

4. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   *The server should now be running on `http://localhost:3000` (or your customized port).*

---

## 📡 API Endpoints Overview

Here is a quick overview of the main endpoints available in this API:

### Authentication (`/auth`)
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login to an existing account

### Users (`/users`)
- `GET /users/me` - Get current logged-in user profile
- `PATCH /users/updateMe` - Update profile information
- `DELETE /users/deleteMe` - Deactivate/Delete profile

### Posts (`/posts`)
- `GET /posts` - Get all public posts
- `POST /posts` - Create a new post (supports `multipart/form-data` for images)
- `GET /posts/my-posts` - Get posts created by the logged-in user
- `PATCH /posts/:id` - Update a post
- `DELETE /posts/:id` - Delete a post

### Groups (`/groups`)
- `GET /groups` - Get all groups
- `POST /groups` - Create a new group
- `POST /groups/:groupId/add-member` - Add a user to a group
- `DELETE /groups/:groupId/remove-member` - Remove a user from a group
- `PATCH /groups/:groupId/promote` - Promote a member to group admin
- `DELETE /groups/:groupId` - Delete a group

### Admin (`/admin`)
- `GET /admin/users` - Get all registered users
- `PATCH /admin/users/:id/role` - Update user's role (e.g., promote to admin)
- `DELETE /admin/users/:id` - Delete a user entirely

---

## 📄 License
This project is licensed under the **ISC License**.
