import { useState , useEffect } from "react";
import axios from "axios";

function PreRegistration() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [purpose, setPurpose] = useState("");
  const [visitDate, setVisitDate] = useState("");
  const [hostId, setHostId] = useState("");
  const [hosts , setHosts] = useState([])
  
  useEffect(() => {
  fetchHosts();
}, []);
const fetchHosts = async () => {
  try {
    const res = await axios.get(
      "http://localhost:5000/api/auth/hosts"
    );
    setHosts(res.data);
  } catch (error) {
    console.log(error);
  }
};

  const submitForm = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "http://localhost:5000/api/preregistrations",
        {
          name,
          email,
          phone,
          purpose,
          visitDate,
          hostId
        }
      );

      alert("Pre-registration submitted successfully");

      setName("");
      setEmail("");
      setPhone("");
      setPurpose("");
      setVisitDate("");
      setHostId("");

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.msg ||
        "Something went wrong"
      );

    }

  };

  return (

    <div>

      <h2>Pre Registration</h2>

      <form onSubmit={submitForm}>

        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <br /><br />

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br /><br />

        <input
          type="text"
          placeholder="Enter Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <br /><br />

        <input
          type="text"
          placeholder="Purpose"
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
        />

        <br /><br />

        <input
          type="date"
          value={visitDate}
          onChange={(e) => setVisitDate(e.target.value)}
        />

        <br /><br />
        <select value={hostId}
  onChange={(e) => setHostId(e.target.value)}
   >
  <option value="">
    Select Host
  </option>
  {
    hosts.map((host) => (
      <option
        key={host._id}
        value={host._id}
      >
        {host.name}
      </option>
    ))
  }
</select>
        <button type="submit">

          Submit Pre-Registration

        </button>

      </form>

    </div>

  );

}

export default PreRegistration;