import { useState } from "react";
import NotFound from "../NotFound";
import AssetsList from "../elements/AssetsList";
import service from "../functions/service";
import SetPay from "./SetPay";

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
      .assetList(googleId)
      .then((resp) => {
        setDevMode(1);
      })
      .catch((err) => {
        setDevMode(-1);
      });
  }

  if (devMode === -1) {
    return <SetPay />;
  } else if (devMode === 1) {
    return (
      <div>
        <div>
          <input
            type="radio"
            name="Asset-Type"
            onClick={(e) => {
              setAssetInfo({ ...assetInfo, typeId: false });
            }}
          />
          <label>UI Asset</label>
          <input
            type="radio"
            name="Asset-Type"
            onClick={(e) => {
              setAssetInfo({ ...assetInfo, typeId: true });
            }}
          />
          <label>Game Asset</label>
        </div>
        <input
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
        <button
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
        <AssetsList devId={googleId} />
      </div>
    );
  } else {
    return null;
  }
};

export default Publish;
