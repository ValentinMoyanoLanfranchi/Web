const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");

router.get("/api/cuentasBancarias", async function (req, res, next) {
  
    let where = {};
    if (req.query.NombreBanco != undefined && req.query.NombreBanco !== "") {
      where.NombreBanco = {
        [Op.like]: "%" + req.query.NombreBanco + "%",
      };
    }
    if (req.query.Activo != undefined && req.query.Activo !== "") {
      // true o false en el modelo, en base de datos es 1 o 0
      // convierto el string a booleano
      where.Activo = req.query.Activo === "true";
    }
    const { count, rows } = await db.CuentaBancaria.findAndCountAll({
      attributes: [
        "Cbu",
        "FechaAlta",
        "NombreBanco",
        "Activo",
      ],
      order: [["NombreBanco", "ASC"]],
      where,
    });
  
    return res.json({ Items: rows});
  });

router.get("/api/cuentasBancarias/:cbu", async function(req, res, next) {
    let data = await db.CuentaBancaria.findOne({
        attributes: [
            "Cbu",
            "FechaAlta",
            "NombreBanco",
            "Activo",
        ],
        where: { Cbu: req.params.cbu },
    });
    res.json(data);
});

router.post("/api/cuentasBancarias", async function(req, res, next) {
    let data = await db.CuentaBancaria.create({
        Cbu: req.body.Cbu,
        FechaAlta: req.body.FechaAlta,
        NombreBanco: req.body.NombreBanco,
        Activo: req.body.Activo
    });
    res.status(200).json(data.dataValues) // Devuelvo el registro agregado
});

router.put("/api/cuentasBancarias/:cbu", async function(req, res, next) {
    let cuenta = await db.CuentaBancaria.findOne({
        attributes: [
            "Cbu",
            "FechaAlta",
            "NombreBanco",
            "Activo",
        ],
        where: { Cbu: req.params.cbu },
    });
    if (!cuenta) {
        res.status(404).json({ message: "Cuenta Bancaria no encontrada" });
        return;
    }
    cuenta.FechaAlta = req.body.FechaAlta;
    cuenta.NombreBanco = req.body.NombreBanco;
    cuenta.Activo = req.body.Activo;
    await cuenta.save();

    res.sendStatus(200);
});

router.delete("/api/cuentasBancarias/:Cbu", async function(req, res, next) {

    let bajaFisica = false;
    
    if (bajaFisica) {
        // baja fisica
        let filasBorradas = await db.CuentaBancaria.destroy({
            where: { Cbu: req.params.Cbu },
        });
        if (filasBorradas == 1) res.sendStatus(200);
        else res.sendStatus(404);
    } else {
        // baja logica
        let data = await db.sequelize.query(
            "UPDATE CuentaBancaria SET Activo = case when Activo = 1 then 0 else 1 end WHERE Cbu = :Cbu",
             {
                replacements: { Cbu: +req.params.Cbu }
             }   
        );
        res.sendStatus(200);
    }
});

module.exports = router;