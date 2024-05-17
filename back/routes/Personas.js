// Guiarse de etapa 3 y 4
// Metodos que hay que hacer: get, getById, post, put y delete

const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");

router.get("/api/personas", async function (req, res, next) {
  
    let where = {};
    if (req.query.Nombre != undefined && req.query.Nombre !== "") {
      where.Nombre = {
        [Op.like]: "%" + req.query.Nombre + "%",
      };
    }
    if (req.query.Activo != undefined && req.query.Activo !== "") {
      // true o false en el modelo, en base de datos es 1 o 0
      // convierto el string a booleano
      where.Activo = req.query.Activo === "true";
    }
    const { count, rows } = await db.Personas.findAndCountAll({
      attributes: [
        "Dni",
        "FechaNacimiento",
        "Nombre",
        "Activo",
      ],
      order: [["Nombre", "ASC"]],
      where,
    });
  
    return res.json({ Items: rows});
  });

router.get("/api/personas/:dni", async function(req, res, next) {
    let data = await db.Personas.findOne({
        attributes: [
            "Dni",
            "FechaNacimiento",
            "Nombre",
            "Activo",
        ],
        where: { Dni: req.params.dni },
    });
    res.json(data);
});

router.post("/api/personas", async function(req, res, next) {
    let data = await db.Personas.create({
        Dni: req.body.Dni,
        FechaNacimiento: req.body.FechaNacimiento,
        Nombre: req.body.Nombre,
        Activo: req.body.Activo,
    });
    res.status(200).json(data.dataValues) // Devuelvo el registro agregado
});

router.put("/api/personas/:dni", async function(req, res, next) {
    let persona = await db.Personas.findOne({
        attributes: [
            "Dni",
            "FechaNacimiento",
            "Nombre",
            "Activo",
        ],
        where: { Dni: req.params.dni },
    });
    if (!persona) {
        res.status(404).json({ message: "Persona no encontrada" });
        return;
    }
    persona.FechaNacimiento = req.body.FechaNacimiento;
    persona.Nombre = req.body.Nombre;
    persona.Activo = req.body.Activo;
    await persona.save();

    res.sendStatus(200);
});

router.delete("/api/personas/:dni", async function(req, res, next) {

    let bajaFisica = false;
    
    if (bajaFisica) {
        // baja fisica
        let filasBorradas = await db.Personas.destroy({
            where: { Dni: req.params.dni },
        });
        if (filasBorradas == 1) res.sendStatus(200);
        else res.sendStatus(404);
    } else {
        // baja logica
        let data = await db.sequelize.query(
            "UPDATE Personas SET Activo = case when Activo = 1 then 0 else 1 end WHERE Dni = :Dni",
             {
                replacements: { Dni: +req.params.dni }
             }   
        );
        res.sendStatus(200);
    }
});

module.exports = router;