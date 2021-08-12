import React,{useState,useEffect,useContext} from 'react'
import axios from "axios"
import {API_URL} from "../../services/constant"
import {useDispatch,useSelector} from "react-redux"
import {fetchListTodos,addTodo,updateTodo} from "../../services/slice/todoSlice"
import {AuthContext} from "../../services/context/authContext"
import {resetState} from "../../services/slice/authSlice"
import TodoItem from './components/todoItem/TodoItem'
function Homepage() {
    const [input,setInput]=useState({
        title:"",
        description:""
    })
    const [isEdit,setIsEdit]=useState(false)
    const todos=useSelector(state=>state.todo)
    const dispatch=useDispatch()
    const {currentUser,logout}=useContext(AuthContext)
    function handleInput(e)
    {
        setInput(pre=>{
            return {...pre,[e.target.name]:e.target.value}
        })
    }
    async function handleAdd()
    {
        await dispatch(addTodo(input))
        let res=await axios.post(`${API_URL}/todo`,input)
        setInput({
            title:"",
            description:""
        })
        console.log(res)
    }
    function handleLogout()
    {
        dispatch(resetState())
        logout()
    }
    function handleCancel()
    {
        setIsEdit(false)
        setInput({
            title:"",
            description:""
        })
    }
    async function handleEdit()
    {
        dispatch(updateTodo({type:"text",data:input}))
        let res=await axios.put(`${API_URL}/todo/${input._id}`,input)
        console.log(res.data)

    }
    useEffect(()=>{
        dispatch(fetchListTodos())
    },[])

    console.log(todos)
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-5">
                    <h5>Hello {currentUser?.username}</h5>
                    <button className="btn btn-info" onClick={()=>handleLogout()}>Logout</button>
                    <form action="">
                        <h1>Add task</h1>
                        <div class="form-group">
                            <label for="title">Title</label>
                            <input type="text" class="form-control" id="title" name="title" placeholder="Title" value={input.title} onChange={(e)=>handleInput(e)} />
                        </div>
                        <div class="form-group">
                            <label for="description">Description</label>
                            <textarea name="description" id="description" cols="30" rows="10" class="form-control" value={input.description} onChange={(e)=>handleInput(e)}></textarea>
                        </div>
                        {
                            !isEdit?
                            <button className="btn btn-success" onClick={()=>handleAdd()}>Add task</button>
                            :<>
                            <button className="btn btn-success" onClick={()=>handleEdit()}>Edit task</button>
                            <button className="btn btn-secondary" onClick={()=>handleCancel()}>Cancel</button>
                            </>
                        }
                    </form>
                </div>
                <div className="col-md-7 pt-4">
                    <h1>List task</h1>
                {
                    todos.listTodos?.map(item=>{
                        return <TodoItem 
                        task={item} 
                        setInput={setInput}
                        setIsEdit={setIsEdit}
                        key={item._id}
                        ></TodoItem>
                    })
                }
                </div>
            </div>
        </div>
    )
}

export default Homepage
