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
      <div style={{ backgroundColor: "crimson", padding: "1vw" }}>
        {reviews.map((review, index) => {
          return (
            <div
              key={index}
              style={{ backgroundColor: "teal", border: "black solid 5px" }}
            >
              <StarRating total="5" count={review.rating} />
              <p>{review.comment}</p>
              <NavLink to={`/user/view/publisher/${review.userName}`}>
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
