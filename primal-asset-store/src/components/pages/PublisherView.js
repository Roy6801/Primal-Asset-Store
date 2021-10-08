import { useState } from "react";
import service from "../functions/service";

const PublisherView = ({ userName }) => {
  const [data, setData] = useState();

  if (!data) {
    service
      .viewPublisher(userName)
      .then((resp) => {
        console.log(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return <div></div>;
};

export default PublisherView;
