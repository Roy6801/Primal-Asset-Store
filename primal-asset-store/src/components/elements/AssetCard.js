import { NavLink } from "react-router-dom";

const AssetCard = ({ assetInfo, publisher }) => {
  return (
    <div>
      <NavLink to={`/user/view/asset/${assetInfo.assetId}`}>
        {assetInfo.assetName}
      </NavLink>
      <NavLink to={`/user/view/publisher/${publisher.userName}`}>
        {publisher.userName}
      </NavLink>
      <label>{`File Size: ${
        assetInfo.size > 1024 * 1024
          ? assetInfo.size > 1024 * 1024 * 1024
            ? `${Math.round(
                parseFloat(assetInfo.size) / (1024 * 1024 * 1024),
                2
              )} GB`
            : `${Math.round(parseFloat(assetInfo.size) / (1024 * 1024), 2)} MB`
          : `${Math.round(parseFloat(assetInfo.size) / 1024, 2)} KB`
      }`}</label>
      <label>
        {assetInfo.price ? `${assetInfo.price} ${assetInfo.currency}` : "FREE"}
      </label>
      <button>Add to Cart</button>
    </div>
  );
};

export default AssetCard;
