import { useState, useEffect } from "react";
import SubNav from "../navigation/SubNav";
import { BlockLoading } from "react-loadingg";
import service from "../functions/service";
import PropTypes from "prop-types";
import AssetsPanel from "../elements/AssetsPanel";

const Discover = ({ assetType }) => {
  const [latestPublishes, setLatestPublishes] = useState();
  const [topDownloads, setTopDownloads] = useState();
  const [topRated, setTopRated] = useState();
  const [typeId, setTypeId] = useState(assetType);

  if (typeId !== assetType) {
    setTypeId(assetType);
    setLatestPublishes();
    setTopDownloads();
    setTopRated();
  }

  if (!latestPublishes) {
    service
      .discover(assetType, "latest_publishes")
      .then((resp) => {
        setLatestPublishes(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (!topDownloads) {
    service
      .discover(assetType, "top_downloads")
      .then((resp) => {
        setTopDownloads(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (!topRated) {
    service
      .discover(assetType, "top_rated")
      .then((resp) => {
        setTopRated(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (latestPublishes && topDownloads && topRated) {
    return (
      <div style={{ width: "80%", height: "90vh", backgroundColor: "yellow" }}>
        <SubNav />
        <div>
          <h1>Latest Publishes</h1>
          <AssetsPanel aList={latestPublishes} />
        </div>
        <div>
          <h1>Top Downloads</h1>
          <AssetsPanel aList={topDownloads} />
        </div>
        <div>
          <h1>Top Rated</h1>
          <AssetsPanel aList={topRated} />
        </div>
      </div>
    );
  } else {
    return <BlockLoading size="large" color="#FFA825" />;
  }
};

Discover.propTypes = {
  assetType: PropTypes.string.isRequired,
};

export default Discover;
