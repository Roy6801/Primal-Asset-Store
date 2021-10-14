import { useState } from "react";
import { Carousel } from "react-bootstrap";
import service from "../functions/service";

const Preview = ({ assetInfo }) => {
  const [thumbnails, setThumbnails] = useState();

  if (!thumbnails) {
    service
      .getThumbnails(assetInfo.assetId)
      .then((resp) => {
        setThumbnails(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
    return null;
  } else {
    return (
      <Carousel>
        {thumbnails.map((thumbnail, index) => {
          return (
            <Carousel.Item key={index} style={{ height: "40vh" }}>
              <img
                className="d-block h-100"
                src={thumbnail.thumbnailURL}
                alt="thumbnail"
              />
            </Carousel.Item>
          );
        })}
      </Carousel>
    );
  }
};

export default Preview;
