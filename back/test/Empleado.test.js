// Test de cada metodo del archivo de routes
// Guiarse de paso 6
const request = require("supertest");
const app = require("../index");

const empleadoAlta = {
    Legajo: Math.floor(Math.random() * 99999999),
    FechaIngreso: new Date().toString(),
    DescripcionCargo: "Categoria baja",
    Activo: 1,
};

const empleadoModificacion = {
    Legajo: 80111,
    FechaIngreso: new Date().toString(),
    DescripcionCargo: "Categoria baja",
    Activo: 1,
};


describe("GET /api/empleado", function() {
    it("Deberia devolver todos los empleados", async function() {
        const res = await request(app)
            .get("/api/empleado")
            .set("content-type", "application/json");
        expect(res.headers["content-type"]).toEqual(
            "application/json; charset=utf-8"
        );
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    Legajo: expect.any(Number),
                    FechaIngreso: expect.any(String),
                    DescripcionCargo: expect.any(String),
                    Activo: expect.any(Boolean),
                }),
            ])
        );
    });
});

describe("GET /api/empleado/:legajo", function() {
    it("respond with json containing a single empleados", async function(){
        const res = await request(app)
            .get("/api/empleado/89111");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.objectContaining({
                Legajo: 89111,
                FechaIngreso: expect.any(String),
                DescripcionCargo: expect.any(String),
                Activo: expect.any(Boolean),
            })
        );
    });
});

describe("POST /api/empleado", function() {
    it("Deberia devolver el empleado que acabo de crear", async function() {
        const res = await request(app).post("/api/empleado").send(empleadoAlta);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.objectContaining({
                Legajo: expect.any(Number),
                FechaIngreso: expect.any(String),
                DescripcionCargo: expect.any(String),
                Activo: expect.any(Boolean),
            })
        );
    });
}); 

describe("PUT /api/empleado/:legajo", function() {
    it("Deberia devolver el empleado con el legajo 80111 modificada", async function() {
        const res = await request(app).put("/api/empleado/80111").send(empleadoModificacion);
        expect(res.statusCode).toEqual(200);
    });
});

describe("DELETE /api/empleado/92785", function() {
    it("Deberia devolver el empleado con el legajo 87111 borrado", async function() {
        const res = await request(app).delete("/api/empleado/87111");
        expect(res.statusCode).toEqual(200);
    });
});