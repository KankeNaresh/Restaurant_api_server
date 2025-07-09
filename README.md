# Restaurant_API_Server

A Node.js RESTful API server for a restaurant platform that interacts with a MongoDB database. It provides endpoints to fetch restaurant details, menus, meal types, locations, and manage orders.

---

## 📌 Features

- 🔍 Get restaurants by `location_id`
- 🔍 Filter restaurants by `mealtype_id` or cuisine
- 📄 Get restaurant menu by `restaurant_id`
- 📝 Place a new order (POST)
- 🔁 Update an existing order (PUT)
- ❌ Delete an order (DELETE)

---

## 🧩 MongoDB Collections

- `locations`
- `mealTypes`
- `orders`
- `restaurantMenu`
- `restaurantsData`

---

## 🚀 Getting Started

### Clone the repository:
```bash
git clone https://github.com/KankeNaresh/Restaurant_api_server.git
cd Restaurant_api_server
