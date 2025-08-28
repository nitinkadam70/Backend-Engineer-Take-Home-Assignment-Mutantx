# API Documentation

http://localhost:8080

## User Registration

### Endpoint

## 1. POST /api/users/register

**Description:** Register a new user

**Request Body:**

```json
{
  "username": "Nitin Kadam",
  "email": "nitin@gmail.com",
  "password": "Password123"
}
```

## User Login

## 2. POST /api/auth/login

**Description:** Authenticate user and generate JWT token

**Request Body:**

```json
{
  "email": "nitin@gmail.com",
  "password": "Password123"
}
```
