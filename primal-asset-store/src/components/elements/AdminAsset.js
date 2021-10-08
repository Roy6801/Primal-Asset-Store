import { useState } from "react";
import service from "../functions/service";

const AdminAsset = ({ googleId, props }) => {
  const [assetInfo, setAssetInfo] = useState(props);
  const [file, setFile] = useState();
  const [edit, setEdit] = useState(false);
  console.log("props", props);

  const uploadLimit = 100;
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
      .assetEdit(assetInfo)
      .then((resp) => {
        window.location.reload();
      })
      .catch((err) => {
        alert("An error occurred!");
      });
  };

  return (
    <div>
      <label>{assetInfo.typeId ? "Game Asset" : "UI Asset"}</label>
      <input
        placeholder="Enter Asset Name"
        disabled={!edit}
        defaultValue={assetInfo.assetName}
        required
        onChange={(e) => {
          setAssetInfo({ ...assetInfo, assetName: e.target.value });
        }}
      />
      <input
        placeholder="Enter Asset Description"
        disabled={!edit}
        defaultValue={assetInfo.description}
        required
        onChange={(e) => {
          setAssetInfo({ ...assetInfo, description: e.target.value });
        }}
      />
      <input
        placeholder="Enter Asset Features"
        disabled={!edit}
        defaultValue={assetInfo.features}
        onChange={(e) => {
          setAssetInfo({ ...assetInfo, features: e.target.value });
        }}
      />
      <input
        placeholder="Enter Price"
        disabled={!edit}
        defaultValue={assetInfo.price}
        onChange={(e) => {
          setAssetInfo({ ...assetInfo, price: e.target.value });
        }}
      />
      <input
        placeholder="Enter Currency"
        disabled={!edit}
        required
        defaultValue={assetInfo.currency}
      />
      <input
        placeholder="Enter Version"
        disabled={!edit}
        required
        defaultValue={assetInfo.version}
        onChange={(e) => {
          setAssetInfo({ ...assetInfo, version: e.target.value });
        }}
      />
      <label>
        {assetInfo.size > 1024 * 1024
          ? `${Math.round(parseFloat(assetInfo.size) / (1024 * 1024), 2)} MB`
          : `${Math.round(parseFloat(assetInfo.size) / 1024, 2)} KB`}
      </label>
      <input
        type="file"
        disabled={!edit}
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
        disabled={!edit || !file}
        onClick={(e) => {
          handleUpload(e);
        }}
      >
        Upload
      </button>
      <button
        disabled={!edit}
        onClick={(e) => {
          setAssetInfo({ ...assetInfo, devUserId: googleId });
          publishAsset(e);
        }}
      >
        Save
      </button>
      <button onClick={(e) => setEdit(!edit)}>
        {edit ? "Cancel" : "Edit"}
      </button>
      {assetInfo.uploaded ? <a href={assetInfo.uploaded}> Download</a> : null}
    </div>
  );
};

export default AdminAsset;
