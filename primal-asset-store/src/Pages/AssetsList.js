import React from 'react';
import Preview from './Preview';

class AssetsList extends React.Component {
  render() {
    return (
      <div>
        {
          this.props.preview.map(asset => (
            <Preview
              key={asset.id}
              product={asset} />
          ))
        }
      </div>
    );
  }
}

AssetsList.propTypes = {
  products: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
};

AssetsList.defaultProps = {
  Preview: []
};

export default AssetsList;