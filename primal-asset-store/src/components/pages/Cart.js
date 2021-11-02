import { useState } from "react";
import { BlockLoading } from "react-loadingg";
import service from "../functions/service";
import NotFound from "../NotFound";
import Preview from "../elements/Preview";
import "../stylesheets/Cart.css";

const Cart = () => {
  const [cart, setCart] = useState();

  var googleId;
  try {
    googleId = JSON.parse(
      window.localStorage.getItem("primal-UIG-asset-store-G10")
    ).googleId;
  } catch (e) {
    return <NotFound />;
  }

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

  if (!cart) {
    setCartData();

    return <BlockLoading size="large" color="#FFA825" />;
  } else {
    const totalPay = () => {
      var sum = 0;
      for (var i in cart) {
        if (cart[i].assetInfo.currency === "USD") {
          if (cart[i].assetInfo.price) {
          }
        } else if (cart[i].assetInfo.price) {
          sum += cart[i].assetInfo.price;
        }
      }
    };
    totalPay();

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
          <button className="btn-use9">Check Out</button>
        </div>
      </div>
    );
  }
};

export default Cart;
