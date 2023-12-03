import { useSelector } from "react-redux";
import { Routes, Route, useMatch } from "react-router-dom";
import { Container } from "@mui/material";
import _ from "lodash";
import BlogList from "../blogs/BlogList";
import Blog from "../blogs/Blog";
import UserList from "../users/UserList";
import User from "../users/User";
import Notification from "../shared/Notification";
import NavigationBar from "../shared/NavigationBar";

const Dashboard = () => {
  const auth = useSelector((state) => state.auth);
  const unorderdBlogs = useSelector((state) => state.blogs);
  const users = useSelector((state) => state.users);

  const blogs = _.orderBy(unorderdBlogs, "likes", "desc");

  const matchObjectByRoute = (route, list) => {
    const match = useMatch(route);
    return match ? list.find((object) => object.id === match.params.id) : null;
  };

  const matchedUser = matchObjectByRoute("/users/:id", users);
  const matchedBlog = matchObjectByRoute("/blogs/:id", blogs);

  if (auth === null) return;

  return (
    <Container>
      <NavigationBar user={auth.user} />
      <Notification />

      <Routes>
        <Route path="/" element={<div />} />
        <Route path="/blogs" element={<BlogList blogs={blogs} />} />
        <Route path="/blogs/:id" element={<Blog blog={matchedBlog} />} />
        <Route path="/users" element={<UserList users={users} />} />
        <Route path="/users/:id" element={<User user={matchedUser} />} />
      </Routes>
    </Container>
  );
};

export default Dashboard;
