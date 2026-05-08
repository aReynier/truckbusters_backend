import { expect, test, vi } from "vitest";
import informationController from "./information.js";
import Information from "../models/Information.js";

const makeMockRes = () => {
  const res = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
};

test("should return 200 and informations when findAllInformation succeeds", async () => {
  vi.restoreAllMocks();

  const informationsMock = [
    {
      opening_hour: "08:00-18:00",
      address: "1 rue de Paris",
      contact: "Accueil",
      secretary_phone: "0102030405",
      secretary_email: "secretariat@test.com",
    },
  ];

  vi.spyOn(Information, "find").mockResolvedValue(informationsMock);

  const req = {};
  const res = makeMockRes();

  await informationController.findAllInformation(req, res);

  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith({ informations: informationsMock });
});

test("should return 400 when findAllInformation throws an error", async () => {
  vi.restoreAllMocks();

  vi.spyOn(Information, "find").mockRejectedValue(new Error("Database error"));

  const req = {};
  const res = makeMockRes();

  await informationController.findAllInformation(req, res);

  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.json).toHaveBeenCalledWith({ error: "Database error" });
});
