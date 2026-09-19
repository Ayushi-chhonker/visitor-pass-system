const sendSMS = async (phone, message) => {
  try {
    const formData = new FormData();

    // Textplate expects the Indian number with country code
    const mobileNumber = phone.startsWith("+91")
      ? phone
      : `+91${phone}`;

    formData.append("mobileNumber", mobileNumber);
    formData.append(
      "templateId",
      process.env.TEXTPLATE_TEMPLATE_ID
    );
    formData.append("detailValue", message);

    const response = await fetch(
      "https://api.textplate.in/v1/send-sms",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.TEXTPLATE_API_KEY}`
        },
        body: formData
      }
    );

    const result = await response.json();

    if (!response.ok || result.status !== "success") {
      console.log("SMS sending failed:", result);
      return false;
    }

    console.log("SMS sent successfully to:", mobileNumber);
    return true;

  } catch (error) {
    console.log("SMS Error:", error.message);
    return false;
  }
};

export default sendSMS;
