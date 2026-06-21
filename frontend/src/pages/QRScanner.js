import { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import axios from "axios";

function QRScanner() {

  useEffect(() => {

    let scanned = false;

    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        fps: 10,
        qrbox: 250
      },
      false
    );

    scanner.render(

      (decodedText) => {

        if (scanned) return;
        scanned = true;

        const token = localStorage.getItem("token");

        // Extract visitorId and appointmentId from QR
        const parts = decodedText.split(",");

        const visitorId = parts[0].split(":")[1];

        const appointmentId = parts[1].split(":")[1];

        // Verify Pass
        axios.get(
          `http://localhost:5000/api/passes/verify/${visitorId}/${appointmentId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )

        .then((res) => {

          console.log("Pass Verified:", res.data);

          // Step 2: Check In Visitor
          axios.put(
            `http://localhost:5000/api/appointments/checkin/${appointmentId}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          )
         //checkin with pass
          .then((checkInRes) => {

            console.log("Check In Success:", checkInRes.data);

            alert(
              "PASS VERIFIED\n\n" +
              "Visitor: " +
              res.data.visitorId.name +
              "\n\nStatus: Checked In Successfully"
            );

          })

          .catch((err) => {

            if (err.response && err.response.data.msg) {
              alert(err.response.data.msg);
            } else {
              alert("Visitor verification succeeded but check-in failed.");
            }

          });

        })

        .catch((err) => {

          if (err.response && err.response.data.msg) {
            alert(err.response.data.msg);
          } else {
            alert("Invalid Pass");
          }

        });

      },

      (error) => {
        // Ignore scan errors
      }

    );

    return () => {
      scanner.clear().catch(() => {});
    };

  }, []);

  return (
    <div>
      <h2>QR Scanner</h2>

      <div
        id="reader"
        style={{
          width: "400px",
          margin: "20px auto"
        }}
      ></div>

    </div>
  );
}

export default QRScanner;