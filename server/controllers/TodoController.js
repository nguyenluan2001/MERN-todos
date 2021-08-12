const Todo=require("../models/Todo")
class TodoController
{
    async index(req,res)
    {
        let todos=await Todo.find({
            user:req.user._id
        })
        return res.json({status:"Success",data:todos})
    }
    async create(req,res)
    {
        try
        {
            let {title,description,status}=req.body
            let newTodo=new Todo({
                title:title,
                description:description,
                status:status || "TO DO",
                user:req.user._id
            })
            await newTodo.save()
            return res.json(newTodo)

        }
        catch(err)
        {
            return res.json(err)
        }

    }
    async edit(req,res)
    {
        let id=req.params.id
        let {title,description,status}=req.body
        let fetchTodo=await Todo.findOne({
            _id:id
        })
        try
        {
            let todo= await Todo.updateOne({
                _id:id,
                user:req.user._id
            },{
                title:title?title:fetchTodo.title,
                description:description?description:fetchTodo.description,
                status:status?status:fetchTodo.status
            })
            let editTodo=await Todo.findOne({
                _id:id
            })
            return res.json({status:"Edit successfully",todo:editTodo})
        }
        catch(err)
        {
            return res.json(err)
        }
    }
    async delete(req,res)
    {
        let _id=req.params.id
        try
        {
            await Todo.deleteOne({
                _id:_id,
                user:req.user._id
            })
            return res.json("Delete successfully")
        }
        catch(err)
        {
            return res.json(err)
        }
    }
}
module.exports=new TodoController