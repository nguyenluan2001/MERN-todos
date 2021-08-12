import React,{useContext,useEffect} from 'react'
import {Redirect,Route} from "react-router-dom"
import {useSelector} from "react-redux"
import {AuthContext} from "../services/context/authContext"
function PrivateRoute({component:Component,...rest}) {
    const {checkAuth}=useContext(AuthContext)
    const auth=useSelector(state=>state.auth)
    useEffect(()=>{
        checkAuth()
    },[])
    console.log(auth)
    return (
       <Route
       {...rest}
       render={props=>{
        return auth.isAuth?<Component {...props}></Component>:<Redirect to="/login"></Redirect>
       }}
       >

       </Route>
    )
}

export default PrivateRoute
