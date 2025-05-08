import React, { useState } from 'react';
import axios from 'axios';

const BlogForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:5259/api/BlogPosts', { title, content });
      console.log('Post added:', response.data);
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
  <label htmlFor="content">Content:</label>
  <textarea
    id="content"
    value={content}
    onChange={(e) => setContent(e.target.value)}
    required
  />
  <div style={{ fontSize: '0.8rem', color: '#555' }}>
    Characters: {content.length}
  </div>
</div>
<div>
  <button type="button" onClick={() => setContent(content + '**bold**')}>Bold</button>
  <button type="button" onClick={() => setContent(content + '*italic*')}>Italic</button>
</div>
    </form>
  );
};

export default BlogForm;