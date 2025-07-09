let mongo=require('mongodb');
let MongoClient=mongo.MongoClient;
let mongoUrl= process.env.MongoUrl;
let db;

async function dbConnect() {
    try {
        const client = await MongoClient.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        db = client.db('Restaurant'); // you can specify a DB name here if needed: client.db('yourDB')
        console.log("✅ MongoDB Connected");
    } catch (err) {
        console.error("❌ MongoDB connection error:", err);
        throw err;
    }
}

async function getData(colName, query){
    let output;
    try{
        output=await db.collection(colName).find(query).toArray()
        console.log(`sent data check`)
    }catch(err){
        output={"error":`Error in condition for getting data from ${colName}`}
    }
    return output
}

//sorting
async function getDataSort(colName, query, sort){
    let output;
    try{
        output=await db.collection(colName).find(query).sort(sort).toArray()
    }catch(err){
        output={"error":`Error in conndition for getting sorted data from ${colName}`}
    }
    return output;
}

//posting data
async function postData(colName,data){
    let output;
    try{
        output=await db.collection(colName).insertOne(data)
    }catch(err){
        output={"error":`Error while inserting in ${colName}`}
    }
   return output;
}

//update data
async function updateData(colName,condition,data){
    let output;
    try{
        output = await db.collection(colName).update(condition,data)
    }catch(err){
        output = {"error":`Error while updating`}
    }
    return output
}

//delete data
async function deleteData(colName,condition){
    let output;
    try{
        output = await db.collection(colName).remove(condition)
    }catch(err){
        output = {"error":`Error while Deleting`}
    }
    return output
}



module.exports={
    dbConnect,
    getData,
    getDataSort,
    postData,
    updateData,
    deleteData
}
