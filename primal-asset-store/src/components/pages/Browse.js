import SubNav from "../navigation/SubNav";
import PropTypes from "prop-types";

const Browse = ({ assetType }) => {
  return (
    <div style={{ width: "90%", height: "90vh" }}>
      <SubNav />
      <h1>Coming Soon...</h1>
    </div>
  );
};

Browse.propTypes = {
  assetType: PropTypes.string.isRequired,
};

export default Browse;
