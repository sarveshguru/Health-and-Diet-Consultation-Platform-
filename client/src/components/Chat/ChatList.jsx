import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Divider,
} from "@mui/material";
import { getColorForChar } from "../../utils/avatarColors";

const ChatList = ({ chats, onSelectChat, selectedChat }) => {
  console.log("chats: ", chats);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (diffInDays === 1) {
      return "Yesterday";
    } else if (diffInDays < 7) {
      return date.toLocaleDateString([], { weekday: "long" });
    } else {
      return date.toLocaleDateString([], { month: "short", day: "numeric" });
    }
  };

  return (
    <List sx={{ width: "100%", maxHeight: "70vh", overflow: "auto" }}>
      {chats && chats.length > 0 ? (
        chats.map((chat) => (
          <React.Fragment key={chat.id}>
            <ListItem
              alignItems="flex-start"
              onClick={() => onSelectChat(chat)}
              sx={{
                cursor: "pointer",
                backgroundColor:
                  selectedChat && selectedChat.id === chat.id
                    ? "action.selected"
                    : "transparent",
                "&:hover": {
                  backgroundColor: "action.hover",
                },
              }}
            >
              <ListItemAvatar>
                <Avatar
                  sx={{
                    bgcolor: getColorForChar(
                      (chat?.name?.trim() || "U").charAt(0).toUpperCase(),
                    ),
                  }}
                >
                  {(chat?.name?.trim() || "U").charAt(0).toUpperCase()}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="subtitle1" fontWeight="bold">
                    {chat?.name || "Unknown User"}
                  </Typography>
                }
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {chat?.role || "user"}
                    </Typography>
                    {chat?.lastMessage && (
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          display: "block",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {chat.lastMessage}
                      </Typography>
                    )}
                  </React.Fragment>
                }
              />
              <Typography variant="caption" color="text.secondary">
                {chat?.timestamp ? formatDate(chat.timestamp) : ""}
              </Typography>
            </ListItem>
            <Divider component="li" />
          </React.Fragment>
        ))
      ) : (
        <ListItem>
          <ListItemText
            primary={
              <Typography variant="body1" align="center" color="text.secondary">
                No chats yet
              </Typography>
            }
          />
        </ListItem>
      )}
    </List>
  );
};

export default ChatList;
