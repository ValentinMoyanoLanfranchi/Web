const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("sqlite:" + "./.data/Base.db")

// Configurar ORM sequelize
const Personas = sequelize.define(
    "Personas",
    {
        Dni: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        FechaNacimiento: {
            type: DataTypes.STRING
        },
        Nombre: {
            type: DataTypes.STRING
        },
        Activo: {
            type: DataTypes.BOOLEAN
        },
    },
    {timestamps:false,
    tableName:'Personas'}
);

const MonederoVirtual = sequelize.define(
    "MonederoVirtual",
    {
        IdMonedero: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        FechaAlta: {
            type: DataTypes.STRING
        },
        Moneda: {
            type: DataTypes.STRING
        },
        Activo: {
            type: DataTypes.BOOLEAN
        },
    },
    {timestamps:false,
    tableName:'MonederoVirtual'}
);

const CuentaBancaria = sequelize.define(
    "CuentaBancaria",
    {
        Cbu: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        FechaAlta: {
            type: DataTypes.STRING
        },
        NombreBanco: {
            type: DataTypes.STRING
        },
        Activo: {
            type: DataTypes.BOOLEAN
        },
    },
    {timestamps:false,
    tableName:'CuentaBancaria'}
);

const Telefono = sequelize.define(
    "Telefono",
    {
        Numero: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        FechaAlta: {
            type: DataTypes.STRING
        },
        Descripcion: {
            type: DataTypes.STRING
        },
        Activo: {
            type: DataTypes.BOOLEAN
        },
    },
    {timestamps:false,
    tableName:'Telefono'}
);

const Empleado = sequelize.define(
    "Empleado",
    {
        Legajo: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        FechaIngreso: {
            type: DataTypes.STRING
        },
        DescripcionCargo: {
            type: DataTypes.STRING
        },
        Activo: {
            type: DataTypes.BOOLEAN
        },
    },
    {timestamps:false,
    tableName:'Empleado'}
);

module.exports = {
    sequelize,
    Personas,
    Empleado,
    Telefono,
    CuentaBancaria,
    MonederoVirtual,
};