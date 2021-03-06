import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import service from "../functions/service";
import "../stylesheets/Checkout.css";

const Checkout = ({ price, currency, cart, googleId }) => {
  const [cred, setCred] = useState({});
  const [processing, setProcessing] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const billingDetails = {
      name: cred.name,
      email: cred.email,
      address: {
        line1: cred.line1,
        city: cred.city,
        state: cred.state,
        postal_code: cred.zip,
      },
    };

    setProcessing(true);

    const { data: client_secret } = await service.payIntent(price, currency);

    const cardElement = elements.getElement(CardElement);

    const paymentMethodReq = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: billingDetails,
    });

    const confirmedCardPayment = await stripe.confirmCardPayment(
      client_secret,
      {
        payment_method: paymentMethodReq.paymentMethod.id,
      }
    );

    if (confirmedCardPayment.paymentIntent.status === "succeeded") {
      var { status } = await service.userCartBought(googleId, cart);

      if (status === 200) {
        var { data } = await service.verify(googleId);

        const totalCoins = data.coins + Math.ceil(price * 0.05);
        await service.coins(googleId, { coins: totalCoins });
      }

      for (var i in cart) {
        var assetPrice = cart[i].assetInfo.price;
        assetPrice = assetPrice - Math.ceil(assetPrice * 0.15);

        var dev = cart[i].assetInfo.devUserId;
        var { data } = await service.verify(dev);
        const devCoins = data.coins + assetPrice;
        console.log(devCoins, data.coins);

        await service.coins(dev, { coins: devCoins });
      }

      window.location.href = "orders";
    } else {
      alert("Transaction Failed!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="align-head">
        <h1>
          <b>Payment</b>
        </h1>
      </div>
      <div className="form-adjust">
        <div className="label-checkout">
          <label>Name:</label>
        </div>
        <div className="input-field-checkout">
          <input
            className="input-box-checkout"
            input
            type="text"
            required
            placeholder="Enter Name on Card"
            onChange={(e) => {
              setCred({ ...cred, name: e.target.value });
            }}
          />
        </div>
      </div>
      <div className="form-adjust">
        <div className="label-checkout">
          <label>Email:</label>
        </div>
        <div className="input-field-checkout">
          <input
            className="input-box-checkout"
            type="text"
            required
            placeholder="Enter Email"
            onChange={(e) => {
              setCred({ ...cred, email: e.target.value });
            }}
          />
        </div>
      </div>

      <div className="form-adjust">
        <div className="label-checkout">
          <label>Address:</label>
        </div>
        <div className="input-field-checkout">
          <input
            className="input-box-checkout"
            type="text"
            required
            placeholder="Enter Address"
            onChange={(e) => {
              setCred({ ...cred, line1: e.target.value });
            }}
          />
        </div>
      </div>
      <div className="form-adjust">
        <div className="label-checkout">
          <label>City:</label>
        </div>
        <div className="input-field-checkout">
          <input
            className="input-box-checkout"
            type="text"
            required
            placeholder="City"
            onChange={(e) => {
              setCred({ ...cred, city: e.target.value });
            }}
          />
        </div>
      </div>
      <div className="form-adjust">
        <div className="label-checkout">
          <label>State:</label>
        </div>
        <div className="input-field-checkout">
          <input
            className="input-box-checkout"
            type="text"
            required
            placeholder="State"
            onChange={(e) => {
              setCred({ ...cred, state: e.target.value });
            }}
          />
        </div>
      </div>
      <div className="form-adjust">
        <div className="label-checkout">
          <label>Zip:</label>
        </div>
        <div className="input-field-checkout">
          <input
            className="input-box-checkout"
            type="text"
            required
            placeholder="Zipcode"
            onChange={(e) => {
              setCred({ ...cred, zip: e.target.value });
            }}
          />
        </div>
      </div>
      <div className="form-adjust" style={{ width: "50vw", margin: "2vw" }}>
        <CardElement options={{ hidePostalCode: true }} />
      </div>
      <div className="form-adjust">
        <button className="btn-use11" type="submit" disabled={processing}>
          {processing ? "Processing..." : `Pay ${price} ${currency}`}
        </button>
      </div>
    </form>
  );
};

export default Checkout;
