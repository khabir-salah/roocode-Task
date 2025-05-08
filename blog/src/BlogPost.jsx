import axios from 'axios';

const BlogPost = ({ post }) => {
  const formattedDate = new Date(post.timestamp).toLocaleString();

  const handleDelete = async () => {
    const preview = post.content.slice(0, 100) + (post.content.length > 100 ? '...' : '');
    const confirmed = window.confirm(`Are you sure you want to delete this post?\n\nPreview:\n"${preview}"`);
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:5259/api/BlogPosts/${post.id}`);
        window.location.reload(); // refresh to reflect changes
      } catch (error) {
        console.error('Delete failed', error);
      }
    }
  };

  return (
    <div className="blog-post">
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p style={{ fontSize: '0.8rem', color: '#777' }}>Last updated: {formattedDate}</p>
      <button onClick={handleDelete} style={{ color: 'red' }}>Delete</button>
    </div>
  );
};
