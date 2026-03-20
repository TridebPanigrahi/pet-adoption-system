# 🐾 Pet Adoption Management System (MERN Stack)

A full-stack web application where users can browse pets available for adoption, apply for adoption, and admins can manage pets and adoption requests.

---

## 🚀 Live Features

### 👤 Visitor

* View list of available pets
* Search pets by name
* Filter pets by species, breed, and age
* View detailed pet information

### 🙋 User

* Register and Login (JWT Authentication)
* View available pets
* Apply for pet adoption
* Withdraw adoption request (if pending)
* Track adoption status (Pending / Approved / Rejected)
* Dashboard analytics (Applied / Approved / Rejected / Available)

### 🛠️ Admin

* Dashboard analytics (Total pets / Applications / Status counts)
* Add new pets
* Edit pet details
* Delete pets
* Approve or reject adoption requests
* Automatic pet status update after approval

---

## 🧠 Tech Stack

### Frontend

* React.js
* Material UI
* React Hook Form
* Yup Validation
* React Router DOM
* Axios
* React Toastify

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Role Based Authorization

---

## 📁 Project Structure

```
pet-adoption-system
│
├── backend
│   ├── models
│   ├── controllers
│   ├── routes
│   ├── middleware
│   ├── server.js
│   └── .env
│
├── frontend
│   ├── src
│   │   ├── pages
│   │   ├── components
│   │   ├── layouts
│   │   ├── api
│   │   └── routes
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```
git clone https://github.com/TridebPanigrahi/pet-adoption-system.git
cd pet-adoption-system
```

---

### 2️⃣ Backend Setup

```
cd backend
npm install
```

Create `.env`

```
PORT=5000
MONGO_URL=your_mongodb_connection
JWT_SECRET=your_secret_key
```

Run backend:

```
npm run dev
```

---

### 3️⃣ Frontend Setup

```
cd frontend
npm install
npm start
```

Frontend runs on:

```
https://d3m1gzdz8mvacf.cloudfront.net/
```

Backend runs on:

```
https://petadoptapp.duckdns.org/
```

---

## 🔐 Authentication Flow

* JWT based authentication
* Token stored in localStorage
* Private Routes implemented
* Role Based Routing (User / Admin)

---

## 📊 Dashboard Features

### User Dashboard

* Available pets count
* Applied pets count
* Approved applications
* Rejected applications

### Admin Dashboard

* Total pets
* Available pets
* Adopted pets
* Total applications
* Pending / Approved / Rejected counts

---

## ✨ Future Improvements

* Image upload (Cloudinary)
* Notifications system
* Email alerts
* Advanced filtering
* Dashboard charts
* Deployment on AWS EC2 / AWS S3

---

## 🧠 Tech Stack

* **Frontend:** React.js, Material UI
* **Backend:** Node.js, Express.js
* **Database:** MongoDB Atlas
* **Backend Deployment:** Docker (AWS EC2)
* **Reverse Proxy:** Nginx
* **Frontend Hosting:** AWS S3
* **CDN & HTTPS:** AWS CloudFront
* **SSL Certificate:** Certbot (Let’s Encrypt)

## 👨‍💻 Author

**Trideb Panigrahi**

---

## ⭐ If you like this project, give it a star on GitHub!
