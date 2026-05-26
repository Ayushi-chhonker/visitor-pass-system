import { useState } from "react";
import axios from "axios";

function AddVisitor() {

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [purpose, setPurpose] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const res = await axios.post(
        "http://localhost:5000/api/visitors",
        {
          name,
          phone,
          purpose
        }
      );

      alert("Visitor Added");

      console.log(res.data);

    } catch (error) {

      alert("Error Adding Visitor");

      console.log(error);

    }
  };

  return (

    <div>

      <h2>Add Visitor</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Visitor Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <br /><br />

        <input
          type="text"
          placeholder="Phone Number"
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

        <button type="submit">
          Add Visitor
        </button>

      </form>

    </div>
  );
}

export default AddVisitor;