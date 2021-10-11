import { useState } from "react";
import StarRating from "./StarRating";
import service from "../functions/service";
import AssetReviews from "./AssetReviews";

const Review = ({ assetInfo }) => {
  const [stars, setStars] = useState(0);
  const [feedback, setFeedback] = useState();
  const [reviewed, setReviewed] = useState(false);

  const googleId = JSON.parse(
    window.localStorage.getItem("primal-UIG-asset-store-G10")
  ).googleId;

  if (!reviewed && !feedback) {
    service
      .getUserReview(assetInfo.assetId, googleId)
      .then((resp) => {
        setReviewed(resp.data);
      })
      .catch((err) => {
        setReviewed("$$$NULL$$$");
      });
  } else if (!feedback && reviewed !== "$$$NULL$$$") {
    setStars(reviewed.rating);
    setFeedback(reviewed.comment);
  }

  const reviewAsset = (e) => {
    const data = {
      assetId: assetInfo.assetId,
      userId: googleId,
      rating: parseFloat(stars),
      comment: feedback,
    };
    if (reviewed === "$$$NULL$$$") {
      service
        .postUserReview(data)
        .then((resp) => {
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (feedback) {
      service
        .editUserReview(assetInfo.assetId, googleId, data)
        .then((resp) => {
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      <StarRating total="5" count={stars} color="yellow" size="5em" />
      <input
        type="range"
        min="0"
        max="5"
        step="0.5"
        value={stars}
        onChange={(e) => {
          setStars(e.target.value);
        }}
      />
      <input
        placeholder="Write Your Feedback"
        defaultValue={feedback}
        onChange={(e) => {
          setFeedback(e.target.value);
        }}
      />
      <button
        disabled={feedback ? false : true}
        onClick={(e) => {
          reviewAsset(e);
        }}
      >
        {reviewed === "$$$NULL$$$" ? "Post Review" : "Edit Review"}
      </button>
      <button
        onClick={(e) => {
          service
            .deleteUserReview(assetInfo.assetId, googleId)
            .then((resp) => {
              console.log(resp.data);
            })
            .catch((err) => {
              console.log(err);
            });
          window.location.reload();
        }}
      >
        Delete Review
      </button>
      <div>
        <AssetReviews assetId={assetInfo.assetId} />
      </div>
    </div>
  );
};

export default Review;
