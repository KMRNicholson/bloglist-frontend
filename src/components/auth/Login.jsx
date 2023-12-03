import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "./reducers/authReducer";
import {
  useNotificationDispatch,
  showNotification,
} from "../shared/contexts/NotificationContext";

import { Button, Stack, Input } from "@mui/joy";
import Notification from "../shared/Notification";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notificationDispatch = useNotificationDispatch();

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
    <div>
      <h2>Log in</h2>
      <Notification />
      <form onSubmit={loginUser}>
        <Stack spacing={1}>
          <Input name="username" placeholder="Username" />
          <Input name="password" type="password" placeholder="Password" />
          <Button type="submit">Login</Button>
        </Stack>
      </form>
    </div>
  );
};

export default Login;
