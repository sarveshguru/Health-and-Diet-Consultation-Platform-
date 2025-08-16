import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useRef,
} from "react";
import { Box, Grid, Typography, Paper } from "@mui/material";
import { AuthContext } from "../../context/AuthContext";
import {
  getChatList,
  getMessages,
  createConversation,
} from "../../services/chatApi";
import {
  getUserDetailsById,
  getDieticianDetailsById,
} from "../../services/api";
import socket from "../../services/socket";
import ChatList from "./ChatList";
import ChatWindow from "./ChatWindow";
import { useLocation } from "react-router-dom";

const ChatContainer = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const selectedChatRef = useRef(null);
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const targetUserId = urlParams.get("userId");
  const targetUserName = urlParams.get("userName");

  // console.log(targetUserName);

  const [chatList, setChatList] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  // console.log(chatList);
  // console.log(loading)

  useEffect(() => {
    selectedChatRef.current = selectedChat;
  }, [selectedChat]);

  const loadChatList = useCallback(async () => {
    try {
      if (user && user.id) {
        const chats = await getChatList(user.id);

        // Ensure each chat has the correct name for the other participant
        const enrichedChats = await Promise.all(
          chats.map(async (chat) => {
            // Determine the other participant's ID
            const otherUserId =
              chat.participants?.find((p) => p !== user.id) || chat.id;

            if (otherUserId && otherUserId !== user.id) {
              try {
                let details = null;

                // Determine which API to use based on current user's role
                if (user.role === "dietician") {
                  // Dietician is logged in, fetch user details
                  details = await getUserDetailsById(otherUserId);
                } else {
                  // User is logged in, fetch dietician details
                  details = await getDieticianDetailsById(otherUserId);
                }

                return {
                  ...chat,
                  name: details?.name || chat.name || "Unknown User",
                  avatar: details?.avatar || chat.avatar || "",
                  role: details?.role || chat.role || "user",
                };
              } catch (error) {
                console.error(
                  `Error fetching details for user ${otherUserId}:`,
                  error,
                );
                return {
                  ...chat,
                  name: chat.name || "Unknown User",
                };
              }
            }
            return chat;
          }),
        );

        setChatList(enrichedChats);
      }
    } catch (error) {
      console.error("Error loading chat list:", error);
    }
  }, [user]);

  const handleSelectChat = useCallback(
    async (chat) => {
      setSelectedChat(chat);
      try {
        // Load messages for this chat
        if (user && user.id) {
          const chatMessages = await getMessages(user.id, chat.id);
          setMessages(chatMessages);
        }
      } catch (error) {
        console.error("Error loading messages:", error);
        setMessages([]);
      }
    },
    [user],
  );

  useEffect(() => {
    // If auth is still loading, don't do anything yet
    if (authLoading) {
      return;
    }

    // If auth is done but user is not authenticated, redirect to login
    if (!authLoading && !user) {
      setLoading(false);
      return;
    }

    let isMounted = true; // Flag to prevent state updates if component unmounts

    // Connect to socket when component mounts
    socket.connect();

    // Join the user to the socket room
    if (user && user.id) {
      socket.emit("join", user.id);
    }

    // Load chat list and handle target user
    const initializeChat = async () => {
      try {
        await loadChatList();
      } catch (error) {
        console.error("Error loading chat list:", error);
      }
    };

    // Handle target user after chat list is loaded
    const handleTargetUser = async () => {
      try {
        // Fetch updated chat list to check if target user exists
        const updatedChatList = await getChatList(user.id);
        if (!isMounted) return;

        setChatList(updatedChatList);

        // Check if target user is already in chat list
        const existingChat = updatedChatList.find(
          (chat) => chat.id === targetUserId,
        );
        if (existingChat) {
          await handleSelectChat(existingChat);
        } else {
          // Create temporary chat object and initialize conversation in database
          try {
            let userDetails = null;
            let userName = targetUserName || "Unknown User";

            // Use targetUserName directly when provided, otherwise fetch from API
            if (
              targetUserName &&
              targetUserName !== "User" &&
              targetUserName !== "Unknown User"
            ) {
              userName = targetUserName;
            } else {
              try {
                userDetails = await getUserDetailsById(targetUserId);
                if (userDetails) {
                  userName =
                    userDetails?.name ||
                    userDetails?.data?.name ||
                    "Unknown User";
                }
              } catch (error) {
                console.error("Error fetching user details:", error);
              }
            }

            if (!isMounted) return;

            const temporaryChat = {
              id: targetUserId,
              name: userName,
              email: userDetails?.email || userDetails?.data?.email || "",
              role: userDetails?.role || userDetails?.data?.role || "user",
              lastMessage: "",
              timestamp: new Date().toISOString(),
              unread: 0,
              online: false,
            };
            setSelectedChat(temporaryChat);

            // Create conversation in database
            if (user && user.id) {
              try {
                await createConversation({
                  userId1: user.id,
                  userId2: targetUserId,
                });
              } catch (error) {
                console.error("Error creating conversation:", error);
                if (error.response && error.response.data) {
                  console.error("Server error details:", error.response.data);
                }
              }

              // Load messages for temporary chat
              try {
                const chatMessages = await getMessages(user.id, targetUserId);
                if (!isMounted) return;
                setMessages(chatMessages);
              } catch (error) {
                console.error(
                  "Error loading messages for temporary chat:",
                  error,
                );
                if (error.response && error.response.data) {
                  console.error("Server error details:", error.response.data);
                }
                if (!isMounted) return;
                setMessages([]);
              }
            }
          } catch (error) {
            console.error("Error handling target user:", error);
            // Create a minimal chat object even if we can't fetch user details
            if (!isMounted) return;
            const temporaryChat = {
              id: targetUserId,
              name: targetUserName || "Unknown User",
              avatar: "",
              lastMessage: "",
              timestamp: new Date().toISOString(),
              unread: 0,
              online: false,
            };
            setSelectedChat(temporaryChat);
            setMessages([]);
          }
        }
      } catch (error) {
        console.error("Error handling target user:", error);
      } finally {
        // Always set loading to false after handling target user
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    // Only initialize if we have a user
    if (user && user.id) {
      initializeChat().then(() => {
        // Handle target user after chat list is loaded
        if (targetUserId && user && user.id) {
          // Call the handleTargetUser function
          handleTargetUser();
        } else if (!targetUserId) {
          // If no target user, set loading to false
          if (isMounted) {
            setLoading(false);
          }
        }
      });
    } else if (!user || !targetUserId) {
      // If no user or target user, set loading to false
      if (isMounted) {
        setLoading(false);
      }
    }

    // Listen for new messages
    const handleMessageReceived = (message) => {
      console.log("receiveMessage event received on client:", message);
      console.log("Current selectedChat (from ref):", selectedChatRef.current);

      const currentChat = selectedChatRef.current;

      // Handle both string and object IDs
      const messageSenderId = message.senderId?._id || message.senderId;
      const messageReceiverId = message.receiverId?._id || message.receiverId;
      const currentUserId = user.id || user._id;
      const currentChatId = currentChat?.id || currentChat?._id;

      const isRelevantMessage =
        currentChat &&
        ((currentChatId === messageSenderId &&
          messageReceiverId === currentUserId) ||
          (currentChatId === messageReceiverId &&
            messageSenderId === currentUserId));

      console.log("Is relevant message:", isRelevantMessage);

      if (isRelevantMessage) {
        setMessages((prev) => {
          const newMessages = [...prev];

          const messageExists = newMessages.some(
            (msg) => msg._id === message._id,
          );

          if (!messageExists) {
            newMessages.push(message);
            return newMessages;
          } else {
            console.log("Message already exists, not adding");
            return prev;
          }
        });
      }

      loadChatList();
    };

    // Listen for sent messages confirmation
    const handleMessageSent = (message) => {
      // If we're currently viewing this chat, update the messages array
      if (
        selectedChat &&
        (selectedChat.id === message.senderId ||
          selectedChat.id === message.receiverId)
      ) {
        setMessages((prev) => {
          // Check if there's a temporary message to replace
          const hasTempMessage = prev.some(
            (msg) => msg._id && msg._id.startsWith("temp_"),
          );

          if (hasTempMessage) {
            // Replace the temporary message with the actual one
            return prev.map((msg) => {
              // Check if this is the temporary message we're replacing
              if (msg._id && msg._id.startsWith("temp_")) {
                return message;
              }
              return msg;
            });
          } else {
            // Check if the message already exists to avoid duplicates
            const messageExists = prev.some((msg) => msg._id === message._id);
            if (!messageExists) {
              // Add the message if it doesn't exist
              return [...prev, message];
            } else {
              // Return the existing messages array unchanged
              return prev;
            }
          }
        });
      }
    };

    // Listen for user online/offline status
    const handleUserOnline = (userId) => {
      // Update user status in chat list
      setChatList((prev) =>
        prev.map((chat) => {
          if (chat.id === userId) {
            return { ...chat, online: true };
          }
          return chat;
        }),
      );
    };

    const handleUserOffline = (userId) => {
      // Update user status in chat list
      setChatList((prev) =>
        prev.map((chat) => {
          if (chat.id === userId) {
            return { ...chat, online: false };
          }
          return chat;
        }),
      );
    };

    socket.on("receiveMessage", handleMessageReceived);
    socket.on("messageSent", handleMessageSent);
    socket.on("userOnline", handleUserOnline);
    socket.on("userOffline", handleUserOffline);

    // Clean up on unmount
    return () => {
      isMounted = false;
      socket.off("receiveMessage", handleMessageReceived);
      socket.off("messageSent", handleMessageSent);
      socket.off("userOnline", handleUserOnline);
      socket.off("userOffline", handleUserOffline);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    authLoading,
    user,
    loadChatList,
    targetUserId,
    handleSelectChat,
    targetUserName,
  ]);

  const handleSendMessage = async (content) => {
    if (!content.trim() || !selectedChat || !user) return;

    const senderId = user.id || user._id;
    const receiverId = selectedChat.id || selectedChat._id;

    if (!senderId || !receiverId) return;

    // Create a temporary message object for immediate display
    const tempId = `temp_${Date.now()}`;
    const tempMessage = {
      _id: tempId,
      senderId: senderId,
      receiverId: receiverId,
      content: content,
      timestamp: new Date().toISOString(),
    };

    // Immediately update the UI with the temporary message
    setMessages((prev) => [...prev, tempMessage]);

    try {
      // Send message through socket
      socket.emit("sendMessage", {
        senderId: senderId,
        receiverId: receiverId,
        content: content,
      });
    } catch (error) {
      console.error("Error sending message:", error);
      // Remove the temporary message if sending failed
      setMessages((prev) => prev.filter((msg) => msg._id !== tempMessage._id));
    }
  };

  if (loading || authLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="400px"
      >
        <Typography variant="h6">Loading chat...</Typography>
      </Box>
    );
  }

  // If user is not authenticated, show error message
  if (!user && !authLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="400px"
      >
        <Typography variant="h6">Please login to access chat.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      {targetUserId ? (
        // When coming from "Start Chat" button, show only the chat window
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
              Chat with {targetUserName || selectedChat?.name || "User"}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Paper
              elevation={3}
              sx={{ height: "70vh", display: "flex", flexDirection: "column" }}
            >
              {selectedChat ? (
                <ChatWindow
                  selectedChat={selectedChat}
                  messages={messages}
                  onSendMessage={handleSendMessage}
                  currentUser={user}
                  chats={chatList}
                  targetUserName={targetUserName}
                />
              ) : (
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  flexGrow={1}
                >
                  <Typography variant="h6">Loading chat...</Typography>
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>
      ) : (
        // Regular chat interface with chat list
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
              Chat
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ height: "70vh", overflow: "hidden" }}>
              <ChatList
                chats={chatList}
                onSelectChat={handleSelectChat}
                selectedChat={selectedChat}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={8}>
            <Paper
              elevation={3}
              sx={{ height: "70vh", display: "flex", flexDirection: "column" }}
            >
              {selectedChat ? (
                <ChatWindow
                  selectedChat={selectedChat}
                  messages={messages}
                  onSendMessage={handleSendMessage}
                  currentUser={user}
                  chats={chatList}
                  targetUserName={targetUserName}
                />
              ) : (
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  flexGrow={1}
                >
                  <Typography variant="h6">
                    Select a chat to start messaging
                  </Typography>
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default ChatContainer;
