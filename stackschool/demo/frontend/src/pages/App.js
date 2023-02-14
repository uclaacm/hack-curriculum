import '../App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import UserPost from '../components/UserPost';

const URL = "http://localhost:8080";

function App() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  
  // Get the posts feed
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

  // Add a post
  function addPost() {

    if (newPost === '') {
      console.log('You must enter a value!');
      return;
    }

    axios.post(URL + '/feed/new', {
        content: newPost,
        user: "testuser",
      })
      .then(response => {
        console.log(response);
      })
      .catch(console.error)

    setNewPost('');
  }

  // Like a post
  function incrementLike(id) {
    axios.put(URL + '/feed/like/' + id)
      .then(response => {
        console.log(response);
      })
      .catch(console.error)
  }

  useEffect(() => {
    getFeed();
  }, [posts]);


  return (
    <div>
      <UserPost newPost={newPost} setNewPost={setNewPost} addPost={addPost} />
      {posts.map((post, i) => 
        <div key={i}>
          <h3 className={(post.user === "Pogmaster") ? "rainbow" : ""}> {post.user} </h3>
          <p> {post.content} - Time: {post.timestamp} - Likes: {post.num_likes}</p>
          <button onClick={() => {incrementLike(post._id);}}>Like</button>
        </div>        
      )}
    </div>
  );
}

export default App;
