import Axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const getLocalToken = (): string | null => {
  const token = window.localStorage.getItem("token");
  return token;
}

const setToken = (token: string): void => {
    window.localStorage.setItem('token', token)
}

Axios.interceptors.request.use((config: AxiosRequestConfig) => {
    if(getLocalToken()) {
        config.headers.Authorization = getLocalToken()
    }
    return config
}, (err: any) => Promise.reject(err))

Axios.interceptors.response.use((response: AxiosResponse) => {
    const { code } = response.data
    if(code === 1234) {
        window.location.href = '/login'
        console.log("token过期")
    }
    return response
}, (err: any) => Promise.reject(err))

export default Axios
