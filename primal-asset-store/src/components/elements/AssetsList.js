import { useState } from "react";
import { BlockLoading } from "react-loadingg";
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
    const rows = Math.ceil(aList.length / 3);

    var grid = [];
    var u, l;
    for (var i = 0; i < rows; i++) {
      var tempArr = [];
      l = i * 3;
      u = l + 3;
      for (var j = l; j < u; j++) {
        tempArr.push(aList[j]);
      }
      grid.push(tempArr);
    }
    return (
      <div>
        {grid.map((rows, ind) => {
          return (
            <div key={ind} style={{ display: "flex", direction: "column" }}>
              {rows.map((assetInfo, index) => {
                return (
                  <div
                    style={{
                      margin: "1vw",
                      display: "flex",
                      width: "auto",
                    }}
                    key={index}
                  >
                    {assetInfo ? (
                      <AdminAsset googleId={devId} props={assetInfo} />
                    ) : null}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  } else {
    return <BlockLoading size="large" color="#FFA825" />;
  }
};

export default AssetsList;
