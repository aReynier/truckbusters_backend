import { expect, test, vi, beforeEach } from "vitest";
import nodemailer from "nodemailer";
import sendSecretaryEmail from "./sendSecretaryEmail.js";

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

test("should send email to secretary with expected recipient and subject", () => {
  sendSecretaryEmail(
    new Date("2026-05-10T08:00:00.000Z"),
    "client@test.com",
    "TestCorp",
    "0102030405",
    "Jean",
    "Dupont",
    "0607080910",
  );

  const { sendMail } = nodemailer.createTransport.mock.results[0].value;

  expect(sendMail).toHaveBeenCalledTimes(1);
  expect(sendMail).toHaveBeenCalledWith(
    expect.objectContaining({
      to: "reynier.aurore@gmail.com",
      subject: "Nouvelle réservation",
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
  sendSecretaryEmail(
    new Date("2026-05-10T08:00:00.000Z"),
    "client@test.com",
    "TestCorp",
    "0102030405",
    "Jean",
    "Dupont",
    "0607080910",
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
  sendSecretaryEmail(
    new Date("2026-05-10T08:00:00.000Z"),
    "client@test.com",
    "TestCorp",
    "0102030405",
    "Jean",
    "Dupont",
    "0607080910",
  );
  expect(errorSpy).toHaveBeenCalled();
  errorSpy.mockRestore();
});
