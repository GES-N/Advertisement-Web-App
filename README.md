# 🛍️ Advertisement App API

A backend API for an Advertisement App where **vendors** can register and upload product adverts (with images), and **buyers** can browse, search, and view products. Built with **Node.js**, **Express.js**, and **MongoDB**.

---

## 🚀 Features

- Vendor registration & login
- Buyer registration & login
- Create product adverts with image upload
- View all products or single product by ID
- Update and delete product adverts
- Search products by keyword
- JWT-based authentication & protected routes

---

## 🛠️ Technologies Used

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (JSON Web Tokens)
- bcrypt.js (password hashing)
- multer (image upload)
- dotenv (environment management)

## 🛠️ Set Up Instructions
1. 🚀 Clone the Repository

```bash
git clone https://github.com/your-username/advertisement-app-api.git
cd advertisement-app-api
```
2. Install dependencies
```bash
   npm install
   ```
3. Create a .env file
```bash
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
# Cloudinary config
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```
4. Start the development server
```npm run dev
```

---
📦 API Endpoints

👤 Authentication
| Method | Endpoint             | Description     |
| ------ | -------------------- | --------------- |
| POST   | `/api/vendor/signup` | Register vendor |
| POST   | `/api/vendor/login`  | Vendor login    |
| POST   | `/api/buyer/signup`  | Register buyer  |
| POST   | `/api/buyer/login`   | Buyer login     |

📷 Products
| Method | Endpoint                  | Description                         |
| ------ | ------------------------- | ----------------------------------- |
| POST   | `/api/products`           | Create product advert (Vendor only) |
| GET    | `/api/products`           | Get all product adverts             |
| GET    | `/api/products/:id`       | Get single product by ID            |
| PUT    | `/api/products/:id`       | Update product (Vendor only)        |
| DELETE | `/api/products/:id`       | Delete product (Vendor only)        |
| GET    | `/api/products/search?q=` | Search products by keyword          |

🔐 All product creation, update, and delete routes require a valid vendor token.

---
🔒 Authentication
Use JWT in Authorization header:
```bash
Authorization: Bearer <your_token>
```
---
🖼️ Image Upload

Product images must be submitted using multipart/form-data. Images are stored in the /uploads folder. Use a key like image or productImage in your POST request.





