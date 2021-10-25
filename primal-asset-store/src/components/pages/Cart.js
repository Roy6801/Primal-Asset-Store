import { useState } from "react";
import { BlockLoading } from "react-loadingg";
import service from "../functions/service";
import NotFound from "../NotFound";
import Preview from "../elements/Preview";

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
      <div>
        <button
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
        <div>
          {cart.map((asset, index) => {
            return (
              <div key={index} style={{ backgroundColor: "teal" }}>
                <Preview assetInfo={asset.assetInfo} />
                <div>
                  <label>{asset.assetInfo.assetName}</label>
                  <label>{asset.assetInfo.price}</label>
                  <label>{asset.assetInfo.currency}</label>
                </div>
                <button
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
        <button>Check Out</button>
      </div>
    );
  }
};

export default Cart;
