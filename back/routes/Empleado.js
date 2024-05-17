// Guiarse de etapa 3 y 4
// Metodos que hay que hacer: get, getById, post, put y delete
const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");

router.get("/api/empleado", async function (req, res, next) {
  
    let where = {};
    if (req.query.DescripcionCargo != undefined && req.query.DescripcionCargo !== "") {
      where.DescripcionCargo = {
        [Op.like]: "%" + req.query.DescripcionCargo + "%",
      };
    }
    if (req.query.Activo != undefined && req.query.Activo !== "") {
      // true o false en el modelo, en base de datos es 1 o 0
      // convierto el string a booleano
      where.Activo = req.query.Activo === "true";
    }
    const { count, rows } = await db.Empleado.findAndCountAll({
      attributes: [
        "Legajo",
        "FechaIngreso",
        "DescripcionCargo",
        "Activo",
      ],
      order: [["DescripcionCargo", "ASC"]],
      where,
    });
  
    return res.json({ Items: rows});
  });

router.get("/api/empleado/:legajo", async function(req, res, next) {
    let data = await db.Empleado.findOne({
        attributes: [
            "Legajo",
            "FechaIngreso",
            "DescripcionCargo",
            "Activo"
        ],
        where: { Legajo: req.params.legajo },
    });
    res.json(data);
});

router.post("/api/empleado", async function(req, res, next) {
    let data = await db.Empleado.create({
        Legajo: req.body.Legajo,
        FechaIngreso: req.body.FechaIngreso,
        DescripcionCargo: req.body.DescripcionCargo,
        Activo: req.body.Activo,
    });
    res.status(200).json(data.dataValues) // Devuelvo el registro agregado
});

router.put("/api/empleado/:legajo", async function(req, res, next) {
    let empleado = await db.Empleado.findOne({
        attributes: [
            "Legajo",
            "FechaIngreso",
            "DescripcionCargo",
            "Activo",
        ],
        where: { Legajo: req.params.legajo },
    });
    if (!empleado) {
        res.status(404).json({ message: "Empleado no encontrado" });
        return;
    }
    empleado.FechaIngreso= req.body.FechaIngreso;
    empleado.DescripcionCargo = req.body.DescripcionCargo;
    empleado.Activo = req.body.Activo;
    await empleado.save();

    res.sendStatus(200);
});

router.delete("/api/empleado/:legajo", async function(req, res, next) {

    let bajaFisica = false;
    
    if (bajaFisica) {
        // baja fisica
        let filasBorradas = await db.Empleado.destroy({
            where: { Legajo: req.params.legajo },
        });
        if (filasBorradas == 1) res.sendStatus(200);
        else res.sendStatus(404);
    } else {
        // baja logica
        let data = await db.sequelize.query(
            "UPDATE Empleado SET Activo = case when Activo = 1 then 0 else 1 end WHERE Legajo = :Legajo",
             {
                replacements: { Legajo: +req.params.legajo }
             }   
        );
        res.sendStatus(200);
    }
});
module.exports = router