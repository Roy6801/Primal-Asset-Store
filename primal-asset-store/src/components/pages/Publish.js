import { useState } from "react";
import NotFound from "../NotFound";
import AssetsList from "../elements/AssetsList";
import service from "../functions/service";
import idGen from "../functions/idGen";
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

  const publishAsset = (e) => {
    console.log(assetInfo);
    service
      .assetPublish(assetInfo)
      .then((resp) => {
        console.log(resp);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
        <AssetsList />
        <div>
          <input
            type="radio"
            value="UI"
            name="Asset-Type"
            onClick={(e) => {
              setAssetInfo({ ...assetInfo, typeId: false });
            }}
          />
          <label>UI Asset</label>
          <input
            type="radio"
            value="Game"
            name="Asset-Type"
            onClick={(e) => {
              setAssetInfo({ ...assetInfo, typeId: true });
            }}
          />
          <label>Game Asset</label>
        </div>
        <input
          placeholder="Enter Asset ID"
          onChange={(e) => {
            setAssetInfo({ ...assetInfo, assetId: e.target.value });
          }}
        />
        <input
          placeholder="Enter Asset Name"
          required
          onChange={(e) => {
            setAssetInfo({ ...assetInfo, assetName: e.target.value });
          }}
        />
        <input
          placeholder="Enter Asset Description"
          required
          onChange={(e) => {
            setAssetInfo({ ...assetInfo, description: e.target.value });
          }}
        />
        <input
          placeholder="Enter Asset Features"
          onChange={(e) => {
            setAssetInfo({ ...assetInfo, features: e.target.value });
          }}
        />
        <input
          placeholder="Enter Price"
          onChange={(e) => {
            setAssetInfo({ ...assetInfo, price: e.target.value });
          }}
        />
        <input
          placeholder="Enter Size"
          onChange={(e) => {
            setAssetInfo({ ...assetInfo, size: e.target.value });
          }}
        />
        <input
          placeholder="Enter Version"
          onChange={(e) => {
            setAssetInfo({ ...assetInfo, version: e.target.value });
          }}
        />
        <input placeholder="Enter URL" />
        <button onClick={(e) => {}}>Upload</button>
        <button
          onClick={(e) => {
            setAssetInfo({ ...assetInfo, devUserId: googleId });
            publishAsset(e);
          }}
        >
          Publish Asset
        </button>
      </div>
    );
  } else {
    return null;
  }
};

export default Publish;
