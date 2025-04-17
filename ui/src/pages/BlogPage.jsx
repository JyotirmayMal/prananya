import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

function BlogPage() {
  const { blogTitle } = useParams(); // Get the blog title from the URL parameter
  const [blogContent, setBlogContent] = useState(null);

  useEffect(() => {
    // Fetch the blog content from a local file or API based on the blogTitle
    // This is a placeholder for demonstration purposes. Replace with your actual data fetching logic.
    const fetchBlogContent = async () => {
      try {
        const response = await fetch(`http://localhost:5555/blogs/${blogTitle}`);
        const data = await response.json();
        setBlogContent(data);
      } catch (error) {
        console.error('Error fetching blog content:', error);
      }
    };

    fetchBlogContent();
  }, [blogTitle]);

  if (!blogContent) {
    return <div>Loading...</div>; // Display loading message until data is fetched
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '900px', margin: 'auto' }}>
      <h1>{blogContent.title}</h1>
      <p><strong>by {blogContent.author}</strong></p>
      <div>
        <p>{blogContent.content}</p>
      </div>
    </div>
  );
}

export default BlogPage;
