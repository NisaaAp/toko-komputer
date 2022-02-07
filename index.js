
//LIBRARY YANG MAU DIPAKAI
const express = require("express");
//memanggil library cors
const cors = require("cors");


//implementasi library express
const app = express();
//penggunaan cors, agar endpoint dapat diakses oleh cross platform
app.use(cors());

//import end-point letakkan disini
const admin = require("./routes/admin")//import
app.use("/store/admin", admin)//implementasi

//import end-point letakkan disini
const customer = require('./routes/customer')//import
app.use("/customer", customer)//implementasi


//import end-point letakkan disini
const product = require('./routes/product')//import
app.use("/product", product)//implementasi

app.listen(8080,() => {
    console.log("server run out port 8080");
})