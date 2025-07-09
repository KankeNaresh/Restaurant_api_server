//page 1
GET - List of all cities
=>http://localhost:8771/cities

GET - List of all restaurants
=>http://localhost:8771/restaurants

GET - Restaurants with respect to city
=>http://localhost:8771/restaurants?stateId=3

GET - List of all meals
=>http://localhost:8771/mealTypes

//page 2
GET - Get all the restaurants wrt meal
=>http://localhost:8771/restaurants?mealId=2
=>http://localhost:8771/restaurants?stateId=1&mealId=2

GET - Restaurant wrt meal + Cuisine
=>http://localhost:8771/filters/2:cuisineId=3

GET - Restaurant wrt meal + Cost
=>http://localhost:8771/filters/2?hcost=1200&lcost=500

GET - Sort on basis of price
=>http://localhost:8771/filters/1
=>http://localhost:8771/filters/1?lcost=300&hcost=900&sort=-1

GET - Pagination

//page 3
GET - Details of restaurants
=>http://localhost:8771/details/3

GET - Menu wrt restaurants(all the menu of that perticular restaurant)
=>http://localhost:8771/menu/1


//page 4
POST - Details of item selected menu("id":[2,3,4])
=>http://localhost:8771/menuDetails
*body
{
    "id":[1,2,3]
}
POST - Place the order
=>Localhost:8771/placeOrder
*body
{ 
    "orderId" : 2, 
    "name" : "Nikita", 
    "email" : "nikki@gmail.com",
    "address" : "Hom 25", 
    "phone" : 8934645457, "cost" : 166, "menuItem" : [ 3,34,5 ], "status" : "Pending"
}

//page 5
GET - Get all the order/orders wrt email
=>http://localhost:8771/orders

orders with respect to email
=>http://localhost:8771/orders?email=aakash@gmail.com

PUT - Update order status
=>

DELETE - Delete orders
=>