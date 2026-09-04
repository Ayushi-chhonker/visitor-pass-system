import { useEffect, useState } from "react";
import axios from "axios";

/* 1. Display all visitors stored in the database.
2. Allow admin to delete a visitor.
3. Refresh the table after deletion. */

function VisitorList() {
  // State to store visitor records
  const [visitors, setVisitors] = useState([]);

  // Fetch all visitors from backend
  const fetchVisitors = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/api/visitors",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // Save visitor list into state
      setVisitors(response.data);
    } catch (error) {
       console.log("Unable to fetch visitors:", error);
    }
  };

  // Delete Visitor
  const deleteVisitor = async (visitorId) => {
    // Ask confirmation before deleting
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this visitor?"
    );
    if (!confirmDelete) {
      return;
    }
    try {

      const token = localStorage.getItem("token");
      await axios.delete( `http://localhost:5000/api/visitors/${visitorId}`,
        {
          headers: {  Authorization: `Bearer ${token}` }
        }
      );
      alert("Visitor deleted successfully.");

      // Refresh visitor list after deletion
      fetchVisitors();
    } catch (error) {
      console.log("Delete Error:", error);
      alert(
        error.response?.data?.msg ||
        "Unable to delete visitor."
      );
    }
  };

  // Load visitor list when page opens
  useEffect(() => { fetchVisitors();
  }, []);

  return (
    <div>
      <h2>Visitor List</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Purpose</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {
            visitors.map((visitor) => (
              <tr key={visitor._id}>
                <td>{visitor.name}</td>
                <td>{visitor.phone}</td>
                <td>{visitor.purpose}</td>
                <td>
                  <button
                    onClick={() =>
                      deleteVisitor(visitor._id)
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}
export default VisitorList;