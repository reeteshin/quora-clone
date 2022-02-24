const app = require("./index");

const connect = require("./configs/db")

app.listen(2345, () => {
   try{
       connect();
       console.log("Listening to port 2345");
   }catch(error){
       console.log(error);
   }
    
})