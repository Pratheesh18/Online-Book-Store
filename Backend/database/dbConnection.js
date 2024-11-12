const mongoose = require('mongoose');

const connectDatabase = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser : true,
            useUnifiedTopology:true,
        })
        console.log("Database Connected");
    }catch(error){
        console.error('Connection error',error.message);
    }
};

module.exports = connectDatabase;