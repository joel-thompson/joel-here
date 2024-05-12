import React from 'react';
import { useParams } from 'react-router-dom';

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  // TODO: Fetch and display blog post based on id
  return (
    <div>
      <h1>Blog Post {id}</h1>
    </div>
  );
};

export default BlogPost;
