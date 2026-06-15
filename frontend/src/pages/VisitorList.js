import { useEffect, useState } from "react";
import axios from "axios";

function VisitorList() {

  const [visitors, setVisitors] = useState([]);

  // Fetch visitors
  const fetchVisitors = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/visitors"
      );

      setVisitors(res.data);

    } catch (error) {

      console.log(error);

    }
  };
  const deleteVisitor = async (id) => {

    try {

        await axios.delete(

            `http://localhost:5000/api/visitors/${id}`,

            {

                headers: {

                    Authorization:
                    `Bearer ${localStorage.getItem("token")}`

                }

            }

        );

        fetchVisitors();

    }

    catch(err){

        console.log(err);

    }

}

  useEffect(() => {

    fetchVisitors();

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
          </tr>

        </thead>

        <tbody>

          {visitors.map((visitor) => (

            <tr key={visitor._id}>

              <td>{visitor.name}</td>

              <td>{visitor.phone}</td>

              <td>{visitor.purpose}</td>

              <td>
             <button onClick={() => deleteVisitor(visitor._id)}>Delete </button>
             </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default VisitorList;