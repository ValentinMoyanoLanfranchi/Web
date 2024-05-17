const request = require("supertest");
const app = require("../index");

const personaAlta = {
    Dni: Math.floor(Math.random() * 99999999),
    FechaNacimiento: new Date().toString(),
    Nombre: "Lionel",
    Activo: 1
};

const personaModificacion = {
    Dni: 43111111,
    FechaNacimiento: new Date().toString(),
    Nombre: "Cristiano",
    Activo: 1
};


describe("GET /api/personas", function() {
    it("Deberia devolver todas las personas", async function() {
        const res = await request(app)
            .get("/api/personas")
            .set("content-type", "application/json");
        expect(res.headers["content-type"]).toEqual(
            "application/json; charset=utf-8"
        );
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    Dni: expect.any(Number),
                    FechaNacimiento: expect.any(String),
                    Nombre: expect.any(String),
                    Activo: expect.any(Boolean),
                }),
            ])
        );
    });
});

describe("GET /api/personas/:dni", function() {
    it("respond with json containing a single personas", async function(){
        const res = await request(app)
            .get("/api/personas/40111111");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.objectContaining({
                Dni: 40111111,
                FechaNacimiento: expect.any(String),
                Nombre: expect.any(String),
                Activo: expect.any(Boolean),
            })
        );
    });
});

describe("POST /api/personas", function() {
    it("Deberia devolver la persona que acabo de crear", async function() {
        const res = await request(app).post("/api/personas").send(personaAlta);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.objectContaining({
                Dni: expect.any(Number),
                FechaNacimiento: expect.any(String),
                Nombre: expect.any(String),
                Activo: expect.any(Boolean),
            })
        );
    });
}); 


describe("PUT /api/personas/:id", function() {
    it("Deberia devolver la persona con el dni 43111111 modificada", async function() {
        const res = await request(app).put("/api/personas/43111111").send(personaModificacion);
        expect(res.statusCode).toEqual(200);
    });
});

describe("DELETE /api/personas/49111111", function() {
    it("Deberia devolver la persona con el dni 49111111 borrada", async function() {
        const res = await request(app).delete("/api/personas/49111111");
        expect(res.statusCode).toEqual(200);
    });
});