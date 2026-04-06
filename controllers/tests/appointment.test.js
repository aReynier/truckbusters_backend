import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../../server.js";

const version = "v1";

describe(`POST /appointment`, () => {
  it("Must send error message", async () => {
    const newAppointment = {
      firstname: "Test User",
    };

    const response = await request(app)
      .post(`/api/${version}/appointment`)
      .send(newAppointment)
      .set("Accept", "application/json");

    expect(response.status).toBe(400);
  });
});
