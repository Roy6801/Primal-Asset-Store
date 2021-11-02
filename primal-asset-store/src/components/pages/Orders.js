import { useState } from "react";
import service from "../functions/service";
import NotFound from "../NotFound";
import Preview from "../elements/Preview";
import { BlockLoading } from "react-loadingg";

const Orders = () => {
  const [orders, setOrders] = useState();

  var googleId;
  try {
    googleId = JSON.parse(
      window.localStorage.getItem("primal-UIG-asset-store-G10")
    ).googleId;
  } catch (e) {
    return <NotFound />;
  }

  if (!orders) {
    service
      .userOrders(googleId)
      .then((resp) => {
        setOrders(resp.data);
      })
      .catch((err) => {
        alert("An Error Occurred!");
      });
    return <BlockLoading size="large" color="#FFA825" />;
  } else {
    return (
      <div>
        <h1>Downloads/Purchases</h1>
        {orders.map((asset, index) => {
          return (
            <div key={index} style={{ backgroundColor: "teal" }}>
              <Preview assetInfo={asset.assetInfo} />
              <div>
                <label>{asset.assetInfo.assetName}</label>
                <label>{asset.assetInfo.price}</label>
                <label>{asset.assetInfo.currency}</label>
                <a href={asset.assetInfo.uploaded} target="_blank">
                  Download
                </a>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
};

export default Orders;
