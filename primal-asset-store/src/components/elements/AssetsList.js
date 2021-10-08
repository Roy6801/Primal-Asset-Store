import { useState } from "react";
import service from "../functions/service";
import AdminAsset from "./AdminAsset";

const AssetsList = ({ devId }) => {
  const [aList, setAList] = useState();

  if (!aList) {
    service
      .assetList(devId)
      .then((resp) => {
        setAList(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (devId && aList) {
    return (
      <div>
        {aList.map((assetInfo, index) => {
          return (
            <div style={{ backgroundColor: "yellow" }} key={index}>
              <AdminAsset googleId={devId} props={assetInfo} />
            </div>
          );
        })}
      </div>
    );
  } else {
    return null;
  }
};

export default AssetsList;
