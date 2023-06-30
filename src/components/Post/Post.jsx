import { useState } from "react";

import { useData } from "../../contexts/DataContext";

export const Post = () => {
  const [newPost, setNewPost] = useState("");
  const { posts, postDispatcher } = useData();

  const addPostToDB = async (post) => {
    try {
      const passValue = JSON.stringify({ postData: { content: post } });

      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
        body: passValue,
      });

      const data = await response.json();

      // if 
      
      postDispatcher({type : "CREATE", payload : data.posts})
      return data.posts;
    } catch (e) {}
  };

  return (
    <div>
      <input
        type="text"
        placeholder="What's happening? "
        onChange={(e) => setNewPost(e.target.value)}
      />
      <button onClick={()=>addPostToDB(newPost)}>Post</button>
    </div>
  );
};
