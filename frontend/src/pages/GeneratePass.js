import { useState } from "react";
import axios from "axios";

function Pass() {

  const [visitorId, setVisitorId] = useState("");
  const [appointmentId, setAppointmentId] = useState("");
  const [passData, setPassData] = useState(null);

  const generatePass = async () => {

  try {

    const token = localStorage.getItem("token");

    const res = await axios.post(
      "http://localhost:5000/api/passes",
      {
        visitorId,
        appointmentId
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    setPassData(res.data);

    alert("Pass Generated Successfully");

  } catch (error) {

    console.log(error.response?.data);

    alert(error.response?.data?.msg || "Error generating pass");

  }

};

  return (

    <div className="form-container">

      <h2>Generate Pass</h2>

      <input
        type="text"
        placeholder="Enter Visitor ID"
        value={visitorId}
        onChange={(e) => setVisitorId(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Enter Appointment ID"
        value={appointmentId}
        onChange={(e) => setAppointmentId(e.target.value)}
      />

      <br /><br />

      <button onClick={generatePass}>
        Generate Pass
      </button>

      <br /><br />

      {
        passData && (

          <div>

            <h3>QR Code</h3>

            <img
              src={passData.qrCode}
              alt="QR Code"
              width="250"
            />

          </div>
        )
      }

    </div>
  );
}

export default Pass;