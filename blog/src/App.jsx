import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';

const API_URL = 'http://localhost:5259/api/Blog';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const fetchPosts = async () => {
    try {
      const response = await axios.get(API_URL);
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, { title, content });
      setTitle('');
      setContent('');
      fetchPosts();
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this post?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div className="app">
      <div className="header">
        <h1>Minimalist Blog</h1>
        <p>Share your thoughts clearly and beautifully</p>
      </div>

      <form className="blog-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Blog title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Write your post content..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={5}
          required
        />
        <button type="submit">Post</button>
      </form>

      <div className="blog-list">
        {posts.length === 0 ? (
          <p className="empty">No posts yet</p>
        ) : (
          posts.map((post) => (
            <div className="blog-post" key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              <div className="meta">
                <span>{new Date(post.timestamp).toLocaleString()}</span>
                <button onClick={() => handleDelete(post.id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default App;
