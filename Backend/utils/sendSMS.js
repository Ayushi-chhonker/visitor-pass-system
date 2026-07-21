/*
SMS Utility
This function is used to send SMS notifications.

Currently, this project uses a mock implementation,
so instead of sending a real SMS, the message is
displayed in the terminal.

In a production application, this function can be
connected to an SMS service such as Twilio or Fast2SMS.
*/

const sendSMS = async (phone, message) => {
  try {
    // Display SMS details in the console.
    // This helps verify that the correct phone number
    // and message are being generated.
    console.log("==================================");
    console.log("SMS Notification");
    console.log("Phone Number :", phone);
    console.log("Message :", message);
    console.log("Status : SMS sent successfully");
    console.log("==================================");

  } catch (err) {
    // Log the error for debugging
    console.log("SMS Sending Error:", err);
  }
};
export default sendSMS;
