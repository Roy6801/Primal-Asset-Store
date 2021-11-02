import { useState } from "react";
import service from "../functions/service";
import Preview from "./Preview";
import { BlockLoading } from "react-loadingg";
import "../stylesheets/AdminAsset.css";

const AdminAsset = ({ googleId, props }) => {
  const [assetInfo, setAssetInfo] = useState(props);
  const [file, setFile] = useState();
  const [edit, setEdit] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [thumbnails, setThumbnails] = useState();

  const uploadLimit = 100;
  const handleUpload = (e) => {
    setUploading(true);
    service
      .assetUpload(assetInfo, file)
      .then((resp) => {
        if (resp.status === 200) {
          console.log(resp);
          window.location.reload();
        } else {
          alert("An error occurred!");
        }
      })
      .catch((err) => {
        alert("An error occurred!");
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
    <div className="container">
      <div className="asset-type">
        <label>{assetInfo.typeId ? "Game Asset" : "UI Asset"}</label>
      </div>
      <div className="image-container">
        <Preview assetInfo={assetInfo} />
      </div>
      <div className="header">
        <input
          placeholder="Enter Asset Name"
          disabled={!edit}
          defaultValue={assetInfo.assetName}
          required
          onChange={(e) => {
            setAssetInfo({ ...assetInfo, assetName: e.target.value });
          }}
        />
      </div>
      <div className="div-box">
        <div className="header">
          <textarea
            className="asset-info"
            placeholder="Enter Asset Description"
            disabled={!edit}
            defaultValue={assetInfo.description}
            required
            onChange={(e) => {
              setAssetInfo({ ...assetInfo, description: e.target.value });
            }}
          />
        </div>
        <div className="header">
          <textarea
            className="asset-info"
            placeholder="Enter Asset Features"
            disabled={!edit}
            defaultValue={assetInfo.features}
            onChange={(e) => {
              setAssetInfo({ ...assetInfo, features: e.target.value });
            }}
          />
        </div>
      </div>
      <div className="div-box">
        <div className="header">
          <input
            className="input-area"
            placeholder="Enter Price"
            disabled={!edit}
            defaultValue={assetInfo.price}
            onChange={(e) => {
              setAssetInfo({ ...assetInfo, price: e.target.value });
            }}
          />
        </div>
        <div className="header">
          <select
            className="input-area"
            placeholder="Enter Currency"
            disabled={!edit}
            required
            onChange={(e) => {
              setAssetInfo({ ...assetInfo, currency: e.target.value });
            }}
          >
            <option value="INR">INR</option>
            {/* <option value="USD">USD</option> */}
          </select>
        </div>
        <div className="header">
          <input
            className="input-area"
            placeholder="Enter Version"
            disabled={!edit}
            required
            defaultValue={assetInfo.version}
            onChange={(e) => {
              setAssetInfo({ ...assetInfo, version: e.target.value });
            }}
          />
        </div>
      </div>
      <div className="header">
        <label>
          {assetInfo.size > 1024 * 1024
            ? assetInfo.size > 1024 * 1024 * 1024
              ? `${Math.round(
                  parseFloat(assetInfo.size) / (1024 * 1024 * 1024),
                  2
                )} GB`
              : `${Math.round(
                  parseFloat(assetInfo.size) / (1024 * 1024),
                  2
                )} MB`
            : `${Math.round(parseFloat(assetInfo.size) / 1024, 2)} KB`}
        </label>
      </div>
      <div className="header">
        <input
          type="file"
          disabled={!edit}
          onChange={(e) => {
            try {
              if (e.target.files[0].size < 1024 * 1024 * uploadLimit) {
                setFile(e.target.files[0]);
              } else {
                alert("File Size too Big!");
              }
            } catch (err) {
              console.log(err);
            }
          }}
        />
      </div>
      <div className="div-box">
        <div className="header ">
          {uploading ? (
            <BlockLoading size="large" color="#FFA825" />
          ) : (
            <button
              className="btn-use"
              disabled={!edit || !file}
              onClick={(e) => {
                handleUpload(e);
              }}
            >
              Upload
            </button>
          )}
        </div>
        <div className="header">
          <button
            className="btn-use"
            disabled={!edit}
            onClick={(e) => {
              setAssetInfo({ ...assetInfo, devUserId: googleId });
              publishAsset(e);
            }}
          >
            Save
          </button>
        </div>
        <div className="header">
          <button className="btn-use" onClick={(e) => setEdit(!edit)}>
            {edit ? "Cancel" : "Edit"}
          </button>
        </div>
      </div>

      {assetInfo.uploaded ? (
        <button
          className="btn-use"
          onClick={(e) => {
            window.location.href = assetInfo.uploaded;
          }}
        >
          Download
        </button>
      ) : null}
      <div>
        <input
          type="file"
          multiple
          onChange={(e) => {
            setThumbnails(e.target.files);
          }}
        />
        {!uploading ? (
          <button
            disabled={!thumbnails}
            onClick={(e) => {
              service
                .thumbnailsUpload(assetInfo, thumbnails)
                .then((resp) => {
                  if (resp.status === 200) {
                    window.location.reload();
                  } else {
                    alert("An error occurred!");
                  }
                })
                .catch((err) => {
                  alert("An error occurred!");
                });
              setUploading(true);
            }}
          >
            Set Thumbnails
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default AdminAsset;
