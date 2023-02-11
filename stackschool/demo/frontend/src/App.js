import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';

const URL = "http://localhost:8080";

function App() {
  const [posts, setPosts] = useState([]);

  //Gets the entire feed
  function getFeed() {
    axios.get(URL + "/feed")
        .then(response => { 
          setPosts(response.data);
        })
        .catch(console.error)
  }

  useEffect(() => {
    getFeed();
  }, []);

  return (
    <div>
      {posts.map(post => 
        <div>
          <h3> {post.user} </h3>
          <p> {post.content} - Time: {post.timestamp} - Likes: {post.num_likes}</p>
        </div>        
      )}
    </div>
  );
}

export default App;
