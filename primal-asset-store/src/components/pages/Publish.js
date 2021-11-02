import { useState } from "react";
import NotFound from "../NotFound";
import AssetsList from "../elements/AssetsList";
import service from "../functions/service";
import SetPay from "./SetPay";
import "../stylesheets/Publish.css";

const Publish = () => {
  const [devMode, setDevMode] = useState(0);
  const [assetInfo, setAssetInfo] = useState({});

  var googleId;
  try {
    googleId = JSON.parse(
      window.localStorage.getItem("primal-UIG-asset-store-G10")
    ).googleId;
  } catch (e) {
    return <NotFound />;
  }

  if (!devMode) {
    //request for info
    service
      .verify(googleId)
      .then((resp) => {
        if (resp.data.accountNumber && resp.data.ifsc) {
          setDevMode(1);
        } else {
          setDevMode(-1);
        }
      })
      .catch((err) => {
        alert("Some error occurred!");
      });
  }

  if (devMode === -1) {
    return <SetPay googleId={googleId} />;
  } else if (devMode === 1) {
    return (
      <div className="main-div">
        <div className="heading">
          <div className="check-box">
            <input
              style={{ margin: "1rem" }}
              type="radio"
              name="Asset-Type"
              onClick={(e) => {
                setAssetInfo({ ...assetInfo, typeId: false });
              }}
            />
            <label>UI Asset</label>
          </div>
          <div className="check-box">
            <input
              style={{ margin: "1rem" }}
              type="radio"
              name="Asset-Type"
              onClick={(e) => {
                setAssetInfo({ ...assetInfo, typeId: true });
              }}
            />
            <label>Game Asset</label>
          </div>
        </div>
        <div className="heading">
          <input
            className="asset-input"
            required
            placeholder="Enter Asset Name"
            onChange={(e) => {
              setAssetInfo({
                ...assetInfo,
                assetName: e.target.value,
                devUserId: googleId,
              });
            }}
          />
        </div>
        <div>
          <button
            className="btnuse"
            onClick={(e) => {
              service
                .assetPublish(assetInfo)
                .then((resp) => {
                  if (resp.status === 201) {
                    window.location.reload();
                  } else {
                    alert("An error occurred!");
                  }
                })
                .catch((err) => {
                  alert("An error occurred!");
                });
            }}
          >
            Add Asset
          </button>
        </div>
        <AssetsList devId={googleId} />
      </div>
    );
  } else {
    return null;
  }
};

export default Publish;
