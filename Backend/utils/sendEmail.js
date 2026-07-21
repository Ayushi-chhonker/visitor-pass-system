import nodemailer from "nodemailer";

/*
Email Utility
This utility is responsible for sending email
notifications from the application.

Instead of writing email sending logic inside every
controller, it is kept in a separate utility so that
the same function can be reused throughout the project.
*/

const sendEmail = async (to, subject, text) => {
  try {

    // Create a transporter using Gmail service.
    // The email credentials are stored in environment
    // variables for security instead of hardcoding them.
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Send email to the recipient
    const emailInfo = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text
    });

    // Print message ID in terminal.
    // It helps confirm that the email request was accepted.
    console.log("Email sent successfully.");
    console.log("Message ID:", emailInfo.messageId);

  } catch (err) {
    // Print actual error for debugging
    console.log("Email Sending Error:", err);

  }
};
export default sendEmail;