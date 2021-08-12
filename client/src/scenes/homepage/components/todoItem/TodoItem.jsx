import React,{useEffect,useState} from 'react'
import axios from "axios"
import {API_URL} from "../../../../services/constant"
import {deleteTodo,updateTodo} from "../../../../services/slice/todoSlice"
import {useDispatch} from "react-redux"
import {Container} from "./style"
function TodoItem({task,setInput,setIsEdit}) {
    const dispatch=useDispatch()
    const [colorStatus,setColorStatus]=useState(null)
    function handleEdit()
    {
        setInput(pre=>{
            return {...pre,title:task.title,description:task.description,_id:task._id}
        })
        setIsEdit(true)
    }
    async function handleDelete()
    {
        dispatch(deleteTodo(task))
        let res=await axios.delete(`${API_URL}/todo/${task._id}`)
        console.log(res)
    }
    async function handleChangeStatus(e)
    {   
        let res=await axios.put(`${API_URL}/todo/${task._id}`,{
            status:e.target.value
        })
        dispatch(updateTodo({type:"status",data:{
            _id:task._id,
            status:e.target.value
        }}))
        console.log(res.data)

    }
    useEffect(() => {
       switch(task.status)
       {
           case "TO DO":
               {
                setColorStatus("todo")
                break
               }
           case "DOING":
               {
                setColorStatus("doing")
                break
               }
           case "DONE":
               {
                setColorStatus("done")
                break
               }
               default:{
                   setColorStatus(null)
               }
       }
    }, [task])
    return (
        <Container className={`d-flex justify-content-between mb-3 ${colorStatus}`}>
            {task.title}
            <select name="" id="" className="custom-select w-25" onChange={(e)=>handleChangeStatus(e)}>
                <option value="TO DO" selected={task.status=="TO DO" &&"selected"} >To do</option>
                <option value="DOING" selected={task.status=="DOING" &&"selected"}>Doing</option>
                <option value="DONE" selected={task.status=="DONE" &&"selected"}>Done</option>
            </select>
            <div className="actions d-flex">
                <button className="btn btn-danger" onClick={()=>handleDelete()}>Delete</button>
                <button className="btn btn-primary" onClick={()=>handleEdit()}>Edit</button>
            </div>
        </Container>
    )
}

export default TodoItem
