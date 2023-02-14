import React from 'react';

function UserPost({ newPost, setNewPost, addPost }) {
  return (
    <>
      <input
        type='text'
        onChange={(e) => setNewPost(e.target.value)}
        placeholder='message here!!!'
        value={newPost}
      />
      {console.log(newPost)}
      <button onClick={() => { addPost(); }}> Post </button>
    </>
  );
}

export default UserPost;