import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, TextField } from "@mui/material";
import { RootState } from "../store/store";
import { forgotPassword } from "../store/authSlice/authThunk";

const ForgotPassword: React.FC = () => {
  const dispatch = useDispatch();
  const message = useSelector((state: RootState) => state.auth.message);
  const [email, setEmail] = useState("");

  const handleForgotPassword = () => {
    const frontEndUrl = "http://localhost:5175/reset";
    dispatch(forgotPassword({ email, frontEndUrl })); 
  };

  return (
    <Box
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        handleForgotPassword();
      }}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        maxWidth: 400,
        margin: "auto",
        padding: 2,
        border: "1px solid #ccc",
        borderRadius: 8,
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        required
        variant="outlined"
        sx={{ marginBottom: 1 }}
      />
      <Button type="submit" variant="contained" size="large">
        Восстановить пароль
      </Button>
      {message && (
        <p
          style={{
            textAlign: "center",
            marginTop: 16,
            color: message.includes("успешно") ? "green" : "red",
          }}
        >
          {message}
        </p>
      )}
    </Box>
  );
};

export default ForgotPassword;
