<<<<<<< HEAD
const Message = require("../models/Message");
const User = require("../models/User");
const Dietician = require("../models/Dietician");

// Send a message
const sendMessage = async (req, res) => {
  try {
    const { senderId, receiverId, content } = req.body;

    // Validate that both users exist
    const userExists = await User.findById(senderId);
    const dieticianExists = await Dietician.findById(receiverId);

    if (!userExists && !dieticianExists) {
      return res.status(404).json({ message: "Sender not found" });
    }

    const receiverExists = await User.findById(receiverId);
    const dieticianReceiverExists = await Dietician.findById(receiverId);

    if (!receiverExists && !dieticianReceiverExists) {
      return res.status(404).json({ message: "Receiver not found" });
    }

    const message = new Message({
      senderId,
      receiverId,
      content,
    });

    const savedMessage = await message.save();

    // Populate sender and receiver details
    await savedMessage.populate("senderId", "name email");
    await savedMessage.populate("receiverId", "name email");

    res.status(201).json(savedMessage);
  } catch (error) {
    console.error("Error in sendMessage:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get messages between two users
const getMessages = async (req, res) => {
  try {
    const { userId1, userId2 } = req.params;

    // Find messages between these two users
    const messages = await Message.find({
      $or: [
        { senderId: userId1, receiverId: userId2 },
        { senderId: userId2, receiverId: userId1 },
      ],
    })
      .populate("senderId", "name email")
      .populate("receiverId", "name email")
      .sort({ timestamp: 1 });

    res.json(messages);
  } catch (error) {
    console.error("Error in getMessages:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all users that a specific user has chatted with
const getChatList = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate input
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Find all messages where the user is either sender or receiver
    const messages = await Message.find({
      $or: [{ senderId: userId }, { receiverId: userId }],
    })
      .populate("senderId", "name email role")
      .populate("receiverId", "name email role");

    // Extract unique users from the messages and get last message for each
    const chatUsers = new Map();

    // Process messages in chronological order to get the last message for each chat
    messages.forEach((message) => {
      // Determine the other participant in the conversation
      let otherUser;
      if (message.senderId._id.toString() === userId) {
        otherUser = message.receiverId;
      } else if (message.receiverId._id.toString() === userId) {
        otherUser = message.senderId;
      }

      // If we found the other user, update or add to chat list
      if (otherUser) {
        const otherUserId = otherUser._id.toString();
        const currentTime = new Date(message.timestamp);

        // If user not in map or current message is more recent, update
        if (
          !chatUsers.has(otherUserId) ||
          new Date(chatUsers.get(otherUserId).timestamp) < currentTime
        ) {
          chatUsers.set(otherUserId, {
            id: otherUser._id,
            name: otherUser.name || "Unknown User",
            email: otherUser.email,
            role: otherUser.role || "user",
            lastMessage: message.content,
            timestamp: message.timestamp,
            online: false, // Default value, can be updated via socket
          });
        }
      }
    });

    // Convert map to array and sort by timestamp (most recent first)
    const chatList = Array.from(chatUsers.values()).sort(
      (a, b) => new Date(b.timestamp) - new Date(a.timestamp),
    );

    res.json(chatList);
  } catch (error) {
    console.error("Error in getChatList:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Create a new conversation (used when initiating a chat)
const createConversation = async (req, res) => {
  try {
    const { userId1, userId2 } = req.body;

    // Validate input
    if (!userId1 || !userId2) {
      return res
        .status(400)
        .json({ message: "Both userId1 and userId2 are required" });
    }

    // Check if users exist
    const user1Exists = await User.findById(userId1);
    const user2Exists = await User.findById(userId2);
    const dietician1Exists = await Dietician.findById(userId1);
    const dietician2Exists = await Dietician.findById(userId2);

    if (!user1Exists && !dietician1Exists) {
      return res.status(404).json({ message: "User 1 not found" });
    }

    if (!user2Exists && !dietician2Exists) {
      return res.status(404).json({ message: "User 2 not found" });
    }

    // Check if a conversation already exists between these users
    const existingMessages = await Message.findOne({
      $or: [
        { senderId: userId1, receiverId: userId2 },
        { senderId: userId2, receiverId: userId1 },
      ],
    });

    // If no existing conversation, create a placeholder message
    if (!existingMessages) {
      const placeholderMessage = new Message({
        senderId: userId1,
        receiverId: userId2,
        content: "Conversation started",
      });

      const savedMessage = await placeholderMessage.save();
      await savedMessage.populate("senderId", "name email");
      await savedMessage.populate("receiverId", "name email");

      res.status(201).json(savedMessage);
    } else {
      // If conversation exists, return success
      res.status(200).json({ message: "Conversation already exists" });
    }
  } catch (error) {
    console.error("Error in createConversation:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  sendMessage,
  getMessages,
  getChatList,
  createConversation,
};
=======
const Message = require("../models/Message");
const User = require("../models/User");
const Dietician = require("../models/Dietician");

// Send a message
const sendMessage = async (req, res) => {
  try {
    const { senderId, receiverId, content } = req.body;

    // Validate that both users exist
    const userExists = await User.findById(senderId);
    const dieticianExists = await Dietician.findById(receiverId);

    if (!userExists && !dieticianExists) {
      return res.status(404).json({ message: "Sender not found" });
    }

    const receiverExists = await User.findById(receiverId);
    const dieticianReceiverExists = await Dietician.findById(receiverId);

    if (!receiverExists && !dieticianReceiverExists) {
      return res.status(404).json({ message: "Receiver not found" });
    }

    const message = new Message({
      senderId,
      receiverId,
      content,
    });

    const savedMessage = await message.save();

    // Populate sender and receiver details
    await savedMessage.populate("senderId", "name email");
    await savedMessage.populate("receiverId", "name email");

    res.status(201).json(savedMessage);
  } catch (error) {
    console.error("Error in sendMessage:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get messages between two users
const getMessages = async (req, res) => {
  try {
    const { userId1, userId2 } = req.params;

    // Find messages between these two users
    const messages = await Message.find({
      $or: [
        { senderId: userId1, receiverId: userId2 },
        { senderId: userId2, receiverId: userId1 },
      ],
    })
      .populate("senderId", "name email")
      .populate("receiverId", "name email")
      .sort({ timestamp: 1 });

    res.json(messages);
  } catch (error) {
    console.error("Error in getMessages:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all users that a specific user has chatted with
const getChatList = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate input
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Find all messages where the user is either sender or receiver
    const messages = await Message.find({
      $or: [{ senderId: userId }, { receiverId: userId }],
    })
      .populate("senderId", "name email role")
      .populate("receiverId", "name email role");

    // Extract unique users from the messages and get last message for each
    const chatUsers = new Map();

    // Process messages in chronological order to get the last message for each chat
    messages.forEach((message) => {
      // Determine the other participant in the conversation
      let otherUser;
      if (message.senderId._id.toString() === userId) {
        otherUser = message.receiverId;
      } else if (message.receiverId._id.toString() === userId) {
        otherUser = message.senderId;
      }

      // If we found the other user, update or add to chat list
      if (otherUser) {
        const otherUserId = otherUser._id.toString();
        const currentTime = new Date(message.timestamp);

        // If user not in map or current message is more recent, update
        if (
          !chatUsers.has(otherUserId) ||
          new Date(chatUsers.get(otherUserId).timestamp) < currentTime
        ) {
          chatUsers.set(otherUserId, {
            id: otherUser._id,
            name: otherUser.name || "Unknown User",
            email: otherUser.email,
            role: otherUser.role || "user",
            lastMessage: message.content,
            timestamp: message.timestamp,
            online: false, // Default value, can be updated via socket
          });
        }
      }
    });

    // Convert map to array and sort by timestamp (most recent first)
    const chatList = Array.from(chatUsers.values()).sort(
      (a, b) => new Date(b.timestamp) - new Date(a.timestamp),
    );

    res.json(chatList);
  } catch (error) {
    console.error("Error in getChatList:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Create a new conversation (used when initiating a chat)
const createConversation = async (req, res) => {
  try {
    const { userId1, userId2 } = req.body;

    // Validate input
    if (!userId1 || !userId2) {
      return res
        .status(400)
        .json({ message: "Both userId1 and userId2 are required" });
    }

    // Check if users exist
    const user1Exists = await User.findById(userId1);
    const user2Exists = await User.findById(userId2);
    const dietician1Exists = await Dietician.findById(userId1);
    const dietician2Exists = await Dietician.findById(userId2);

    if (!user1Exists && !dietician1Exists) {
      return res.status(404).json({ message: "User 1 not found" });
    }

    if (!user2Exists && !dietician2Exists) {
      return res.status(404).json({ message: "User 2 not found" });
    }

    // Check if a conversation already exists between these users
    const existingMessages = await Message.findOne({
      $or: [
        { senderId: userId1, receiverId: userId2 },
        { senderId: userId2, receiverId: userId1 },
      ],
    });

    // If no existing conversation, create a placeholder message
    if (!existingMessages) {
      const placeholderMessage = new Message({
        senderId: userId1,
        receiverId: userId2,
        content: "Conversation started",
      });

      const savedMessage = await placeholderMessage.save();
      await savedMessage.populate("senderId", "name email");
      await savedMessage.populate("receiverId", "name email");

      res.status(201).json(savedMessage);
    } else {
      // If conversation exists, return success
      res.status(200).json({ message: "Conversation already exists" });
    }
  } catch (error) {
    console.error("Error in createConversation:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  sendMessage,
  getMessages,
  getChatList,
  createConversation,
};
>>>>>>> origin/main
