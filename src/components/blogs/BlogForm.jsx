import { useState, useRef } from 'react'
import { setStateTimeout } from '../../utils/helpers'
import blogsService from '../../services/blogs'
import Togglable from '../shared/Togglable'
import Notification from '../shared/Notification'

const BlogForm = ({ setBlogs, existingBlogs }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notification, setNotification] = useState('')

  const newBlogRef = useRef()

  const clearInputs = () => {
    setTitle('')
    setAuthor('')
    setUrl('')
    newBlogRef.current.toggleVisibility()
  }

  const create = async event => {
    event.preventDefault()

    const newBlog = {
      title,
      author,
      url
    }

    let type = 'success'
    let message = 'Blog created successfully'

    try {
      const blog = await blogsService.create(newBlog)

      const newBlogs = [
        ...existingBlogs,
        blog
      ]

      setBlogs(newBlogs)
      clearInputs()
    } catch {
      type = 'error'
      message = 'Failed to create blog'
    } finally {
      setStateTimeout(<Notification type={type} message={message} />, setNotification, 3000)
    }
  }

  const handleChange = (callback) => (event) => callback(event.target.value)

  return (
    <div>
      {notification}
      <Togglable buttonLabel={'New Blog'} ref={newBlogRef}>
        <h3>New Blog</h3>

        <form onSubmit={create}>
          <div>
            Title:
            <input
              type='text'
              name='title'
              onChange={handleChange(setTitle)}
              value={title}/>
          </div>
          <div>
            Author:
            <input
              type='text'
              name='author'
              onChange={handleChange(setAuthor)}
              value={author}/>
          </div>
          <div>
            Url:
            <input
              type='url'
              name='url'
              onChange={handleChange(setUrl)}
              value={url}/>
          </div>
          <button type='submit'>create</button>
        </form>
      </Togglable>
    </div>
  )
}

export default BlogForm
