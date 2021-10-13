import AssetCard from "./AssetCard";
import "../stylesheets/PublisherView.css";
const AssetsPanel = ({ aList, publisher }) => {
  return (
    <div className="asset-panel">
      {aList.map((assetInfo, index) => {
        return (
          //style={{ backgroundColor: "violet", margin: "1vw" }}
          <div className="useless" key={index}>
            <AssetCard assetInfo={assetInfo} publisher={publisher} />
          </div>
        );
      })}
    </div>
  );
};

export default AssetsPanel;
