<<<<<<< HEAD
const { Server } = require("socket.io");

// Store online users
const onlineUsers = new Map();

const setupSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      credentials: true
    },
  });

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);
    
    // Handle user joining
    socket.on("join", (userId) => {
      onlineUsers.set(userId, socket.id);
      console.log(`User ${userId} is online`);
      // Broadcast to all clients that a user is online
      io.emit("userOnline", userId);
    });
    
    // Handle sending message
socket.on("sendMessage", async (data) => {
  const { senderId, receiverId, content } = data;
  
  // Save message to database
  const Message = require("./models/Message");
  const message = new Message({
    senderId,
    receiverId,
    content,
  });
  
  try {
    const savedMessage = await message.save();
    // Populate sender and receiver details
    await savedMessage.populate("senderId", "name email");
    await savedMessage.populate("receiverId", "name email");
    
    // Send message to receiver if online
    const receiverSocketId = onlineUsers.get(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("receiveMessage", savedMessage);
    }
    
    // Also send to sender for confirmation
    const senderSocketId = onlineUsers.get(senderId);
    if (senderSocketId) {
      io.to(senderSocketId).emit("messageSent", savedMessage);
    }
  } catch (error) {
    console.error("Error saving message:", error);
  }
});
    
    // Handle typing indicator
    socket.on("typing", (data) => {
      const { senderId, receiverId } = data;
      const receiverSocketId = onlineUsers.get(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("userTyping", { userId: senderId });
      }
    });
    
    // Handle stop typing
    socket.on("stopTyping", (data) => {
      const { senderId, receiverId } = data;
      const receiverSocketId = onlineUsers.get(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("userStopTyping", { userId: senderId });
      }
    });
    
    // Handle disconnect
    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
      // Remove user from online users
      for (let [userId, socketId] of onlineUsers.entries()) {
        if (socketId === socket.id) {
          onlineUsers.delete(userId);
          // Broadcast to all clients that a user is offline
          io.emit("userOffline", userId);
          break;
        }
      }
    });
  });

  return io;
};

module.exports = setupSocket;
=======
const { Server } = require("socket.io");

// Store online users
const onlineUsers = new Map();

const setupSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      credentials: true
    },
  });

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);
    
    // Handle user joining
    socket.on("join", (userId) => {
      onlineUsers.set(userId, socket.id);
      console.log(`User ${userId} is online`);
      // Broadcast to all clients that a user is online
      io.emit("userOnline", userId);
    });
    
    // Handle sending message
socket.on("sendMessage", async (data) => {
  const { senderId, receiverId, content } = data;
  
  // Save message to database
  const Message = require("./models/Message");
  const message = new Message({
    senderId,
    receiverId,
    content,
  });
  
  try {
    const savedMessage = await message.save();
    // Populate sender and receiver details
    await savedMessage.populate("senderId", "name email");
    await savedMessage.populate("receiverId", "name email");
    
    // Send message to receiver if online
    const receiverSocketId = onlineUsers.get(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("receiveMessage", savedMessage);
    }
    
    // Also send to sender for confirmation
    const senderSocketId = onlineUsers.get(senderId);
    if (senderSocketId) {
      io.to(senderSocketId).emit("messageSent", savedMessage);
    }
  } catch (error) {
    console.error("Error saving message:", error);
  }
});
    
    // Handle typing indicator
    socket.on("typing", (data) => {
      const { senderId, receiverId } = data;
      const receiverSocketId = onlineUsers.get(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("userTyping", { userId: senderId });
      }
    });
    
    // Handle stop typing
    socket.on("stopTyping", (data) => {
      const { senderId, receiverId } = data;
      const receiverSocketId = onlineUsers.get(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("userStopTyping", { userId: senderId });
      }
    });
    
    // Handle disconnect
    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
      // Remove user from online users
      for (let [userId, socketId] of onlineUsers.entries()) {
        if (socketId === socket.id) {
          onlineUsers.delete(userId);
          // Broadcast to all clients that a user is offline
          io.emit("userOffline", userId);
          break;
        }
      }
    });
  });

  return io;
};

module.exports = setupSocket;
>>>>>>> origin/main
