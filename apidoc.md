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

## 3. Add Score - protected Route

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

## 4. Get User Scores - protected Route

## GET /api/scores/get-user-scores

**Description:** Fetch all scores for the logged-in user, sorted by most recent.

### Headers (Required):

```json
Authorization: Bearer <JWT_TOKEN>
```

## 5. Get Profile - protected Route

## GET /api/users/get-profile

**Description:** Fetch user profile

### Headers (Required):

```json
Authorization: Bearer <JWT_TOKEN>
```

## 6. Edit Profile - protected Route

## Patch /api/users/edit-profile

**Description:** Edit user profile

### Headers (Required):

```json
Authorization: Bearer <JWT_TOKEN>
```

## 7. Get Leaderboard - protected Route

## GET /api/leaderboard/get-leaderboard?page=1&limit=10

**Description:** This API generates a ranked leaderboard of all users based on their total accumulated scores. It includes both active users (with scores) and inactive users (with 0 points), sorted first by highest total score and then by most recent activity. Each user is assigned a rank (1, 2, 3, …) in the response.

### Headers (Required):

```json
Authorization: Bearer <JWT_TOKEN>
```

### Results we get like

```json
{
  "success": true,
  "count": 6,
  "leaderboard": [
    {
      "rank": 1,
      "username": "Ayush",
      "email": "ayush@gmail.com",
      "totalScore": 310,
      "lastActivity": "2025-08-29T08:49:17.472Z",
      "userId": "68b0a6e11041e55c2757ecd8"
    },
    {
      "rank": 2,
      "username": "nandu",
      "email": "nandu@gmail.com",
      "totalScore": 250,
      "lastActivity": "2025-08-29T08:51:35.079Z",
      "userId": "68b0a6c71041e55c2757ecd5"
    },
    {
      "rank": 3,
      "username": "Tanveer",
      "email": "tanveer@gmail.com",
      "totalScore": 240,
      "lastActivity": "2025-08-29T08:47:41.019Z",
      "userId": "68b0a9ff1041e55c2757ed05"
    },
    {
      "rank": 4,
      "username": "Nitin Patil",
      "email": "nitin@gmail.com",
      "totalScore": 200,
      "lastActivity": "2025-08-28T19:08:38.547Z",
      "userId": "68b0515549ebefe326aabcfd"
    },
    {
      "rank": 5,
      "username": "Sanket",
      "email": "sanket@gmail.com",
      "totalScore": 30,
      "lastActivity": "2025-08-28T19:11:05.929Z",
      "userId": "68b0a75f1041e55c2757ecdb"
    },
    {
      "rank": 6,
      "username": "Akash",
      "email": "akash@gmail.com",
      "totalScore": 0,
      "lastActivity": null,
      "userId": "68b16ab8ec8787555449850d"
    }
  ]
}
```
