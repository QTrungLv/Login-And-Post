//Quan li trang thai
import { createContext, useReducer } from "react";
import axios from 'axios'
import { authReudcer } from "../reducer/AuthReducer"
import { apiURL, LOCAL_STORAGE_TOKEN_NAME } from "./constants";

export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
    //Khoi tao trang thai ban dau
    const [authState, dispatch] = useReducer(authReudcer, {
        authLoading: true, //
        isAuthemnication: false, //Trang thai ban dau nguoi dung
        user: null
    })


    //Login
    const loginUser = async userForm => {
        try {
            const response = await axios.post(`${apiURL}/auth/login`,userForm)
            if (response.data.success)
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken)
            return response.data
        } catch (error) {
            if (error.response.data) return error.response.data
            else return { success: false, message: error.message }
        }
    }

    const authContextData = { loginUser }

    return (
        <AuthContext.Provider value={authContextData} >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider
