import React from 'react';

function Preview(props) {
  let {
    Preview
  } = props;

  return (
      <div className="">
        <div className="">
          <a href="#">
            <img
              alt={Preview.name}
              className=""
              src={Preview.picture} />
          </a>
        </div>

        <h4
          className=""
          title={Preview.name}>
          <a href="#">
            {Preview.name}
          </a>
        </h4>

        <h5
          className=""
          title={Preview.brand_name}>
          {`by ${Preview.brand_name}`}
        </h5>

        <div className="">
          {`${Preview.price}$`}
        </div>
      </div>
  );
}

Preview.propTypes = {
  Preview: React.PropTypes.object.isRequired
};

export default Preview;