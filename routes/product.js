
const express = require("express"); //engine endpoint
const app = express();
app.use(express.json())

const multer = require("multer")
const path = require("path")
const fs = require("fs")//untuk membaca file sistem (dimana file itu)

//import model
const models = require('../models/index');
const product = models.product

//membuat konfigurasi untuk menyimpan foto/dimana foto yang diinsert akan disimpan
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, "./image/product")
    },
    filename:(req,file,cb)=>{
        cb(null, "product-" + Date.now() + path.extname(file.originalname))
    }
})
let upload = multer({storage: storage})

//GET PRODUCT , METHOD: GET, FUNCTION: findAll
//menampilkan seluruh data product
app.get("/", (req, res) => {
    product.findAll()
        .then(result => {
            res.json({
                product: result})
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })//jika eror masuk ke blok .catch diambil erornya apa dan ditampilkan errornya
})


//GET PRODUCT by ID, METHOD: GET, FUNCTION: findOne
app.get("/:product_id", (req, res) => {
    product.findOne({where: {product_id: req.params.product_id}})
        .then(result => {
            res.json({
                product: result})
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })//jika eror masuk ke blok .catch diambil erornya apa dan ditampilkan errornya

})


app.post("/", upload.single("image"), (req, res) =>{
    if (!req.file) {
        res.json({
            message: "No uploaded file"
        })
    } else {
        let data = {
            		
            name: req.body.name,
            price: req.body.price,
            stock: req.body.stock,
            image: req.file.filename
            
        }
        product.create(data)
        .then(result => {
            res.json({
                message: "data has been inserted"
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
    }
})


module.exports = app;