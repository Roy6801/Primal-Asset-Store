import { useState } from "react";
import service from "../functions/service";
import NotFound from "../NotFound";
import Preview from "../elements/Preview";
import { BlockLoading } from "react-loadingg";
import { NavLink } from "react-router-dom";
import "../stylesheets/Fav.css";

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
      <div className="fav-con">
        <h1>Downloads/Purchases</h1>
        {orders.map((asset, index) => {
          return (
            <div key={index} className="fav-con1">
              <div className="asset-cart-preview">
                <Preview assetInfo={asset.assetInfo} />
              </div>
              <div>
                <div className="nav-link-fav">
                  <NavLink
                    className="nav-link-fav"
                    to={`/user/view/asset/${asset.assetInfo.assetId}`}
                  >
                    {asset.assetInfo.assetName}
                  </NavLink>
                </div>
                <div style={{ color: "#212529" }}>
                  <label>{`${asset.assetInfo.price} ${asset.assetInfo.currency}`}</label>
                </div>
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
