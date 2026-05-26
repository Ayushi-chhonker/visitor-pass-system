import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {

  const [visitors, setVisitors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [passes, setPasses] = useState([]);

  useEffect(() => {

    fetchData();

  }, []);

  const fetchData = async () => {

    try {

      const visitorRes = await axios.get(
        "http://localhost:5000/api/visitors"
      );

      const appointmentRes = await axios.get(
        "http://localhost:5000/api/appointments"
      );

      const passRes = await axios.get(
        "http://localhost:5000/api/passes"
      );

      setVisitors(visitorRes.data);

      setAppointments(appointmentRes.data);

      setPasses(passRes.data);

    } catch (error) {

      console.log(error);

    }
  };

  return (

  <div>

    <h2>Dashboard</h2>

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

  </div>
);
}

export default Dashboard;