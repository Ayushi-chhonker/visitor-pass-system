import { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import axios from "axios";

/*
QR Scanner Component
Purpose: This page allows the security staff to scan the visitor's QR code.
Workflow:
 Open device camera.
 Scan QR code.
 Extract visitorId and appointmentId.
 Send both ids to backend for verification.
 Show whether check-in/check-out was successful.
*/

function QRScanner() {
  useEffect(() => {
    // Prevents multiple API calls for the same QR scan
    let alreadyScanned = false;

    // Create QR scanner
    const scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: 250},
      false
    );

    // Start scanning
    scanner.render(
      async (decodedText) => {

        // Ignore repeated scans
        if (alreadyScanned) {
          return;
        }
        alreadyScanned = true;
        try {
          const token = localStorage.getItem("token");

          /*  QR data is stored like: Visitor:visitorId,Appointment:appointmentId */
          const qrParts = decodedText.split(",");
          // Validate QR format
          if (qrParts.length !== 2) {
            alert("Invalid QR Code.");
            return;
          }

          // Extract Visitor ID
          const visitorId =
            qrParts[0].split(":")[1];

          // Extract Appointment ID
          const appointmentId = qrParts[1].split(":")[1];

          // Call backend to verify pass
          const response = await axios.get(
            `http://localhost:5000/api/passes/verify/${visitorId}/${appointmentId}`,
            {
              headers: { Authorization: `Bearer ${token}`}
            }
          );

          console.log("Verification Result:", response.data);
          alert(response.data.msg);
        } catch (error) {
          console.log("QR Verification Error:", error);
          if (error.response?.data?.msg) { alert(error.response.data.msg);
          } else {
            alert("Unable to verify visitor pass.");
          }
        }
      },

      // Camera keeps scanning continuously.
      // We don't need to show every scan error.
      () => {}
    );

    // Remove camera when leaving this page
    return () => {
      scanner.clear().catch(() => {
        console.log("Scanner closed.");
      });
    };
  }, []);

  return (

    <div>
      <h2>QR Scanner</h2>
      <p> Scan the visitor QR code to verify the pass and record check-in/check-out. </p>
      <div id="reader"
        style={{ width: "400px", margin: "20px auto"}}
      ></div>
    </div>
  );
}
export default QRScanner;