import { useState } from "react";
import service from "../functions/service";
import "../stylesheets/Setpay.css";

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
      <h1>
        <b>Setup Payments</b>
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="set-pay">
          <label>Bank Account Number:</label>
          <input
            className="input-box-checkout"
            type="text"
            required
            placeholder="Account No."
            onChange={(e) => {
              setPayInfo({ ...payInfo, accountNumber: e.target.value });
            }}
          />
        </div>
        <div className="set-pay">
          <label>Bank IFSC Code:</label>
          <div>
            <input
              className="input-box-checkout"
              type="text"
              required
              placeholder="IFSC Code"
              onChange={(e) => {
                setPayInfo({ ...payInfo, ifsc: e.target.value });
              }}
            />
          </div>
        </div>
        <div className="set-pay">
          <button className="btn-use1" type="submit">
            Setup
          </button>
        </div>
      </form>
    </div>
  );
};

export default SetPay;
