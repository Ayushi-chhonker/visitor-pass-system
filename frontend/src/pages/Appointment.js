import { useState } from "react";
import axios from "axios";

function Appointment() {

  const [visitorId, setVisitorId] = useState("");
  const [hostId, setHostId] = useState("");
  const [date, setDate] = useState("");

  const createAppointment = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:5000/api/appointments",
        {
          visitorId,
          hostId,
          date
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log(res.data);

      alert("Appointment Created Successfully");

      setVisitorId("");
      setHostId("");
      setDate("");

    } catch (error) {

      console.log(error.response?.data);

      alert(error.response?.data?.msg || "Error Creating Appointment");

    }
  };

  return (

    <div className="form-container">

      <h2>Create Appointment</h2>

      <input
        type="text"
        placeholder="Enter Visitor ID"
        value={visitorId}
        onChange={(e) => setVisitorId(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Enter Host ID"
        value={hostId}
        onChange={(e) => setHostId(e.target.value)}
      />

      <br /><br />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <br /><br />

      <button onClick={createAppointment}>
        Create Appointment
      </button>

    </div>

  );
}

export default Appointment;