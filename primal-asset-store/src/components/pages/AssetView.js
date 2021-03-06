import { useState } from "react";
import { NavLink } from "react-router-dom";
import service from "../functions/service";
import NotFound from "../NotFound";
import Review from "../elements/Review";
import Preview from "../elements/Preview";
import "../stylesheets/AssetReview.css";
import StarRating from "../elements/StarRating";
import Heart from "../elements/Heart";

const AssetView = (props) => {
  const assetId = props.match.params.assetId;

  const [assetInfo, setAssetInfo] = useState();
  const [publisherInfo, setPublisherInfo] = useState();
  const [fav, setFav] = useState("$$$NULL$$$");

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
      var googleId;
      try {
        googleId = JSON.parse(
          window.localStorage.getItem("primal-UIG-asset-store-G10")
        ).googleId;
      } catch (e) {
        return <NotFound />;
      }

      if (fav === "$$$NULL$$$") {
        service
          .favorite(googleId, assetId, "GET")
          .then((resp) => {
            console.log(resp);
            if (resp.status === 200) {
              setFav(true);
            }
          })
          .catch((err) => {
            setFav(false);
          });
      }

      return (
        <div className="Asset-review">
          <div className="asset-container">
            <div className="image-container-review">
              <Preview assetInfo={assetInfo} />
            </div>
            <div className="review-info">
              <NavLink
                style={{ color: "#212529", fontSize: "1.5rem" }}
                to={`/user/view/asset/${assetInfo.assetId}`}
              >
                {assetInfo.assetName}
              </NavLink>
              <div
                onClick={(e) => {
                  if (!fav) {
                    service.favorite(googleId, assetId, "POST");
                    setFav(true);
                  } else {
                    service.favorite(googleId, assetId);
                    setFav(false);
                  }
                }}
              >
                <Heart fill={fav} />
              </div>
            </div>
            <div className="review-info">
              <div className="info">
                <label className="label-review">Publisher</label>
                <NavLink
                  style={{ color: "#212529" }}
                  to={`/user/view/publisher/${publisherInfo.userName}`}
                >
                  {publisherInfo.userName}
                </NavLink>
              </div>
              <div className="info1">
                <div>
                  <StarRating total="5" count={assetInfo.avgRating} />
                </div>
                <label style={{ fontSize: "2em" }}>
                  {assetInfo.avgRating
                    ? assetInfo.avgRating.toFixed(2)
                    : assetInfo.avgRating}
                </label>
              </div>
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

            <button
              className="btn-use3"
              disabled={assetInfo.devUserId === googleId}
              onClick={(e) => {
                const cartData = {
                  userId: googleId,
                  assetId: assetId,
                };
                service
                  .addToCart(cartData)
                  .then((resp) => {
                    if (resp.status === 200) {
                      alert("Added to Cart!");
                    } else {
                      alert("Couldn't add to Cart!");
                    }
                  })
                  .catch((err) => {
                    alert("Couldn't add to Cart!");
                  });
              }}
            >
              Add to Cart
            </button>
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
