// Test de cada metodo del archivo de routes
// Guiarse de paso 6

const request = require("supertest");
const app = require("../index");

const telefonoAlta = {
  Numero: Math.floor(Math.random() * 999999999),
  FechaAlta: new Date().toString(),
  Descripcion: "Teléfono principal",
  Activo: 1,
};

const telefonoModificacion = {
  FechaAlta: new Date().toString(),
  Descripcion: "Teléfono secundario",
  Activo: 1,
};

describe("Telefono API", () => {
  describe("GET /api/telefono", () => {
    it("deberia devolver todos los telefonos", async () => {
      const res = await request(app).get("/api/telefono");

      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(expect.any(Array));
      expect(res.body.length).toBeGreaterThan(0);
      expect(res.body[0]).toEqual(
        expect.objectContaining({
          Numero: expect.any(Number),
          FechaAlta: expect.any(String),
          Descripcion: expect.any(String),
          Activo: expect.any(Boolean),
        })
      );
    });
  });

  describe("GET /api/telefono/:numero", () => {
    it("deberia devolver un telefono por numero", async () => {
      const res = await request(app).get("/api/telefono/15000");

      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(
        expect.objectContaining({
          Numero: 15000,
          FechaAlta: expect.any(String),
          Descripcion: expect.any(String),
          Activo: expect.any(Boolean),
        })
      );
    });
  });

  describe("POST /api/telefono", () => {
    it("deberia crear un nuevo telefono", async () => {
      const res = await request(app).post("/api/telefono").send(telefonoAlta);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(
        expect.objectContaining({
          Numero: expect.any(Number),
          FechaAlta: expect.any(String),
          Descripcion: expect.any(String),
          Activo: expect.any(Boolean),
        })
      );
    });
  });

  describe("PUT /api/telefono/:numero", () => {
    it("deberia modificar un telefono por Numero", async () => {
      const res = await request(app)
        .put("/api/telefono/15000")
        .send(telefonoModificacion);

      expect(res.statusCode).toEqual(200);
    });
  });

  describe("DELETE /api/telefono/:numero", () => {
    it("deberia borrar un telefono por Numero", async () => {
      const res = await request(app).delete("/api/telefono/15000");

      expect(res.statusCode).toEqual(200);
    });
  });
});