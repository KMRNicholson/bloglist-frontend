import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../auth/reducers/authReducer";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Typography,
  Box,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";

const navItems = ["Blogs", "Users"];

const NavigationBar = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleNavigation = (item) => () => navigate(`/${item.toLowerCase()}`);

  return (
    <div>
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" sx={{ fontFamily: "cursive" }}>
            Blogger
          </Typography>
          <Box sx={{ justifyContent: "right", width: "100%", display: "flex" }}>
            {navItems.map((item) => (
              <Button
                color="inherit"
                id={item}
                onClick={handleNavigation(item)}
                key={item}
              >
                {item}
              </Button>
            ))}
            <IconButton size="large" color="inherit">
              <AccountCircle />
            </IconButton>
            <Button color="inherit" onClick={handleLogout}>
              Sign out
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavigationBar;
