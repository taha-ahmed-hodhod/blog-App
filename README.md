# 🚀 Blog System API 

Backend API for a comprehensive blogging platform featuring Group management, Role-Based Access Control (RBAC), and automated Image Hosting.

---

## 🛠️ Tech Stack & Features
- **Runtime**: Node.js & Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JWT (JSON Web Tokens) with Bearer Token support.
- **File Storage**: ImageKit.io integration for cloud image hosting.
- **Validation**: Middleware-based validation using **Joi**.
- **Access Control**: Multi-level RBAC (Super-Admin, Admin, User).

---

## 🔐 API Endpoints Reference

### 1️⃣ Authentication (`/auth`)
| Method | Endpoint | Body (JSON) | Access |
| :--- | :--- | :--- | :--- |
| POST | `/register` | `name`, `email`, `password`, `passwordConfirm` | Public |
| POST | `/login` | `email`, `password` | Public |

### 2️⃣ Users (`/users`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| GET | `/me` | Get current user profile | Authenticated |
| PATCH | `/updateMe` | Update profile info | Authenticated |
| DELETE | `/deleteMe` | Deactivate account | Authenticated |

### 3️⃣ Groups (`/groups`)
| Method | Endpoint | Body (JSON) | Description |
| :--- | :--- | :--- | :--- |
| GET | `/` | None | List all groups |
| POST | `/` | `name`, `description` | Create new group |
| POST | `/:groupId/add-member` | `userId` | Add member |
| DELETE | `/:groupId/leave` | None | Leave group |
| PATCH | `/:groupId/promote` | `userId` | Promote to Admin |
| PATCH | `/:groupId/demote` | `userId` | Demote from Admin |

### 4️⃣ Posts (`/posts`)
| Method | Endpoint | Body (Form-Data) | Description |
| :--- | :--- | :--- | :--- |
| GET | `/` | None | Get newsfeed posts |
| POST | `/` | `title`, `content`, `image`, `group` | Create post (Auto Upload) |
| GET | `/my-posts` | None | Get user's own posts |
| PATCH | `/:id` | `title`, `content` | Update post |
| DELETE | `/:id` | None | Delete post |

### 5️⃣ Admin & Super-Admin (`/admin`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| GET | `/users` | Super-Admin | List all system users |
| PATCH | `/users/:id/role` | Super-Admin | Update user role |
| DELETE | `/users/:id` | Admin/Super-Admin | Delete user from system |

---

## 📁 Folder Architecture (MVC)
```text
controllers/    # Request handling & Business logic
models/         # Mongoose schemas (User, Post, Group)
routes/         # API route definitions
middlewares/    # Auth, RBAC, and Validation
utils/          # ImageKit setup & AppError helper
validators/     # Joi schemas for data validation
