import apiService from "../api/apiService";

//register api : called by authentication component when register btn clicked 
export const registerAPI = async (userData)=>{
    return await apiService("POST","/register",userData) 
    // we didnt give reqHeader bcz defaultly header is json so it is same if didnt give
}

//login api : called by authentication component when register btn clicked 
export const loginAPI = async (userData)=>{
    return await apiService("POST","/login",userData) 
    // we didnt give reqHeader bcz defaultly header is json so it is same if didnt give
}
// 
export const googleLoginAPI = async (userData)=>{
    return await apiService("POST","/google-login",userData) }  


    //useredit api : called by edit component when update btn  clicked
export const userUpdateAPI = async (userId,userData)=>{
    return await apiService("PUT",`/user/${userId}`,userData)
}