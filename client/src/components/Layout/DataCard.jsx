import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const DataCard = ({
  icon,
  label,
  value,
  unit,
  subtext,
  valueColor = "primary",
  editable = false,
  onEdit,
}) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleOpen = () => {
    setInputValue("");
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const handleSave = () => {
    if (onEdit && inputValue !== "") {
      onEdit(inputValue);
    }
    setOpen(false);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Card
        elevation={0}
        sx={{
          p: { xs: 1.5, sm: 2, md: 2.5 },
          borderRadius: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          border: "1px solid #e0e0e0",
          background: "#fff",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.84)",
          position: "relative",
          mx: "auto",
        }}
      >
        <CardContent
          sx={{
            textAlign: "center",
            p: { xs: 1, sm: 1.5, md: 2 },
            width: "100%",
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            sx={{
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            {icon && (
              <Box
                sx={{
                  padding: { xs: 1.5, sm: 2 },
                  bgcolor: "#73768e21",
                  borderRadius: "50%",
                  width: { xs: 40, sm: 44, md: 48 },
                  height: { xs: 40, sm: 44, md: 48 },
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {icon}
              </Box>
            )}
            <Box sx={{ flexGrow: 1, textAlign: { xs: "center", sm: "left" }, ml: { xs: 0, sm: 2 }, mt: { xs: 1, sm: 0 } }}>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                sx={{
                  mb: 0.5,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: { xs: "center", sm: "flex-start" },
                  fontSize: { xs: "0.875rem", sm: "1rem" },
                }}
              >
                {label}
                {editable && (
                  <IconButton
                    size="small"
                    onClick={handleOpen}
                    sx={{ ml: 0.5 }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                )}
              </Typography>
              <Typography
                variant="h4"
                color={valueColor}
                fontWeight="bold"
                sx={{
                  lineHeight: 1,
                  fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
                }}
              >
                {value !== undefined && value !== null ? value : "--"}
                {unit && (
                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    component="span"
                    color="text.secondary"
                    sx={{
                      ml: 0.5,
                      fontWeight: 400,
                      fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" },
                    }}
                  >
                    {unit}
                  </Typography>
                )}
              </Typography>
            </Box>
          </Box>
        </CardContent>
        {editable && (
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Update {label}</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                label={`Enter new ${label.toLowerCase()}`}
                type="number"
                fullWidth
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleSave} variant="contained">
                Save
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </Card>
    </Box>
  );
};

export default DataCard;
