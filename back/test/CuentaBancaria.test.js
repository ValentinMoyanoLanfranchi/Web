const request = require("supertest");
const app = require("../index");

const cuentaBancariaAlta = {
    Cbu: Math.floor(Math.random() * 999999999999),
    FechaAlta: new Date().toString(),
    NombreBanco: "Galicia",
    Activo: 1
};

const cuentaBancariaModificacion = {
    Cbu: 777777777777,
    FechaAlta: new Date().toString(),
    NombreBanco: "Nacion",
    Activo: 1
};


describe("GET /api/cuentasBancarias", function() {
    it("Deberia devolver todas las cuentas bancarias", async function() {
        const res = await request(app)
            .get("/api/cuentasBancarias")
            .set("content-type", "application/json");
        expect(res.headers["content-type"]).toEqual(
            "application/json; charset=utf-8"
        );
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    Cbu: expect.any(Number),
                    FechaAlta: expect.any(String),
                    NombreBanco: expect.any(String),
                    Activo: expect.any(Boolean),
                }),
            ])
        );
    });
});

describe("GET /api/cuentasBancarias/:Cbu", function() {
    it("respond with json containing a single cuenta bancaria", async function(){
        const res = await request(app)
            .get("/api/cuentasBancarias/444444444444");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.objectContaining({
                Cbu: 444444444444,
                FechaAlta: expect.any(String),
                NombreBanco: expect.any(String),
                Activo: expect.any(Boolean),
            })
        );
    });
});

describe("POST /api/cuentasBancarias", function() {
    it("Deberia devolver la cuenta bancaria que acabo de crear", async function() {
        const res = await request(app).post("/api/cuentasBancarias").send(cuentaBancariaAlta);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.objectContaining({
                Cbu: expect.any(Number),
                FechaAlta: expect.any(String),
                NombreBanco: expect.any(String),
                Activo: expect.any(Boolean),
            })
        );
    });
}); 

describe("PUT /api/cuentasBancarias/:Cbu", function() {
    it("Deberia devolver la cuenta bancaria con el cbu 987654321588 modificado", async function() {
        const res = await request(app).put("/api/cuentasBancarias/000000000000").send(cuentaBancariaModificacion);
        expect(res.statusCode).toEqual(200);
    });
});

describe("DELETE /api/cuentasBancarias/987654321588", function() {
    it("Deberia devolver la cuenta bancaria con el cbu 987654321588 borrado", async function() {
        const res = await request(app).delete("/api/cuentasBancarias/000000000000");
        expect(res.statusCode).toEqual(200);
    });
});