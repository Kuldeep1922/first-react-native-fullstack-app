import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "./authContext";
import { Alert } from "react-native";

const PostContext = createContext();

const PostProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [state, setState] = useContext(AuthContext);

  const getAllPosts = async () => {
    setLoading(true);
    try {
      const token = state?.token;

      if (!token) {
        // Alert.alert("Error", "No token found. Please log in again.");
        setLoading(false);
        return;
      }

      const { data } = await axios.get("/post/get-all-post", {
        headers: {
          Authorization: `Bearer ${token}`, // Add token to headers
        },
      });

      setPosts(data?.data);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching posts: ", error);
      setLoading(false);
    }
  };

  // Only fetch posts once when the component mounts
  useEffect(() => {
    getAllPosts();
  }, [state,posts]); // Empty dependency array to avoid infinite loop

  return (
    <PostContext.Provider value={[posts, setPosts]}>
      {children}
    </PostContext.Provider>
  );
};

export { PostContext, PostProvider };
