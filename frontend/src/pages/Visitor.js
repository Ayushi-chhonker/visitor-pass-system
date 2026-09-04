import { useState } from "react";
import axios from "axios";

/*
Purpose: This page is used to add a new visitor into the Visitor Pass Management System.
Workflow:
1. User enters visitor details.
2. User optionally uploads a photo.
3. FormData is created because image upload is involved.
4. Data is sent to the backend API.
5. On success, the form is cleared.
*/

function Visitor() {
  // Visitor details
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [purpose, setPurpose] = useState("");
  // Store uploaded image
  const [photo, setPhoto] = useState(null);

  // Add New Visitor
  const addVisitor = async () => {
    // Simple validation before sending request
    if (!name || !phone || !purpose) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      // FormData is required because image file
      // cannot be sent as normal JSON
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("purpose", purpose);

      // Attach image only if user selected one
      if (photo) {
        formData.append("photo", photo);
      }
      const response = await axios.post(
        "http://localhost:5000/api/visitors",
        formData,
        {
          headers: { Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );

      console.log("Visitor Added:", response.data);
      alert("Visitor added successfully.");

      // Clear form after successful submission
      setName("");
      setEmail("");
      setPhone("");
      setPurpose("");
      setPhoto(null);

    } catch (error) {
      console.log("Add Visitor Error:", error);
      alert(
        error.response?.data?.msg ||
        "Unable to add visitor."
      );
    }
  };



  return (
    <div className="form-container">
      <h2>Add New Visitor</h2>

      <input type="text" placeholder="Enter Name" value={name} onChange={(event) =>
          setName(event.target.value)
        }
      />

      <br />
      <br />
      <input type="email" placeholder="Enter Email" value={email} onChange={(event) =>
          setEmail(event.target.value)
        }
      />

      <br />
      <br />
      <input  type="text"  placeholder="Enter Phone Number"  value={phone}  onChange={(event) =>
          setPhone(event.target.value)
        }
      />

      <br />
      <br />

      <input  type="text"  placeholder="Purpose of Visit"  value={purpose}  onChange={(event) =>
          setPurpose(event.target.value)
        }
      />

      <br />
      <br />

      {/* Upload visitor photograph */}
      <input  type="file"  accept="image/*"  onChange={(event) =>  setPhoto(event.target.files[0])
        }
      />

      <br />
      <br />
      <button onClick={addVisitor}> Add Visitor </button>
    </div>
  );
}
export default Visitor;