# 📦 Subscription Tracker API

A Node.js + Express.js backend API to manage **user subscriptions**, with **JWT authentication** and **role-based authorization**.  
Currently under development — new features and endpoints will be added regularly.

---

## 🚀 Features

- 🔑 **User Authentication**
  - Sign-up & Login endpoints
  - Password hashing using **bcrypt**
  - JWT-based authentication

- 🛡️ **Authorization Middleware**
  - Protect sensitive routes
  - Role-based access control for admin-only endpoints

- 👥 **User Management**
  - Retrieve all users (admin)
  - Retrieve single user details (protected)


## 🛠️ Tech Stack

| Tech               | Purpose                                 |
|--------------------|-----------------------------------------|
| Node.js            | JavaScript runtime environment          |
| Express.js         | Web framework for building the API      |
| MongoDB + Mongoose | Database and object modeling            |
| JWT (jsonwebtoken) | Secure authentication and authorization |
| bcrypt             | Password hashing                        |
| dotenv             | Environment variable management         |
| ESLint             | Code linting and formatting             |
