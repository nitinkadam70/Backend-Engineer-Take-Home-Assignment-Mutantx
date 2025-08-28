# API Documentation

http://localhost:8080

## 1. User Registration

### Endpoint

## POST /api/users/register

**Description:** Register a new user

**Request Body:**

```json
// Content-Type: application/json
{
  "username": "Nitin Kadam",
  "email": "nitin@gmail.com",
  "password": "Password123"
}
```

## 2. User Login

## POST /api/auth/login

**Description:** Authenticate user and generate JWT token

**Request Body:**

```json
// Content-Type: application/json
{
  "email": "nitin@gmail.com",
  "password": "Password123"
}
```

## 3. Add Score

## POST /api/scores/add-score

**Description:** Add a new score for the logged-in user.

**Allowed values:** 5, 10, or 50.

### Headers (Required):

```json
Authorization: Bearer <JWT_TOKEN>
```

**Request Body:**

```json
{
  "points": 10
}
```

## 4. Get User Scores

## GET /api/scores/get-user-scores

**Description:** Fetch all scores for the logged-in user, sorted by most recent.

### Headers (Required):

```json
Authorization: Bearer <JWT_TOKEN>
```
