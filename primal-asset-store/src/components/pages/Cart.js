import { useState } from "react";
import { BlockLoading } from "react-loadingg";
import service from "../functions/service";
import NotFound from "../NotFound";
import Preview from "../elements/Preview";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Checkout from "../elements/Checkout";
import "../stylesheets/Cart.css";

const { REACT_APP_PUBLISHABLE_KEY } = process.env;
const stripePromise = loadStripe(REACT_APP_PUBLISHABLE_KEY);

const Cart = () => {
  const [cart, setCart] = useState();
  const [checkout, setCheckout] = useState(false);

  console.log(cart);
  var googleId;
  try {
    googleId = JSON.parse(
      window.localStorage.getItem("primal-UIG-asset-store-G10")
    ).googleId;
  } catch (e) {
    return <NotFound />;
  }

  const totalPay = () => {
    var sum = 0;
    for (var i in cart) {
      sum += cart[i].assetInfo.price;
    }
    return sum;
  };

  const setCartData = () => {
    service
      .userCart(googleId)
      .then((resp) => {
        setCart(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (checkout) {
    return (
      <Elements stripe={stripePromise}>
        <Checkout
          price={totalPay()}
          currency="INR"
          cart={cart}
          googleId={googleId}
        />
      </Elements>
    );
  }

  if (!cart) {
    setCartData();
    return <BlockLoading size="large" color="#FFA825" />;
  } else {
    return (
      <div className="cart-container">
        <div className="btn-adjust">
          <button
            className="btn-use9"
            onClick={(e) => {
              service
                .emptyCart(googleId)
                .then((resp) => {
                  setCart();
                })
                .catch((err) => {
                  alert("An Error Occurred!");
                });
            }}
          >
            Empty Cart
          </button>
        </div>
        <div>
          {cart.map((asset, index) => {
            return (
              <div key={index} className="cart-asset">
                <div className="asset-cart-preview">
                  <Preview assetInfo={asset.assetInfo} />
                </div>
                <div className="cart-asset-info">
                  <label>Name: {asset.assetInfo.assetName}</label>
                  <label> Price: {asset.assetInfo.price}</label>
                  <label>{asset.assetInfo.currency}</label>
                </div>
                <button
                  className="btn-use10"
                  onClick={(e) => {
                    service
                      .removeFromCart(asset.cartId)
                      .then((resp) => {
                        setCartData();
                      })
                      .catch((err) => {
                        alert("An Error Occurred!");
                      });
                  }}
                >
                  Remove
                </button>
              </div>
            );
          })}
        </div>
        <div className="btn-adjust">
          <button
            className="btn-use9"
            onClick={(e) => {
              setCheckout(true);
            }}
          >
            Check Out
          </button>
        </div>
      </div>
    );
  }
};

export default Cart;
