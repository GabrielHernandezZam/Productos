//Importamos superteste para la creacion de pruebas
const request = require("supertest");
const app = require("../../src/index");

describe("GET /api", () => {
  it("should send back json response", async () => {
    const res = await request(app).get("/api");
    //Lo que debe de hacer
    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.body.msg).toBe("Desde API");

    //Lo que no debe de ser
    expect(res.status).not.toBe(404);
    expect(res.body.msg).not.toBe("desde api");
  });
});
