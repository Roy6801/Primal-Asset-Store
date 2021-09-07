import PropTypes from "prop-types";

const Preview = ({ assetInfo }) => {
  return (
    <div className="">
      <div className="">
        <a href="#">
          <img alt={assetInfo.name} className="" src={assetInfo.picture} />
        </a>
      </div>

      <h4 className="" title={assetInfo.name}>
        <a href="#">{assetInfo.name}</a>
      </h4>

      <h5 className="" title={assetInfo.brand_name}>
        {`by ${assetInfo.brand_name}`}
      </h5>

      <div className="">{`${assetInfo.price}$`}</div>
    </div>
  );
};

Preview.propTypes = {
  Preview: PropTypes.object.isRequired,
};

export default Preview;
