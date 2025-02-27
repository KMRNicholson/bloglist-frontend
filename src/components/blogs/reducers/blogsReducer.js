import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
import blogsService from "../services/blogsService";

const blogsSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    set: (state, action) => action.payload,
    append: (state, action) => (state = [...state, action.payload]),
    removeById: (state, action) =>
      (state = state.filter((blog) => blog.id !== action.payload)),
    incrementLikesById: (state, action) =>
      (state = state.map((blog) =>
        blog.id !== action.payload.id
          ? blog
          : { ...blog, likes: action.payload.likes }
      )),
    updateComments: (state, action) =>
      (state = state.map((blog) =>
        blog.id !== action.payload.id
          ? blog
          : { ...blog, comments: action.payload.comments }
      )),
  },
});

const { set, append, removeById, incrementLikesById, updateComments } =
  blogsSlice.actions;

export const create = (blog) => async (dispatch) => {
  try {
    const newBlog = await blogsService.create(blog);
    dispatch(append(newBlog));
  } catch {
    throw "Failed to create blog";
  }
};

export const getAll = () => async (dispatch) => {
  const blogs = await blogsService.getAll();
  dispatch(set(blogs));
};

export const remove = (blog) => async (dispatch) => {
  try {
    await blogsService.del(blog);
    dispatch(removeById(blog.id));
  } catch {
    throw "Failed to delete blog";
  }
};

export const like = (blog) => async (dispatch) => {
  const id = blog.id;
  const likes = blog.likes + 1;
  await blogsService.updateById(id, { likes: likes });
  dispatch(incrementLikesById({ id: id, likes: likes }));
};

export const comment = (blog, comment) => async (dispatch) => {
  const id = blog.id;
  const comments = [...blog.comments, comment];
  await blogsService.updateById(id, { comments: comments });
  dispatch(updateComments({ id: id, comments: comments }));
};

export default blogsSlice.reducer;
