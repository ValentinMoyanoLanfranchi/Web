// Guiarse de etapa 3 y 4
// Metodos que hay que hacer: get, getById, post, put y delete

const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");


// Obtener todos los teléfonos
router.get("/api/telefono", async function (req, res, next) {
  
    let where = {};
    if (req.query.Descripcion != undefined && req.query.Descripcion !== "") {
      where.Descripcion = {
        [Op.like]: "%" + req.query.Descripcion + "%",
      };
    }
    if (req.query.Activo != undefined && req.query.Activo !== "") {
      // true o false en el modelo, en base de datos es 1 o 0
      // convierto el string a booleano
      where.Activo = req.query.Activo === "true";
    }
    const { count, rows } = await db.Telefono.findAndCountAll({
      attributes: [
        "Numero",
        "FechaAlta",
        "Descripcion",
        "Activo",
      ],
      order: [["Descripcion", "ASC"]],
      where,
    });
  
    return res.json({ Items: rows});
  });

// Obtener un teléfono por su número
router.get("/api/telefono/:numero", async function(req, res, next) {
    let data = await db.Telefono.findOne({
        attributes: ["Numero", "FechaAlta", "Descripcion", "Activo"],
        where: { Numero: req.params.numero },
    });
    res.json(data);
});

// Agregar un nuevo teléfono
router.post("/api/telefono", async function(req, res, next) {
    let data = await db.Telefono.create({
        Numero: req.body.Numero,
        FechaAlta: req.body.FechaAlta,
        Descripcion: req.body.Descripcion,
        Activo: req.body.Activo,
    });
    res.status(200).json(data.dataValues); // Devuelve el registro agregado
});

// Actualizar un teléfono por su número
router.put("/api/telefono/:numero", async function(req, res, next) {
    let telefono = await db.Telefono.findOne({
        attributes: ["Numero", "FechaAlta", "Descripcion", "Activo"],
        where: { Numero: req.params.numero },
    });
    if (!telefono) {
        res.status(404).json({ message: "Teléfono no encontrado" });
        return;
    }
    telefono.FechaAlta = req.body.FechaAlta;
    telefono.Descripcion = req.body.Descripcion;
    telefono.Activo = req.body.Activo;
    await telefono.save();

    res.sendStatus(200);
});

// Eliminar un teléfono por su número
router.delete("/api/telefono/:numero", async function(req, res, next) {
    let bajaFisica = false;

    if (bajaFisica) {
        // Baja física
        let filasBorradas = await db.Telefono.destroy({
            where: { Numero: req.params.numero },
        });
        if (filasBorradas == 1) res.sendStatus(200);
        else res.sendStatus(404);
    } else {
        // Baja lógica
        let data = await db.sequelize.query(
            "UPDATE Telefono SET Activo = CASE WHEN Activo = 1 THEN 0 ELSE 1 END WHERE Numero = :numero",
             {
                replacements: { numero: req.params.numero }
             }   
        );
        res.sendStatus(200);
    }
});

module.exports = router;