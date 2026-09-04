import { useEffect, useState } from "react";
import axios from "axios";

/*
Appointment Approval Page:This page is mainly used by the admin to view all appointments and approve pending appointment requests.
Workflow:
1. Fetch all appointments from backend.
2. Display them in a table.
3. Admin approves pending appointments.
4. Refresh the list after approval.
*/

function AppointmentApproval() {
  // Stores all appointments
  const [appointments, setAppointments] = useState([]);
  // Load appointments when component opens
  useEffect(() => {  fetchAppointments();
  }, []);

  // Fetch All Appointments
  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/api/appointments",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // Save appointment list in state
      setAppointments(response.data);
    } catch (error) {
      console.log("Unable to fetch appointments:", error);
    }
  };

  // Approve Appointment
  const approveAppointment = async (appointmentId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put( `http://localhost:5000/api/appointments/${appointmentId}/approve`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      alert("Appointment approved successfully.");
      // Refresh updated appointment list
      fetchAppointments();
    } catch (error) {
      console.log("Approval Error:", error);
      alert(
        error.response?.data?.msg ||
        "Unable to approve appointment."
      );
    }
  };

  return (
    <div>
      <h2>Appointment Approval</h2>
      <table
        border="1"
        cellPadding="10"
      >
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
                    new Date( appointment.date
                    ).toLocaleDateString()
                  }
                </td>

                <td>
                  {appointment.status}
                </td>

                <td>
                  { appointment.status === "pending"
                      ? (
                        <button
                          onClick={() =>  approveAppointment( appointment._id )
                          }
                        >
                          Approve </button>
                      )
                      : (appointment.status
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