const mongoose=require("mongoose")
async function connect()
{
    try{
        // ======= CONNECT TO LOCALHOST ==============
        // await mongoose.connect('mongodb://127.0.0.1/mern-todolist', { 
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true,
        //   });
        //   console.log("connect success")
        // ============ CONNECT TO ATLAS =================
        await mongoose.connect('mongodb+srv://luannguyen:ntluan2001@demo-express.6rj7r.mongodb.net/mern-todos?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
          });
          console.log("connect success")
    }
    catch(error)
    {
        console.log("error",error)
    }
}
module.exports={connect}