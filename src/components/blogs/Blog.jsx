import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  useNotificationDispatch,
  showNotification,
} from "../shared/contexts/NotificationContext";
import { remove, like, comment } from "./reducers/blogsReducer";

const Blog = ({ blog }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const notificationDispatch = useNotificationDispatch();

  const className = "blog";

  const deleteBlog = (blog) => () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(remove(blog))
        .then(() => {
          showNotification(notificationDispatch, {
            message: "Blog deleted successfully.",
            type: "success",
          });
        })
        .catch((error) => {
          showNotification(notificationDispatch, {
            message: error,
            type: "error",
          });
        });
      navigate("/blogs");
    }
  };

  const addComment = (blog) => (event) => {
    event.preventDefault();

    const newComment = event.target.comment.value;

    dispatch(comment(blog, newComment));
    event.target.comment.value = "";
  };

  const likeBlog = (blog) => () => dispatch(like(blog));

  return (
    <div className={`${className}`}>
      <h3>{blog.title}</h3>
      <div className={`${className}-url`}>
        <a href={blog.url} target="_blank">
          {blog.url}
        </a>
      </div>
      <div id={`${className}-likes`} className={`${className}-likes`}>
        {blog.likes} likes
      </div>
      <button id="like-button" onClick={likeBlog(blog)}>
        like
      </button>
      <div>added by {blog.author}</div>
      {blog.user.username === auth.user.username && (
        <button id="remove-button" onClick={deleteBlog(blog)}>
          remove
        </button>
      )}
      <h4>comments</h4>
      <form onSubmit={addComment(blog)}>
        <div>
          <label htmlFor="comment-input" />
          <input id="comment-input" type="text" name="comment" />
          <button id="add-comment" type="submit">
            add comment
          </button>
        </div>
      </form>
      <ul>
        {blog.comments.map((comment) => (
          <li key={comment}>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default Blog;
