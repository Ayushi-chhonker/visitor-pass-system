import { useEffect, useState } from "react";
import axios from "axios";

function PreRegistrationList() {

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/preregistrations"
      );

      setData(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  const approve = async (id) => {

    try {

      await axios.put(
        `http://localhost:5000/api/preregistrations/approve/${id}`
      );

      alert("Pre-registration Approved");

      fetchData();

    } catch (error) {

      console.log(error);

      alert("Error approving");

    }

  };

  const reject = async (id) => {

    try {

      await axios.put(
        `http://localhost:5000/api/preregistrations/reject/${id}`
      );

      alert("Pre-registration Rejected");

      fetchData();

    } catch (error) {

      console.log(error);

      alert("Error rejecting");

    }

  };

  return (

    <div>

      <h2>Pre Registration Requests</h2>

      <table border="1">

        <thead>

          <tr>

            <th>Name</th>

            <th>Email</th>

            <th>Phone</th>

            <th>Purpose</th>

            <th>Visit Date</th>

            <th>Status</th>

            <th>Action</th>

          </tr>

        </thead>

        <tbody>

          {

            data.map((item) => (

              <tr key={item._id}>

                <td>{item.name}</td>

                <td>{item.email}</td>

                <td>{item.phone}</td>

                <td>{item.purpose}</td>

                <td>
                  {new Date(item.visitDate).toLocaleDateString()}
                </td>

                <td>{item.status}</td>

                <td>

                  {

                    item.status === "pending" ?

                    <>

                      <button
                        onClick={() => approve(item._id)}
                      >
                        Approve
                      </button>

                      <button
                        onClick={() => reject(item._id)}
                        style={{ marginLeft: "10px" }}
                      >
                        Reject
                      </button>

                    </>

                    :

                    item.status

                  }

                </td>

              </tr>

            ))

          }

        </tbody>

      </table>

    </div>

  );

}

export default PreRegistrationList;