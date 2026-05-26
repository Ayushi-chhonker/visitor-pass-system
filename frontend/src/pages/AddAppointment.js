import { useState } from "react";
import axios from "axios";

function AddAppointment() {

  const [visitorId, setVisitorId] = useState("");
  const [hostId, setHostId] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Visitor ID:", visitorId);
console.log("Appointment ID:", appointmentId);

    try {

      const res = await axios.post(
        "http://localhost:5000/api/appointments",
        {
          visitorId,
          hostId,
          date
        }
      );

      alert("Appointment Created");

      console.log(res.data);

    } catch (error) {

      alert("Error Creating Appointment");

      console.log(error);

    }
  };

  return (

    <div>

      <h2>Create Appointment</h2>

      <form onSubmit={handleSubmit}>

       <input
      type="text"
      placeholder="Enter Visitor ID"
      onChange={(e) => setVisitorId(e.target.value)}
     />

        <br /><br />

        <input
          type="text"
          placeholder="Host ID"
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

        <button type="submit">
          Create Appointment
        </button>

      </form>

    </div>
  );
}

export default AddAppointment;