import { useState } from "react";
import service from "../functions/service";
import NotFound from "../NotFound";
import AssetsPanel from "../elements/AssetsPanel";
import "../stylesheets/PublisherView.css";

const PublisherView = (props) => {
  const [data, setData] = useState();

  if (!data) {
    service
      .viewPublisher(props.match.params.userName)
      .then((resp) => {
        setData(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  if (data) {
    return (
      <div className="publish-container">
        <div className="image-input">
          <img className="avatar-box" src={data.publisher.imageURL} />
        </div>
        <div className="user-box">
          <div className="user-details">
            <label className="label-details">{`Username :   ${data.publisher.userName}`}</label>
          </div>
          <div className="user-details">
            <label className="label-details">{`Name :    ${data.publisher.firstName} ${data.publisher.lastName}`}</label>
          </div>
        </div>
        <div className="bio-area">
          <div className="bio-box">
            <label className="bio-head">Bio</label>
          </div>
          <div className="bio-box">
            <p className="area-co">{data.publisher.bio}</p>
          </div>
        </div>
        <div className="user-box">
          <div className="user-details">
            <label className="label-details">{`Publishes ( ${
              data.assets.length ? data.assets.length : 0
            } )`}</label>
          </div>
        </div>
        <AssetsPanel aList={data.assets} publisher={data.publisher} />
      </div>
    );
  } else {
    return <NotFound />;
  }
};

export default PublisherView;
