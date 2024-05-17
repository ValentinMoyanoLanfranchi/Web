// Guiarse de etapa 3 y 4
// Metodos que hay que hacer: get, getById, post, put y delete

const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");

router.get("/api/monederosVirtuales", async function (req, res, next) {
  
    let where = {};
    if (req.query.Moneda != undefined && req.query.Moneda !== "") {
      where.Moneda = {
        [Op.like]: "%" + req.query.Moneda + "%",
      };
    }
    if (req.query.Activo != undefined && req.query.Activo !== "") {
      // true o false en el modelo, en base de datos es 1 o 0
      // convierto el string a booleano
      where.Activo = req.query.Activo === "true";
    }
    const { count, rows } = await db.MonederoVirtual.findAndCountAll({
      attributes: [
        "IdMonedero",
        "FechaAlta",
        "Moneda",
        "Activo",
      ],
      order: [["Moneda", "ASC"]],
      where,
    });
  
    return res.json({ Items: rows});
  });

router.get("/api/monederosVirtuales/:IdMonedero", async function(req, res, next) {
    let data = await db.MonederoVirtual.findOne({
        attributes: ["IdMonedero", "FechaAlta", "Moneda", "Activo"],
        where: { IdMonedero: req.params.IdMonedero },
    });
    res.json(data);
});

router.post("/api/monederosVirtuales", async function(req, res, next) {
    let data = await db.MonederoVirtual.create({
        IdMonedero: req.body.IdMonedero,
        FechaAlta: req.body.FechaAlta,
        Moneda: req.body.Moneda,
        Activo: req.body.Activo,
        Dni: req.body.Dni,
    });
    res.status(200).json(data.dataValues);
});

router.put("/api/monederosVirtuales/:idMonedero", async function(req, res, next) {
    let monedero = await db.MonederoVirtual.findOne({
        attributes: ["IdMonedero", "FechaAlta", "Moneda", "Activo"],
        where: { IdMonedero: req.params.idMonedero },
    });
    if (!monedero) {
        res.status(404).json({ message: "Monedero Virtual no encontrado" });
        return;
    }
    monedero.FechaAlta = req.body.FechaAlta;
    monedero.Moneda = req.body.Moneda;
    monedero.Activo = req.body.Activo;
    monedero.Dni = req.body.Dni;
    await monedero.save();

    res.sendStatus(200);
});

router.delete("/api/monederosVirtuales/:IdMonedero", async function(req, res, next) {
    let bajaFisica = false;

    if (bajaFisica) {
        let filasBorradas = await db.MonederoVirtual.destroy({
            where: { IdMonedero: req.params.IdMonedero },
        });
        if (filasBorradas == 1) res.sendStatus(200);
        else res.sendStatus(404);
    } else {
        let data = await db.sequelize.query(
            "UPDATE MonederoVirtual SET Activo = case when Activo = 1 then 0 else 1 end WHERE IdMonedero = :IdMonedero",
             {
                replacements: { IdMonedero: +req.params.IdMonedero }
             }   
        );
        res.sendStatus(200);
    }
});

module.exports = router