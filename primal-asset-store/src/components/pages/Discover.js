import { useState, useEffect } from "react";
import SubNav from "../navigation/SubNav";
import { BlockLoading } from "react-loadingg";
import service from "../functions/service";
import PropTypes from "prop-types";
import AssetsPanel from "../elements/AssetsPanel";
import "../stylesheets/discover.css";

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
      <div className="discover-main-container">
        <SubNav />
        <div className="discover-sub-container">
          <div className="hot-list">
            <h1>Latest Publishes</h1>
            <AssetsPanel aList={latestPublishes} />
          </div>
          <div className="hot-list">
            <h1>Top Downloads</h1>
            <AssetsPanel aList={topDownloads} />
          </div>
          <div className="hot-list">
            <h1>Top Rated</h1>
            <AssetsPanel aList={topRated} />
          </div>
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
