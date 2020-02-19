import Axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import store from "../store";
import { updateToken } from "../views/Login/actionCreater";

const getLocalToken = (): string | null => {
  const token = window.localStorage.getItem("token");
  return token;
}

const removeToken = (): void => {
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('userInfo')
}

Axios.interceptors.request.use((config: AxiosRequestConfig) => {
    if(getLocalToken()) {
        config.headers.common['Authorization'] = 'Bearer ' + getLocalToken()
    }
    return config
}, (err: any) => Promise.reject(err))

Axios.interceptors.response.use((response: AxiosResponse) => {
    const { code, isAuth } = response.data
    
    if(!isAuth && code === 1234) {
        removeToken()
    }
    return response
}, (err: any) => Promise.reject(err))

export default Axios
