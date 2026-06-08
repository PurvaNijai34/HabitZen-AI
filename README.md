  
# Title : HabitZen AI

# Live Demo : https://habitzenai.netlify.app/


## 📑 Table of Contents
- [🔍 Overview](#overview)
- [✨ Features](#features)
- [🛠️ Tech Stack](#tech-stack)
- [📂 Project Structure](#project-structure)
- [⚙️ Installation](#instalaltion)
- [🔒 Environment Variables](#env)
- [📷 Screenshot](#screenshot)
- [👤 Author](#author)
  
<h2><a class="anchor" id="overview"> 🔍Overview</a></h2>

> Build consistency with AI-driven insights and streak tracking.

HabitZen AI is a modern AI-powered habit tracking web application built using the MERN stack.  
It helps users build better routines, track progress, maintain streaks, and receive intelligent AI-based insights and motivation.

---
<h2><a class="anchor" id="features">✨ Features</a></h2>

## 🔐 Authentication
- User registration & login
- JWT-based authentication
- Secure password hashing with bcrypt
- Strong password validation
- Forgot password & reset password flow



## ✅ Habit Management
- Create, update, archive, and delete habits
- Daily & weekly habits
- Category-based organization
- Habit streak tracking
- Completion history



## 📊 Analytics & Statistics
- Weekly overview dashboard
- Completion rate analysis
- Best streak & longest streak
- Heatmap consistency tracker
- Category-based performance charts
- 7-day & 30-day statistics



## 🤖 AI Features (Gemini AI)
- AI-generated weekly reports
- Personalized habit suggestions
- Recovery plans after streak breaks
- Habit analysis chat assistant
- Daily morning motivation messages


## 🎨 UI/UX
- Fully responsive modern UI
- Dark mode support
- Beautiful dashboard design
- Smooth user experience
- HabitZen AI custom branding

---


<h2><a class="anchor" id="tech-stack"> 🛠️ Tech Stack</a></h2>


## Frontend
- React.js
- Vite
- Tailwind CSS
- React Router
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

## AI Integration
- Google Gemini API

---


<h2><a class="anchor" id="project-structure">📂 Project Structure</a></h2>


```bash
HabitZen-AI/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── scripts/
│   ├── utils/
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── .env.example
│   ├── package.json
│   └── vite.config.js
│
└── README.md

```

<h2><a class="anchor" id="installation">⚙️ Installation</a></h2>



### 1. Clone Repository



```bash 
git clone https://github.com/PurvaNijai34/HabitZen-AI.git
```

### 2. Backend setup

####  Go to Backend Folder


```bash
cd backend
npm install
npm run server
```

### 3. Frontend setup

####  Go to Frontend Folder


```bash
cd frontend
npm install
npm run dev
```

<h2><a class="anchor" id="env">🔒 Environment Variables</a></h2>

### 📁 Frontend (.env)
```bash
VITE_API_URL=http://localhost:8000/api
```
### 📁 Backend (.env)
```bash
PORT=8000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-2.5-flash
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
CLIENT_URL=http://localhost:5173
```


<h2><a class="anchor" id="author"> 👤 Author</a><h2/>


**Purva Nijai** 
### - 💼 GitHub: [PurvaNijai34](https://github.com/PurvaNijai34)
### - 🔗 LinkedIn: https://www.linkedin.com/in/purva-nijai-6041002a5/
### - 📧 Email: purvanijai05@gmail.com





