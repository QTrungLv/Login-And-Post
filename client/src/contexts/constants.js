export const apiURL =
    process.env.NODE_ENV !== 'production' ? 'http://localhost:5000/api' : 'someURL'
export const LOCAL_STORAGE_TOKEN_NAME = 'learnit-mern'

export const POSTS_LOADED_SUCCESS = 'POSTS_LOADED_SUCCESS'
export const POSTS_LOADED_FAILED = 'POSTS_LOADED_FAILED'