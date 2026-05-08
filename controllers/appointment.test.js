import { expect, test, vi } from "vitest";
import appointmentController from "./appointment";
import Appointment from "./../models/Appointment";
import Company from "./../models/Company";
import CompanyDriver from "./../models/CompanyDriver";
import Driver from "./../models/Driver";
import DriverTruck from "./../models/DriverTruck";
import Truck from "./../models/Truck";

const makeMockRes = () => {
  const res = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
};

console.log("Vérification modèle :", Appointment);

test("should return 400 if body is empty (nothing filled)", async () => {
  const req = {
    body: {
      appointmentData: { moment: "", deck: "" },
      companyData: { name: "", email: "", phone: "" },
      driverData: { firstname: "", lastname: "", phone: "" },
      truckData: { brand: "", model: "", license_plate: "" },
    },
  };
  const res = makeMockRes();

  await appointmentController.makeAppointment(req, res);

  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.json).toHaveBeenCalledWith({ error: "Missing required fields" });
});

test("should return 400 if appoitment data is missing", async () => {
  const req = {
    body: {
      appointmentData: { moment: "", deck: "" },
      companyData: {
        name: "TestCorp",
        email: "test@test.com",
        phone: "0102030405",
      },
      driverData: {
        firstname: "Jean",
        lastname: "Dupont",
        phone: "0607080910",
      },
      truckData: { brand: "Volvo", model: "truck", license_plate: "AA-123-BB" },
    },
  };
  const res = makeMockRes();

  await appointmentController.makeAppointment(req, res);

  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.json).toHaveBeenCalledWith({ error: "Missing required fields" });
});

test("should return 400 if appointment moment is missing", async () => {
  const req = {
    body: {
      appointmentData: { moment: "", deck: 1 },
      companyData: {
        name: "TestCorp",
        email: "test@test.com",
        phone: "0102030405",
      },
      driverData: {
        firstname: "Jean",
        lastname: "Dupont",
        phone: "0607080910",
      },
      truckData: { brand: "Volvo", model: "truck", license_plate: "AA-123-BB" },
    },
  };
  const res = makeMockRes();

  await appointmentController.makeAppointment(req, res);

  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.json).toHaveBeenCalledWith({ error: "Missing required fields" });
});

test("should return 400 if company data is missing", async () => {
  const req = {
    body: {
      appointmentData: { moment: "2024-10-25", deck: 1 },
      companyData: { name: "", email: "", phone: "" },
      driverData: {
        firstname: "Jean",
        lastname: "Dupont",
        phone: "0607080910",
      },
      truckData: { brand: "Volvo", model: "truck", license_plate: "AA-123-BB" },
    },
  };
  const res = makeMockRes();

  await appointmentController.makeAppointment(req, res);

  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.json).toHaveBeenCalledWith({ error: "Missing required fields" });
});

test("should return 400 if driver data is missing", async () => {
  const req = {
    body: {
      appointmentData: { moment: "2024-10-25", deck: 1 },
      companyData: {
        name: "TestCorp",
        email: "test@test.com",
        phone: "0102030405",
      },
      driverData: { firstname: "", lastname: "", phone: "" },
      truckData: { brand: "Volvo", model: "truck", license_plate: "AA-123-BB" },
    },
  };
  const res = makeMockRes();

  await appointmentController.makeAppointment(req, res);

  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.json).toHaveBeenCalledWith({ error: "Missing required fields" });
});

test("should return 400 if licence plate is missing", async () => {
  const req = {
    body: {
      appointmentData: { moment: "2024-10-25", deck: 1 },
      companyData: {
        name: "TestCorp",
        email: "test@test.com",
        phone: "0102030405",
      },
      driverData: {
        firstname: "Jean",
        lastname: "Dupont",
        phone: "0607080910",
      },
      truckData: { brand: "Volvo", model: "truck", license_plate: "" },
    },
  };
  const res = makeMockRes();

  await appointmentController.makeAppointment(req, res);

  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.json).toHaveBeenCalledWith({ error: "Missing required fields" });
});

//correct timeout failure
test("should return 201 if all fields are correct", async () => {
  vi.spyOn(Driver.prototype, "save").mockResolvedValue({});
  vi.spyOn(Company.prototype, "save").mockResolvedValue({});
  vi.spyOn(Truck.prototype, "save").mockResolvedValue({});
  vi.spyOn(CompanyDriver.prototype, "save").mockResolvedValue({});
  vi.spyOn(DriverTruck.prototype, "save").mockResolvedValue({});
  vi.spyOn(Appointment.prototype, "save").mockResolvedValue({});

  const req = {
    body: {
      appointmentData: { moment: "2024-10-25", deck: 1 },
      companyData: {
        name: "TestCorp",
        email: "test@test.com",
        phone: "0102030405",
      },
      driverData: {
        firstname: "Jean",
        lastname: "Dupont",
        phone: "0607080910",
      },
      truckData: { brand: "Volvo", model: "truck", license_plate: "AA-123-BB" },
    },
  };
  const res = makeMockRes();

  await appointmentController.makeAppointment(req, res);

  expect(res.status).toHaveBeenCalledWith(201);
});

test("should return 400 when driver save throws an error", async () => {
  vi.restoreAllMocks();
  vi.spyOn(Driver.prototype, "save").mockRejectedValue(new Error("DB failure"));
  const req = {
    body: {
      appointmentData: { moment: "2024-10-25", deck: 1 },
      companyData: {
        name: "TestCorp",
        email: "test@test.com",
        phone: "0102030405",
      },
      driverData: {
        firstname: "Jean",
        lastname: "Dupont",
        phone: "0607080910",
      },
      truckData: { brand: "Volvo", model: "truck", license_plate: "AA-123-BB" },
    },
  };
  const res = makeMockRes();
  await appointmentController.makeAppointment(req, res);
  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.json).toHaveBeenCalledWith({ error: "DB failure" });
});

test("should return 200 when fetching all appointments succeeds", async () => {
  vi.restoreAllMocks();
  vi.spyOn(Appointment, "find").mockResolvedValue([{ _id: "a1" }]);
  const req = {};
  const res = makeMockRes();
  await appointmentController.findAllAppointment(req, res);
  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith({
    appointments: [{ _id: "a1" }],
    companies: undefined,
    drivers: undefined,
    trucks: undefined,
  });
});

test("should return 400 when fetching all appointments fails", async () => {
  vi.restoreAllMocks();
  vi.spyOn(Appointment, "find").mockRejectedValue(new Error("Find error"));
  const req = {};
  const res = makeMockRes();
  await appointmentController.findAllAppointment(req, res);
  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.json).toHaveBeenCalledWith({ error: "Find error" });
});

test("should return 404 when appointment is not found", async () => {
  vi.restoreAllMocks();
  vi.spyOn(Appointment, "findById").mockResolvedValue(null);
  const req = { params: { id: "missing-id" } };
  const res = makeMockRes();
  await appointmentController.findOneAppointment(req, res);
  expect(res.status).toHaveBeenCalledWith(404);
  expect(res.json).toHaveBeenCalledWith({ message: "Appointment not found" });
});

test("should return 200 when fetching one appointment succeeds", async () => {
  vi.restoreAllMocks();
  const appointment = {
    _id: "a1",
    id_driver: "d1",
    id_truck: "t1",
    id_company: "c1",
  };
  vi.spyOn(Appointment, "findById").mockResolvedValue(appointment);
  vi.spyOn(Driver, "findById").mockResolvedValue({
    _id: "d1",
    firstname: "Jean",
  });
  vi.spyOn(Truck, "findById").mockResolvedValue({ _id: "t1", brand: "Volvo" });
  vi.spyOn(Company, "findById").mockResolvedValue({
    _id: "c1",
    name: "TestCorp",
  });
  const req = { params: { id: "a1" } };
  const res = makeMockRes();
  await appointmentController.findOneAppointment(req, res);
  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith({
    appointment,
    driver: { _id: "d1", firstname: "Jean" },
    truck: { _id: "t1", brand: "Volvo" },
    company: { _id: "c1", name: "TestCorp" },
  });
});

test("should return 400 when fetching one appointment fails", async () => {
  vi.restoreAllMocks();
  vi.spyOn(Appointment, "findById").mockRejectedValue(new Error("Invalid id"));
  const req = { params: { id: "bad-id" } };
  const res = makeMockRes();
  await appointmentController.findOneAppointment(req, res);
  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.json).toHaveBeenCalledWith({ error: "Invalid id" });
});
