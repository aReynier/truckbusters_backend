import { expect, test, vi, beforeEach } from "vitest";
import nodemailer from "nodemailer";
import sendCustomerEmail from "./sendCustomerEmail.js";

vi.mock("nodemailer", () => {
  const sendMail = vi.fn();
  const createTransport = vi.fn(() => ({ sendMail }));
  return {
    default: { createTransport },
  };
});

beforeEach(() => {
  vi.clearAllMocks();
  process.env.SMTP_EMAIL = "smtp@test.com";
  process.env.SMTP_PASSWORD = "smtp-password";
});

test("should create transporter email with SMTP credentials", () => {
  sendCustomerEmail(
    new Date("2026-05-10T08:00:00.000Z"),
    "client@test.com",
    "TestCorp",
    "Jean",
    "Dupont",
  );

  expect(nodemailer.createTransport).toHaveBeenCalledWith(
    expect.objectContaining({
      auth: { user: "smtp@test.com", pass: "smtp-password" },
    }),
  );
});

test("should send email to customer with expected subject", () => {
  sendCustomerEmail(
    new Date("2026-05-10T08:00:00.000Z"),
    "client@test.com",
    "TestCorp",
    "Jean",
    "Dupont",
  );

  const { sendMail } = nodemailer.createTransport.mock.results[0].value;

  expect(sendMail).toHaveBeenCalledTimes(1);
  expect(sendMail).toHaveBeenCalledWith(
    expect.objectContaining({
      to: "client@test.com",
      subject: "Votre réservation chez TruckBusters",
    }),
    expect.any(Function),
  );
});

test("should run sendMail success callback branch", () => {
  const { sendMail } = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user: "x", pass: "y" },
  });

  sendMail.mockImplementationOnce((_options, callback) => {
    callback(null, { response: "250 OK" });
  });
  const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
  sendCustomerEmail(
    new Date("2026-05-10T08:00:00.000Z"),
    "client@test.com",
    "TestCorp",
    "Jean",
    "Dupont",
  );
  expect(logSpy).toHaveBeenCalled();
  logSpy.mockRestore();
});

test("should run sendMail error callback branch", () => {
  const { sendMail } = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user: "x", pass: "y" },
  });

  sendMail.mockImplementationOnce((_options, callback) => {
    callback(new Error("SMTP failure"), null);
  });
  const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
  sendCustomerEmail(
    new Date("2026-05-10T08:00:00.000Z"),
    "client@test.com",
    "TestCorp",
    "Jean",
    "Dupont",
  );
  expect(errorSpy).toHaveBeenCalled();
  errorSpy.mockRestore();
});
