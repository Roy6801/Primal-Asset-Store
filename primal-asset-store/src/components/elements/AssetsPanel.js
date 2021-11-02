import AssetCard from "./AssetCard";
import "../stylesheets/PublisherView.css";
const AssetsPanel = ({ aList, publisher }) => {
  if (publisher) {
    return (
      <div className="asset-panel new panel">
        {aList.map((assetInfo, index) => {
          return (
            <div className="useless" key={index}>
              <AssetCard assetInfo={assetInfo} publisher={publisher} />
            </div>
          );
        })}
      </div>
    );
  } else {
    return (
      <div className="asset-panel new-panel">
        {aList.map((assetInfo, index) => {
          return (
            <div className="useless" key={index}>
              <AssetCard assetInfo={assetInfo} publisher={assetInfo.userName} />
            </div>
          );
        })}
      </div>
    );
  }
};

export default AssetsPanel;
