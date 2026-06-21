import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {

  const [visitors, setVisitors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [passes, setPasses] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {

    fetchData();

  }, []);

  const fetchData = async () => {
    const token = localStorage.getItem("token");

    try {

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

      const passRes = await axios.get(
        "http://localhost:5000/api/passes",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setVisitors(visitorRes.data);

      setAppointments(appointmentRes.data);

      setPasses(passRes.data);

    } catch (error) {

      console.log(error);

    }
  };
  const filteredAppointments = appointments.filter((appointment) => {

  const visitorName =
    appointment.visitorId?.name?.toLowerCase() || "";

  const searchMatch = visitorName.includes(search.toLowerCase());

  const statusMatch =
    statusFilter === "all" ||
    appointment.status === statusFilter;

  return searchMatch && statusMatch;
 });

 const exportCSV = () => {

  const headers = ["Visitor Name", "Status", "Date"];

  const rows = filteredAppointments.map((appointment) => [
    appointment.visitorId?.name || "",
    appointment.status,
    new Date(appointment.date).toLocaleDateString()
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map(row => row.join(","))
  ].join("\n");

  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;"
  });

  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;

  link.setAttribute("download", "appointments.csv");

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
};

  return (

  <div>

    <h2>Dashboard</h2>
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
    <div style={{ marginBottom: "20px" }}>

  <input
    type="text"
    placeholder="Search Visitor..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />

  <select
    value={statusFilter}
    onChange={(e) => setStatusFilter(e.target.value)}
    style={{ marginLeft: "10px" }}
  >

    <option value="all">All</option>
    <option value="pending">Pending</option>
    <option value="approved">Approved</option>
    <option value="rejected">Rejected</option>

  </select>
  <button
  onClick={exportCSV}
  style={{ marginLeft: "10px" }}
>
  Export CSV
</button>


    <div className="dashboard-container">

      <div className="dashboard-card">
        <h3>Total Visitors</h3>
        <p>{visitors.length}</p>
      </div>

      <div className="dashboard-card">
        <h3>Total Appointments</h3>
        <p>{appointments.length}</p>
      </div>

      <div className="dashboard-card">
        <h3>Total Passes</h3>
        <p>{passes.length}</p>
      </div>

    </div>
    <h3>Appointments</h3>

<table border="1">

  <thead>

    <tr>

      <th>Visitor</th>

      <th>Status</th>

    </tr>

  </thead>

  <tbody>

    {filteredAppointments.map((appointment) => (

      <tr key={appointment._id}>

        <td>{appointment.visitorId?.name}</td>

        <td>{appointment.status}</td>

      </tr>

    ))}

  </tbody>

</table>

  </div>
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
            visitor.photo ?

           <img
           src={`http://localhost:5000/uploads/${visitor.photo}`}
           alt="visitor"
           width="70"
           height="70"
           style={{
           borderRadius: "50%",
           objectFit: "cover"
  }}
/>

            :

            "No Photo"

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