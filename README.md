# Property Listing Backend

## Overview

This is a backend RESTful API for a Property Listing system. It allows users to register, login, create and manage property listings, favorite properties, and recommend properties to other users. The backend uses MongoDB for data storage and Redis for caching to optimize performance.

---

## Features

- **User Authentication:** Register and login with email/password, JWT-based authentication.
- **Property CRUD:** Create, Read, Update, and Delete properties. Only the user who created a property can update or delete it.
- **Advanced Search & Filtering:** Search properties based on 10+ attributes such as price, location, bedrooms, bathrooms, etc.
- **Favorites:** Users can favorite properties and perform CRUD operations on their favorites.
- **Recommendations:** Users can recommend properties to other registered users by searching with their email.
- **Caching:** Redis cache integration for fast retrieval of frequently accessed data.
- **Deployment Ready:** Can be deployed on services like Render or Vercel.

---

## Tech Stack

- **Node.js** and **Express.js** for server and API
- **MongoDB** (via Mongoose) for database
- **Redis** for caching
- **JWT** for authentication tokens
- **bcryptjs** for password hashing
- **dotenv** for environment variable management

---

## Getting Started

### Prerequisites

- Node.js (v14 or above)
- MongoDB instance (local or cloud)
- Redis server or Redis Cloud account
- npm or yarn

### Installation

1. Clone the repo:
   ```
   bash
   git clone https://github.com/yourusername/property-listing-backend.git
   cd property-listing-backend
    ```
## Install dependencies

```
bash
npm install
```


## API Endpoints

| Method | Endpoint                  | Description                          | Access   |
|--------|---------------------------|------------------------------------|----------|
| POST   | /api/auth/register        | Register a new user                 | Public   |
| POST   | /api/auth/login           | Login with email/password           | Public   |

| Method | Endpoint                  | Description                          | Access   |
|--------|---------------------------|------------------------------------|----------|
| POST   | /api/properties           | Create a new property               | Private  |
| GET    | /api/properties           | Get list of properties (with filters) | Public   |
| GET    | /api/properties/:id       | Get property details by ID          | Public   |
| PUT    | /api/properties/:id       | Update property (only owner)        | Private  |
| DELETE | /api/properties/:id       | Delete property (only owner)        | Private  |

| Method | Endpoint                  | Description                          | Access   |
|--------|---------------------------|------------------------------------|----------|
| POST   | /api/favorites            | Add property to favorites           | Private  |
| GET    | /api/favorites            | Get all user's favorites             | Private  |
| DELETE | /api/favorites/:id        | Remove favorite by ID                | Private  |

| Method | Endpoint                  | Description                          | Access   |
|--------|---------------------------|------------------------------------|----------|
| POST   | /api/recommendations      | Recommend property to another user  | Private  |
| GET    | /api/recommendations      | Get all recommendations received    | Private  |

## project directory

```
property-listing-backend/
├── config/
│   ├── db.js              # MongoDB connection setup
│   └── redis.js           # Redis client setup
├── controllers/
│   ├── authController.js
│   ├── propertyController.js
│   ├── favoriteController.js
│   └── recommendationController.js
├── middlewares/
│   └── authMiddleware.js  # JWT token verification middleware
├── models/
│   ├── User.js
│   ├── Property.js
│   ├── Favorite.js
│   └── Recommendation.js
├── routes/
│   ├── authRoutes.js
│   ├── propertyRoutes.js
│   ├── favoriteRoutes.js
│   └── recommendationRoutes.js
├── app.js                 # Express app setup
├── server.js              # Server entry point
├── .env                   # Environment variables
└── package.json
```

# Project Tasks Summary

## 1. Import CSV Data into MongoDB
- Used a script (not shown here) to parse CSV files and bulk insert property data into MongoDB for initial data population.

## 2. CRUD Operations for Properties
- Implemented create, read, update, and delete endpoints in `propertyController.js`.
- Authorization enforced so only the property creator (`createdBy`) can update or delete their properties.

## 3. Advanced Search/Filtering
- Implemented in `getProperties` endpoint with dynamic filters based on query parameters.
- Supports filtering on 10+ property attributes (e.g., price, location, bedrooms).

## 4. Caching with Redis
- Integrated Redis caching in property listing APIs to speed up frequent queries.
- Cache invalidated on property create, update, and delete to maintain consistency.

## 5. User Registration and Login
- Created user model with encrypted passwords.
- Auth endpoints for registration and login with JWT token generation.
- Protected routes using JWT middleware.

## 6. Favorites Management
- Users can add/remove properties to/from favorites.
- CRUD operations on favorites implemented with ownership checks.

## Bonus Task: Property Recommendations
- Users can recommend properties to other registered users by searching via email.
- Recommendations saved and can be viewed in a dedicated section.
- Implemented recommendation model, controller, and routes.

---

This summary outlines the main features and how they were implemented to deliver a full property listing backend system with authentication, authorization, caching, and social features.
## Deployment
You can deploy this backend to services like:

Render
Vercel



## Author
# Jitendra Kumar
