import React,{useState,useContext} from 'react'
import {AuthContext} from "../../services/context/authContext"
import axios from "axios"
import {Redirect} from "react-router-dom"
import {useSelector} from "react-redux"
function Login() {
    const {login}=useContext(AuthContext)
    const [input,setInput]=useState({
        username:"",
        password:""
    })
    const auth=useSelector(state=>state.auth)
    function handleInput(e)
    {
        setInput(pre=>{
            return {...pre,[e.target.name]:e.target.value}
        })
    }
    async function handleSubmit(e)
    {
        e.preventDefault()
        login(input)

    }
    console.log(auth)
    return (
        <>
       {!auth.isAuth?<div className="container">
            <div className="row">
                <div className="col-md-5 mx-auto mt-5">
                    <h3>Login</h3>
                    <form onSubmit={(e)=>handleSubmit(e)}>
                        <div class="form-group">
                            <label for="username">Username</label>
                            <input type="text" class="form-control" id="username" placeholder="Username" name="username" onChange={(e)=>handleInput(e)} />
                        </div>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input type="password" class="form-control" id="password" name="password" onChange={(e)=>handleInput(e)}/>
                        </div>
                       <button className="btn btn-success">Login</button>
                    </form>
                </div>
            </div>
        </div>:<Redirect to="/"></Redirect>}
        </>
    )
}

export default Login
