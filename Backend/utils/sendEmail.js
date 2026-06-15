import nodemailer from "nodemailer";

const sendEmail = async (to, subject, text) => {
  try {

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    });


  } catch (error) {
    console.log("Email Error:");
    console.log(error);
  }
};

export default sendEmail;