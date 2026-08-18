# 🏡 StaySync

> **Discover. Share. Stay.**
> A full-stack accommodation platform for discovering unique stays, managing listings, sharing experiences, and saving your favorite places.

![StaySync Preview](./screenshots/home.png)

## 🌐 Live Demo

🔗 **[Visit StaySync](YOUR_RENDER_URL_HERE)**

---

## 📖 About

**StaySync** is a full-stack accommodation listing platform where users can discover stays, create and manage properties, leave reviews, and build a personal wishlist.

It demonstrates a complete web application workflow with **authentication, CRUD operations, image storage, reviews, maps, validation, database management, and cloud deployment**.

---

## ✨ Features

* 🔐 **Authentication** — Secure signup, login, sessions, and protected actions
* 🏡 **Listings** — Create, view, edit, and delete accommodation listings
* 🔎 **Explore** — Browse stays with images, pricing, and location details
* ⭐ **Reviews** — Rate listings, share experiences, and manage your reviews
* ❤️ **Wishlist** — Save and manage favorite stays
* 🖼️ **Cloud Images** — Upload and store listing images
* 🗺️ **Interactive Maps** — Display property locations
* ✅ **Validation & Errors** — Server-side validation with clear feedback
* ☁️ **Deployment** — Production deployment with MongoDB Atlas and Render

---

## 📸 Screenshots

### 🏠 Home

![Home Page](./screenshots/home.png)

### 🏡 Listings

![All Listings](./screenshots/listings.png)

### 📍 Listing Details

![Listing Details](./screenshots/listing-details.png)

### ⭐ Reviews

![Reviews](./screenshots/reviews.png)

---

## 🛠️ Tech Stack

| Category       | Technologies                                  |
| -------------- | --------------------------------------------- |
| Frontend       | HTML5, CSS3, Bootstrap, EJS                   |
| Backend        | Node.js, Express.js                           |
| Database       | MongoDB, Mongoose, MongoDB Atlas              |
| Authentication | Passport.js, Passport Local, Express Session  |
| Images         | Cloudinary                                    |
| Maps           | Mapbox                                        |
| Validation     | Joi                                           |
| Utilities      | Connect-Mongo, Express Flash, Method Override |
| Deployment     | Render                                        |

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd staysync
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file:

```env
ATLASDB_URL=your_mongodb_connection_string
SECRET=your_session_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_KEY=your_cloudinary_key
CLOUDINARY_SECRET=your_cloudinary_secret
MAP_TOKEN=your_mapbox_token
```

### 4. Start the application

```bash
npm start
```

Open the local server in your browser and start exploring StaySync.

---

## 📂 Project Structure

```text
StaySync/
├── controllers/
├── models/
├── routes/
├── views/
├── public/
├── utility/
├── middleware.js
├── schema.js
├── app.js
└── package.json
```

---

## 🎯 Project Highlights

StaySync focuses on building a realistic full-stack experience rather than a static interface, connecting:

**User → Authentication → Listings → Reviews → Wishlist → Maps → Cloud Services → Database**

---

## 👨‍💻 Built With

Built as a full-stack web development project to explore modern web application architecture, backend development, database integration, authentication, and deployment.

---

⭐ **If you like StaySync, consider giving the repository a star!**
