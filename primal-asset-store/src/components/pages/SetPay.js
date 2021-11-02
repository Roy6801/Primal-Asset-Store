import { useState } from "react";
import service from "../functions/service";

const SetPay = ({ googleId }) => {
  const [payInfo, setPayInfo] = useState({ googleId: googleId });

  const handleSubmit = (e) => {
    service
      .setPayments(payInfo)
      .then((resp) => {
        if (resp.status === 200) {
          window.location.reload();
        }
      })
      .catch((err) => {
        alert("An Error Occurred!");
      });
  };

  return (
    <div>
      <h1>Setup Payments</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Bank Account Number</label>
          <input
            type="text"
            required
            placeholder="Account No."
            onChange={(e) => {
              setPayInfo({ ...payInfo, accountNumber: e.target.value });
            }}
          />
        </div>
        <div>
          <label>Bank IFSC Code</label>
          <input
            type="text"
            required
            placeholder="IFSC Code"
            onChange={(e) => {
              setPayInfo({ ...payInfo, ifsc: e.target.value });
            }}
          />
        </div>
        <div>
          <button type="submit">Setup</button>
        </div>
      </form>
    </div>
  );
};

export default SetPay;
