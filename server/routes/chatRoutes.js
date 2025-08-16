const express = require("express");
const router = express.Router();
const { sendMessage, getMessages, getChatList, createConversation } = require("../controllers/chatController");
const authMiddleware = require("../middleware/authMiddleware");

// Send a message (protected route)
router.post("/send", authMiddleware, sendMessage);

// Create a new conversation (protected route)
router.post("/create", authMiddleware, createConversation);

// Get chat list for a user (protected route)
router.get("/list/:userId", authMiddleware, getChatList);

// Get messages between two users (protected route)
router.get("/:userId1/:userId2", authMiddleware, getMessages);

module.exports = router;
