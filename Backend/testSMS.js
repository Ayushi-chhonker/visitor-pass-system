import "dotenv/config";

const formData = new FormData();

formData.append("mobileNumber", "+916395243883");
formData.append(
  "templateId",
  process.env.TEXTPLATE_TEMPLATE_ID
);
formData.append(
  "detailValue",
  "Appointment approved"
);

const response = await fetch("https://api.textplate.in/v1/send-sms", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${process.env.TEXTPLATE_API_KEY}`
  },
  body: formData
});

const result = await response.text();

console.log("Textplate Response:");
console.log(result);