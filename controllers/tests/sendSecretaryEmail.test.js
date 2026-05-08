import { describe, it, expect, vi, beforeEach } from "vitest";
import nodemailer from "nodemailer";
import sendSecretaryEmail from "../sendSecretaryEmail.js";

vi.mock("nodemailer", () => ({
  default: {
    createTransport: vi.fn(),
  },
}));

describe("sendSecretaryEmail integration", () => {
  const sendMailMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    process.env.SMTP_EMAIL = "smtp@test.com";
    process.env.SMTP_PASSWORD = "smtp-password";

    nodemailer.createTransport.mockReturnValue({
      sendMail: sendMailMock,
    });
  });

  it("should create a transporter with SMTP env credentials", () => {
    sendSecretaryEmail(
      new Date("2026-05-10T08:00:00.000Z"),
      "client@test.com",
      "TestCorp",
      "0102030405",
      "Jean",
      "Dupont",
      "0607080910",
    );

    expect(nodemailer.createTransport).toHaveBeenCalledWith({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "smtp@test.com",
        pass: "smtp-password",
      },
    });
  });

  it("should send secretary email with expected recipient and subject", () => {
    sendSecretaryEmail(
      new Date("2026-05-10T08:00:00.000Z"),
      "client@test.com",
      "TestCorp",
      "0102030405",
      "Jean",
      "Dupont",
      "0607080910",
    );

    expect(sendMailMock).toHaveBeenCalledTimes(1);
    expect(sendMailMock).toHaveBeenCalledWith(
      expect.objectContaining({
        to: "reynier.aurore@gmail.com",
        subject: "Nouvelle réservation",
      }),
      expect.any(Function),
    );
  });
});
