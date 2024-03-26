const kamarModel = require("../models/index").kamar;
const tipeModel = require("../models/index").tipe_kamar;
const express = require("express");
const Op = require(`sequelize`).Op
const app = express();


exports.getAllkamar = async (req, res) => {
  let kamar = await kamarModel.findAll();

  return res.json({
    succsess: true,
    datas: kamar,
    message: `All datas have been loaded`,
  });
};

exports.getAvalaible = async (req,res) => {
  let id_tipe_kamar = req.params.id

  let avalaible = await kamarModel.findAll({
    where : {
      [Op.and] : [
        {id_tipe_kamar : id_tipe_kamar},
        {status : 'avalaible'}
      ]
    }
  })
  return res.json({
    succsess : true,
    data : avalaible,
    message : `Room has been loaded`
  })

}

exports.addKamar = async (req, res) => {
  try {
    let kamar = {
      nomor_kamar: req.body.nomor_kamar,
      id_tipe_kamar: req.body.id_tipe_kamar,
      status : req.body.status
    };

    const existingKamar = tipeModel.findOne({
      where: { id : kamar.id_tipe_kamar },
    });

    if (existingKamar) {
      let newKamar = await kamarModel.create(kamar);
      return res.json({
        succsess: true,
        data: newKamar,
        message: `Data have been loaded`,
      });
    } else {
      return req.status(500).json({
        succsess: false,
        message: `Tipe kamar not found`,
      });
    }
  } catch (error) {
    return res.status(500).json({
      succsess: false,
      message: error.message,
    });
  }
};

exports.updateKamar = async (req, res) => {
  try {
    let kamar = {
      nomor_kamar: req.body.nomor_kamar,
      id_tipe_kamar: req.body.id_tipe_kamar,
      status : req.body.status,
    };

    const existingKamar = tipeModel.findOne({
      where: { id : kamar.id_tipe_kamar },
    });

    if (existingKamar) {
      await kamarModel.update(kamar);
      return res.json({
        succsess: true,
        message: `Data have been updated`,
      });
    } else {
      return req.status(500).json({
        succsess: false,
        message: `Tipe kamar not found`,
      });
    }
  } catch (error) {
    return res.status(500).json({
      succsess: false,
      message: error.message,
    });
  }
};

exports.deleteKamar = async (req, res) => {
  try {
    let idKamar = req.params.id;

    await tipeModel.destroy({ where: { id_kamar: idKamar } });

    return res.json({
      succsess: true,
      message: `Data have been deleted`,
    });
  } catch (error) {
    return res.status(500).json({
      succsess: false,
      message: error.message,
    });
  }
};
