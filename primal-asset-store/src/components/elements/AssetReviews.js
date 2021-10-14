import { useState } from "react";
import { NavLink } from "react-router-dom";
import service from "../functions/service";
import StarRating from "./StarRating";
import { BlockLoading } from "react-loadingg";

const AssetReviews = ({ assetId }) => {
  const [reviews, setReviews] = useState();

  if (!reviews) {
    service
      .allUserReviews(assetId)
      .then((resp) => {
        console.log(resp.data);
        setReviews(resp.data);
      })
      .catch((err) => {
        console.log(err);
        setReviews([]);
      });
  }

  console.log(reviews);
  if (reviews) {
    return (
      <div className="text-review">
        {reviews.map((review, index) => {
          return (
            <div className="text-review-area" key={index}>
              <div className="star-text">
                <StarRating total="5" count={review.rating} />
              </div>
              <p className="star-text">{review.comment}</p>
              <NavLink
                className="star-text"
                to={`/user/view/publisher/${review.userName}`}
              >
                {review.userName}
              </NavLink>
            </div>
          );
        })}
      </div>
    );
  } else {
    return <BlockLoading size="large" color="#FFA825" />;
  }
};

export default AssetReviews;
