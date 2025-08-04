<<<<<<< HEAD
import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Paper,
  List,
  ListItem,
  ListItemText,
  Avatar,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { getColorForChar } from "../../utils/avatarColors";

const ChatWindow = ({ selectedChat, messages, onSendMessage, currentUser }) => {
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  // console.log("ChatWindow received messages:", messages);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    onSendMessage(newMessage);

    // Clear input
    setNewMessage("");
  };

  // Scroll to bottom of chat
  useEffect(() => {
    // console.log("Messages updated, scrolling to bottom");
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {selectedChat ? (
        <>
          {/* Chat Header */}
          <Box
            sx={{
              p: 2,
              borderBottom: 1,
              borderColor: "divider",
              display: "flex",
              alignItems: "center",
              bgcolor: "background.paper",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
              <Avatar
                sx={{
                  width: 40,
                  height: 40,
                  mr: 2,
                  bgcolor: getColorForChar(
                    selectedChat?.name?.charAt(0).toUpperCase() || "U",
                  ),
                }}
              >
                {selectedChat?.name?.charAt(0).toUpperCase() || "U"}
              </Avatar>
              <Box>
                <Typography variant="h6">
                  {selectedChat?.name || "Unknown User"}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Messages Container */}
          <Box sx={{ flexGrow: 1, overflow: "auto", p: 2 }}>
            <List>
              {messages &&
                messages.map((message) => (
                  <ListItem
                    key={message?._id || Math.random()}
                    sx={{
                      flexDirection: "column",
                      alignItems:
                        message?.senderId === currentUser?.id
                          ? "flex-end"
                          : "flex-start",
                    }}
                  >
                    <ListItemText
                      primary={
                        <Paper
                          sx={{
                            p: 1,
                            maxWidth: "70%",
                            bgcolor:
                              message?.senderId === currentUser?.id
                                ? "primary.main"
                                : "grey.200",
                            color:
                              message?.senderId === currentUser?.id
                                ? "white"
                                : "text.primary",
                            borderRadius: 2,
                            mb: 1,
                          }}
                        >
                          <Typography variant="body1">
                            {message?.content || ""}
                          </Typography>
                        </Paper>
                      }
                      secondary={
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ display: "block" }}
                        >
                          {message?.timestamp
                            ? new Date(message.timestamp).toLocaleTimeString(
                                [],
                                { hour: "2-digit", minute: "2-digit" },
                              )
                            : ""}
                        </Typography>
                      }
                      sx={{
                        textAlign:
                          message?.senderId === currentUser?.id
                            ? "right"
                            : "left",
                      }}
                    />
                  </ListItem>
                ))}
              <div ref={messagesEndRef} />
            </List>
          </Box>

          {/* Message Input */}
          <Box
            component="form"
            onSubmit={handleSendMessage}
            sx={{
              p: 2,
              borderTop: 1,
              borderColor: "divider",
              display: "flex",
              alignItems: "center",
              bgcolor: "background.paper",
            }}
          >
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              sx={{ mr: 1 }}
            />
            <IconButton
              type="submit"
              color="primary"
              disabled={!newMessage.trim()}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </>
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexGrow={1}
        >
          <Typography variant="h6" color="text.secondary">
            Select a chat to start messaging
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ChatWindow;
=======
import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Paper,
  List,
  ListItem,
  ListItemText,
  Avatar,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { getColorForChar } from "../../utils/avatarColors";

const ChatWindow = ({ selectedChat, messages, onSendMessage, currentUser }) => {
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  // console.log("ChatWindow received messages:", messages);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    onSendMessage(newMessage);

    // Clear input
    setNewMessage("");
  };

  // Scroll to bottom of chat
  useEffect(() => {
    // console.log("Messages updated, scrolling to bottom");
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {selectedChat ? (
        <>
          {/* Chat Header */}
          <Box
            sx={{
              p: 2,
              borderBottom: 1,
              borderColor: "divider",
              display: "flex",
              alignItems: "center",
              bgcolor: "background.paper",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
              <Avatar
                sx={{
                  width: 40,
                  height: 40,
                  mr: 2,
                  bgcolor: getColorForChar(
                    selectedChat?.name?.charAt(0).toUpperCase() || "U",
                  ),
                }}
              >
                {selectedChat?.name?.charAt(0).toUpperCase() || "U"}
              </Avatar>
              <Box>
                <Typography variant="h6">
                  {selectedChat?.name || "Unknown User"}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Messages Container */}
          <Box sx={{ flexGrow: 1, overflow: "auto", p: 2 }}>
            <List>
              {messages &&
                messages.map((message) => (
                  <ListItem
                    key={message?._id || Math.random()}
                    sx={{
                      flexDirection: "column",
                      alignItems:
                        message?.senderId === currentUser?.id
                          ? "flex-end"
                          : "flex-start",
                    }}
                  >
                    <ListItemText
                      primary={
                        <Paper
                          sx={{
                            p: 1,
                            maxWidth: "70%",
                            bgcolor:
                              message?.senderId === currentUser?.id
                                ? "primary.main"
                                : "grey.200",
                            color:
                              message?.senderId === currentUser?.id
                                ? "white"
                                : "text.primary",
                            borderRadius: 2,
                            mb: 1,
                          }}
                        >
                          <Typography variant="body1">
                            {message?.content || ""}
                          </Typography>
                        </Paper>
                      }
                      secondary={
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ display: "block" }}
                        >
                          {message?.timestamp
                            ? new Date(message.timestamp).toLocaleTimeString(
                                [],
                                { hour: "2-digit", minute: "2-digit" },
                              )
                            : ""}
                        </Typography>
                      }
                      sx={{
                        textAlign:
                          message?.senderId === currentUser?.id
                            ? "right"
                            : "left",
                      }}
                    />
                  </ListItem>
                ))}
              <div ref={messagesEndRef} />
            </List>
          </Box>

          {/* Message Input */}
          <Box
            component="form"
            onSubmit={handleSendMessage}
            sx={{
              p: 2,
              borderTop: 1,
              borderColor: "divider",
              display: "flex",
              alignItems: "center",
              bgcolor: "background.paper",
            }}
          >
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              sx={{ mr: 1 }}
            />
            <IconButton
              type="submit"
              color="primary"
              disabled={!newMessage.trim()}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </>
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexGrow={1}
        >
          <Typography variant="h6" color="text.secondary">
            Select a chat to start messaging
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ChatWindow;
>>>>>>> origin/main
