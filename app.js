let express=require("express");
let app=express();
let mongo=require('mongodb');
let dotenv=require('dotenv');
dotenv.config()
let bodyParser=require('body-parser');
let cors=require("cors");
let port=process.env.PORT || 3000;
let {dbConnect,getData,getDataSort, postData,updateData,deleteData} = require('./controller/dbController');


app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cors())

//heart beat
app.get('/',(req,res) =>{
    res.send('Hello Naresh, Lets start the application');
    
})
//1.GET - List of all cities
app.get('/cities',async(req,res)=>{
    let query={};
    let collection="locations";
    let output=await getData(collection,query)
    console.log(output)
    res.status(200).send(output);
})

//2.List of all restaurants
app.get("/restaurants",async(req,res)=>{
    let query={};
    let stateId=Number(req.query.stateId);
    let mealId=Number(req.query.mealId);
    if(stateId&&mealId){
         query={
            "state_id":stateId,
            "mealTypes.mealtype_id":mealId
        }
    }
    //3.http://localhost:8771/restaurants?stateId=1&mealId=2
    if(stateId){
        query={
            "state_id":stateId
        }
    }else if(mealId){
        query={
            "mealTypes.mealtype_id":mealId
        }
    }
    let collection="restaurantsData";
    let output=await getData(collection,query);
    res.status(200).send(output)
})

//4.List of all meals
app.get("/mealTypes",async(req,res)=>{
    let query={};
    let collection="mealTypes";
    let output=await getData(collection,query);
    res.status(200).send(output)
})

//5.Get all the restaurants wrt meal
app.get("/",async(req,res)=>{
    //refer to first api
    //http://localhost:8771/restaurants?stateId=1&mealId=2
})

//filters
//6.Restaurant wrt meal + Cuisine
app.get("/filters/:mealId",async(req,res)=>{
    let query={};
    let collection='restaurantsData'
    let mealId=Number(req.params.mealId);
    let cuisineId=Number(req.query.cuisineId);
    let hcost=Number(req.query.hcost);
    let lcost=Number(req.query.lcost);
    let sort={cost:1};

    if(req.query.sort){
        sort={cost:req.query.sort}
    }
    if(cuisineId){
        query={
            "mealTypes.mealtype_id":mealId,
            "cuisines.cuisine_id":cuisineId
            //http://localhost:8771/filters/2:cuisineId=3
        }
    }else if(hcost && lcost){
        query={
            "mealTypes.mealtype_id":mealId,
            $and:[{cost:{$gt:lcost,$lt:hcost}}]
            //http://localhost:8771/filters/2?hcost=1200&lcost=500
        }
    }else{
        query={
            "mealTypes.mealtype_id":mealId
        }
        //http://localhost:8771/filters/1
    }
    let output=await getData(collection,query)
    let output2=await getDataSort(collection,query,sort)
    res.status(200).send(output2)
})

//7.Restaurant wrt meal + Cost
// app.get("",async(req,res)=>{
//     //refer 6 route
// })

//sorting
//8.Sort on basis of price
// app.get("",(req,res)=>{
//    //refer route 6 filter
//    //http://localhost:8771/filters/1
// })

// //Pagination
// //9.Pagination
// app.get("",(req,res)=>{

// })

//10.Details of restaurants
//http://localhost:8771/details/3
app.get("/details/:id",async(req,res)=>{
    let id=Number(req.params.id);
    let query={"restaurant_id":id};
    let collection="restaurantsData";
    let output=await getData(collection,query);
    res.status(200).send(output);
    
})
//11.Menu wrt restaurants
//http://localhost:8771/menu/1
app.get("/menu/:id",async(req,res)=>{
    let query={restaurant_id:Number(req.params.id)};
    let output=await getData('restaurantMenu',query)
    res.send(output)
})

//12.Get all the order/orders wrt email
//http://localhost:8771/orders
//http://localhost:8771/orders?email=aakash@gmail.com
app.get("/orders",async(req,res)=>{
    let query={};
    if(req.query.email){
        query={email:req.query.email}
    }
    let output=await getData('orders',query)
    res.send(output)
})

//POST - Place the order
//Localhost:8771/placeOrder
app.post('/placeOrder',async(req,res)=>{
    let data=req.body;
    let collection='orders';
    //if collection does not exist , then whenever we send the first record the collection automatically it creats the collection.
    let response=await postData(collection,data)
    res.send(`Order placed ${response}`)
})

// POST - Details of item selected menu("id":[2,3,4])
//http://localhost:8771/menuDetails
app.post("/menuDetails",async(req,res)=>{
    if(Array.isArray(req.body.id)){
        let query={menu_id:{$in:req.body.id}};
        let collection='restaurantMenu';
        let output=await getData(collection,query);
        res.send(output);
    }else{
        res.send(`please pass data in format of {"id:[1,2,3]}`)
    }
})

//update order
app.put('/updateOrder',async(req,res)=>{
    let collection='orders';
    let condition={_id:new ObjectId(req.body._id)}
    let data={
        $set:{
            "status":req.body.status
        }
    }
    let output=await updateData(collection,condition,data)
    res.send(output)
})

//delete order
app.delete('/deleteOrder',async(req,res)=>{
    let collection='orders';
    let condition={_id:new ObjectId(req.body._id)}
    let rowCount=await getData(collection,condition);
    if(rowCount,length>0){
        let response=await deleteData(collection,condition)
        res.send('Data Deleted')
    }else{
        res.send('No Record Found')
    }
    let output =await updateOrder(collection,condition,data)
    res.send(output)
})

// Connect to DB before starting server
dbConnect()
    .then(() => {
        app.listen(port, () => {
            console.log(`✅ Server is running on port: ${port}`);
        });
    })
    .catch(err => {
        console.error("❌ Server not started. MongoDB connection failed.");
    });