import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"
import {API_URL} from "../constant"
const fetchListTodos = createAsyncThunk(
    'fetchListTodos',
    async (userId, thunkAPI) => {
      const response = await axios.get(`${API_URL}/todo`)
      return response.data
    }
  )
const initialState={
    listTodos:[],
    todos:[],
    doings:[],
    dones:[]

}
const todoSlice=createSlice({
    name:"todo",
    initialState,
    reducers:{
        addTodo:(state,action)=>{
            state.listTodos.push(action.payload)
        },
        updateTodo:(state,action)=>{
            if(action.payload.type=="status")
            {
                let newListTodos=[...state.listTodos]
                newListTodos=newListTodos.map(item=>{
                    if(item._id==action.payload.data._id)
                    {
                        return {...item,status:action.payload.data.status}
                    }
                    else
                    {
                        return item
                    }
                })
                state.listTodos=newListTodos
            }
            else
            {
                let newListTodos=[...state.listTodos]
                newListTodos=newListTodos.map(item=>{
                    if(item._id==action.payload.data._id)
                    {
                        return action.payload.data
                    }
                    else
                    {
                        return item
                    }
                })
                state.listTodos=newListTodos

            }
        },
        deleteTodo:(state,action)=>{
            let newListTodos=[...state.listTodos]
            newListTodos=newListTodos.filter(item=>{
               return item._id!=action.payload._id
            })
            state.listTodos=newListTodos
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchListTodos.fulfilled,(state,action)=>{
          state.listTodos=action.payload.data
        })
    }
})
export {fetchListTodos}
export const {addTodo,updateTodo,deleteTodo}=todoSlice.actions
export default todoSlice.reducer