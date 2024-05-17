// Test de cada metodo del archivo de routes
// Guiarse de paso 6
const request = require("supertest");
const app = require("../index");

const monederoVirtualAlta = {
  IdMonedero: Math.floor(Math.random() * 999999999999),
  FechaAlta: new Date().toString(),
  Moneda: "moneda",
  Activo: 1
};

const monederoVirtualModificacion = {
  FechaAlta: new Date().toString(),
  Moneda: "moneda modificada",
  Activo: 0
};

describe("GET /api/monederosVirtuales", function() {
  it("Debería devolver todos los monederos virtuales", async function() {
    const res = await request(app)
      .get("/api/monederosVirtuales")
      .set("content-type", "application/json");
    expect(res.headers["content-type"]).toEqual(
      "application/json; charset=utf-8"
    );
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          IdMonedero: expect.any(Number),
          FechaAlta: expect.any(String),
          Moneda: expect.any(String),
          Activo: expect.any(Boolean)
        })
      ])
    );
  });
});

describe("GET /api/monederosVirtuales/:IdMonedero", function() {
  it("Debería devolver un solo monedero virtual", async function() {
    const res = await request(app).get(
      `/api/monederosVirtuales/111111`
    );
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        IdMonedero: 111111,
        FechaAlta: expect.any(String),
        Moneda: expect.any(String),
        Activo: expect.any(Boolean)
      })
    );
  });
});

describe("POST /api/monederosVirtuales", function() {
  it("Debería devolver el monedero virtual recién creado", async function() {
    const res = await request(app)
      .post("/api/monederosVirtuales")
      .send(monederoVirtualAlta);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        IdMonedero: expect.any(Number),
        FechaAlta: expect.any(String),
        Moneda: expect.any(String),
        Activo: expect.any(Boolean)
      })
    );
  });
});

describe("PUT /api/monederosVirtuales/:IdMonedero", function() {
  it("Debería devolver el monedero virtual con idMonedero modificado", async function() {
    const res = await request(app)
      .put(`/api/monederosVirtuales/111111`)
      .send(monederoVirtualModificacion);
    expect(res.statusCode).toEqual(200);
  });
});

describe("DELETE /api/monederosVirtuales/:IdMonedero", function() {
    it("Debería devolver el monedero virtual con el idMonedero especificado borrado", async function() {
      const res = await request(app).delete(
        `/api/monederosVirtuales/111111`
      );
      expect(res.statusCode).toEqual(200);
    });
  });
  