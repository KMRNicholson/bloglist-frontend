import {
  useNotificationDispatch,
  showNotification,
} from "../shared/contexts/NotificationContext";
import { login } from "./reducers/authReducer";
import { useDispatch } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
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
  };

  return (
    <div>
      <h2>Log in</h2>
      <form onSubmit={loginUser}>
        <div>
          <label htmlFor="username">Username:</label>
          <input id="username" type="text" name="username" />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input id="password" type="password" name="password" />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </div>
  );
};

export default Login;
