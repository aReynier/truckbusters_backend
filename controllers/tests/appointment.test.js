import { describe, it, expect, vi } from "vitest";
import request from "supertest";
import app from "../../server.js";
import Appointment from "../../models/Appointment.js";

const version = "v1";

describe("GET /appointment/:id", () => {
  it("should return 400 or 404 for unknown/invalid id", async () => {
    vi.spyOn(Appointment, "findById").mockResolvedValue(null);
    const response = await request(app)
      .get(`/api/${version}/appointment/invalid-id`)
      .set("Accept", "application/json");
    expect([400, 404]).toContain(response.status);
  });
});

describe("GET /appointment", () => {
  it("should return 200", async () => {
    vi.spyOn(Appointment, "find").mockResolvedValue([]);

    const response = await request(app)
      .get(`/api/${version}/appointment`)
      .set("Accept", "application/json");

    expect(response.status).toBe(200);
  });
});
