<!-- 
        POST -- INSERT THE DATA(C)
        GET -- GET THE DATA (R)
        PUT -- UPDATE THE DATA(U)
        DELETE -- DELETE THE DATA(D)

     -->

<!-- md : mark down -->
<!-- Page-1 -->
# list of city
http://localhost:4000/location

# list of restraurent
http://localhost:4000/restaurents

# restraurent wrt city
http://localhost:4000/restaurants?stateId=2

# list of meals 
http://localhost:4000/meals

# list of quicksearch
http://localhost:4000/meals


<!-- Page-2 -->

# List of restrurents wrt meal
http://localhost:4000/restaurants?mealId=4

# Restrurents wrt cuisine & meal
http://localhost:4000/filter/1?cuisineId=1

# Restrurents wrt cost and meal
http://localhost:4000/filter/2?lcost=100&hcost=500

# sort on the basis of price
http://localhost:4000/filter/2?lcost=100&hcost=500&sort=1
sort=-1 Descending order


<!-- Page-3 -->

# Details of the restraurent
http://localhost:4000/details/1

# Menu of the restraurant
http://localhost:4000/menu/1



<!-- Page-4 -->
<!-- post api -->
# menu details (POST)
http://localhost:4000/menuItem

# place order(POST)
http://localhost:4000/placeOrder


<!-- Page-5 -->
# List of orders
http://localhost:4000/orders

# List of orders wrt email
http://localhost:4000/orders?email=mahesh@gmail.com


# Delete Order(Delete)
http://localhost:4000/deleteOrder/6378c6834f42d59d209419b5

# Update payment details (put)
http://localhost:4000/updateorder/3




















