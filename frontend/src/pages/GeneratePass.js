import { useState, useEffect } from "react";
import axios from "axios";

function Pass() {

  const [visitorId, setVisitorId] = useState("");
  const [appointmentId, setAppointmentId] = useState("");
  const [passData, setPassData] = useState(null);
  const [visitors, setVisitors] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
  fetchData();
}, []);
const fetchData = async () => {
  try {
    const token = localStorage.getItem("token");
    const visitorRes = await axios.get(
      "http://localhost:5000/api/visitors",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    const appointmentRes = await axios.get(
      "http://localhost:5000/api/appointments",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    setVisitors(visitorRes.data);
    setAppointments(appointmentRes.data);
  } catch (error) {
    console.log(error);
  }
};

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

const downloadPDF = async (passId) => {

  try {

    const token = localStorage.getItem("token");

    const response = await axios.get(
      `http://localhost:5000/api/passes/${passId}/pdf`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        },
        responseType: "blob"
      }
    );

    const url = window.URL.createObjectURL(
      new Blob([response.data])
    );

    const link = document.createElement("a");
    link.href = url;
    link.download = "VisitorPass.pdf";
    link.click();
  } catch (error) {
    console.log(error);
    alert("Can't download PDF");

  }

};

  return (

    <div className="form-container">

      <h2>Generate Pass</h2>

      <select
  value={visitorId}
  onChange={(e) => setVisitorId(e.target.value)}>
  <option value="">
    Select Visitor
  </option>
  {visitors.map((visitor) => (
    <option
      key={visitor._id}
      value={visitor._id} >
      {visitor.name}
    </option>
  ))}
</select>

      <br /><br />
     
     <select value={appointmentId} onChange={(e) => setAppointmentId(e.target.value)}>
  <option value="">
    Select Appointment
  </option>
  {appointments.map((appointment) => (
    <option
      key={appointment._id}
      value={appointment._id} >
      {appointment.visitorId?.name} - {appointment.status}
    </option>
  ))}
</select>

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

            <br /><br />

            <button onClick={() => downloadPDF(passData._id)}>
                   Download PDF
            </button>
          </div>
        )
      }

    </div>
  );
}

export default Pass;