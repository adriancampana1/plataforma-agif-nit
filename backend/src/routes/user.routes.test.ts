import request from "supertest";
import app from "../app";

describe("Users routes", () => {

  it("Get all users", async () => {
    const response = await request(app).get("/users");
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(["Goon", "Tsuki", "Joe"]);
  })

})
