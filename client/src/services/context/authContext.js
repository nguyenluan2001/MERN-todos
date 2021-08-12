import { createContext, useEffect,useState } from "react"
import axios from "axios"
import { API_URL } from "../constant"
import setAuthToken from "../../utils/setAuthToken"
import { Provider, useDispatch,useSelector } from "react-redux"
import { isLogged } from "../slice/authSlice"
import { store } from "../store"
import { useHistory } from "react-router-dom"
const AuthContext = createContext()
const AuthProvider = ({ children }) => {
    const dispatch = useDispatch()
    const auth=useSelector(state=>state.auth)
    const history = useHistory()
    const [currentUser,setCurrentUser]=useState(null)
    async function checkAuth() {
        let token = localStorage.getItem("token")
        setAuthToken(token)
        let res = await axios.get(`${API_URL}/auth/checkLogin`)
        if (res.data.user) {
            console.log("check auth")
            setCurrentUser(res.data.user)
            await dispatch(isLogged(res.data.user))
        }
        else {
            history.push("/login")
        }
    }
    async function login(data) {
        try {
            let res = await axios.post(`${API_URL}/auth/login`, data)
            let token = res.data.token
            localStorage.setItem("token", token)
            checkAuth()
            history.push("/")
        }
        catch (err) {
            console.log(err.message)
        }
    }
    function logout() {
        localStorage.removeItem("token")
        history.push("/login")
    }
    useEffect(() => {
        checkAuth()
    }, [])
    console.log(auth)
    let value = {  login, checkAuth, logout,currentUser }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider
export { AuthContext }