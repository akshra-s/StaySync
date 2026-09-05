# 🏡 StaySync

> **Discover. Share. Stay.**

A full-stack accommodation platform to **discover stays, create listings, save favorites, and share experiences.**

![StaySync Preview](./screenshots/home.png)

## 🌐 Live Demo

🔗 **[Visit StaySync](https://staysync-ib76.onrender.com)**

---

## ✨ Features

- 🔐 **Authentication** — Signup, login, sessions & protected routes
- 🏡 **Listings** — Create, edit, view & delete stays
- 🔎 **Search & Categories** — Find stays by location, country & category
- ❤️ **Wishlist** — Save and manage favorite stays
- ⭐ **Reviews & Ratings** — Rate listings and share experiences
- 🖼️ **Image Uploads** — Cloudinary-powered image storage
- 🗺️ **Interactive Maps** — Location-based property maps
- 💰 **Tax Toggle** — Display prices with 18% GST
- ✅ **Validation & Error Handling** — Joi validation & custom error handling
- ☁️ **Deployment** — Render + MongoDB Atlas

---

## 📸 Screenshots

### 🏠 Home

![Home](./screenshots/home.png)

### 📍 Listing Details

![Listing Details](./screenshots/listing-details.png)

### ⭐ Wishlist

![wishlist](./screenshots/wishlist.png)

---

## 🛠️ Tech Stack

**Frontend:** HTML5 · CSS3 · JavaScript · Bootstrap · EJS

**Backend:** Node.js · Express.js

**Database:** MongoDB · Mongoose · MongoDB Atlas

**Authentication:** Passport.js · Express Session · Connect-Mongo

**Services:** Cloudinary · Geoapify · MapLibre GL JS

**Other:** Joi · Multer · Method Override · Connect-Flash

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
├── cloudConfig.js
├── app.js
└── package.json
```

---

## 🚀 Run Locally

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd StaySync
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory:

```env
ATLASDB_URL=your_mongodb_connection_string
SESSION_SECRET=your_session_secret
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_key
CLOUD_SECRET=your_cloudinary_secret
GEOAPIFY_API_KEY=your_geoapify_api_key
```

### 4. Start the application

```bash
node app.js
```

Open **http://localhost:8080** in your browser.

---

## 🎯 Project Highlights

```text
Authentication → Listings → Reviews
       ↓              ↓          ↓
   Sessions       Wishlist     Ratings
                      ↓
                Cloudinary + Maps
                      ↓
                   MongoDB
```

Built to practice **full-stack development, MVC architecture, CRUD operations, authentication, database relationships, API integration, cloud storage, and deployment.**

---

## 🔮 Future Plans

- 💳 Booking & payments
- 📅 Stay availability
- 💬 Host–guest messaging
- 🔔 Notifications
- 📊 Host dashboard
- 🔍 Advanced filters

---

## 👨‍💻 Author

**Akshra Srivastava**  
B.Tech IT — BPIT, Delhi

⭐ **If you like StaySync, consider giving the repository a star!**
