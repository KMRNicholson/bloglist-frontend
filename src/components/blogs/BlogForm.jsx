import { useState, useRef } from "react";
import Togglable from "../shared/Togglable";
import { setNotification } from "../shared/reducers/notificationReducer";
import { useDispatch } from "react-redux";

const BlogForm = ({ setBlogs, existingBlogs, createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const dispatch = useDispatch();

  const newBlogRef = useRef();

  const clearInputs = () => {
    setTitle("");
    setAuthor("");
    setUrl("");
    newBlogRef.current.toggleVisibility();
  };

  const create = async (event) => {
    event.preventDefault();

    const newBlog = {
      title,
      author,
      url,
    };

    let type = "success";
    let message = "Blog created successfully";

    try {
      const blog = await createBlog(newBlog);

      const newBlogs = [...existingBlogs, blog];

      setBlogs(newBlogs);
      clearInputs();
    } catch {
      type = "error";
      message = "Failed to create blog";
    } finally {
      dispatch(
        setNotification({
          message,
          type,
        })
      );
    }
  };

  const handleChange = (callback) => (event) => callback(event.target.value);

  return (
    <div>
      <Togglable buttonId="new-blog" buttonLabel={"New Blog"} ref={newBlogRef}>
        <h3>New Blog</h3>

        <form onSubmit={create}>
          <div>
            <label htmlFor="title-input">Title:</label>
            <input
              id="title-input"
              type="text"
              name="title"
              onChange={handleChange(setTitle)}
              value={title}
            />
          </div>
          <div>
            <label htmlFor="author-input">Author:</label>
            <input
              id="author-input"
              type="text"
              name="author"
              onChange={handleChange(setAuthor)}
              value={author}
            />
          </div>
          <div>
            <label htmlFor="url-input">Url:</label>
            <input
              id="url-input"
              type="url"
              name="url"
              onChange={handleChange(setUrl)}
              value={url}
            />
          </div>
          <button id="create-button" type="submit">
            create
          </button>
        </form>
      </Togglable>
    </div>
  );
};

export default BlogForm;
