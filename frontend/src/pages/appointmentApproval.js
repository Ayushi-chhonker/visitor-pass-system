import { useEffect, useState } from "react";
import axios from "axios";

function AppointmentApproval() {
  const [appointments, setAppointments] = useState([]);
  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "http://localhost:5000/api/appointments",
        {
          headers: { Authorization: `Bearer ${token}`}
        }
      );
      setAppointments(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const approveAppointment = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/appointments/${id}/approve`,
        {},
        {
          headers: { Authorization: `Bearer ${token}`}
        }
      );

      alert("Appointment Approved");
      fetchAppointments();
    } catch (error) {
      alert(
        error.response?.data?.msg ||
        "Approval failed"
      );
    }
  };

  return (
    <div>
      <h2>Appointments</h2>

      <table border="1" cellPadding="10">

        <thead>

          <tr>
            <th>Visitor</th>
            <th>Host</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>

        </thead>

        <tbody>

          {
            appointments.map((appointment) => (

              <tr key={appointment._id}>

                <td>
                  {appointment.visitorId?.name}
                </td>

                <td>
                  {appointment.hostId?.name}
                </td>

                <td>
                  {
                    new Date(
                      appointment.date
                    ).toLocaleDateString()
                  }
                </td>

                <td>
                  {appointment.status}
                </td>

                <td>

                  {
                    appointment.status === "pending" ? (

                      <button
                        onClick={() =>
                          approveAppointment(
                            appointment._id
                          )
                        }
                      >
                        Approve
                      </button>

                    ) : (

                      appointment.status

                    )
                  }
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default AppointmentApproval;
