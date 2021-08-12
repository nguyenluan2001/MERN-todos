const express=require("express")
const router=express.Router()
const TodoController=require("../controllers/TodoController")
router.get("/",TodoController.index)
router.post("/",TodoController.create)
router.put("/:id",TodoController.edit)
router.delete("/:id",TodoController.delete)
module.exports=router