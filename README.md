# 🚀 HabitZen AI

### AI-Powered Habit Tracking Platform

Build consistency with AI-driven insights, streak tracking, and personalized motivation.

🌐 **Live Demo:** https://habitzenai.netlify.app/

---

# 📑 Table of Contents

- [Overview](#-overview)
- [Problem Statement](#-problem-statement)
- [Solution](#-solution)
- [Features](#-features)
- [Database Design](#-database-design)
- [API Endpoints](#-api-endpoints)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Security Features](#-security-features)
- [Challenges Faced](#-challenges-faced)
- [Key Learnings](#-key-learnings)
- [Future Improvements](#-future-improvements)
- [Author](#-author)

---

# 🔍 Overview

HabitZen AI is a modern AI-powered habit tracking web application built using the MERN Stack.

The platform helps users:

- Create and manage habits
- Track daily progress
- Maintain streaks
- Analyze performance
- Receive AI-generated insights
- Stay motivated through personalized recommendations

Unlike traditional habit trackers, HabitZen AI integrates Google Gemini AI to provide intelligent suggestions, recovery plans, weekly reports, and motivational guidance.

---

# ❗ Problem Statement

Many people start good habits but struggle to stay consistent.

Traditional habit tracking applications only allow users to mark habits as completed but fail to provide meaningful feedback, motivation, and personalized guidance.

Users need a platform that can:

- Track habits efficiently
- Maintain streaks
- Analyze performance
- Generate personalized insights
- Provide motivation
- Suggest improvements

---

# 💡 Solution

HabitZen AI combines habit tracking with artificial intelligence to help users stay disciplined and productive.

The platform provides:

- Habit creation and management
- Daily completion tracking
- Streak calculation
- Weekly performance analysis
- AI-generated reports
- Personalized motivation
- Habit recovery suggestions
- AI-powered habit coach

---

# ✨ Features

## 🔐 Authentication

- User Registration
- User Login
- JWT Authentication
- Secure HTTP Only Cookies
- Password Hashing using bcryptjs
- Forgot Password
- Reset Password via Email
- Protected Routes

---

## ✅ Habit Management

- Create Habits
- Edit Habits
- Delete Habits
- Archive Habits
- Reorder Habits
- Category-Based Organization
- Daily & Weekly Habit Tracking

---

## 📅 Daily Tracking

Users can mark habits as completed every day.

The system automatically:

- Stores completion logs
- Updates streaks
- Calculates consistency

---

## 🔥 Streak Tracking

Tracks:

### Current Streak

Example:

Monday ✅  
Tuesday ✅  
Wednesday ✅

Current Streak = 3 Days

### Longest Streak

Highest streak achieved historically.

---

## 📊 Dashboard

Displays:

- Total Habits
- Active Streaks
- Best Streak
- Weekly Completion Rate
- Today's Habit Checklist

---

## 📈 Statistics & Analytics

### Weekly Overview

- Weekly Completion %
- Best Performing Day
- Top Habit

### Charts & Reports

- Last 7 Days Activity
- Last 30 Days Activity
- Habit Performance
- Category Distribution

Categories:

- Health
- Fitness
- Learning
- Productivity
- Mindfulness

---

## 🤖 AI Features (Google Gemini)

### AI Habit Suggestions

Example:

Input:

```text
I want to improve focus
```

Output:

```text
• Reading
• Meditation
• Pomodoro Sessions
```

### 🌞 Morning Motivation

Generates personalized daily motivation.

Example:

```text
Good Morning Purva!
Stay consistent today.
Small progress creates big results.
```

### 📋 Weekly AI Reports

Analyzes:

- Completion Logs
- Habit Categories
- Streaks

Generates personalized weekly summaries.

### 🔄 Recovery Plans

If habits are missed, AI recommends recovery actions.

Example:

```text
You missed 3 workout sessions.
Try 15-minute home workouts
for the next 3 days.
```

### 💬 Habit Chat Assistant

Users can ask:

```text
How can I stay consistent?
```

AI provides personalized guidance.



---

# 🗄️ Database Design

## User Collection

```javascript
{
  _id,
  name,
  email,
  password,
  avatar,
  morningMotivation,
  createdAt
}
```

## Habit Collection

```javascript
{
  _id,
  userId,
  name,
  description,
  category,
  frequency,
  targetDays,
  color,
  icon,
  streak,
  longestStreak,
  order,
  isArchived
}
```

## HabitLog Collection

```javascript
{
  _id,
  userId,
  habitId,
  date,
  completed
}
```


## AIInsight Collection
```javascript
{ 
  _id, 
  userId, 
  type, 
  content, 
  meta, 
  generatedAt 
}
```
---

# 🔌 API Endpoints

## Authentication APIs

```http
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/me
PUT    /api/auth/profile
POST   /api/auth/forgot-password
POST   /api/auth/reset-password/:token
```

## Habit APIs

```http
GET      /api/habits
POST     /api/habits
PUT      /api/habits/:id
DELETE   /api/habits/:id
PUT      /api/habits/reorder
PUT      /api/habits/:id/archive
```

## Log APIs

```http
POST     /api/logs
DELETE   /api/logs
GET      /api/logs/today
GET      /api/logs/range
GET      /api/logs/heatmap
GET      /api/logs/stats
GET      /api/logs/stats/:habitId
```

## AI APIs

```http
POST   /api/ai/weekly-report
POST   /api/ai/suggest-habits
POST   /api/ai/recovery-plan
POST   /api/ai/chat
GET    /api/ai/morning
```

---

# 🛠️ Tech Stack

## Frontend

- React.js
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- Recharts
- Lucide React

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Nodemailer
- bcryptjs

## AI

- Google Gemini API

---

# 📂 Project Structure

```bash
HabitZen-AI/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── scripts/
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── assets/
│   ├── pages/
│   ├── components/
│   ├── services/
│   ├── .env.example
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/PurvaNijai34/HabitZen-AI.git
```

## Backend Setup

```bash
cd backend

npm install

npm run server
```

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

# 🔒 Environment Variables

## Frontend (.env)

```env
VITE_API_URL=http://localhost:8000/api
```

## Backend (.env)

```env
PORT=8000

MONGO_URI=your_mongodb_connection

JWT_SECRET=your_jwt_secret

JWT_EXPIRES_IN=7d

CLIENT_URL=http://localhost:5173

GEMINI_API_KEY=your_gemini_api_key

GEMINI_MODEL=gemini-2.5-flash

EMAIL_USER=your_email@gmail.com

EMAIL_PASS=your_app_password
```

---

# 🛡️ Security Features

Implemented:

- Password Hashing (bcryptjs)
- JWT Authentication
- HTTP Only Cookies
- Protected Routes
- Email Validation
- Password Validation
- Request Validation
- Secure Session Management

---

# ⚠️ Challenges Faced

### Maintaining Accurate Habit Streaks

Implemented date-based streak calculation logic.

### Securing Application Routes

Implemented JWT Authentication with Cookie-Based Sessions.

### Handling AI Failures

Added fallback responses and proper error handling.

### Deployment Issues

Configured environment variables and CORS correctly.

---

# 📚 Key Learnings

Through this project I learned:

- Full Stack Development
- REST API Design
- Authentication & Authorization
- MongoDB Relationships
- Secure Cookie Handling
- AI Integration
- State Management
- Error Handling
- Deployment Workflow
- Real-world Application Architecture

---

# 🚀 Future Improvements

- Friends Leaderboard
- Social Habit Sharing
- Achievement Badges
- Push Notifications
- Mobile Application
- Google Calendar Integration
- AI Habit Coach
- Habit Challenges

---


# 👤 Author

### Purva Nijai

💼 GitHub: https://github.com/PurvaNijai34

🔗 LinkedIn: https://www.linkedin.com/in/purva-nijai-6041002a5/

📧 Email: purvanijai05@gmail.com

