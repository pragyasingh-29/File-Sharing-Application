import mongoose from 'mongoose';

const DBConnection = async ()=>{

    const MongoDB_URI=`mongodb://pragyaaasingh22:codeforinterview@ac-h88ooho-shard-00-00.imfnz1l.mongodb.net:27017,ac-h88ooho-shard-00-01.imfnz1l.mongodb.net:27017,ac-h88ooho-shard-00-02.imfnz1l.mongodb.net:27017/?ssl=true&replicaSet=atlas-xdjg6w-shard-0&authSource=admin&retryWrites=true&w=majority`;
  
    try{

       await mongoose.connect(MongoDB_URI,{useNewUrlParser:true});

       console.log("Database connected successfully");

    }catch(error){

        console.error("Error while connecting the database:", error.message);

    }
    
}

export default DBConnection;