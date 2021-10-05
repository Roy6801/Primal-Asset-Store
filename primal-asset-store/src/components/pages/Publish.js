import { useState } from "react";
import NotFound from "../NotFound";
import AssetsList from "../elements/AssetsList";
import service from "../functions/service";
import SetPay from "./SetPay";

const Publish = () => {
  const [devMode, setDevMode] = useState(0);
  const [assetInfo, setAssetInfo] = useState();
  const [file, setFile] = useState();
  const [uploaded, setUploaded] = useState(false);
  const [created, setCreated] = useState(false);

  const uploadLimit = 100;

  var googleId;
  try {
    googleId = JSON.parse(
      window.localStorage.getItem("primal-UIG-asset-store-G10")
    ).googleId;
  } catch (e) {
    return <NotFound />;
  }

  const handleUpload = (e) => {
    console.log(file);
    service
      .assetUpload(assetInfo, file)
      .then((resp) => {
        console.log(resp);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const publishAsset = (e) => {
    console.log(assetInfo);
    service
      .assetPublish(assetInfo)
      .then((resp) => {
        console.log(resp);
        setAssetInfo({ ...assetInfo, assetId: resp.data.assetId });
        setCreated(true);
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
        <input placeholder="Enter Currency" />
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
        <input
          type="file"
          onChange={(e) => {
            try {
              if (e.target.files[0].size < 1024 * 1024 * uploadLimit) {
                setFile(e.target.files[0]);
              } else {
                alert("File Size too Big");
              }
            } catch (err) {
              console.log(err);
            }
          }}
        />
        <button
          disabled={!created}
          onClick={(e) => {
            handleUpload(e);
          }}
        >
          Upload
        </button>
        <button
          onClick={(e) => {
            setAssetInfo({ ...assetInfo, devUserId: googleId });
            publishAsset(e);
          }}
        >
          Save
        </button>
      </div>
    );
  } else {
    return null;
  }
};

export default Publish;
