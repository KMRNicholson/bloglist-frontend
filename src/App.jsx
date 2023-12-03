import Dashboard from "./components/home/Dashboard";
import Login from "./components/auth/Login";
import { useSelector } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { Container } from "@mui/material";

const App = () => {
  const auth = useSelector((state) => state.auth);

  const style = {
    display: "flex",
  };

  return (
    <Container sx={style}>
      <Router>{auth.success ? <Dashboard /> : <Login />}</Router>
    </Container>
  );
};

export default App;
