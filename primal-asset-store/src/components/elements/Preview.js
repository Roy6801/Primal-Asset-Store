import { useState, useEffect } from "react";
import service from "../functions/service";
import { BlockLoading } from "react-loadingg";

const Preview = ({ assetInfo }) => {
  const [thumbnails, setThumbnails] = useState([]);
  const [img, setImg] = useState(0);

  useEffect(() => {
    if (thumbnails.length !== 0) {
      setTimeout(() => {
        if (img < thumbnails.length - 1) {
          setImg((prev) => prev + 1);
        } else {
          setImg(0);
        }
      }, 8000);
    }
  }, [img, setImg, thumbnails]);

  if (thumbnails.length === 0) {
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
    return <img src={thumbnails[img].thumbnailURL} height="100%"/>;
  }
};

export default Preview;
