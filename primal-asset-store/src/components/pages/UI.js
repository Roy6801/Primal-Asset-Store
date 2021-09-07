import SubNav from "../navigation/SubNav";
import React from 'react';
import AssetsList from './AssetsList';

class UI extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      assets: assets.slice(0, 12)
    };
  }

  render() {
    console.log(this.state);
  

    return (
      <div style={{ width: "80%", height: "90vh", backgroundColor: "yellow" }}>
      <SubNav />
      <h1>UI</h1>
        <Header />
        <Grid id="content">
          <AssetsList
            Preview={this.state.Preview} />
        </Grid>
        <Footer />
      </div>
    );
  };
}
  
export default UI;