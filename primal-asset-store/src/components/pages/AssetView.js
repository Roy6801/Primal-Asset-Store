import { useState } from "react";
import { NavLink } from "react-router-dom";
import service from "../functions/service";
import NotFound from "../NotFound";
import Review from "../elements/Review";

const AssetView = (props) => {
  const assetId = props.match.params.assetId;

  const [assetInfo, setAssetInfo] = useState();
  const [publisherInfo, setPublisherInfo] = useState();

  if (!assetInfo) {
    service
      .assetDetail(assetId)
      .then((resp) => {
        setAssetInfo(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (assetInfo) {
    if (!publisherInfo) {
      service
        .verify(assetInfo.devUserId)
        .then((resp) => {
          setPublisherInfo(resp.data);
        })
        .catch((err) => {
          console.log(err);
        });
      return <NotFound />;
    } else {
      return (
        <div style={{ backgroundColor: "teal" }}>
          <NavLink to={`/user/view/asset/${assetInfo.assetId}`}>
            {assetInfo.assetName}
          </NavLink>
          <div>
            <label>Publisher</label>
            <NavLink to={`/user/view/publisher/${publisherInfo.userName}`}>
              {publisherInfo.userName}
            </NavLink>
          </div>
          <label>{assetInfo.typeId ? "Game Asset" : "UI Asset"}</label>
          <label>{`Version: ${assetInfo.version}`}</label>
          <label>{`File Size: ${
            assetInfo.size > 1024 * 1024
              ? assetInfo.size > 1024 * 1024 * 1024
                ? `${Math.round(
                    parseFloat(assetInfo.size) / (1024 * 1024 * 1024),
                    2
                  )} GB`
                : `${Math.round(
                    parseFloat(assetInfo.size) / (1024 * 1024),
                    2
                  )} MB`
              : `${Math.round(parseFloat(assetInfo.size) / 1024, 2)} KB`
          }`}</label>
          <div>
            <label>Description</label>
            <p>{assetInfo.description}</p>
          </div>
          <div>
            <label>Features</label>
            <p>{assetInfo.features}</p>
          </div>
          <label>{assetInfo.createdDate}</label>
          <label>
            {assetInfo.price
              ? `${assetInfo.price} ${assetInfo.currency}`
              : "FREE"}
          </label>
          <div>
            <label>
              {`Downloaded ${
                assetInfo.downloadCount ? assetInfo.downloadCount : 0
              } times`}
            </label>
          </div>
          <button>Add to Cart</button>
          <Review assetInfo={assetInfo} />
        </div>
      );
    }
  } else {
    return <NotFound />;
  }
};

export default AssetView;
