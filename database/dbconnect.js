const mongoose=require('mongoose')
const dbpath=process.env.DB_PATH
mongoose.set('strictQuery', true)
const dboptions={
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName:"enerjisa",
}

const dbconnect=async()=>{
    try {
        const connect =await mongoose.connect(dbpath,dboptions)
        return connect
    } 
    catch (error) {
        return  'db_connection_failed'
    }
}

module.exports=dbconnect