const sendSMS = async (phone, message) => {
  try {

    console.log("=============================");
    console.log("SMS Notification");
    console.log("Phone:", phone);
    console.log("Message:", message);
    console.log("SMS sent successfully");
    console.log("=============================");

  } catch (error) {

    console.log("SMS sending failed");
    console.log(error.message);

  }
};

export default sendSMS;
