# Influenzio 🌟

A full-stack MERN application connecting companies with social media influencers for marketing campaigns and collaborations.

## 🚀 Features

- **User Authentication**: Secure login and registration system with JWT tokens and Bcrypt password hashing
- **Profile Management**: Complete user profiles for both companies and influencers with work experience tracking
- **Real-time Messaging**: Instant communication between companies and influencers using Socket.io
- **Influencer Discovery**: Browse and search influencers by category, followers, location, and expertise
- **Campaign Collaboration**: Platform for companies to find and hire influencers for marketing campaigns
- **Responsive Design**: Mobile-friendly interface that works across all devices

## 🛠️ Tech Stack

**Frontend:**
- React.js
- CSS3
- Responsive Design

**Backend:**
- Node.js
- Express.js
- Socket.io (Real-time communication)

**Database:**
- MongoDB

**Cloud Services:**
- Firebase Cloud Storage (File management)
- Firebase Hosting (Deployment)

**Authentication:**
- JWT (JSON Web Tokens)
- Bcrypt (Password hashing)

## 📸 Screenshots

### Authentication System
| Login | Registration |
|-------|-------------|
| ![Login Screen](https://drive.google.com/file/d/1jtBMhqzyyhJYkOLEN5VhS0f3KvCSbVOE/view?usp=share_link) | ![Registration Screen](https://drive.google.com/file/d/1SrYkav5nNaD78-x-XvVop-4MyAZHykvm/view?usp=share_link) |

### Main Dashboard
![Dashboard](https://drive.google.com/file/d/1-vGitIUBUAQTxZYtVXvVXRfdugTZQPuz/view?usp=share_link)

### Profile Management
| Profile Overview | Add Experience |
|-----------------|----------------|
| ![Profile](https://drive.google.com/file/d/18Q46AQQsXlKvaP1EgIobsLDUZVp3bnV7/view?usp=share_link) | ![Add Experience](https://drive.google.com/file/d/1E40jUV93wrP0Kzbi4IaDEzT2QBW1o0kO/view?usp=share_link) |

### Influencer Discovery
![Browse Influencers](https://drive.google.com/file/d/1hrd6lkRe3DRNm2b6A3HaK1jhJH9X69tv/view?usp=share_link)

### Real-time Messaging
![Chat System](https://drive.google.com/file/d/1jtBMhqzyyhJYkOLEN5VhS0f3KvCSbVOE/view?usp=share_link)

## 🏃‍♂️ Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- Firebase account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/influenzio.git
   cd influenzio
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Variables**
   
   Create `.env` file in the backend directory:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   FIREBASE_CONFIG=your_firebase_config
   ```

5. **Run the application**
   
   Backend (Terminal 1):
   ```bash
   cd backend
   npm start
   ```
   
   Frontend (Terminal 2):
   ```bash
   cd frontend
   npm start
   ```

6. **Access the application**
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:5000`

## 🌐 Live Demo

[Visit Influenzio](https://your-firebase-app.web.app)

## 📁 Project Structure

```
influenzio/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── controllers/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.js
│   └── public/
└── README.md
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### User Management
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `POST /api/users/experience` - Add work experience

### Influencers
- `GET /api/influencers` - Get all influencers
- `GET /api/influencers/search` - Search influencers
- `GET /api/influencers/:id` - Get specific influencer

### Messaging
- `POST /api/messages` - Send message
- `GET /api/messages/:conversationId` - Get conversation history

## 🚀 Key Features Implementation

### Real-time Messaging
```javascript
// Socket.io implementation for instant messaging
socket.on('sendMessage', (messageData) => {
  io.to(messageData.receiverId).emit('receiveMessage', messageData);
});
```

### Secure Authentication
- JWT token-based authentication
- Bcrypt password hashing
- Protected routes and middleware

### File Management
- Firebase Cloud Storage integration
- Profile image uploads
- Static file serving

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 👨‍💻 Author

**Maniteja**
- Email: katammaniteja@gmail.com
- LinkedIn: [Your LinkedIn Profile]
- GitHub: [Your GitHub Profile]

## 🙏 Acknowledgments

- Thanks to all the open-source libraries that made this project possible
- Special thanks to the MERN stack community
- Firebase for providing excellent cloud services

---

⭐ Star this repository if you found it helpful!