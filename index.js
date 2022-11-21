const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 3500;
const fs = require("fs");
let mongo = require("mongodb");
const MongoClient = mongo.MongoClient;
const cors = require("cors");
app.use(cors());
let bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let db;
// for logging purpose
// Morgan : middleware==> Supporting libraries
const morgan = require("morgan");
// app.use(morgan('tiny'))
app.use(morgan("short", { stream: fs.createWriteStream("./app.logs") }));

app.get("/location", (req, res) => {
  db.collection("location")
    .find()
    .toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
});

app.get("/restaurants", (req, res) => {
  let query = {};
  let stateId = Number(req.query.stateId);
  let mealId = Number(req.query.mealId);
  if (stateId) {
    query = { state_id: stateId };
  } else if (mealId) {
    query = { "mealTypes.mealtype_id": mealId };
  }
  db.collection("restaurents")
    .find(query)
    .toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
});

app.get("/filter/:mealId", (req, res) => {
  let query = {};
  let mealId = Number(req.params.mealId);
  let cuisineId = Number(req.query.cuisineId);
  let lcost = Number(req.query.lcost);
  let hcost = Number(req.query.hcost);
  if (req.query.sort) {
    sort = { cost: req.query.sort };
  }

  if (cuisineId && lcost && hcost) {
    query = {
      "mealTypes.mealtype_id": mealId,
      "cuisines.cuisine_id": cuisineId,
      $and: [{ cost: { $gt: lcost, $lt: hcost } }],
    };
  } else if (cuisineId) {
    query = {
      "mealTypes.mealtype_id": mealId,
      "cuisines.cuisine_id": cuisineId,
    };
  } else if (lcost && hcost) {
    query = {
      "mealTypes.mealtype_id": mealId,
      $and: [{ cost: { $gt: lcost, $lt: hcost } }],
    };
  }

  db.collection("restaurents")
    .find(query)
    .sort()
    .toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
});

app.get("/meals", (req, res) => {
  db.collection("mealType")
    .find()
    .toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
});

app.get("/details/:id", (req, res) => {
  // let id = mongo.ObjectId(req.params.id);
  let id = Number(req.params.id);
  db.collection("restaurents")
    .find({ restaurant_id: id })
    .toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
});

app.get("/menu", (req, res) => {
  db.collection("menu")
    .find()
    .toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
});

app.get("/menu/:id", (req, res) => {
  // let id = mongo.ObjectId(req.params.id);
  let id = Number(req.params.id);
  console.log(id);
  db.collection("menu")
    .find({ menu_id: id })
    .toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
});

// List of orders

app.get("/orders", (req, res) => {
  let email = req.query.email;
  let query = {};
  if (email) {
    query = { email };
  }
  db.collection("orders")
    .find(query)
    .toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
});

app.put("/updateorder/:id", (req, res) => {
  let oId = Number(req.params.id);

  db.collection("orders").updateOne(
    { orderId: oId },
    {
      $set: {
        status: req.body.status,
        bank_name: req.body.bank_name,
        date: req.body.date,
      },
    },
    (err, result) => {
      if (err) throw err;
      res.send("order updated");
    }
  );
});

app.post("/placeOrder", (req, res) => {
  console.log(req.body);

  db.collection("orders").insert(req.body, (err, result) => {
    if (err) throw err;
    res.send("Order Placed");
  });
});

app.post("/menuItem", (req, res) => {
  console.log(req.body);
  if (Array.isArray(req.body.id)) {
    db.collection("menu")
      .find({ menu_id: { $in: req.body.id } })
      .toArray((err, result) => {
        if (err) throw err;
        res.send(result);
      });
  } else {
    res.send("Invalid Input");
  }
});

// app.delete("/deleteOrder/:id", (req, res) => {
//   let _id = mongo.ObjectId(req.params.id);
//   console.log(_id);
//   db.collection("orders").remove({ _id }, (err, result) => {
//     if (err) throw err;
//     res.send("Order Deleted");
//   })
// });

app.delete('/deleteOrder/:id',(req,res) => {
  // let _id = mongo.ObjectId(req.params.id);
  let _id = mongo.ObjectId(req.params.id);

  db.collection('orders').deleteOne({_id:_id},(err,result) => {
      if(err) throw err;
      res.send('Order Deleted')
  })
})

//connection with mongo
MongoClient.connect(process.env.mongoUrl, (err, client) => {
  if (err) console.log(`Error while connecting`);
  else {
    console.log("successfull connection");
  }
  db = client.db("juneintern");
  app.listen(port, () => {
    console.log(`Listing to port ${port}`);
  });
});




