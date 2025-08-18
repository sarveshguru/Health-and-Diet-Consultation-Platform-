# Health and Diet Consultation Platform

A comprehensive platform designed to connect users with certified health and diet consultants, offering personalized nutrition plans, progress tracking, and real-time consultations. The primary goal is to promote healthier lifestyles through expert guidance and data-driven recommendations.

---

## 🚀 Features

- **User Authentication:** Secure sign-up, log-in, and profile management
- **Consultant Directory:** Browse and search for certified health and diet consultants
- **Personalized Diet Plans:** Custom plans generated based on user input and consultant guidance
- **Appointment Booking:** Schedule and manage consultations with professionals
- **Real-Time Chat:** In-app messaging system for direct communication
- **Progress Tracking:** Monitor health metrics and dietary adherence over time
- **Admin Dashboard:** Manage users, consultants, and platform content

---

## 🛠️ Technologies Used

- **Frontend:** React, Redux, Material UI, [Nivo](https://nivo.rocks/) (for charts and graphs)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB

---

## 📦 Installation

**Prerequisites:**
- [Node.js](https://nodejs.org/) (v14+)
- [MongoDB](https://www.mongodb.com/)

**Steps:**

```bash
# 1. Clone the repository
git clone https://github.com/sarveshguru/Health-and-Diet-Consultation-Platform-.git
cd Health-and-Diet-Consultation-Platform-

# 2. Install dependencies for backend and frontend
npm install        # For backend
cd client && npm install   # For frontend (assuming 'client' is the frontend directory)

# 3. Setup environment variables
# For server:
cp .env.example .env       # Edit .env with your configuration

# For client:
cd client
cp .env.example .env       # Edit .env with your configuration

# 4. Start the backend server
npm start

# 5. Start the frontend application (in a new terminal)
cd client
npm start
```

---

## 🧑‍💻 Usage

After installation, you can:

- **Register as a User or Consultant:**  
  Sign up and complete your profile to access platform features.

- **Book a Consultation:**  
  Browse consultants, view their profiles, and book an appointment.

- **Chat with Consultants:**  
  Use the in-app chat to communicate and receive personalized advice.

- **Track Progress:**  
  Input your daily health metrics and view progress reports.

**Example User Flow:**

```plaintext
1. Register/log in as a user
2. Search for a consultant based on specialization
3. Book a consultation and select a timeslot
4. Chat with the consultant and receive a diet plan
5. Update your health stats and monitor progress
```

---

## ⚙️ Configuration

**Server-side `.env` file:**

```env
PORT=3001
MONGO_URL="<your MongoDB URL>"
JWT_SECRET=<JWT secret>
GEMINI_API_KEY=<gemini-1.5-flash API key>
```

**Client-side `.env` file:**

```env
REACT_APP_BASE_URL=http://localhost:3001/api
REACT_APP_CHAT_BASE_URL=http://localhost:3001/api/chat
REACT_APP_SOCKET_URL=http://localhost:3001
```

| Variable Name                  | Description                                    |
|-------------------------------|------------------------------------------------|
| `PORT`                        | Backend server port (default: 3001)            |
| `MONGO_URL`                   | MongoDB connection string                      |
| `JWT_SECRET`                  | Secret key for JWT authentication              |
| `GEMINI_API_KEY`              | Gemini API key for model integration           |
| `REACT_APP_BASE_URL`          | API base URL for client                        |
| `REACT_APP_CHAT_BASE_URL`     | Chat API base URL for client                   |
| `REACT_APP_SOCKET_URL`        | Socket server URL for real-time communication  |

Check `.env.example` files in both root and `client` directories for a complete list.

---

## 🤝 Contributing

Contributions are welcome! Whether it's bug reports, feature requests, or pull requests—your input helps us improve. Please read our [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines and best practices.

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE.md](LICENSE.md) file for details.

---

## 📬 Contact

For questions, feedback, or support, reach out via:

- GitHub: [@sarveshguru](https://github.com/sarveshguru) &nbsp; [@Vaishnavvii](https://github.com/Vaishnavvii) &nbsp; [@AjayLagdive](https://github.com/AjayLagdive)
- Email: csarvesh288@gmail.com | kvaishnavi881@gmail.com | lagdiveajay96@gmail.com

---

## 🖼️ Screenshots / Demo

See the [`/docs/screenshots`](docs/screenshots) directory for UI previews and workflow examples.

---

## 🙏 Acknowledgments

Special thanks to all contributors, open-source libraries, and the health tech community for their support and inspiration.

---
