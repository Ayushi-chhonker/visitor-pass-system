import { useState, useEffect } from "react";
import axios from "axios";

/*
Generate Pass Page: This page allows an authorized user to generate a visitor pass.
Workflow:
1. Fetch visitors and appointments.
2. Select visitor and appointment.
3. Generate a QR-based visitor pass.
4. Display generated QR code.
5. Download the visitor pass as a PDF.
*/

function Pass() {
  // Store selected visitor id
  const [visitorId, setVisitorId] = useState("");
  // Store selected appointment id
  const [appointmentId, setAppointmentId] = useState("");
  // Stores generated pass returned from backend
  const [passData, setPassData] = useState(null);
  // Stores visitor list
  const [visitors, setVisitors] = useState([]);
  // Stores appointment list
  const [appointments, setAppointments] = useState([]);

  // Load visitors and appointments when page opens
  useEffect(() => {
    fetchData();
  }, []);

  // Fetch Visitors and Appointments
  const fetchData = async () => {
    try {

      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      // Fetch all visitors
      const visitorResponse = await axios.get(
        "http://localhost:5000/api/visitors",
        config
      );

      // Fetch all appointments
      const appointmentResponse = await axios.get(
        "http://localhost:5000/api/appointments",
        config
      );

      // Save fetched data into state
      setVisitors(visitorResponse.data);
      setAppointments(appointmentResponse.data);

    } catch (error) {
      console.log("Unable to fetch data:", error);
    }
  };

  // Generate Visitor Pass
  const generatePass = async () => {
    // User must select both fields
    if (!visitorId || !appointmentId) {
      alert("Please select both Visitor and Appointment.");
      return;
    }

    try {

      const token = localStorage.getItem("token");
      const passResponse = await axios.post(
        "http://localhost:5000/api/passes",
        {visitorId, appointmentId },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // Store generated pass details
      setPassData(passResponse.data);
      alert("Visitor Pass Generated Successfully.");
    } catch (error) {
      console.log( "Generate Pass Error:", error.response?.data
      );

      alert(
        error.response?.data?.msg ||
        "Unable to generate visitor pass."
      );
    }
  };

  // Download Visitor Pass PDF
  const downloadPDF = async (passId) => {
    try {
      const token = localStorage.getItem("token");

      // Backend returns PDF as binary data
      const response = await axios.get(
        `http://localhost:5000/api/passes/${passId}/pdf`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
          responseType: "blob"
        }
      );

      // Create downloadable file
      const pdfFile = new Blob(
        [response.data]
      );

      const downloadURL =
        window.URL.createObjectURL(pdfFile);

      const link =
        document.createElement("a");

      link.href = downloadURL;
      link.download = "VisitorPass.pdf";
      link.click();
    } catch (error) {
      console.log("PDF Download Error:", error);
      alert("Unable to download PDF.");
    }
  };
    return (

    <div className="form-container">

      <h2>Generate Visitor Pass</h2>

      {/* Visitor Selection */}

      <select
        value={visitorId}
        onChange={(event) =>
          setVisitorId(event.target.value)
        }
      >
        <option value="">
          Select Visitor
        </option>

        { visitors.map((visitor) => (

            <option
              key={visitor._id}
              value={visitor._id}
            >
              {visitor.name}
            </option>
          ))
        }
      </select>
      <br />
      <br />



      {/*  Appointment Selection */}

      <select
        value={appointmentId}
        onChange={(event) =>
          setAppointmentId(event.target.value)
        }
      >
        <option value="">
          Select Appointment
        </option>

        {
          appointments.map((appointment) => (

            <option
              key={appointment._id}
              value={appointment._id}
            >
              {appointment.visitorId?.name}
              {" - "}
              {appointment.status}
            </option>
          ))
        }
      </select>
      <br />
      <br />

      {/* Generate Pass Button */}
      <button onClick={generatePass}>
        Generate Pass
      </button>
      <br />
      <br />



      {/* Show generated QR code only after pass has been created */}
      {
        passData && (
          <div>
            <h3>Visitor QR Code</h3>
            <img
              src={passData.qrCode}
              alt="Visitor QR Code"
              width="250"
            />

            <br />
            <br />

            {/* Download visitor pass as PDF */}
            <button
              onClick={() =>
                downloadPDF(passData._id)
              }
            > Download PDF
            </button>
          </div>
        )
      }
    </div>
  );
}
export default Pass;