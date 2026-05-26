import { useEffect, useState } from "react";
import axios from "axios";

function AppointmentList() {

  const [appointments, setAppointments] = useState([]);

  //Fetch appointments
  const fetchAppointments = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/appointments"
      );

      setAppointments(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  //Approve appointment
  const approveAppointment = async (id) => {

    try {

      await axios.put(
        `http://localhost:5000/api/appointments/${id}/approve`
      );

      alert("Appointment Approved");

      fetchAppointments();

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {

    fetchAppointments();

  }, []);

  return (

    <div>

      <h2>Appointment List</h2>

      <table border="1" cellPadding="10">

        <thead>

          <tr>
            <th>Appointment ID</th>
            <th>Visitor ID</th>
            <th>Host ID</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>

        </thead>

        <tbody>

          {appointments.map((appointment) => (

            <tr key={appointment._id}>
              <td>{appointment._id}</td>
              <td>{appointment.visitorId?._id || appointment.visitorId}</td>
              <td>{appointment.hostId?._id || appointment.hostId}</td>
              <td>
                {new Date(appointment.date).toLocaleDateString()}
              </td>
              <td>{appointment.status}</td>
              <td>
                {appointment.status === "pending" && (

                  <button
                    onClick={() =>
                      approveAppointment(appointment._id)
                    }
                  >
                    Approve
                  </button>

                )}

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default AppointmentList;