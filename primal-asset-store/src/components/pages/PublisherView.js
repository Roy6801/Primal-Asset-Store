import { useState } from "react";
import service from "../functions/service";
import NotFound from "../NotFound";
import AssetsPanel from "../elements/AssetsPanel";

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
      <div style={{ backgroundColor: "teal" }}>
        <img src={data.publisher.imageURL} />
        <label>{`Username ${data.publisher.userName}`}</label>
        <label>{`Name ${data.publisher.firstName} ${data.publisher.lastName}`}</label>
        <div>
          <label>Bio</label>
          <p>{data.publisher.bio}</p>
        </div>
        <label>{`Publishes ( ${
          data.assets.length ? data.assets.length : 0
        } )`}</label>
        <AssetsPanel aList={data.assets} publisher={data.publisher} />
      </div>
    );
  } else {
    return <NotFound />;
  }
};

export default PublisherView;
