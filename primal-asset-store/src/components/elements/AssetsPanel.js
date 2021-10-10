import AssetCard from "./AssetCard";

const AssetsPanel = ({ aList, publisher }) => {
  return (
    <div
      style={{
        backgroundColor: "yellow",
        display: "flex",
        overflowX: "scroll",
      }}
    >
      {aList.map((assetInfo, index) => {
        return (
          <div key={index} style={{ backgroundColor: "violet", margin: "1vw" }}>
            <AssetCard assetInfo={assetInfo} publisher={publisher} />
          </div>
        );
      })}
    </div>
  );
};

export default AssetsPanel;
