const app = require("./index");

const connect = require("./configs/db")
const port = 1234;

app.listen( process.env.PORT || port, () => {
   try{
       connect();
       console.log(`Listening to port ${port}`);
   }catch(error){
       console.log(error);
   }
    
})