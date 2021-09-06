import SubNav from "../navigation/SubNav";
import PropTypes from "prop-types";

const Discover = ({ assetType }) => {
  return (
    <div style={{ width: "80%", height: "90vh", backgroundColor: "yellow" }}>
      <SubNav />
      <h1>{assetType === "ui" ? "UI" : "Game"}</h1>
    </div>
  );
};

Discover.propTypes = {
  assetType: PropTypes.string.isRequired,
};

export default Discover;
