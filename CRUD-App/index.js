const express = require('express')
const app = express()
const mongoose = require("mongoose");
const Product = require('./models/product.model.js')
const productRoute = require('./routes/product.route.js');

mongoose.connect("mongodb+srv://shaizarashid135:PoS19ZN1ag11T84w@backenddb.pnvasw9.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDb")
    .then(() => {
        console.log("connected to database");
        app.listen(3000, () => {
            console.log("server is running");
        })
    })
    .catch(() => {
        console.log("connection failed");
    });

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }))


//routes
app.use("/api/products", productRoute);

app.get('/', function (req, res) {
    res.send('Hello World')
});




