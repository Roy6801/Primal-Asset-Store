import { useState } from "react";
import service from "../functions/service";
import NotFound from "../NotFound";
import Preview from "../elements/Preview";
import { NavLink } from "react-router-dom";
import { BlockLoading } from "react-loadingg";

const Favorites = () => {
  const [fav, setFav] = useState();

  var googleId;
  try {
    googleId = JSON.parse(
      window.localStorage.getItem("primal-UIG-asset-store-G10")
    ).googleId;
  } catch (e) {
    return <NotFound />;
  }

  if (!fav) {
    service
      .userFavs(googleId)
      .then((resp) => {
        setFav(resp.data);
      })
      .catch((err) => {
        alert("An Error Occurred!");
      });
    return <BlockLoading size="large" color="#FFA825" />;
  } else {
    return (
      <div>
        <h1>Favorites</h1>
        {fav["assetList"].map((asset, index) => {
          return (
            <div key={index} style={{ backgroundColor: "teal" }}>
              <Preview assetInfo={asset} />
              <div>
                <NavLink
                  className="asset-label"
                  to={`/user/view/asset/${asset.assetId}`}
                >
                  {asset.assetName}
                </NavLink>
                <label>{asset.price}</label>
                <label>{asset.currency}</label>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
};

export default Favorites;
