import { NavLink } from "react-router-dom";
import "../stylesheets/PublisherView.css";
import Preview from "./Preview";

const AssetCard = ({ assetInfo, publisher }) => {
  return (
    <div className="mini-container">
      <div className="image-container">
        <Preview assetInfo={assetInfo} />
      </div>

      <div className="max-header-sub">
        <NavLink
          className="asset-label"
          to={`/user/view/asset/${assetInfo.assetId}`}
        >
          {assetInfo.assetName}
        </NavLink>
      </div>

      <div className="max-header-sub">
        <label className="asset-label">{`File Size: ${
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
      </div>

      <label className="asset-label">
        {assetInfo.price ? `${assetInfo.price} ${assetInfo.currency}` : "FREE"}
      </label>

      <div className="max-header-sub">
        <NavLink
          className="asset-label"
          to={`/user/view/publisher/${publisher.userName}`}
        >
          {publisher.userName}
        </NavLink>
      </div>
      <button className="btn-use1">Add to Cart</button>
    </div>
  );
};

export default AssetCard;
