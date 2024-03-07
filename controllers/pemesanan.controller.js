const userModel = require("../models/index").user;
const tipeModel = require("../models/index").tipe_kamar;
const pemesananModel = require("../models/index").pemesanan;
const detailModel = require("../models/index").detail_pemesanamn;
const kamarModel = require("../models/index").kamar;
const Op = require("sequelize").Op;
const bodyParser = require("body-parser");
const express = require("express");
const { sequelize } = require("../models/index");

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

//get all pemesanan (admin)
exports.getAllpemesanan = async (req,res) => {
    let pemesanan = await pemesananModel.findAll();
    return res.json ({
        succsess : true,
        data : pemesanan,
        message : `All datas have been loaded`
    })
}
//get pemesanan by user (admin)
//get pemesanan (user)
//add pemesanan (user)
//get nomor kamar from kamar
//input pemesanan
//input detail pemesanan
//update pemesanan (admin) check-in -> check-out
//delete pemesanan (admin)
//sum total harga pemesanan (user)
exports.getTagihan = async (req,res) => {
    let id_user = req.params.id

    let getHarga = await sequelize.query(
        `SELECT SUM(harga) from detail_pemesanan WHERE `
    )
}
//best seller (user)
