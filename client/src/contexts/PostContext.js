import axios from "axios";
import { createContext, useReducer, useState } from "react";
import { postReducer } from "../reducer/postReducer";
import { apiURL, POSTS_LOADED_FAILED, POSTS_LOADED_SUCCESS } from "./constants";

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {

    //State
    const [postState, dispatch] = useReducer(postReducer, {
        posts: [],
        postsLoading: true
    })

    const [showAddModalPost, setShowAddModalPost] = useState(false)

    //All posts
    const getPosts = async () => {
        try {
            const response = await axios.get(`${apiURL}/posts`)
            if (response.data.success) {
                dispatch({ type: POSTS_LOADED_SUCCESS, payload: response.data.posts })
            }
        } catch (error) {
            dispatch({
                type: POSTS_LOADED_FAILED,
                payload: error.data
            })
        }
    }

    const postContextData = { postState, getPosts, showAddModalPost, setShowAddModalPost }

    return (
        <PostContext.Provider value={postContextData}>
            {children}
        </PostContext.Provider>
    )
}

export default PostContextProvider