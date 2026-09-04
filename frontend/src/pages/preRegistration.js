import { useState, useEffect } from "react";
import axios from "axios";

/*
Pre-Registration Page: This page allows a visitor to submit a visit request before coming to the office.
Workflow:
 Load available hosts (employees).
 Visitor fills the form.
 Form data is sent to backend.
 Backend stores the request for admin approval.
*/

function PreRegistration() {

  // Form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [purpose, setPurpose] = useState("");
  const [visitDate, setVisitDate] = useState("");
  const [hostId, setHostId] = useState("");

  // Stores employee list for host dropdown
  const [hosts, setHosts] = useState([]);

  // Load hosts when page opens
  useEffect(() => { fetchHosts();
  }, []);

  // Fetch all available hosts
  const fetchHosts = async () => {
    try {
      const hostResponse = await axios.get(
        "http://localhost:5000/api/auth/hosts"
      );
      setHosts(hostResponse.data);
    } catch (error) {
      console.log("Unable to fetch hosts:", error);
    }
  };

  // Submit Pre-registration Form
  const submitForm = async (event) => { event.preventDefault();

    // Basic validation before sending request
    if (!name || !phone || !purpose || !visitDate || !hostId) {
      alert("Please fill all required fields.");
      return;
    }
    try {
      await axios.post(
        "http://localhost:5000/api/preregistrations",
        { name, email, phone, purpose, visitDate, hostId}
      );
      alert("Pre-registration submitted successfully.");

      // Clear form after successful submission
      setName("");
      setEmail("");
      setPhone("");
      setPurpose("");
      setVisitDate("");
      setHostId("");

    } catch (error) {
      console.log("Pre-registration Error:", error);
      alert(
        error.response?.data?.msg ||
        "Unable to submit pre-registration."
      );
    }
  };

  return (
    <div>
      <h2>Visitor Pre-Registration</h2>
      <form onSubmit={submitForm}>
        <input
          type="text"  placeholder="Enter Name"  value={name}  onChange={(event) =>
            setName(event.target.value)}
        />

        <br />
        <br />

        <input type="email" placeholder="Enter Email" value={email} onChange={(event) =>  setEmail(event.target.value) }
        />

        <br />
        <br />

        <input
          type="text" placeholder="Enter Phone Number" value={phone} onChange={(event) =>
            setPhone(event.target.value)
          }
        />

        <br />
        <br />

        <input type="text" placeholder="Purpose of Visit" value={purpose} onChange={(event) =>
            setPurpose(event.target.value)
          }
        />

        <br />
        <br />
        <input type="date" value={visitDate} onChange={(event) =>
            setVisitDate(event.target.value)
          }
        />

        <br />
        <br />
        {/* Employee list received from backend */}
        <select  value={hostId}  onChange={(event) =>  setHostId(event.target.value)
          }
        >

          <option value="">
            Select Host
          </option>

          {
            hosts.map((host) => (
              <option  key={host._id}  value={host._id}
              >
                {host.name}
              </option>
            ))
          }

        </select>
        <br />
        <br />

        <button type="submit">  Submit Pre-Registration</button>
      </form>
    </div>
  );
}
export default PreRegistration;