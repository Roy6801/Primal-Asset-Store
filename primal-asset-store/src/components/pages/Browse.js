import PropTypes from "prop-types";

const Browse = ({ assetType }) => {
  return (
    <div>
      <h1>Browse</h1>
      <h2>{assetType === "ui" ? "UI Browse" : "Game Browse"}</h2>
    </div>
  );
};

Browse.propTypes = {
  assetType: PropTypes.string.isRequired,
};

export default Browse;
