import { useEffect, useState } from "react";
import axios from "axios";

/*
Dashboard Page
This page shows an overview of the Visitor Pass
Management System.

From this dashboard an authorized user can:
 View total visitors, View total appointments, View generated passes, Search appointments, Filter appointments by status, Export appointment data into CSV, Approve pending appointments
*/

function Dashboard() {
  // Store visitors fetched from database
  const [visitors, setVisitors] = useState([]);
  // Store appointment records
  const [appointments, setAppointments] = useState([]);
  // Store generated visitor passes
  const [passes, setPasses] = useState([]);
  // Used for searching visitors by name
  const [search, setSearch] = useState("");
  // Used for filtering appointments
  const [statusFilter, setStatusFilter] = useState("all");
  // Logged in user information is stored after login
  const user = JSON.parse(localStorage.getItem("user"));

  // Load dashboard data once when page opens
  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Fetch Visitors, Appointments and Passes
  const fetchDashboardData = async () => {
    try {
      // JWT token is required to access protected APIs
      const token = localStorage.getItem("token");

      const config = {
        headers: { Authorization: `Bearer ${token}`
        }
      };

      // Fetch visitors
      const visitorResponse = await axios.get(
        "http://localhost:5000/api/visitors",
        config
      );

      // Fetch appointments
      const appointmentResponse = await axios.get(
        "http://localhost:5000/api/appointments",
        config
      );

      // Fetch visitor passes
      const passResponse = await axios.get(
        "http://localhost:5000/api/passes",
        config
      );

      // Store fetched data into React state
      setVisitors(visitorResponse.data);
      setAppointments(appointmentResponse.data);
      setPasses(passResponse.data);

    } catch (error) {
      console.log("Dashboard Error:", error);
    }
  };

  // Search + Status Filter
  // Only appointments matching both conditions will be displayed.
  const filteredAppointments = appointments.filter((appointment) => {
    const visitorName = appointment.visitorId?.name?.toLowerCase() || "";
    const matchesSearch = visitorName.includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      appointment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Export Appointment List as CSV
  const exportCSV = () => {
    // First row of CSV file
    const headers = [ "Visitor Name", "Status","Date"];

    // Convert appointment objects into rows
    const rows = filteredAppointments.map((appointment) => [
      appointment.visitorId?.name || "",
      appointment.status,
      new Date(
        appointment.date
      ).toLocaleDateString()
    ]);

    // Join all rows into CSV format
    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(","))
    ].join("\n");

    // Create downloadable CSV file
    const file = new Blob(
      [csvContent],
      { type: "text/csv;charset=utf-8;" }
    );

    const downloadURL = window.URL.createObjectURL(file);

    const link = document.createElement("a");
    link.href = downloadURL;

    link.setAttribute( "download","appointments.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Approve Appointment
  const approveAppointment = async (appointmentId) => {
    try {

      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/appointments/${appointmentId}/approve`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      alert("Appointment Approved Successfully");

      // Reload dashboard after approval
      fetchDashboardData();
    } catch (error) {
      alert( error.response?.data?.msg ||
        "Unable to approve appointment."
      );
    }
  };
   return (

    <div>
      <h2>Dashboard</h2>

      {/* Show logged-in user information */}
      {user && (
        <div
          style={{
            backgroundColor: "#f4f4f4",
            padding: "15px",
            marginBottom: "20px",
            borderRadius: "8px",
            border: "1px solid #ddd"
          }}
        >
          <h3>Welcome, {user.name}</h3>

          <p>
            <strong>Role:</strong> {user.role}
          </p>

        </div>
      )}


      {/* Search box, status filter and CSV export */}
      <div style={{ marginBottom: "20px" }}>

        <input type="text" placeholder="Search Visitor..." value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <select
          value={statusFilter} onChange={(event) =>
            setStatusFilter(event.target.value)
          }
          style={{ marginLeft: "10px" }}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>

        <button onClick={exportCSV} style={{ marginLeft: "10px" }}
        > Export CSV
        </button>
      </div>



      {/* Dashboard Summary Cards */}
      <div className="dashboard-container">
        <div className="dashboard-card">
          <h3>👥 Total Visitors</h3>
          <p>{visitors.length}</p>
        </div>

        <div className="dashboard-card">
          <h3>📅 Total Appointments</h3>
          <p>{appointments.length}</p>
        </div>

        <div className="dashboard-card">
          <h3>🎫 Total Passes</h3>
          <p>{passes.length}</p>
        </div>
      </div>



      {/* Appointment Table */}
      <h3>Appointments</h3>
      <table border="1">

        <thead>
          <tr>
            <th>Visitor</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredAppointments.map((appointment) => (
            <tr key={appointment._id}>
              <td>
                {appointment.visitorId?.name}
              </td>

              <td>
                <span
                  className={`status ${appointment.status}`}
                >
                  {appointment.status}
                </span>
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
                    > Approve
                    </button>
                  ) : (
                    "Approved"
                  )
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>



      {/* Visitor Details */}
      <h3>Visitors</h3>
      <table border="1">
        <thead>
          <tr>
            <th>Photo</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Purpose</th>
          </tr>

        </thead>

        <tbody>
          {visitors.map((visitor) => (
            <tr key={visitor._id}>
              <td>
                {
                  visitor.photo ? (
                    <img
                      src={`http://localhost:5000/uploads/${visitor.photo}`} alt="Visitor" width="70"  height="70"
                      style={{
                        borderRadius: "50%",
                        objectFit: "cover"
                      }}
                    />
                  ) : (
                    "No Photo"
                  )
                }

              </td>
              <td>{visitor.name}</td>
              <td>{visitor.email}</td>
              <td>{visitor.phone}</td>
              <td>{visitor.purpose}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default Dashboard;