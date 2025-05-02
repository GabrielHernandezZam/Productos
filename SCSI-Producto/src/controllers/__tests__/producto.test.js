const request = require("supertest");
const app = require("../../index");

//Probrar post
describe("POST /productos/", () => {
  it("should display validation errors", async () => {
    const response = await request(app).post("/productos").send({});
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(2);
  });

  it("Sould create a new producto", async () => {
    //Prueba para saber el error que esta manejando
    const response = await request(app).post("/productos/").send({
      nombre: "Californias 2",
      descripcion: "Seguro de Gastos Medicos",
      id_usuario: 2,
    });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");

    //Qe no sea
    expect(response.status).not.toBe(404);
    expect(response.status).not.toBe(400);
  });
});
