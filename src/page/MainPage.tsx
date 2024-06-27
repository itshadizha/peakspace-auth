import React from "react";
import { logout } from "../store/authSlice/authThunk";
import { useAppDispatch } from "../hooks/hooks";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const MainPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logoutHandle = () => {
    dispatch(logout({ navigate }));
  };

  return (
    <div>
      <Button onClick={logoutHandle}>log out</Button>
    </div>
  );
};

export default MainPage;
