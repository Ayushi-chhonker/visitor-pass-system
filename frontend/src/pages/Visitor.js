import { useState } from "react";
import axios from "axios";

function Visitor() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [purpose, setPurpose] = useState("");
  const [photo, setPhoto] = useState(null);

  const addVisitor = async () => {

  try {

    const token = localStorage.getItem("token");

    const formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("purpose", purpose);
    formData.append("photo", photo);

    const res = await axios.post(

      "http://localhost:5000/api/visitors",

      formData,

      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      }

    );

    console.log(res.data);

    alert("Visitor Added Successfully");

    setName("");
    setEmail("");
    setPhone("");
    setPurpose("");
    setPhoto(null);

  }

  catch (error) {

    console.log(error.response?.data);

    alert(error.response?.data?.msg || "Error Adding Visitor");

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
      <input
       type="file"
       accept="image/*"
       onChange={(e) => setPhoto(e.target.files[0])}
      />

<br /><br />

      <br /><br />

      <button onClick={addVisitor}>
        Add Visitor
      </button>

    </div>

  );
}

export default Visitor;