import { describe, it, expect, vi, beforeEach } from "vitest";
import nodemailer from "nodemailer";
import sendCustomerEmail from "../sendCustomerEmail.js";

vi.mock("nodemailer", () => ({
  default: {
    createTransport: vi.fn(),
  },
}));

describe("sendCustomerEmail integration", () => {
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
    sendCustomerEmail(
      new Date("2026-05-10T08:00:00.000Z"),
      "client@test.com",
      "TestCorp",
      "Jean",
      "Dupont",
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

  it("should send customer email with expected recipient and subject", () => {
    sendCustomerEmail(
      new Date("2026-05-10T08:00:00.000Z"),
      "client@test.com",
      "TestCorp",
      "Jean",
      "Dupont",
    );

    expect(sendMailMock).toHaveBeenCalledTimes(1);
    expect(sendMailMock).toHaveBeenCalledWith(
      expect.objectContaining({
        to: "client@test.com",
        subject: "Votre réservation chez TruckBusters",
      }),
      expect.any(Function),
    );
  });
});
