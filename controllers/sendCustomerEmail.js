import nodemailer from 'nodemailer';

const sendCustomerEmail = (moment, email, name, firstname, lastname ) => {
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
        to: email,
        subject: "Votre réservation chez TruckBusters",
        text: `Bonjour ${name}, nous vous confirmons par cet email votre rendez vous du ${new Date(moment.toLocaleString('fr-FR', { timeZone: 'UTC' }))} avec votre chauffeur prénommé ${lastname} ${firstname} chez TruckBusters, pensez à ramener votre carte grise. Passez une bonne journée`,
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
        console.error("Error sending email: ", error);
        } else {
        console.log("Email sent: ", info.response);
        }
    });
}

export default sendCustomerEmail

