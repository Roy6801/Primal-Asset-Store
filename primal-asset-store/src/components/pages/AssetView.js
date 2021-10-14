import { useState } from "react";
import { NavLink } from "react-router-dom";
import service from "../functions/service";
import NotFound from "../NotFound";
import Review from "../elements/Review";
import Preview from "../elements/Preview";
import "../stylesheets/AssetReview.css";

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
        <div className="Asset-review">
          <div className="asset-container">
            <div className="image-container-review">
              <Preview assetInfo={assetInfo} />
            </div>
            <div className="review-info">
              <NavLink to={`/user/view/asset/${assetInfo.assetId}`}>
                {assetInfo.assetName}
              </NavLink>
            </div>
            <div className="review-info">
              <div className="info">
                <label className="label-review">Publisher</label>
                <NavLink to={`/user/view/publisher/${publisherInfo.userName}`}>
                  {publisherInfo.userName}
                </NavLink>
              </div>
              <div className="info1"></div>
            </div>
            <div className="review-info">
              <label className="label-border">
                {assetInfo.typeId ? "Game Asset" : "UI Asset"}
              </label>
            </div>
            <div className="review-info">
              <label>{`Version: ${assetInfo.version}`}</label>
            </div>
            <div className="review-info">
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
            </div>
            <div className="review-info">
              <label>Description :</label>
              <p>{assetInfo.description}</p>
            </div>
            <div className="review-info">
              <label>Features :</label>
              <p>{assetInfo.features}</p>
            </div>
            <div className="review-info">
              <label>{assetInfo.createdDate}</label>
            </div>
            <div className="review-info">
              <label>
                {assetInfo.price
                  ? `${assetInfo.price} ${assetInfo.currency}`
                  : "FREE"}
              </label>
            </div>
            <div className="review-info">
              <label>
                {`Downloaded ${
                  assetInfo.downloadCount ? assetInfo.downloadCount : 0
                } times`}
              </label>
            </div>

            <button className="btn-use3">Add to Cart</button>
          </div>
          <div>
            <Review assetInfo={assetInfo} />
          </div>
        </div>
      );
    }
  } else {
    return <NotFound />;
  }
};

export default AssetView;
