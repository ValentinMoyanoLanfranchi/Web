// Acceder a la base usando aa-sqlite
const db = require("aa-sqlite");

async function CrearBaseSiNoExiste() {
    // Abrir base, si no existe, la crea
    await db.open("./.data/Base.db");

    let existe = false;
    let res = null;

    res = await db.get(
        "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name='Personas'",
        []
    );
    if (res.contar > 0) existe = true;
    if (!existe) {
        await db.run(
            `CREATE table Personas(
                Dni INTEGER PRIMARY KEY, 
                FechaNacimiento text, 
                Nombre text,
                Activo boolean
                );`
        );
        console.log("Tabla Personas creada!");
        await db.run(
            `insert into Personas values
            (40111111, '2000-01-01', 'Agustin', 1),
            (41111111, '2001-01-01', 'Bernardo', 1),
            (42111111, '2002-01-01', 'Camilo', 1),
            (43111111, '2003-01-01', 'Delfina', 1),
            (44111111, '2004-01-01', 'Esteban', 1),
            (45111111, '2005-01-01', 'Florencia', 1),
            (46111111, '2006-01-01', 'Gerardo', 1),
            (47111111, '2007-01-01', 'Ivana', 1),
            (48111111, '2008-01-01', 'Joaquin', 1),
            (49111111, '2009-01-01', 'Kiara', 1)
            ;`
        );
    }

    existe = false;
    res = await db.get(
        "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name='MonederoVirtual'",
        []
    );
    if (res.contar > 0) existe = true;
    if (!existe) {
        await db.run(
            `CREATE table MonederoVirtual(
                IdMonedero INTEGER PRIMARY KEY, 
                FechaAlta text, 
                Moneda text,
                Activo boolean
                );` // FOREIGN KEY (Dni) REFERENCES Personas(Dni)
        );
        console.log("Tabla MonederoVirtual creada!");
        await db.run(
            `insert into MonederoVirtual values
            (000000, '1900-01-01', 'Peso', 1),
            (111111, '1901-01-01', 'Dolar', 1),
            (222222, '1902-01-01', 'Libra', 1),
            (333333, '1903-01-01', 'Peso', 1),
            (444444, '1904-01-01', 'Euro', 1),
            (555555, '1905-01-01', 'Yuan', 1),
            (666666, '1906-01-01', 'Libra', 1),
            (777777, '1907-01-01', 'Peso', 1),
            (888888, '1908-01-01', 'Peso', 1),
            (999999, '1909-01-01', 'Dolar', 1)
            ;`
        );
    }

    existe = false;
    res = await db.get(
        "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name='CuentaBancaria'",
        []
    );
    if (res.contar > 0) existe = true;
    if (!existe) {
        await db.run(
            `CREATE table CuentaBancaria(
                Cbu INTEGER PRIMARY KEY, 
                FechaAlta text, 
                NombreBanco text,
                Activo boolean
                );` // FOREIGN KEY (Dni) REFERENCES Personas(Dni)
        );
        console.log("Tabla CuentaBancaria creada!");
        await db.run(
            `insert into CuentaBancaria values
            (000000000000, '1800-01-01', 'Santander', 1),
            (111111111111, '1801-01-01', 'Bancor', 1),
            (222222222222, '1802-01-01', 'Galicia', 1),
            (333333333333, '1803-01-01', 'Galicia', 1),
            (444444444444, '1804-01-01', 'Galicia', 1),
            (555555555555, '1805-01-01', 'Santander', 1),
            (666666666666, '1806-01-01', 'Santander', 1),
            (777777777777, '1807-01-01', 'Nacion', 1),
            (888888888888, '1808-01-01', 'Nacion', 1),
            (999999999999, '1809-01-01', 'Nacion', 1)
            ;`
        );
    }

    existe = false;
    res = await db.get(
        "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name='Telefono'",
        []
    );
    if (res.contar > 0) existe = true;
    if (!existe) {
        await db.run(
            `CREATE table Telefono(
                Numero INTEGER PRIMARY KEY, 
                FechaAlta text, 
                Descripcion text,
                Activo boolean
                );` // FOREIGN KEY (Dni) REFERENCES Personas(Dni)
        );
        console.log("Tabla Telefono creada!");
        await db.run(
            `insert into Telefono values
            (15000, '1800-01-01', 'Fijo', 1),
            (15111, '1801-01-01', 'Celular', 1),
            (15222, '1802-01-01', 'Celular', 1),
            (15333, '1803-01-01', 'Celular', 1),
            (15444, '1804-01-01', 'Fijo', 1),
            (15555, '1805-01-01', 'Fijo', 1),
            (15666, '1806-01-01', 'Fijo', 1),
            (15777, '1807-01-01', 'Celular', 1),
            (15888, '1808-01-01', 'Celular', 1),
            (18999, '1809-01-01', 'Celular', 1)
            ;`
        );
    }

    existe = false;
    res = await db.get(
        "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name='Empleado'",
        []
    );
    if (res.contar > 0) existe = true;
    if (!existe) {
        await db.run(
            `CREATE table Empleado(
                Legajo INTEGER PRIMARY KEY, 
                FechaIngreso text, 
                DescripcionCargo text,
                Activo boolean
                );` // FOREIGN KEY (Dni) REFERENCES Personas(Dni)
        );
        console.log("Tabla Empleado creada!");
        await db.run(
            `insert into Empleado values
            (80111, '2010-01-01', 'Categoria baja', 1),
            (81111, '2011-02-01', 'Categoria media', 1),
            (82111, '2012-03-01', 'A prueba', 1),
            (83111, '2013-04-01', 'A prueba', 1),
            (84111, '2014-05-01', 'Categoria alta', 1),
            (85111, '2015-06-01', 'Categoria alta', 1),
            (86111, '2016-07-01', 'Categoria media', 1),
            (87111, '2017-08-01', 'Categoria baja', 1),
            (88111, '2018-09-01', 'Categoria baja', 1),
            (89111, '2019-10-01', 'A prueba', 1)
            ;`
        );
    }

    // Cerrar la base
    db.close();
}

CrearBaseSiNoExiste();

module.exports = CrearBaseSiNoExiste;