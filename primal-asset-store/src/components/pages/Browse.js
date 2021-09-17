import SubNav from "../navigation/SubNav";
import PropTypes from "prop-types";

const Browse = ({ assetType }) => {
  return (
    <div style={{ width: "80%", height: "90vh", backgroundColor: "yellow" }}>
      <SubNav />
      <h2>{assetType === "ui" ? "UI Browse" : "Game Browse"}</h2>
    </div>
  );
};

Browse.propTypes = {
  assetType: PropTypes.string.isRequired,
};

export default Browse;
