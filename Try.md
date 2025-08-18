![Last Commit](https://img.shields.io/github/last-commit/sarveshguru/Health-and-Diet-Consultation-Platform-) 
![Total Commits](https://img.shields.io/github/commit-activity/y/sarveshguru/Health-and-Diet-Consultation-Platform-)
![Commit Activity](https://img.shields.io/github/commit-activity/m/sarveshguru/Health-and-Diet-Consultation-Platform-)
![Contributors](https://img.shields.io/github/contributors/sarveshguru/Health-and-Diet-Consultation-Platform-)
![Views](https://visitor-counter-badge.vercel.app/api/sarveshguru/Health-and-Diet-Consultation-Platform-)

---

# 🥗 Healtician – Health and Diet Consultation Platform

**Healtician** is a web-based platform designed to connect users with certified dieticians and health experts.  
It offers personalized nutrition plans, progress tracking, and real-time consultations — all in one place.  
Our goal is to make healthier living simple, practical, and accessible for everyone.  

---

## 🚀 Key Features

- 🔐 **User Authentication** – Secure login, signup, and profile management with JWT  
- 👩‍⚕️ **Consultant Directory** – Browse and connect with certified health and diet consultants  
- 🥗 **Personalized Diet Plans** – Custom plans based on user goals, preferences, and expert input  
- 📅 **Appointment Booking** – Schedule consultations and manage your bookings  
- 💬 **Real-Time Chat** – Communicate directly with consultants using in-app messaging  
- 📊 **Progress Tracking** – Monitor health metrics, dietary adherence, and visualize improvements  
- ⚙️ **Admin Dashboard** – Manage consultants, users, and platform data  

---

## 🛠️ Tech Stack

- **Frontend:** React, Redux, Material UI, [Nivo](https://nivo.rocks/) for charts  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB Atlas  
- **Authentication:** JWT (JSON Web Token)  
- **Extras:** WebSocket for real-time chat, Email notifications, Gemini API integration  

---

## ⚙️ Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v14+)  
- [MongoDB](https://www.mongodb.com/)  

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/sarveshguru/Health-and-Diet-Consultation-Platform-.git
cd Health-and-Diet-Consultation-Platform-

# 2. Install dependencies
npm install            # For backend
cd client && npm install   # For frontend

# 3. Setup environment variables
cp .env.example .env   # Fill in your configs for backend & client

# 4. Start backend
npm start

# 5. Start frontend (new terminal)
cd client
npm start
```
---
## 📌 Environment Variables
### Backend .env
```bash
PORT=3001
MONGO_URL=<Your MongoDB URI>
JWT_SECRET=<JWT Secret Key>
GEMINI_API_KEY=<Gemini API Key>
```
### Frontend .env
```bash
REACT_APP_BASE_URL=http://localhost:3001/api
REACT_APP_CHAT_BASE_URL=http://localhost:3001/api/chat
REACT_APP_SOCKET_URL=http://localhost:3001
```
---
## 🧑‍💻 Usage Flow
Register or log in as User / Consultant

Complete your profile (health goals, restrictions, etc.)

Browse consultants and book a session

Chat with experts & receive a personalized plan

Track meals, monitor health stats, and view progress reports

---

## 📸 Screenshots / Demo

Add your screenshots in /docs/screenshots
(e.g., Homepage, Dashboard, Chat window, Progress graphs)

---
## 🔮 Future Enhancements
📱 Mobile App (React Native)

🤖 AI-based calorie estimation from food photos

🌍 Multi-language support (English, Hindi, Telugu, Marathi, Kannada)

🧑‍🤝‍🧑 Community features for group health challenges

---

## 👨‍💻 Contributors
Sarvesh Choudhary

K Vaishnavi

Devansh Rai

Lagdive Ajay

Manish Kumar

Guide: P Prasoon (CDAC Bangalore)

---

## 🤝 Contributing
Contributions are welcome!
If you’d like to improve this project, feel free to fork the repo, raise issues, or submit pull requests.

---

## 📜 License
This project is licensed under the MIT License.

---

## 📬 Contact
For questions or feedback:

GitHub: @sarveshguru  @Vaishnavvii  @AjayLagdive

Email: csarvesh288@gmail.com | kvaishnavi881@gmail.com | lagdiveajay96@gmail.com

---
