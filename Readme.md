# Backend Engineer Take Home Assignment – MutantX

This project is a backend system built with **Node.js, Express, and MongoDB**.  
It provides APIs for **user authentication, leaderboard management, and scoring system** with JWT-based authentication.

---

## 🚀 Tech Stack

- **Node.js** – Runtime environment
- **Express.js** – Web framework
- **MongoDB** – NoSQL database
- **Mongoose** – MongoDB ODM
- **JWT (jsonwebtoken)** – Authentication
- **bcrypt** – Password hashing
- **express-rate-limit** – Protect APIs from brute-force attacks
- **dotenv** – Environment variable management

---

## 📦 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/nitinkadam70/Backend-Engineer-Take-Home-Assignment-Mutantx.git

cd Backend-Engineer-Take-Home-Assignment-Mutantx

```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables

Create a .env file in the root directory and add:

```bash
PORT=8080
MONGO_URI=******
```
### 4. How to Start the Project

- Development Mode (with hot reload)

```bash
npm run dev
```
- Production Mode

```bash
npm start
```

### 5. Server will start on:
```bash 
http://localhost:8080
```

## 📖 API Documentation

The project includes a Swagger/OpenAPI spec.

```bash
https://app.swaggerhub.com/apis-docs/nitin-4ad/Leaderboard/1.0.0
```

## 🗂️ Database Schema Design

### 1. User Schema

```bash
{
  username: String,   // min 3, max 25 chars
  email: String,      // unique, valid format
  password: String,   // hashed password
  totalPoints: Number // default: 0, used for leaderboard
}
```

### 2. Score Schema

```bash
{
  userId: ObjectId,   // ref -> User
  points: Number,     // allowed values: 5, 10, 50
}
```
## 👨‍💻 Author
### Developed by Nitin Kadam