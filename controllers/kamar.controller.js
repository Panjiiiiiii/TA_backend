const kamarModel = require("../models/index").kamar;
const tipeModel = require("../models/index").tipe_kamar;
const express = require("express");
const app = express();


exports.getAllkamar = async (req, res) => {
  let kamar = await kamarModel.findAll();

  return res.json({
    succsess: true,
    datas: kamar,
    message: `All datas have been loaded`,
  });
};

exports.addKamar = async (req, res) => {
  try {
    let kamar = {
      nomor_kamar: req.body.nomor_kamar,
      id_tipe_kamar: req.body.id_tipe_kamar,
    };

    console.log("sdf: "+kamar.id);
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
