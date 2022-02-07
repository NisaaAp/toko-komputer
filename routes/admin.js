

const express = require("express");
const bodyParser = require("body-parser");
const md5 = require('md5')

//implementasi
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//. satu import file difolder yang sama
//.. dua import file difolder berbeda yang kita harus keluar dulu
//import index dalam folder model
const models = require('../models/index');
const req = require("express/lib/request");
const admin = models.admin;

//endpoint ditulis disini

//endpoint get/menampilkan data admin
app.get("/", (req, res) => {
    admin.findAll()
        .then(admin => {
            res.json(admin)
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })//jika eror masuk ke blok .catch diambil erornya apa dan ditampilkan errornya

})
//end-point menyimpan data admin, METHOD : POST, function: create
app.post("/", (req, res) => {
    //pakai let karna datanya bisa berubah
    let data = {
        name: req.body.name,
        username: req.body.username,
        password: md5(req.body.password)//menyiapkan data yang akan disimpan
    }
    admin.create(data)
    //setelah dicreate selanjutnya mau diapakan
        //cukup ditambahkan message
        .then(result =>  {
            res.json({
            message: "data has been inserted"
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

// End-point untuk mengupdate data admin, method: PUT, FUNCTION: UPDATE
app.put("/:id", (req, res) => {
    //kenapa put butuh param untuk kasih value diwhere
    let param = {
        admin_id : req.params.id
    }
    //pakai let karna datanya bisa berubah
    let data = {
        name: req.body.name,
        username: req.body.username,
        password: md5(req.body.password)//menyiapkan data yang akan disimpan
    }
    admin.update(data, {where: param})
    //setelah diupdate selanjutnya mau diapakan
        //cukup ditambahkan message
        .then(result =>  {
            res.json({
            message: "data has been updated"
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})


// End-point menghapus data admin, METHOD: DELETE, function: destroy
app.delete("/:id", (req, res) => {
    //dikasih parameter untuk id
    let param = {
        admin_id : req.params.id
    }

    admin.destroy({where: param})
    //setelah dihapus selanjutnya mau diapakan
        //cukup ditambahkan message
        .then(result =>  {
            res.json({
            message: "data has been deleted"
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
    })

module.exports = app;