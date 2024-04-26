import nodemailer from 'nodemailer';

const sendSecretaryEmail = (moment, email, name, phone, firstname, lastname, driverPhone) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });
  
  const mailOptions = {
    from: "your_email@gmail.com",
    to: "reynier.aurore@gmail.com",
    subject: "Nouvelle réservation",
    text: `Bonjour Janine, nouvelle réservation le ${new Date(moment.toLocaleString('fr-FR', { timeZone: 'UTC' }))} (compter deux heures de plus pour l'heure française) de l'enteprise ${name} dont l'email est ${email}. Leur conducteur se nomme ${lastname} ${firstname}. Les coordonées supplémentaires si il y en a: numéro de téléphone de l'entreprise: ${phone}, numéro de téléphone du chauffeur ${driverPhone}. Passez une bonne journée`,
  };
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email: ", error);
    } else {
      console.log("Email sent: ", info.response);
    }
  });
}

export default sendSecretaryEmail
