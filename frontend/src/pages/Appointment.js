import { useState } from "react";
import axios from "axios";

/*
Appointment Page: This page is used to create a new appointment between a visitor and a host (employee).
Workflow:
Enter Visitor ID then Enter Host ID then Select appointment date then Send data to backend and finally
 Backend saves the appointment and returns success.
*/

function Appointment() {
  // Store appointment details
  const [visitorId, setVisitorId] = useState("");
  const [hostId, setHostId] = useState("");
  const [date, setDate] = useState("");

  // Create Appointment
  const createAppointment = async () => {
    // Basic validation before sending request
    if (!visitorId || !hostId || !date) {
      alert("Please fill all appointment details.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/appointments",
        {visitorId,hostId,date},

        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log("Appointment Created:", response.data);
      alert("Appointment created successfully.");
      // Clear form after successful creation
      setVisitorId("");
      setHostId("");
      setDate("");

    } catch (error) {
      console.log("Appointment Error:", error);
      alert(
        error.response?.data?.msg ||
        "Unable to create appointment."
      );
    }
  };

  return (
    <div className="form-container">
      <h2>Create Appointment</h2>
      <input type="text" placeholder="Enter Visitor ID"  value={visitorId}
        onChange={(event) =>
          setVisitorId(event.target.value)
        }
      />
      <br />
      <br />

      <input type="text" placeholder="Enter Host ID" value={hostId}
        onChange={(event) =>
          setHostId(event.target.value)
        }
      />
      <br />
      <br />

      <input
        type="date"  value={date} onChange={(event) =>   setDate(event.target.value)
        }
      />

      <br />
      <br />
      <button onClick={createAppointment}>  Create Appointment</button>
    </div>
  );
}
export default Appointment;