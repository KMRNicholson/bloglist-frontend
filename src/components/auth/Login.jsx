import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "./reducers/authReducer";
import {
  useNotificationDispatch,
  showNotification,
} from "../shared/contexts/NotificationContext";

import {
  Button,
  Stack,
  TextField,
  Container,
  Typography,
  Box,
} from "@mui/material";
import Notification from "../shared/Notification";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notificationDispatch = useNotificationDispatch();

  const centerContent = {
    justifyContent: "center",
    display: "flex",
  };

  const widthStyle = (widthPercent, maxWidth) => ({
    width: widthPercent,
    maxWidth: maxWidth,
  });

  const loginUser = (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    dispatch(login(username, password)).catch((error) => {
      showNotification(notificationDispatch, {
        message: error,
        type: "error",
      });
    });

    navigate("/blogs");
  };

  return (
    <Container sx={centerContent}>
      <Box sx={widthStyle("100%", 400)}>
        <form onSubmit={loginUser}>
          <Stack spacing={1}>
            <Typography sx={centerContent} variant="h4">
              Blogger
            </Typography>
            <TextField name="username" placeholder="Username" />
            <TextField name="password" type="password" placeholder="Password" />
            <Button variant="contained" type="submit">
              Sign in
            </Button>
          </Stack>
        </form>
      </Box>
      <Notification />
    </Container>
  );
};

export default Login;
