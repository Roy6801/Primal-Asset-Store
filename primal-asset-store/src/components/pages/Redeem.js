import { useState } from "react";
import service from "../functions/service";
import NotFound from "../NotFound";

const Redeem = () => {
  const [coins, setCoins] = useState();
  var googleId;
  try {
    googleId = JSON.parse(
      window.localStorage.getItem("primal-UIG-asset-store-G10")
    ).googleId;
  } catch (e) {
    return <NotFound />;
  }

  if (!coins) {
    service
      .verify(googleId)
      .then((resp) => {
        setCoins(resp.data.coins);
      })
      .catch((err) => {
        console.log(err);
      });
    return null;
  } else {
    return (
      <div>
        <h1>{`Total Coins - ${coins}`}</h1>
        <h3>
          You are about to transfer all your coins/cash to your bank account
        </h3>
        <button
          onClick={(e) => {
            service
              .coins(googleId, { coins: 0 })
              .then((resp) => {
                if (resp.status === 200) {
                  window.location.href = "/";
                } else {
                  alert("An Error Occurred!");
                }
              })
              .catch((err) => {
                alert(err);
              });
          }}
        >
          Transfer
        </button>
      </div>
    );
  }
};

export default Redeem;
