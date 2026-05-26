import { useState } from "react";
import axios from "axios";

function Visitor() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [purpose, setPurpose] = useState("");

  const addVisitor = async () => {

    try {

      const res = await axios.post(
        "http://localhost:5000/api/visitors",
        {
          name,
          email,
          phone,
          purpose
        }
      );

      console.log(res.data);

      alert("Visitor Added Successfully");

    } catch (error) {

      console.log(error.response.data);

      alert("Error Adding Visitor");

    }
  };

  return (

    <div className="form-container">

      <h2>Add Visitor</h2>

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
        placeholder="Purpose of Visit"
        value={purpose}
        onChange={(e) => setPurpose(e.target.value)}
      />

      <br /><br />

      <button onClick={addVisitor}>
        Add Visitor
      </button>

    </div>
  );
}

export default Visitor;
